export type TChocolate = {
  id: number;
  type: string;
  weight: number;
  cocoaPercentage: number;
};

export type TChocolateRequest = Omit<TChocolate, "id">;

export type TChocolateSaleInformation = {
  id: number;
  price: number;
  inStock: number;
  chocolateId?: number | undefined | null;
};

export type TChocolateSaleInformationRequest = Omit<
  TChocolateSaleInformation,
  "id"
>;

export type TIngredientChocolateCreate = TIngredientChocolateRequest & {
  chocolateId: number;
};

export type TIngredient = {
  id: number;
  name: string;
};

export type TIngredientChocolateRequest = {
  ingredientId: Number;
  weight: number;
};
