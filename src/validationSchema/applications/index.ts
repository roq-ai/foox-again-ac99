import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  application_status: yup.string().nullable(),
  application_date: yup.date().nullable(),
  freelancer_id: yup.string().nullable().required(),
  job_id: yup.string().nullable().required(),
});
