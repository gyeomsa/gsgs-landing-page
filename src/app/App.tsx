import { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router';

import HomePages from '@/pages/HomePages';
import PreregistrationPage from '@/pages/PreregistrationPage';

import { pageview } from '@/lib/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/preregistration" element={<PreregistrationPage />} />
    </Routes>
  );
}

export default App;
