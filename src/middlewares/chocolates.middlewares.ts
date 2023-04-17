import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TChocolate, TIngredient } from "../interfaces/chocolates.interfaces";
import { client } from "../database";

export const ensureChocolateExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let id = parseInt(req.params.id);

  if (req.route.path === "/reviews" && req.method === "POST") {
    id = req.body.chocolateId;
  }
  const queryString: string = `
  SELECT
        *
  FROM
        chocolates
  WHERE
    id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TChocolate> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Chocolate not found!",
    });
  }
  res.locals.chocolate = queryResult.rows[0];

  return next();
};

export const ensureIngredientExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let ingredientId: number = req.body.ingredientId;

  if (req.route.path === "/chocolates/:id/ingredients/:ingredientId") {
    ingredientId = parseInt(req.params.ingredientId);
  }

  const queryString: string = `
    SELECT
        *
    FROM
      ingredients
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [ingredientId],
  };

  const queryResult: QueryResult<TIngredient> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Ingredients not found!",
    });
  }
  return next();
};
