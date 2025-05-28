const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Members Roulette API',
      version: '1.0.0',
      description: 'API para gerenciar membros da lista',
    },
    servers: [
      {
        url: 'https://members-roulette.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', // cookie de sessão do express-session
          description: 'Autenticação via cookie de sessão',
        },
        googleOAuth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                profile: 'Acesso ao perfil do usuário',
                email: 'Acesso ao email do usuário',
              },
            },
          },
          description: 'Autenticação via Google OAuth2',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
