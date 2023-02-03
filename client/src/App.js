import { Attendees } from './pages/Attendees/Attendees';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { UserContext } from './contexts/UserContextWrapper';
import { NotFound } from './pages/NotFound/NotFound';
import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';

function App() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, email } = data;
          setUser({ id, email });
          navigate('/');
        }
      });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Attendees />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
 