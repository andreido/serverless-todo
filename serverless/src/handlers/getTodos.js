const AWS = require('aws-sdk');
const { createResponse } = require('../utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTodos = async (event, context) => {
  let response = null;

  try {
    const result = await dynamodb.scan({ TableName: 'TodoTable' }).promise();
    const todos = result.Items;
    response = createResponse(200, todos || {});
  } catch (error) {
    response = createResponse(500, error);
  }

  return response;
};

module.exports = { handler: getTodos };
