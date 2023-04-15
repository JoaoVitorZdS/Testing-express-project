import { Request, Response } from "express";
import {
  TChocolate,
  TChocolateRequest,
  TChocolateSaleInformation,
  TChocolateSaleInformationRequest,
} from "../interfaces/chocolates.interfaces";
import { Query, QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";

export const createChocolate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const chocolateData: TChocolateRequest = req.body;
  const queryString: string = format(
    `
            INSERT INTO
                chocolates(%I)
            VALUES
                (%L)
                RETURNING *;
            `,
    Object.keys(chocolateData),
    Object.values(chocolateData)
  );

  const queryResult: QueryResult<TChocolate> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export const createChocolateSaleInformations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const saleInformationsData: TChocolateSaleInformationRequest = req.body;
  saleInformationsData.chocolateId = parseInt(req.params.id);

  const queryString: string = format(
    `
    INSERT INTO
         sale_information(%I)
    VALUES
          (%L)
    RETURNING *;
    `,
    Object.keys(saleInformationsData),
    Object.values(saleInformationsData)
  );

  const queryResult: QueryResult<TChocolateSaleInformation> =
    await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export const getChocolates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString: string = `
  
SELECT 
	ch."id" "chocolateId",
	ch."type",
	ch."cocoaPercentage",
	si."price",
	si."inStock"
FROM 
	chocolates ch
JOIN
	sale_information si ON ch."id" = si."chocolateId"
ORDER BY "chocolateId"; ;
  `;

  const queryResult: QueryResult<TChocolate> = await client.query(queryString);

  return res.json(queryResult.rows);
};
