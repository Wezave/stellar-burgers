import { RefObject } from 'react';
import { TIngredient } from '@utils-types';

export type TIngredientWithCount = TIngredient & { count: number };

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
  ingredients: TIngredientWithCount[];
};
