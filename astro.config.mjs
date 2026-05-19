import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://alexp-codelab.github.io',
  integrations: [tailwind({ applyBaseStyles: false })],
});
