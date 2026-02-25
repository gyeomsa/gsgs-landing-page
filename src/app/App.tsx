import { Route, Routes } from 'react-router';

import HomePages from '@/pages/HomePages';
import PreregistrationPage from '@/pages/PreregistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/preregistration" element={<PreregistrationPage />} />
    </Routes>
  );
}

export default App;
