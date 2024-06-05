import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import useStore from '@/store';

const MainLayout: FC = () => {
  const store = useStore();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    store.loadContacts().then(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        {loaded ? <Outlet /> : <p>Loading...</p>}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
