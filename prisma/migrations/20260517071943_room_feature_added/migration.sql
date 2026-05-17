/*
  Warnings:

  - You are about to drop the column `availability` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "availability",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "availability";

-- CreateTable
CREATE TABLE "RoomFeature" (
    "roomId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,

    CONSTRAINT "RoomFeature_pkey" PRIMARY KEY ("roomId","featureId")
);

-- AddForeignKey
ALTER TABLE "RoomFeature" ADD CONSTRAINT "RoomFeature_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomFeature" ADD CONSTRAINT "RoomFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
