import { Attendees } from './pages/Attendees/Attendees';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { UserContextWrapper } from './contexts/UserContextWrapper';

function App() {

  return (
    <UserContextWrapper>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Attendees />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </UserContextWrapper>
  );
}

export default App;
 