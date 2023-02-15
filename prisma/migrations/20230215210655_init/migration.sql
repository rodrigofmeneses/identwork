-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "war_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "admission_date" DATETIME NOT NULL,
    "print" BOOLEAN NOT NULL DEFAULT true,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "Employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
