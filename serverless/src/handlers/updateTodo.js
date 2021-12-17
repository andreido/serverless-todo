const AWS = require('aws-sdk');
const middy = require('@middy/core');
const bodyParser = require('@middy/http-json-body-parser');
const { createResponse } = require('../utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
  let response = null;

  try {
    const { completed } = event.body;
    const { id } = event.pathParameters;
    const result = await dynamodb
      .update({
        TableName: 'TodoTable',
        Key: { id },
        UpdateExpression: 'SET completed = :completed',
        ConditionExpression: 'attribute_exists(id)',
        ExpressionAttributeValues: { ':completed': completed },
        ReturnValues: 'ALL_NEW' // return all modified objects
      })
      .promise();
    const updatedTodo = result.Attributes;
    response = createResponse(200, updatedTodo || {});
  } catch (error) {
    response = createResponse(500, error);
  }

  return response;
};

module.exports = { handler: middy(updateTodo).use(bodyParser()) };
