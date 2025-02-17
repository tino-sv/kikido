-- CreateTable
CREATE TABLE "Todo" (
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "importanceLevel" TEXT NOT NULL DEFAULT 'LOW'
);
