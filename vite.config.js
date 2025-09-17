import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        define: {
            __APP_ENV__: JSON.stringify(env['APP_ENV'] ?? ''),
            __APP_VERSION__: JSON.stringify(env['npm_package_version'] ?? '0.0.0')
        }
    };
});
