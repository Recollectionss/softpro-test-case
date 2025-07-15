import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SoftPro test case',
      version: '1.0.0',
    },
  },
  apis: ['./src/modules/**/*.ts'],
});
