import { Modal } from '@components';
import { orderSelectors } from '@slices';
import { AppDispatch, useDispatch, useSelector } from '@store';
import { fetchOrders } from '@thunk';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector(orderSelectors.selectOrders);

  useEffect(() => {
    dispatch(fetchOrders()).catch((err) => console.log(err));
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
