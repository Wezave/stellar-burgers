import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '../../services/slices/userSlice';
import { ProfileMenuUI } from '../ui/profile-menu';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfileMenuUI pathname={location.pathname} handleLogout={handleLogout} />
  );
};
