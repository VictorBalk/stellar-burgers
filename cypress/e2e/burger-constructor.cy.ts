import { setTokens } from '@api';

const selectorModal = `[data-cy='modal']`;
const selectorModalOverlay = `[data-cy='modal-overlay`;
const selectConstructor = `[data-cy='constructor']`;
const selectorIngredientsBun = `[data-cy='ingredients-bun']`;
const selectorIngredientsMains = `[data-cy='ingredients-mains']`;
const textButtonAddIngredient = 'Добавить';

describe('Проверка Логики ингредиентов', () => {
  beforeEach(() => {
    // Перехват запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'auth-user' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order-response' });
    cy.intercept('GET', 'api/orders/all', { fixture: 'orders' });

    cy.visit('/');
    setTokens('accessToken', 'refreshToken');
  });

  afterEach(() => {
    cy.visit('/');
    setTokens('', '');
  });

  it('Добавление булки из списка ингредиентов в конструктор', () => {
    //Добавляем булку
    cy.get(selectorIngredientsBun).contains(textButtonAddIngredient).click();
    //Проверяем наличие булки сверху
    cy.get(`[data-cy='constructor-bun-top']`).contains('Булка');
    //Проверяем наличие булки снизу
    cy.get(`[data-cy='constructor-bun-bottom']`).contains('Булка');
  });

  it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    cy.get(selectorIngredientsMains).contains(textButtonAddIngredient).click();
    cy.get(`[data-cy='constructor-ingredients']`).contains('Начинка 1');
  });

  it('Открытие и закрытие модального окна с описанием ингредиента ', () => {
    //Открываем окно
    cy.get(selectorIngredientsBun).find('img').click();
    //Проверяем что окно открыто
    cy.get(selectorModal).should('exist');

    //Проверка калорий
    cy.get(`[data-cy='ingredient-details-calories']`).contains('420');
    //Проверка белков
    cy.get(`[data-cy='ingredient-details-proteins']`).contains('80');
    //Проверка Жиров
    cy.get(`[data-cy='ingredient-details-fat']`).contains('24');
    //Проверка Углеводов
    cy.get(`[data-cy='ingredient-details-carbohydrates']`).contains('53');

    //Закрываем окно через кнопку
    cy.get(`[data-cy='modal-btnClose']`).click();
    //Проверяем, что окно закрылось
    cy.get(selectorModal).should('not.exist');

    //Открываем окно
    cy.get(selectorIngredientsBun).find('img').click();
    //Проверяем что окно открыто
    cy.get(selectorModal).should('exist');

    //Закрываем окно через нажатие на область вне модального окна
    cy.get(selectorModalOverlay).click({ force: true });
    //Проверяем, что окно закрылось
    cy.get(selectorModal).should('not.exist');
  });
});

describe('Процесс создания заказа', () => {
  beforeEach(() => {
    // Перехваты запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'auth-user' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order-response' });
    cy.intercept('GET', 'api/orders/all', { fixture: 'orders' });

    cy.visit('/');
    setTokens('accessToken', 'refreshToken');
  });

  afterEach(() => {
    cy.visit('/');
    setTokens('', '');
  });

  it('Создание заказа', () => {
    //Добавляем Булки
    cy.get(selectorIngredientsBun).contains(textButtonAddIngredient).click();
    //Добавляем Начинки
    cy.get(selectorIngredientsMains).contains(textButtonAddIngredient).click();
    //Добавляем Соусы
    cy.get(`[data-cy='ingredients-sauces']`)
      .contains(textButtonAddIngredient)
      .click();
    //Перехватываем запрос создания заказа
    cy.intercept('POST', 'api/orders').as('createOrder');
    //Ищем кнопку оформления заказа
    cy.get(`[data-cy='constructor-total']`).contains('Оформить заказ').click();
    // Проверим отправленные ингредиенты
    cy.wait('@createOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });
    //Проверяем номер заказа в модальном окне
    cy.get(`[data-cy='order-number']`).contains('4536').should('exist');

    //Закрываем окно через нажатие на область вне модального окна
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    //Проверяем, что окно закрылось
    cy.get(selectorModal).should('not.exist');

    //Проверяем отсутствие булки в конструкторе
    cy.get(selectConstructor).contains('Булка').should('not.exist');
    //Проверяем отсутствие начинки
    cy.get(selectConstructor).contains('Начинка 1').should('not.exist');
    //Проверяем отсутствие соуса
    cy.get(selectConstructor).contains('Соус 1').should('not.exist');
  });
});
