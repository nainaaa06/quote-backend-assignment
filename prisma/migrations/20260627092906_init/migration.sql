-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "estimated_value" REAL NOT NULL,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote_id" INTEGER NOT NULL,
    "risk" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "missing_items" TEXT NOT NULL,
    "analyzed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalysisResult_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "QuoteRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisResult_quote_id_key" ON "AnalysisResult"("quote_id");
