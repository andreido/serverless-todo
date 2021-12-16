const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTodos = async (event) => {
  try {
    const result = await dynamodb.scan({ TableName: 'TodoTable' }).promise();
    const todos = result.Items;
    console.log(`Serverless - getTodos - SUCCESS`, { todos });

    return {
      statusCode: 200,
      body: JSON.stringify(todos || {})
    };
  } catch (error) {
    console.log(`Serverless - getTodos - ERROR`, error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: getTodos };
