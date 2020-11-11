import dotenv from "dotenv";
import knexLib from "knex";

import knexfile from "../../knexfile";
import { NodeEnv } from "../types/types";

dotenv.config();

type Key = keyof typeof knexfile;
const NodeEnv = process.env.NODE_ENV as NodeEnv;
const env: Key = NodeEnv ?? "development";

export const knex = knexLib(knexfile[env]);
