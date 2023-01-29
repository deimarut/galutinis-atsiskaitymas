import { Attendees } from './pages/Attendees/Attendees';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Login } from './pages/Login/Login';
import { useState } from 'react';


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<PageLayout user={user} />}>
          <Route index element={<Attendees />} />
        </Route>
        <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />} />
      </Routes>
    </div>
  );
}

export default App;
 