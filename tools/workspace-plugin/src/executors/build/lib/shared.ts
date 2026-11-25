import { type ExecutorContext, logger, readJsonFile } from '@nx/devkit';
import { join } from 'node:path';

import { type BuildExecutorSchema } from '../schema';

type Tasks = () => Promise<boolean>;

export async function runInParallel(...tasks: Tasks[]): Promise<boolean> {
  const processes = tasks.map(task => task());

  return Promise.all(processes)
    .then(results => {
      // if one of the processes failed (returned false) we need to force returning `false` to propagate `false` to final executor result which will fail the process chain
      return results.indexOf(false) !== -1 ? false : true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export async function runSerially(...tasks: Tasks[]): Promise<boolean> {
  for (const task of tasks) {
    const result = await task();
    if (!result) {
      return false;
    }
  }
  return true;
}

export async function processAsyncQueue(value: Promise<unknown>[]): Promise<boolean> {
  return Promise.all(value)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}
export function normalizeOptions(schema: BuildExecutorSchema, context: ExecutorContext) {
  const defaults = {
    generateApi: true,
    clean: true,
  };
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const resolvedSourceRoot = join(project.root, schema.sourceRoot) ?? project.sourceRoot;
  const absoluteProjectRoot = join(context.root, project.root);
  const absoluteSourceRoot = join(context.root, resolvedSourceRoot);
  const absoluteOutputPathRoot = join(context.root, schema.outputPathRoot);
  const enableGriffelRawStyles = schema.enableGriffelRawStyles ?? false;
  const reactCompiler = schema.reactCompiler ?? false;
  // TODO: drop the `__esmFirst` half of this once packages flip `"type": "module"` for real (see PR stack #36359-#36362).
  // It's a temporary/internal override so the ESM-first postprocessing can be exercised on a package ahead of that migration.
  //
  // `isEsmPackage` is the single source of truth consumed by every ESM-first postprocessing step:
  // `cjsRenameTransforms` (renames `lib-commonjs/*.js` -> `*.cjs` inline during the SWC compile) and
  // `copyCjsTypes` (copies rolled `dist/*.d.ts` -> `*.d.cts` after the build) - see `./cjs-extension`.
  const pkgJson = readJsonFile<{ type?: string }>(join(absoluteProjectRoot, 'package.json'));
  const isEsmPackage = Boolean(schema.__esmFirst) || pkgJson.type === 'module';

  // The `.cjs` rename only rewrites *relative* `require()` specifiers that already carry an extension
  // (e.g. `require("./x.js")` -> `require("./x.cjs")`). Extensionless requires (`require("./x")`) are
  // NOT renamed and, worse, won't resolve at runtime once the target file is renamed to `.cjs` - Node's
  // implicit extension resolution for `require()` only tries `.js`/`.json`/`.node`, never `.cjs`.
  // SWC only emits extensioned relative specifiers when `resolveFully` is on, which we derive from
  // `.swcrc`'s `jsc.baseUrl` (see `compileSwc` in `./swc`). So bail loudly instead of shipping a broken build.
  if (isEsmPackage) {
    const swcConfig = readJsonFile<{ jsc?: { baseUrl?: string } }>(join(absoluteProjectRoot, '.swcrc'));
    if (!swcConfig.jsc?.baseUrl) {
      throw new Error(
        `[build] "${context.projectName}" enables ESM-first postprocessing ("__esmFirst" or "type": "module") ` +
          `but its .swcrc is missing "jsc.baseUrl". Without it, SWC won't fully resolve relative import/require ` +
          `specifiers, so files renamed to "lib-commonjs/*.cjs" won't be requireable via extensionless specifiers ` +
          `at runtime. Add "jsc.baseUrl" to ${join(absoluteProjectRoot, '.swcrc')} before enabling ESM-first output.`,
      );
    }
  }

  return {
    ...defaults,
    ...schema,
    project,
    sourceRoot: resolvedSourceRoot,
    absoluteSourceRoot,
    absoluteProjectRoot,
    absoluteOutputPathRoot,
    enableGriffelRawStyles,
    reactCompiler,
    isEsmPackage,

    workspaceRoot: context.root,
  };
}
