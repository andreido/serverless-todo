const AWS = require('aws-sdk');
const { createResponse } = require('../utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const deleteTodo = async (event) => {
  let response = null;

  try {
    const { id } = event.pathParameters;
    const result = await dynamodb
      .delete({
        TableName: 'TodoTable',
        Key: { id },
        ReturnValues: 'ALL_OLD' // return all deleted objects
      })
      .promise();
    const deletedTodo = result.Attributes;
    response = createResponse(200, deletedTodo || {});
  } catch (error) {
    response = createResponse(500, error);
  }

  return response;
};

module.exports = { handler: deleteTodo };
