import * as yup from 'yup';

export const freelanceProfileValidationSchema = yup.object().shape({
  skills: yup.string().nullable(),
  portfolio_link: yup.string().nullable(),
  experience_years: yup.number().integer().nullable(),
  freelancer_id: yup.string().nullable(),
});
