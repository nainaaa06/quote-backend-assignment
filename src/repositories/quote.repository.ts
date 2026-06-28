import prisma from "../lib/prisma";

export const createQuote = async (
  customer: string,
  project: string,
  estimated_value: number
) => {
  return await prisma.quoteRequest.create({
    data: {
      customer,
      project,
      estimated_value,
      status: "New",
    },
  });
};

export const getAllQuotes = async (search?: string) => {
  return await prisma.quoteRequest.findMany({
    where: search
      ? {
          OR: [
            {
              customer: {
                contains: search,
              },
            },
            {
              project: {
                contains: search,
              },
            },
          ],
        }
      : {},
    include: {
      analysisResult: true,
    },
  });
};

export const getQuoteById = async (id: number) => {
  return await prisma.quoteRequest.findUnique({
    where: {
      id,
    },
    include: {
      analysisResult: true,
    },
  });
};

export const updateQuoteStatus = async (
  id: number,
  status: string
) => {
  return await prisma.quoteRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const createAnalysis = async (
  quoteId: number,
  risk: string,
  confidence: number,
  missingItems: string
) => {
  return await prisma.analysisResult.create({
    data: {
      quote_id: quoteId,
      risk,
      confidence,
      missing_items: missingItems,
    },
  });
};