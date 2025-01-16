import { authSelectors } from '@slices';
import { Preloader } from '@ui';
import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isCheck = useSelector(authSelectors.selectIsCheck);
  const isAuth = useSelector(authSelectors.selectIsAuth);
  const location = useLocation();

  if (isCheck) {
    return <Preloader />;
  }

  if (isAuth && onlyUnAuth) {
    const path = location.state?.from || { pathname: '/profile' };
    return <Navigate replace={Boolean(true)} to={path} />;
  }

  if (!isAuth && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
