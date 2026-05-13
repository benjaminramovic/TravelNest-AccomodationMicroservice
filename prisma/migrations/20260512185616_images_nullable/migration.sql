-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_accommodationId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "accommodationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
