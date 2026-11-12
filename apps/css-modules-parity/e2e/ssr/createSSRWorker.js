// Plain JavaScript: webpack only bundles the worker when `import.meta.url` reaches it untransformed by esbuild-loader.
export function createSSRWorker() {
  return new Worker(new URL('./ssr.worker.tsx', import.meta.url));
}
