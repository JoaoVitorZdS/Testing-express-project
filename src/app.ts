import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createChocolate,
  createChocolateSaleInformations,
  createIngredientToChocolate,
  deleteIngredientFromChocolate,
  getChocolates,
  updateChocolateSaleInformation,
} from "./logics/chocolates.logics";
import {
  ensureChocolateExists,
  ensureIngredientExists,
} from "./middlewares/chocolates.middlewares";
import { createReview, getReviewsByChocolateId } from "./logics/reviews.logic";

const app: Application = express();
app.use(express.json());

app.post("/chocolates", createChocolate);
app.get("/chocolates", getChocolates);

app.post(
  "/chocolates/:id/sale_informations",
  ensureChocolateExists,
  createChocolateSaleInformations
);
app.patch(
  "/chocolates/:id/sale_information",
  ensureChocolateExists,
  updateChocolateSaleInformation
);

app.post(
  "/chocolates/:id/ingredients",
  ensureChocolateExists,
  ensureIngredientExists,
  createIngredientToChocolate
);

app.delete(
  "/chocolates/:id/ingredients/:ingredientId",
  ensureChocolateExists,
  ensureIngredientExists,
  deleteIngredientFromChocolate
);

app.post("/reviews", ensureChocolateExists, createReview);
app.get(
  "/reviews/chocolates/:id",
  ensureChocolateExists,
  getReviewsByChocolateId
);

app.listen(3000, async () => {
  await startDatabase();
  console.log("server is running");
});
