// Runtime room state is stored as one JSON document per room.
// The production schema is owned by drizzle/0000_whisker_rooms.sql.
export type RoomRow = {
  code: string;
  data: string;
  updated_at: number;
};
