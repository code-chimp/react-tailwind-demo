import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import About from './screens/About';
import ContactDetail from './screens/Contacts/ContactDetail';
import ContactForm from './screens/Contacts/ContactForm';
import Contacts from './screens/Contacts';
import FourOhFour from './screens/FourOhFour';
import Home from './screens/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'contacts',
        children: [
          { index: true, element: <Contacts /> },
          { path: 'new', element: <ContactForm /> },
          { path: ':id/edit', element: <ContactForm /> },
          { path: ':id', element: <ContactDetail /> },
        ],
      },
      { path: '*', element: <FourOhFour /> },
    ],
  },
]);

export default router;
