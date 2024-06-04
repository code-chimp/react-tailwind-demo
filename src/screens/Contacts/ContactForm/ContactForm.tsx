import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import useStore from '@/store';
import IContact from '@/@interfaces/IContact.ts';
import validationSchema from './validationSchema.ts';

interface IContactForm {
  name: string;
  avatar: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
}

const emptyForm: IContactForm = {
  name: '',
  avatar: 'avatar-0.png',
  email: '',
  mobilePhone: '',
  workPhone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'USA',
  notes: '',
};

const ContactForm: FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const [existingContact, setExistingContact] = useState<IContact | null>(null);
  const [initialValues, setInitialValues] = useState<IContactForm>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const existing = store.contacts.find(c => c.id === params.id);

      if (existing) {
        setInitialValues({
          name: existing.name,
          avatar: existing.avatar,
          email: existing.email,
          mobilePhone: existing.phone.mobile,
          workPhone: existing.phone.work ?? '',
          address: existing.address,
          city: existing.city,
          state: existing.state,
          postalCode: existing.postalCode,
          country: existing.country,
          notes: existing.notes,
        });

        setExistingContact(existing);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFormSubmit({
    name,
    avatar,
    email,
    mobilePhone,
    workPhone,
    address,
    city,
    state,
    postalCode,
    country,
    notes,
  }: IContactForm) {
    if (params.id) {
      const contact: IContact = {
        id: params.id,
        name,
        avatar,
        email,
        phone: {
          mobile: mobilePhone,
          work: workPhone ? workPhone : undefined,
        },
        address,
        city,
        state,
        postalCode,
        country,
        notes,
        createdAt: existingContact!.createdAt,
        updatedAt: new Date().toISOString(),
      };

      store.updateContact(contact);
    } else {
      const newContact: Omit<IContact, 'id' | 'updatedAt'> = {
        name,
        avatar,
        email,
        phone: {
          mobile: mobilePhone,
          work: workPhone ? workPhone : undefined,
        },
        address,
        city,
        state,
        postalCode,
        country,
        notes,
        createdAt: new Date().toISOString(),
      };

      store.addContact(newContact);
    }

    handleCancelClick();
  }

  function handleCancelClick() {
    navigate('..', { relative: 'path' });
  }

  const {
    dirty,
    errors,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values,
  } = useFormik<IContactForm>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return loading ? (
    <div>
      <p>Loading form...</p>
    </div>
  ) : (
    <div>
      <h1>{params.id ? `Updating: ${existingContact?.name}` : 'New Contact'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required {...getFieldProps('name')} />
            {touched.name && errors.name ? <span>{errors.name}</span> : null}
          </div>
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input type="text" id="avatar" required {...getFieldProps('avatar')} />
            {touched.avatar && errors.avatar ? <span>{errors.avatar}</span> : null}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required {...getFieldProps('email')} />
            {touched.email && errors.email ? <span>{errors.email}</span> : null}
          </div>
          <fieldset>
            <legend>Phone Numbers</legend>
            <div>
              <label htmlFor="mobilePhone">Mobile Phone:</label>
              <input
                type="tel"
                id="mobilePhone"
                placeholder="(###) ###-####"
                required
                {...getFieldProps('mobilePhone')}
              />
              {touched.mobilePhone && errors.mobilePhone ? (
                <span>{errors.mobilePhone}</span>
              ) : null}
            </div>
            <div>
              <label htmlFor="workPhone">Work Phone:</label>
              <input
                type="tel"
                id="workPhone"
                placeholder="(###) ###-####"
                {...getFieldProps('workPhone')}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Address</legend>
            <div>
              <label htmlFor="address">Street:</label>
              <input type="text" id="address" required {...getFieldProps('address')} />
              {touched.address && errors.address ? <span>{errors.address}</span> : null}
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input type="text" id="city" required {...getFieldProps('city')} />
              {touched.city && errors.city ? <span>{errors.city}</span> : null}
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input type="text" id="state" required {...getFieldProps('state')} />
              {touched.state && errors.state ? <span>{errors.state}</span> : null}
            </div>
            <div>
              <label htmlFor="postalCode">Zip:</label>
              <input
                type="text"
                id="postalCode"
                placeholder="55555"
                required
                {...getFieldProps('postalCode')}
              />
              {touched.postalCode && errors.postalCode ? (
                <span>{errors.postalCode}</span>
              ) : null}
            </div>
          </fieldset>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea id="notes" {...getFieldProps('notes')} />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting || !dirty || !isValid}>
              {params.id ? 'Update' : 'Add'} Contact
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
        <div>
          <figure>
            <img src={`/users/${values.avatar}`} alt="Avatar" />
            <figcaption>Avatar preview</figcaption>
          </figure>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
