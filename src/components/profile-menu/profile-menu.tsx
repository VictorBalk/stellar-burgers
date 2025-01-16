import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch, useDispatch } from '@store';
import { logoutUserAuth } from '@thunk';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUserAuth())
      .unwrap()
      .catch((err) => console.log(err));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
