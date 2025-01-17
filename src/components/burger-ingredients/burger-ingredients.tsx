import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TabMode, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '@store';
import { ingredientSelectors } from '@slices';
import { TIngredient } from '@utils-types';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const ingredients = useSelector(ingredientSelectors.selectIngredients);
  const buns: TIngredient[] = [];
  const mains: TIngredient[] = [];
  const sauces: TIngredient[] = [];

  ingredients.forEach((element) => {
    switch (element.type) {
      case TabMode.bun:
        buns.push(element);
        break;
      case TabMode.main:
        mains.push(element);
        break;
      case TabMode.sauce:
        sauces.push(element);
        break;

      default:
        break;
    }
  });

  const [currentTab, setCurrentTab] = useState<TTabMode>(TabMode.bun);
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab(TabMode.bun);
    } else if (inViewSauces) {
      setCurrentTab(TabMode.sauce);
    } else if (inViewFilling) {
      setCurrentTab(TabMode.main);
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === TabMode.bun)
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === TabMode.main)
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === TabMode.sauce)
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
