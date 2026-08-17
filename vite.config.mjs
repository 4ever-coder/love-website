import { copyFileSync, cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const legacyScripts = ['config.js', 'script.js', 'bubu.svg', 'dudu.svg'];
const outDir = resolve(projectRoot, 'dist');

export default defineConfig({
  plugins: [
    {
      name: 'copy-legacy-scripts',
      closeBundle() {
        mkdirSync(outDir, { recursive: true });

        for (const file of legacyScripts) {
          copyFileSync(
            resolve(projectRoot, file),
            resolve(outDir, file),
          );
        }

        cpSync(
          resolve(projectRoot, 'assets/qixi'),
          resolve(outDir, 'assets/qixi'),
          { recursive: true },
        );

        cpSync(
          resolve(projectRoot, 'music'),
          resolve(outDir, 'music'),
          { recursive: true },
        );
      },
    },
  ],
});
