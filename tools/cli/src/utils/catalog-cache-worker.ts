import { runCatalogCacheWorker } from './catalog-cache';
import type { CatalogSelectionOptions } from './catalog-inventory';

async function main(): Promise<void> {
  const argument = process.argv[2];
  if (!argument || argument.length > 64 * 1024) {
    return;
  }
  const request = JSON.parse(argument) as {
    options: CatalogSelectionOptions;
    packageRoot: string;
    token: string;
  };
  if (!request.options || typeof request.packageRoot !== 'string' || typeof request.token !== 'string') {
    return;
  }
  await runCatalogCacheWorker(request.options, request.packageRoot, request.token);
}

main().catch(() => {
  process.exitCode = 1;
});
