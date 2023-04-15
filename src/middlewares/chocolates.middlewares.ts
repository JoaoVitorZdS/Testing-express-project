import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { TChocolate } from "../interfaces/chocolates.interfaces";
import { client } from "../database";

export const ensureChocolateExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);

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
