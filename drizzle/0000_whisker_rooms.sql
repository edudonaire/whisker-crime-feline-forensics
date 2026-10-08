CREATE TABLE `rooms` (
  `code` text PRIMARY KEY NOT NULL,
  `data` text NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE INDEX `idx_rooms_updated_at` ON `rooms` (`updated_at`);

PRAGMA optimize;
