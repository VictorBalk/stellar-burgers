import { TabMode, TConstructorIngredient, TIngredient } from '@utils-types';
import { burgerAction, burgerReducer } from '@slices';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: TabMode.bun,
    proteins: 80,
    fat: 1255,
    carbohydrates: 53,
    calories: 420,
    price: 12255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: TabMode.main,
    proteins: 80,
    fat: 155,
    carbohydrates: 3,
    calories: 2000,
    price: 255,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  },
  {
    _id: '3',
    name: 'Соус Spicy-X',
    type: TabMode.sauce,
    proteins: 40,
    fat: 15,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02.png'
  }
];

describe('Тесты, проверяющие работу burgerReducer', () => {
  test('Добавление булки', () => {
    const ingredients: TConstructorIngredient[] = [];
    const bun = mockIngredients[0];
    const newState = burgerReducer(
      { bun: null, ingredients: ingredients },
      burgerAction.addIngredient(bun)
    );

    expect(
      newState.ingredients,
      'Проверка на не изменность ингридиентов при добалвении булки'
    ).toEqual(ingredients);

    expect(
      newState.bun?._id,
      'Проверка на то, что добавилась именно поданная булка '
    ).toEqual(bun._id);
  });

  test('Добавление ингридента', () => {
    const ingredient = mockIngredients[1];
    const bun = null;
    const newState = burgerReducer(
      { bun: bun, ingredients: [] },
      burgerAction.addIngredient(ingredient)
    );

    expect(
      newState.bun,
      'Проверка на не изменность булки при добалвении ингридента'
    ).toEqual(bun);

    expect(
      newState.ingredients[0]?._id,
      'Проверка на то, что добавился именно поданный ингрилиент '
    ).toEqual(ingredient._id);
  });

  test('Удаление ингридиента', () => {
    const ingredient: TConstructorIngredient[] = [
      { ...mockIngredients[1], id: mockIngredients[1]._id.toString() }
    ];

    const bun = {
      ...mockIngredients[0],
      id: mockIngredients[0]._id.toString()
    };
    const newState = burgerReducer(
      { bun: bun, ingredients: ingredient },
      burgerAction.removeIngredient(0)
    );

    expect(
      newState.bun,
      'Проверка на не изменность булки при удаление ингридента'
    ).toEqual(bun);

    expect(
      newState.ingredients,
      'Проверка на то, что ингридиент удалился'
    ).toHaveLength(0);
  });
});

