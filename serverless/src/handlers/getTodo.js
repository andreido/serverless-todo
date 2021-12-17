const AWS = require('aws-sdk');
const { createResponse } = require('../utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTodo = async (event) => {
  let response = null;

  try {
    const { id } = event.pathParameters;
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id }
      })
      .promise();
    const todo = result.Item;
    response = createResponse(200, todo || {});
  } catch (error) {
    response = createResponse(500, error);
  }

  return response;
};

module.exports = { handler: getTodo };
