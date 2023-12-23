import * as Joi from 'joi';

export const createLeagueValidation = Joi.object({
  name: Joi.string().required(),
  start_date: Joi.string()
    .required()
    .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
    .message('Invalid date string'),
  end_date: Joi.string()
    .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
    .message('Invalid date string'),
});
