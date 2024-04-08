/*
  Warnings:

  - You are about to drop the column `label` on the `rsvp_status` table. All the data in the column will be lost.
  - Added the required column `status` to the `rsvp_status` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rsvp_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "rsvp_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rsvp_status_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rsvp_status" ("eventId", "id", "userId") SELECT "eventId", "id", "userId" FROM "rsvp_status";
DROP TABLE "rsvp_status";
ALTER TABLE "new_rsvp_status" RENAME TO "rsvp_status";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
