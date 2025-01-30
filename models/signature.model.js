module.exports = (sequelize_config, Sequelize) => {
  const Sign = sequelize_config.define("sign", {
    holder: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 255], // Limit the holder name length between 1 and 255 characters
      },
    },
    signature_data: {
      type: Sequelize.JSON,  // Use JSON data type to store structured JSON data
      allowNull: false,      // Ensure signature_data is not null
      validate: {
        // No length validation needed for JSON, but you can validate structure if necessary
        isJSON: true,  // Ensure the data is valid JSON
      },
    },
  });

  return Sign;
};




// module.exports = (sequelize_config, Sequelize) => {
//   const Sign = sequelize_config.define("sign", {
//     holder: {
//       type: Sequelize.STRING,
//       validate: {
//         len: [1, 255], // Limit the holder name length between 1 and 255 characters
//       },
//     },
//     signature_data: {
//       type: Sequelize.TEXT,  // Use TEXT for storing large strings like SVG data
//       allowNull: false,      // Ensure signature_data is not null
//       validate: {
//         len: [1, 5000],       // Limit the signature length (adjust as needed)
//       },
//     },
//   });

//   return Sign;
// };
