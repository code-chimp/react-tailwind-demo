import { object, string } from 'yup';

const validationSchema = object({
  name: string().required('Required'),
  avatar: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  mobilePhone: string().required('Required'),
  workPhone: string(),
  address: string().required('Required'),
  city: string().required('Required'),
  state: string()
    .max(2, 'State abbreviation should be exactly 2 characters')
    .min(2, 'State abbreviation should be exactly 2 characters')
    .required('Required'),
  postalCode: string()
    .max(5, 'Zip should be 5 characters long')
    .min(5, 'Zip should be 5 characters long')
    .required('Required'),
  country: string().required('Required'),
  notes: string(),
});

export default validationSchema;
