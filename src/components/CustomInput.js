import { Box, Input } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

const CustomInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <Input autoComplete='off' {...field} {...props} className={`${meta.touched && meta.error && `is-invalid`}`} />
    <Box>
      <ErrorMessage name={field.name} />
    </Box>
  </>);
};

export default CustomInput;
