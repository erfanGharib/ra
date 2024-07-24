import { env } from "process"
import path from "path"

export const domain = env.NODE_ENV === 'production' 
    ? env.REMOTE_CLIENT_DOMAIN
    : env.LOCAL_CLIENT_DOMAIN

export const uploadsDirPath = path.join(process.cwd(), 'uploads');
export const sqliteDbPath   = path.join(process.cwd(), '..', 'database.sql');
export const IDENTIFIERS = {
    COMMAND: 'command:',
    COMMAND_RESULT: 'command_result:',
}
