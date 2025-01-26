import { TabMode, TIngredient } from '@utils-types';
import { ingredientsState, ingredientReducer } from '@slices';
import { fetchIngredient } from '@thunk';

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

const initialState: ingredientsState = {
  isLoading: true,
  ingredients: [] as TIngredient[],
  error: null
};

describe('Тесты, проверяющие работу ingredientReducer', () => {
  test('При начале запроса', () => {
    const newState = ingredientReducer(
      initialState,
      fetchIngredient.pending('pending')
    );
    expect(newState.error, 'Проверка на ошибки').toBeNull();
    expect(newState.isLoading, 'Запрос в ожидании ответа').toBeTruthy();
  });

  test('При успешном выполнении запроса', () => {
    const newState = ingredientReducer(
      initialState,
      fetchIngredient.fulfilled(mockIngredients, 'fulfilled')
    );
    expect(newState.error, 'Проверка на ошибки').toBeNull();
    expect(newState.isLoading, 'Запрос завершился').toBeFalsy();
    expect(newState.ingredients, 'Проверка полученных ингредиентов').toEqual(
      mockIngredients
    );
  });

  test('При ошибки запроса', () => {
    const errorText = 'Ошибка запроса код: 403';
    const newState = ingredientReducer(
      initialState,
      fetchIngredient.rejected(new Error(errorText), 'fulfilled')
    );
    expect(newState.isLoading, 'Запрос завершился').toBeFalsy();
    expect(newState.error?.message, 'Проверка текста ошибки').toEqual(
      errorText
    );
  });
});
