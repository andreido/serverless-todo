const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
  try {
    const { completed, todo } = JSON.parse(event.body);
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
    console.log(`Serverless - updateTodo - SUCCESS`, { updatedTodo });

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTodo || {})
    };
  } catch (error) {
    console.log(`Serverless - updateTodo - ERROR`, { error });
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: updateTodo };
