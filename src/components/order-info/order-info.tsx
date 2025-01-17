import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { feedsSelectors, ingredientSelectors, orderSelectors } from '@slices';
import { AppDispatch, useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '@thunk';

export const OrderInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const ingredients = useSelector(ingredientSelectors.selectIngredients);

  // const orderDataLocal = useSelector((state) =>
  //   feedsSelectors.selectFeedsByNumber(state, Number(number))
  // );

  const orderData = useSelector(orderSelectors.selectOrderByNumber);
  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)))
      .unwrap()
      .catch((err) => console.log(err));
  }, [dispatch]);

  /* Готовим данные для отображения */

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
