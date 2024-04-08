/*
  Warnings:

  - You are about to drop the column `eventId` on the `rsvp_status` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `rsvp_status` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rsvp_status` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "rsvp_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "rSVP_StatusId" INTEGER NOT NULL,
    CONSTRAINT "rsvp_list_rSVP_StatusId_fkey" FOREIGN KEY ("rSVP_StatusId") REFERENCES "rsvp_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rsvp_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rsvp_list_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rsvp_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL DEFAULT 'UNANSWERED'
);
INSERT INTO "new_rsvp_status" ("id") SELECT "id" FROM "rsvp_status";
DROP TABLE "rsvp_status";
ALTER TABLE "new_rsvp_status" RENAME TO "rsvp_status";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
