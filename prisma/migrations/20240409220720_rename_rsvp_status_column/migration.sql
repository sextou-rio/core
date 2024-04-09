/*
  Warnings:

  - You are about to drop the column `rSVP_StatusId` on the `rsvp_list` table. All the data in the column will be lost.
  - Added the required column `rsvp_status` to the `rsvp_list` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rsvp_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "rsvp_status" INTEGER NOT NULL,
    CONSTRAINT "rsvp_list_rsvp_status_fkey" FOREIGN KEY ("rsvp_status") REFERENCES "rsvp_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rsvp_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rsvp_list_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rsvp_list" ("eventId", "id", "userId") SELECT "eventId", "id", "userId" FROM "rsvp_list";
DROP TABLE "rsvp_list";
ALTER TABLE "new_rsvp_list" RENAME TO "rsvp_list";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
