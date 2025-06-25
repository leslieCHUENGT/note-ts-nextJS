import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
});

export interface IData {
  title: string;
  content: string;
  updateTime: string;
}

export type Note = {
  [key: string]: string;
};

const initialData: Note = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes() {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

export async function addNote(data: IData) {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, JSON.stringify(data));
  return uuid;
}

export async function updateNote(uuid: string, data: IData) {
  await redis.hset("notes", uuid, JSON.stringify(data));
}

export async function getNote(uuid: string) {
  return JSON.parse((await redis.hget("notes", uuid)) || "null");
}

export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid);
}

export default redis;
