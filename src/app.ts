import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createChocolate,
  createChocolateSaleInformations,
  getChocolates,
  updateChocolateSaleInformation,
} from "./logics/chocolates.logics";
import { ensureChocolateExists } from "./middlewares/chocolates.middlewares";
import { createReview, getReviewsByChocolateId } from "./logics/reviews.logic";

const app: Application = express();
app.use(express.json());

app.post("/chocolates", createChocolate);
app.post(
  "/chocolates/:id/sale_informations",
  ensureChocolateExists,
  createChocolateSaleInformations
);
app.get("/chocolates", getChocolates);
app.patch(
  "/chocolates/:id/sale_information",
  ensureChocolateExists,
  updateChocolateSaleInformation
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
