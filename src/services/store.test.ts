import store, { rootReducer } from '@store';

test('Вызов rootReducer с undefined состоянием и Action, который не обрабатывается', () => {
  const storeCurrentState = store.getState();

  const resultState = rootReducer(storeCurrentState, {
    type: 'UNKNOWN_ACTION'
  });

  expect(
    resultState,
    'Проверка на равество начального и текущего состояния'
  ).toEqual(storeCurrentState);
});
