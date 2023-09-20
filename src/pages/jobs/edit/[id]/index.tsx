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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getJobById, updateJobById } from 'apiSdk/jobs';
import { jobValidationSchema } from 'validationSchema/jobs';
import { JobInterface } from 'interfaces/job';
import { CompanyInterface } from 'interfaces/company';
import { CountryInterface } from 'interfaces/country';
import { getCompanies } from 'apiSdk/companies';
import { getCountries } from 'apiSdk/countries';

function JobEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<JobInterface>(
    () => (id ? `/jobs/${id}` : null),
    () => getJobById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: JobInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateJobById(id, values);
      mutate(updated);
      resetForm();
      router.push('/jobs');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<JobInterface>({
    initialValues: data,
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
              label: 'Update Job',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Job
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(JobEditPage);
