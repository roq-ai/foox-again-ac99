import * as yup from 'yup';

export const hiringValidationSchema = yup.object().shape({
  contract_duration: yup.number().integer().nullable(),
  job_description: yup.string().nullable(),
  freelancer_id: yup.string().nullable().required(),
  job_id: yup.string().nullable().required(),
});
