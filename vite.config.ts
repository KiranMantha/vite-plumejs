import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import typescript from '@rollup/plugin-typescript';
import swc from 'rollup-plugin-swc';

const swcPlugin = (() => {
  const plugin = swc({
    test: 'ts',
    jsc: {
      parser: {
        syntax: 'typescript',
        dynamicImport: true,
        decorators: true,
      },
      externalHelpers: true,

      target: 'es2021',
      transform: {
        decoratorMetadata: true,
      },
    },
  });

  const originalTransform = plugin.transform!;

  const transform = function (...args) {
    if (
      !args[1].endsWith('html') ||
      !args[1].endsWith('scss') ||
      !args[1].endsWith('css')
    )
      return originalTransform.apply(this, args);
  };

  return { ...plugin, transform };
})();

export default defineConfig({
  optimizeDeps: {
    include: ['@plumejs/core', '@plumejs/router', '@plumejs/ui'],
  },
  esbuild: false,
  build: {
    rollupOptions: {
      plugins: [
        typescript({
          typescript: require('typescript'),
          target: 'esnext',
          module: 'esnext',
          allowJs: true,
          allowSyntheticDefaultImports: true,
          importHelpers: true,
          esModuleInterop: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
        }),
      ],
    },
  },
});
