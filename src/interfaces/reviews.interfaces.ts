export type TReview = {
  id: number;
  score: number;
  comment: string;
  chocolateId: number;
};

export type TReviewRequest = Omit<TReview, "id">;
