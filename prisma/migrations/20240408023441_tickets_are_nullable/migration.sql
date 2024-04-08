-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "tickets" TEXT
);
INSERT INTO "new_events" ("date", "description", "id", "slug", "tickets", "title") SELECT "date", "description", "id", "slug", "tickets", "title" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
