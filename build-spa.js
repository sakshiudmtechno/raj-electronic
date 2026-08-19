import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

async function runSpaBuild() {
  console.log('🚀 Building standalone client SPA for static hosting...');
  
  await build({
    configFile: false,
    root: process.cwd(),
    plugins: [
      tailwindcss(),
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src')
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  });

  // Ensure logo, favicon and .htaccess are in dist
  const logoSrc = path.resolve(process.cwd(), 'public/raj-traders-rt-logo.png');
  const logoDist = path.resolve(process.cwd(), 'dist/raj-traders-rt-logo.png');
  const favDist = path.resolve(process.cwd(), 'dist/favicon.ico');
  
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDist);
    fs.copyFileSync(logoSrc, favDist);
  }

  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>\n`;

  fs.writeFileSync(path.resolve(process.cwd(), 'dist/.htaccess'), htaccessContent);
  console.log('✅ Standalone SPA Build successfully generated in dist/!');
}

runSpaBuild().catch(err => {
  console.error('Build SPA error:', err);
  process.exit(1);
});
