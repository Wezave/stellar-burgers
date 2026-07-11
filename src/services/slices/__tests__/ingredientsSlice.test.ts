import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('тестирование слайса ингредиентов', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'bun.png',
      image_large: 'bun_large.png',
      image_mobile: 'bun_mobile.png'
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 30,
      fat: 15,
      carbohydrates: 10,
      calories: 200,
      price: 100,
      image: 'meat.png',
      image_large: 'meat_large.png',
      image_mobile: 'meat_mobile.png'
    }
  ];

  test('возврат начального состояния для неизвестного экшена', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual(
      initialState
    );
  });

  test('обработка fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  test('обработка fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error(errorMessage), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
