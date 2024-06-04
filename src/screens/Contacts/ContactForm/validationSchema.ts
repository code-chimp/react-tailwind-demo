import { object, string } from 'yup';

const stateLength = 2;
const zipLength = 5;

const validationSchema = object({
  name: string().required('Required'),
  avatar: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  mobilePhone: string().required('Required'),
  workPhone: string(),
  address: string().required('Required'),
  city: string().required('Required'),
  state: string()
    .max(stateLength, 'State abbreviation should be exactly 2 characters')
    .min(stateLength, 'State abbreviation should be exactly 2 characters')
    .required('Required'),
  postalCode: string()
    .max(zipLength, 'Zip should be 5 characters long')
    .min(zipLength, 'Zip should be 5 characters long')
    .required('Required'),
  country: string().required('Required'),
  notes: string(),
});

export default validationSchema;
