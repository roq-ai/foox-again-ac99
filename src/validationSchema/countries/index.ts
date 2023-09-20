import * as yup from 'yup';

export const countryValidationSchema = yup.object().shape({
  name: yup.string().required(),
});
