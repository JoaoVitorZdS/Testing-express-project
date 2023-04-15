import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createChocolate,
  createChocolateSaleInformations,
  getChocolates,
} from "./logics/chocolates.logics";
import { ensureChocolateExists } from "./middlewares/chocolates.middlewares";

const app: Application = express();
app.use(express.json());

app.post("/chocolates", createChocolate);
app.post(
  "/chocolates/:id/sale_informations",
  ensureChocolateExists,
  createChocolateSaleInformations
);
app.get("/chocolates", getChocolates);

app.post("/reviews", getChocolates);
app.get("/reviews/chocolates:id", getChocolates);

app.listen(3000, async () => {
  await startDatabase();
  console.log("server is running");
});
