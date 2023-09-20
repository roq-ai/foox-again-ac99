import * as yup from 'yup';

export const jobValidationSchema = yup.object().shape({
  job_duration: yup.number().integer().nullable(),
  job_requirements: yup.string().nullable(),
  job_location: yup.string().nullable(),
  company_id: yup.string().nullable().required(),
  country_id: yup.string().nullable(),
});
