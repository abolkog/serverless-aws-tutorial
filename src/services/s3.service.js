const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const getObject = async (bucket, fileName) => {
  const params = {
    Bucket: bucket,
    Key: fileName,
  };

  const data = await s3Client.getObject(params).promise();
  return data.Body.toString();
};

module.exports = {
  getObject,
};
