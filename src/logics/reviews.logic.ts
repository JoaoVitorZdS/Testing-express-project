import { Request, Response } from "express";
import { TReview, TReviewRequest } from "../interfaces/reviews.interfaces";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reviewData: TReviewRequest = req.body;

  const queryString: string = format(
    `
    INSERT INTO
        reviews(%I)
    VALUES
        (%L)
    RETURNING *;
    `,
    Object.keys(reviewData),
    Object.values(reviewData)
  );

  const queryResult: QueryResult<TReview> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export const getReviewsByChocolateId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryStringData: string = `
  SELECT
        *
  FROM
        reviews
  WHERE
        "chocolateId" = $1
  `;

  const queryConfigData: QueryConfig = {
    text: queryStringData,
    values: [id],
  };

  const queryResultData: QueryResult<TReview> = await client.query(
    queryConfigData
  );

  const queryStringAvg: string = `
  SELECT 
	    ROUND(AVG(score),2) 
  FROM
	    reviews
  WHERE 
	    "chocolateId" = $1;
  `;

  const queryConfigAvg: QueryConfig = {
    text: queryStringAvg,
    values: [id],
  };

  const queryResultAvg: QueryResult = await client.query(queryConfigAvg);

  return res.json({
    average: queryResultAvg.rows[0].round,
    reviews: queryResultData.rows,
  });
};
