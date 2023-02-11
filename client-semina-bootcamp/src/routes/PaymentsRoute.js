import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/payment';
import Create from '../pages/payment/create'
import Edit from '../pages/payment/edit'
export function PaymentsRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:paymentId' element={<Edit />} />
    </Routes>
  );
}