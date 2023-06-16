/*
  Warnings:

  - Changed the type of `type` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `port` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dependency` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ambient` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "port",
ADD COLUMN     "port" TEXT NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" TEXT NOT NULL,
DROP COLUMN "dependency",
ADD COLUMN     "dependency" TEXT NOT NULL,
DROP COLUMN "ambient",
ADD COLUMN     "ambient" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PetAge";

-- DropEnum
DROP TYPE "PetAmbient";

-- DropEnum
DROP TYPE "PetDependency";

-- DropEnum
DROP TYPE "PetEnergyLevel";

-- DropEnum
DROP TYPE "PetPort";

-- DropEnum
DROP TYPE "PetType";
