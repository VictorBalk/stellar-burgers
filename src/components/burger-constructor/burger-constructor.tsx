import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, useDispatch, useSelector } from '@store';
import {
  authSelectors,
  burgerAction,
  burgerSelectors,
  orderActions,
  orderSelectors
} from '@slices';
import { createOrder } from '@thunk';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(burgerSelectors.selectAll);

  const { isOrderRequest, orderModalData } = useSelector(
    orderSelectors.selectAll
  );
  const isAuth = useSelector(authSelectors.selectIsAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || isOrderRequest) return;

    if (!isAuth) {
      return navigate('/login', { state: { from: '/' } });
    }

    const postData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(postData))
      .unwrap()
      .catch((err) => console.log(err));
  };
  const closeOrderModal = () => {
    dispatch(burgerAction.clearIngredient());
    dispatch(orderActions.clearModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isOrderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
