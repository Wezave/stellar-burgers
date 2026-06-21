import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';

const ConstructorWrapper = () => {
  const { isLoading, error } = useSelector((state) => state.ingredients);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div style={{ textAlign: 'center' }}>Ошибка: {error}</div>;
  }

  return <ConstructorPage />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.backgroundLocation;

  return (
    <div>
      {/* при исп. фрагмента (заместо <div>) вылезают removeСhild error */}
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorWrapper />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />{' '}
        <Route path='/register' element={<Register />} />{' '}
        <Route path='/forgot-password' element={<ForgotPassword />} />{' '}
        <Route path='/reset-password' element={<ResetPassword />} />{' '}
        <Route path='/profile' element={<Profile />} />{' '}
        <Route path='/profile/orders' element={<ProfileOrders />} />{' '}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='title' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='title' onClose={() => {}}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='title' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />{' '}
        </Routes>
      )}
    </div>
  );
};

export default App;
