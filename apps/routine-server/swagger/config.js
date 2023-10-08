const swaggerJSdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'this is daily-project-server-api-docs'
    },
    host: 'localhost:8080',
    basePath: '/',
  },
  apis: [__dirname + '/swagger/*.ts'],
};

const swaggerSpec = swaggerJSdoc(options);
module.exports = swaggerSpec