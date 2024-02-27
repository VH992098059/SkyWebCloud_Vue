import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {TDesignResolver} from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        chunkSizeWarningLimit:1500,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {

                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },
  plugins: [
      vue(),
      AutoImport({
          resolvers: [TDesignResolver({
              library: 'vue-next'
          })],
      }),
      Components({
          resolvers: [TDesignResolver({
              library: 'vue-next'
          })],
      }),

  ],
    server:{
        host: '0.0.0.0',
        proxy:{
            "/webpan":{
                target:"http://localhost:18000/",
                changeOrigin: true,
                rewrite: (path) => path.replace("/webpan", ""),
            }
        }
    }
})
