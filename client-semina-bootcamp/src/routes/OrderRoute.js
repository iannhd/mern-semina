import { Route, Routes } from 'react-router-dom';

import Order from '../pages/orders';


export function OrdersRoute() {
  return (
    <Routes>
      <Route path='/' element={<Order />} />
    </Routes>
  );
}