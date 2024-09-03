import { globSync } from 'fast-glob';
import { basename, join } from 'node:path';
import { logger } from '@nx/devkit';
import { cp } from 'node:fs/promises';

type FileInputOutput = {
  input: string;
  output: string;
};
type AssetGlob = FileInputOutput & {
  glob: string;
  ignore?: string[];
  dot?: boolean;
  substitutions?: Record<string, string>;
};
/**
 *
 * @param assets
 * @param rootDir - workspace root (absolute path)
 * @param outDir - output directory (relative path to rootDir)
 * @param substitutions
 */
export function assetGlobsToFiles(
  assets: Array<string | AssetGlob>,
  rootDir: string,
  outDir: string,
): FileInputOutput[] {
  const files: FileInputOutput[] = [];

  const globbedFiles = (pattern: string, input = '', ignore: string[] = [], dot: boolean = false) => {
    return globSync(pattern, {
      cwd: input,
      onlyFiles: true,
      dot,
      ignore,
    });
  };

  assets.forEach(asset => {
    if (typeof asset === 'string') {
      globbedFiles(asset, rootDir).forEach(globbedFile => {
        files.push({
          input: join(rootDir, globbedFile),
          output: join(rootDir, outDir, basename(globbedFile)),
        });
      });
      return;
    }

    globbedFiles(asset.glob, join(rootDir, asset.input), asset.ignore, asset.dot ?? false).forEach(globbedFile => {
      const output = join(rootDir, outDir, asset.output, globbedFile);
      const transformedOutput = Object.entries(asset.substitutions ?? {}).reduce((acc, [key, value]) => {
        return acc.replace(key, value);
      }, output);

      files.push({
        input: join(rootDir, asset.input, globbedFile),
        output: transformedOutput,
      });
    });
  });

  return files;
}

export async function copyAssets(files: FileInputOutput[]): Promise<boolean> {
  const copyAsyncQueue = files.map(file => {
    return cp(file.input, file.output, { recursive: true });
  });

  return Promise.all(copyAsyncQueue)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}
