declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            DB_NAME: string
            DB_USER: string;
            DB_PORT: string;
            DB_PASSWORD: string;
            SECRET_KEY: string;
            REMOTE_CLIENT_DOMAIN: string
            LOCAL_CLIENT_DOMAIN: string
            PORT: string;
            NODE_ENV: 'development' | 'production'
        }
    }
}

export { };