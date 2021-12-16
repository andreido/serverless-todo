const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const deleteTodo = async (event) => {
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
    console.log(`Serverless - deleteTodo - SUCCESS`, { deletedTodo });

    return {
      statusCode: 200,
      body: JSON.stringify(deletedTodo || {})
    };
  } catch (error) {
    console.log(`Serverless - deleteTodo - ERROR`, { error });
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};

module.exports = { handler: deleteTodo };
