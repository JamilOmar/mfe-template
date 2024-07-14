import * as Joi from 'joi';

const schema = Joi.object({
  db: {
    url: Joi.string().required(),
  },
});
const data = {
  db: {
    url:
      process.env['API_DB_URL'] ||
      'mongodb://127.0.0.1:27017/mfe-configuration',
  },
};
const { error, value } = schema.validate(data);

if (error) {
  throw error;
}
export default () => value;
