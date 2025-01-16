import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { authSelectors } from '@slices';

export const AppHeader: FC = () => {
  const { name } = useSelector(authSelectors.selectUser);
  return <AppHeaderUI userName={name} />;
};
