import * as Joi from 'joi';

const schema = Joi.object({
  db: {
    url: Joi.string().required(),
  },
  auth: {
    credentials: {
      scope: Joi.string().required(),
      separator: Joi.string().required(),
      audience: Joi.string().required(),
      issuer: Joi.string().required(),
      jwksUri: Joi.string().required(),
      idTokenUrl: Joi.string().required(),
      jwksCache: Joi.boolean().required(),
      jwksRateLimit: Joi.boolean().required(),
      jwksRequestPerTime: Joi.number().integer(),
    },
  },
});
const data = {
  db: {
    url:
      process.env['API_DB_URL'] ||
      'mongodb://127.0.0.1:27017/mfe-configuration',
  },
  auth: {
    credentials: {
      scope: process.env['API_AUTH_SCOPE'] || 'scope',
      separator: process.env['API_AUTH_SCOPE_SEPARATOR'] || ' ',
      audience: process.env['API_AUTH_AUDIENCE'],
      issuer: process.env['API_AUTH_ISSUER'],
      jwksUri: process.env['API_AUTH_JWKSURI'],
      idTokenUrl: process.env['API_AUTH_ID_TOKEN_URL'],
      jwksCache: process.env['API_AUTH_JWKS_CACHE'] || true,
      jwksRateLimit: process.env['API_AUTH_JWKS_RATE_LIMIT'] || true,
      jwksRequestPerTime: process.env['API_AUTH_JWKS_REQUEST_PER_TIME'] || 5,
    },
  },
};
const { error, value } = schema.validate(data);

if (error) {
  throw error;
}
export default () => value;
