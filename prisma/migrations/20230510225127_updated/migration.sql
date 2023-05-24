/*
  Warnings:

  - You are about to drop the column `gyn_id` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the `gyns` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gym_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gyn_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "gyn_id",
ADD COLUMN     "gym_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "gyns";

-- CreateTable
CREATE TABLE "gyms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "tatitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
