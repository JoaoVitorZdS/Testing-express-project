import { Request, Response } from "express";
import {
  TChocolate,
  TChocolateRequest,
  TChocolateSaleInformation,
  TChocolateSaleInformationRequest,
} from "../interfaces/chocolates.interfaces";
import { QueryConfig, QueryResult } from "pg";
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
LEFT JOIN
	sale_information si ON ch."id" = si."chocolateId"
ORDER BY "chocolateId"; ;
  `;

  const queryResult: QueryResult<TChocolate> = await client.query(queryString);

  return res.json(queryResult.rows);
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

export const updateChocolateSaleInformation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const saleInformationsData: Partial<TChocolateSaleInformationRequest> =
    req.body;

  if (saleInformationsData.chocolateId) {
    delete saleInformationsData.chocolateId;
  }

  const queryString: string = format(
    `
    UPDATE 
	    sale_information 
    SET(%I) = ROW (%L)
    WHERE 
	    "chocolateId" = $1 
    RETURNING *;
    `,
    Object.keys(saleInformationsData),
    Object.values(saleInformationsData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TChocolate> = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};
