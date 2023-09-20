import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createJob } from 'apiSdk/jobs';
import { jobValidationSchema } from 'validationSchema/jobs';
import { CompanyInterface } from 'interfaces/company';
import { CountryInterface } from 'interfaces/country';
import { getCompanies } from 'apiSdk/companies';
import { getCountries } from 'apiSdk/countries';
import { JobInterface } from 'interfaces/job';

function JobCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: JobInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createJob(values);
      resetForm();
      router.push('/jobs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<JobInterface>({
    initialValues: {
      job_duration: 0,
      job_requirements: '',
      job_location: '',
      company_id: (router.query.company_id as string) ?? null,
      country_id: (router.query.country_id as string) ?? null,
    },
    validationSchema: jobValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Jobs',
              link: '/jobs',
            },
            {
              label: 'Create Job',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Job
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Job Duration"
            formControlProps={{
              id: 'job_duration',
              isInvalid: !!formik.errors?.job_duration,
            }}
            name="job_duration"
            error={formik.errors?.job_duration}
            value={formik.values?.job_duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('job_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.job_requirements}
            label={'Job Requirements'}
            props={{
              name: 'job_requirements',
              placeholder: 'Job Requirements',
              value: formik.values?.job_requirements,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.job_location}
            label={'Job Location'}
            props={{
              name: 'job_location',
              placeholder: 'Job Location',
              value: formik.values?.job_location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <AsyncSelect<CountryInterface>
            formik={formik}
            name={'country_id'}
            label={'Select Country'}
            placeholder={'Select Country'}
            fetcher={getCountries}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/jobs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'job',
    operation: AccessOperationEnum.CREATE,
  }),
)(JobCreatePage);
