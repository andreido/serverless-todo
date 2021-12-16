const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const bodyParser = require('@middy/http-json-body-parser');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addTodo = async (event) => {
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

    return {
      statusCode: 200,
      body: JSON.stringify(newTodo || {})
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: middy(addTodo).use(bodyParser()) };
