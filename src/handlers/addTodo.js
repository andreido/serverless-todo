const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addTodo = async (event) => {
  try {
    const { todo } = JSON.parse(event.body);
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

    console.log(`Serverless - addTodo - SUCCESS`, { newTodo });

    return {
      statusCode: 200,
      body: JSON.stringify(newTodo || {})
    };
  } catch (error) {
    console.log(`Serverless - addTodo - ERROR`, error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: addTodo };
