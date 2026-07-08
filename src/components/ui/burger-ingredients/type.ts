import { RefObject } from 'react';
import { TIngredient, TTabMode } from '@utils-types';

export type TIngredientWithCount = TIngredient & { count: number };

export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  buns: TIngredientWithCount[];
  mains: TIngredientWithCount[];
  sauces: TIngredientWithCount[];
  titleBunRef: RefObject<HTMLHeadingElement>;
  titleMainRef: RefObject<HTMLHeadingElement>;
  titleSaucesRef: RefObject<HTMLHeadingElement>;
  bunsRef: (node?: Element | null | undefined) => void;
  mainsRef: (node?: Element | null | undefined) => void;
  saucesRef: (node?: Element | null | undefined) => void;
  onTabClick: (val: string) => void;
};
