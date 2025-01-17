import { feedsActions, feedsReducer, feedsSelectors } from '@slices';
import { AppDispatch, useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { getFetchFeeds } from '@thunk';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector(feedsSelectors.selectFeeds);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFetchFeeds())
          .unwrap()
          .catch((err) => console.log(err));
      }}
    />
  );
};
