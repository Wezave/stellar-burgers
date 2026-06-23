import { FC } from 'react';
import { ProfileOrdersUIProps } from './type';
import styles from './profile-orders.module.css';
import { OrdersList } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <div className={styles.orders}>
    <OrdersList orders={orders} />
  </div>
);
