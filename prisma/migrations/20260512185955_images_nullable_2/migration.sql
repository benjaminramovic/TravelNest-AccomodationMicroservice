-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
