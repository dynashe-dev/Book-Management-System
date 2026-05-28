/*
  Warnings:

  - A unique constraint covering the columns `[Isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_Isbn_key" ON "Book"("Isbn");
