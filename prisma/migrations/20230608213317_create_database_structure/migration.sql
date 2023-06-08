-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORG', 'ADMIN');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('CUB', 'ADULT', 'ELDER');

-- CreateEnum
CREATE TYPE "PetPort" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetDependency" AS ENUM ('SMALL', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetAmbient" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "type" "PetType" NOT NULL,
    "age" "PetAge" NOT NULL,
    "port" "PetPort" NOT NULL,
    "energy" "PetEnergyLevel" NOT NULL,
    "dependency" "PetDependency" NOT NULL,
    "ambient" "PetAmbient" NOT NULL,
    "adoption_requirements" TEXT[],
    "pictures" TEXT[],
    "org_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'ORG'
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_key" ON "pets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_id_key" ON "orgs"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
