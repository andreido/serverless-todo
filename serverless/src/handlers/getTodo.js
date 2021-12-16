const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getTodo = async (event) => {
  try {
    const { id } = event.pathParameters;
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id }
      })
      .promise();
    const todo = result.Item;

    console.log(`Serverless - getTodo - SUCCESS`, { todo });

    return {
      statusCode: 200,
      body: JSON.stringify(todo || {})
    };
  } catch (error) {
    console.log(`Serverless - getTodo - ERROR`, error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: getTodo };
