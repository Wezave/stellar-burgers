import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  clearOrderModal,
  createOrder,
  initialState
} from '../burgerConstructorSlice';
import { TIngredient, TOrder } from '@utils-types';

describe('тестирование слайса конструктора бургера', () => {
  const mockBun: TIngredient = {
    _id: 'bun1',
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
  };

  const mockIngredient: TIngredient = {
    _id: 'ing1',
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
  };

  test('возврат начального состояния для неизвестного экшена', () => {
    expect(burgerConstructorReducer(undefined, { type: 'UNKNOWN' })).toEqual(
      initialState
    );
  });

  describe('добавление ингредиентов', () => {
    test('добавление булки', () => {
      const state = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );
      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toHaveLength(0);
    });

    test('добавление не-булки', () => {
      const payload = { ...mockIngredient, id: 'unique-id-2' };
      const state = burgerConstructorReducer(
        initialState,
        addIngredient(payload as any)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        _id: mockIngredient._id,
        name: mockIngredient.name,
        type: mockIngredient.type,
        proteins: mockIngredient.proteins,
        fat: mockIngredient.fat,
        carbohydrates: mockIngredient.carbohydrates,
        calories: mockIngredient.calories,
        price: mockIngredient.price,
        image: mockIngredient.image,
        image_large: mockIngredient.image_large,
        image_mobile: mockIngredient.image_mobile
      });
      expect(state.ingredients[0]).toHaveProperty('id');
      expect(typeof state.ingredients[0].id).toBe('string');
      expect(state.bun).toBe(null);
    });
  });

  test('удаление ингредиента по индексу', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };
    const newState = burgerConstructorReducer(
      stateWithIngredients,
      removeIngredient(0)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('2');
  });

  test('перемещение ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' },
        { ...mockIngredient, id: '3' }
      ]
    };
    const newState = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredient({ from: 0, to: 2 })
    );
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('3');
    expect(newState.ingredients[2].id).toBe('1');
  });

  test('очистка конструктора', () => {
    const stateWithData = {
      ...initialState,
      bun: mockBun,
      ingredients: [{ ...mockIngredient, id: '1' }]
    };
    const newState = burgerConstructorReducer(
      stateWithData,
      clearConstructor()
    );
    expect(newState.bun).toBe(null);
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.order).toBe(null);
    expect(newState.orderModalData).toBe(null);
  });

  test('очистка данных модального окна заказа', () => {
    const stateWithModal = {
      ...initialState,
      orderModalData: { number: 12345 } as any
    };
    const newState = burgerConstructorReducer(
      stateWithModal,
      clearOrderModal()
    );
    expect(newState.orderModalData).toBe(null);
  });

  describe('асинхронный экшен createOrder', () => {
    const mockOrder: TOrder = {
      _id: 'order1',
      status: 'done',
      name: 'Фирменный бургер',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: []
    };

    test('установка состояния загрузки при pending', () => {
      const state = burgerConstructorReducer(
        initialState,
        createOrder.pending('', [])
      );
      expect(state.isLoading).toBe(true);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBe(null);
    });

    test('обработка успешного создания заказа (fulfilled)', () => {
      const stateWithData = {
        ...initialState,
        bun: mockBun,
        ingredients: [{ ...mockIngredient, id: '1' }]
      };
      const newState = burgerConstructorReducer(
        stateWithData,
        createOrder.fulfilled(mockOrder, '', [])
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrder);
      expect(newState.bun).toBe(null);
      expect(newState.ingredients).toHaveLength(0);
    });

    test('обработка ошибки при создании заказа (rejected)', () => {
      const errorMessage = 'Ошибка создания заказа';
      const state = burgerConstructorReducer(
        initialState,
        createOrder.rejected(new Error(errorMessage), '', [])
      );
      expect(state.isLoading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
