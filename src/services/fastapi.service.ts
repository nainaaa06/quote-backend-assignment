export const analyzeQuote = async (quoteId: number) => {
  return {
    risk: "Medium",
    confidence: 91,
    missing_items: [
      "Structural drawings",
      "Load requirements"
    ]
  };
};