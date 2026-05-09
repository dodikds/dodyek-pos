import logo from './logo.svg';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
