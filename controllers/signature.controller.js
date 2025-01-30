const db = require("../models");
const Sign = db.signs;

exports.RegisterSignature = async (req, res) => {
    const { holder, signature } = req.body;
  
    // Log the incoming request data
    console.log("Received signature data:", req.body);
  
    // Validate input data
    if (!holder || !signature) {
      return res.status(400).json({
        status: "error",
        status_code: 400,
        message: "Missing required fields: holder or signature",
      });
    }
  
    // Ensure the signature data is valid JSON
    if (typeof signature !== 'object') {
      return res.status(400).json({
        status: "error",
        status_code: 400,
        message: "Signature data must be a valid JSON object or array",
      });
    }
  
    try {
      const signatureRecord = await Sign.create({
        holder,
        signature_data: signature
      });
  
      res.status(200).json({
        status: "success",
        status_code: 200,
        result: signatureRecord,
      });
    } catch (dbError) {
      console.error("Error saving signature to the database:", dbError);
      res.status(500).json({
        status: "error",
        status_code: 500,
        message: dbError.message || "Failed to save signature data",
      });
    }
  };
  

// API to retrieve the signature image
exports.GetSignature = (req, res) => {
    const { holder } = req.query;
  
    // Check if 'holder' query parameter is provided
    if (!holder) {
      return res.status(400).json({
        status: "error",
        status_code: 400,
        message: "Missing required query parameter: holder"
      });
    }
  
    // Query to find the signature path based on the 'holder'
    const query = 'SELECT signature_image FROM signatures WHERE holder = ? LIMIT 1';
    db.query(query, [holder], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          status_code: 500,
          message: err.message || "Failed to retrieve signature"
        });
      }
  
      if (results.length === 0) {
        return res.status(404).json({
          status: "error",
          status_code: 404,
          message: "Signature not found for the provided holder"
        });
      }
  
      // Get the file path from the database
      const imagePath = results[0].signature_image;
  
      // Make sure the file exists before reading it
      fs.stat(imagePath, (err, stats) => {
        if (err || !stats.isFile()) {
          return res.status(404).json({
            status: "error",
            status_code: 404,
            message: "Signature image file not found"
          });
        }
  
        // Read the image file and convert it to base64
        fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              status_code: 500,
              message: "Failed to read signature image"
            });
          }
  
          // Send the base64-encoded image back to the client
          res.status(200).json({
            status: "success",
            status_code: 200,
            signature: `data:image/png;base64,${data}`  // Return the image as base64 for direct display
          });
        });
      });
    });
  };
  