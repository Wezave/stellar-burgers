// src/components/app-header/app-header.tsx
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../../services/store';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeaderUI: FC = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user?.name || '';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {({ isActive }) => (
              <span className={styles.link_content}>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </span>
              </span>
            )}
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {({ isActive }) => (
              <span className={styles.link_content}>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </span>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          {userName ? (
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link
              }
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className='text text_type_main-default ml-2'>{userName}</p>
                </>
              )}
            </NavLink>
          ) : (
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link
              }
            >
              {({ isActive }) => (
                <span className={styles.link_content}>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className='text text_type_main-default ml-2'>
                    Личный кабиент
                  </p>
                </span>
              )}
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
