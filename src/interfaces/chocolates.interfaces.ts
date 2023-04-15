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
  chocolateId?: number;
};

export type TChocolateSaleInformationRequest = Omit<
  TChocolateSaleInformation,
  "id"
>;
