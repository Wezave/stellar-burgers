import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TIngredient, TOrder } from '../../utils/types';

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  order: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [removed] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, removed);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.order = null;
      state.orderModalData = null;
    },
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload as unknown as TOrder;
        state.orderModalData = action.payload as unknown as TOrder;
        state.orderRequest = false;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  clearOrderModal
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
