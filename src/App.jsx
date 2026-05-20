import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CustomerMenu from './pages/CustomerMenu';
import OrderTracking from './pages/OrderTracking';
import StaffDashboard from './pages/StaffDashboard';
import AdminAnalytics from './pages/AdminAnalytics';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/menu" element={<CustomerMenu />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/dashboard" element={<StaffDashboard />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
