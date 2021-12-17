const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const bodyParser = require('@middy/http-json-body-parser');
const { createResponse } = require('../utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addTodo = async (event) => {
  let response = null;

  try {
    const { todo } = event.body;
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const newTodo = {
      id,
      createdAt,
      todo: todo || '',
      completed: false
    };

    await dynamodb
      .put({
        TableName: 'TodoTable',
        Item: newTodo
      })
      .promise();

    response = createResponse(200, newTodo || {});
  } catch (error) {
    response = createResponse(500, error);
  }

  return response;
};

module.exports = { handler: middy(addTodo).use(bodyParser()) };
