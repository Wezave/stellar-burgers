import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(
    (state) => state.profileOrders
  );

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading) return <Preloader />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ProfileUI>
      <ProfileOrdersUI orders={orders} />
    </ProfileUI>
  );
};
