import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import useStore from '@/store';
import styles from './MainLayout.module.css';

const MainLayout: FC = () => {
  const store = useStore();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    store.loadContacts().then(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main>{loaded ? <Outlet /> : <p>Loading...</p>}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
