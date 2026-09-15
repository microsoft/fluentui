import type { CssModuleSource } from '../url';

export type { CssModuleSource };

export interface CompiledCssModule {
  name: string;
  /** Specifier used in transformed story source (`./styles/<basename>`). */
  specifier: string;
  locals: Record<string, string>;
  cssText: string;
}

export function cssModuleBasename(name: string): string {
  return name.replace(/^.*[/\\]/, '');
}

export function toCssModuleSpecifier(name: string): string {
  return `./styles/${cssModuleBasename(name)}`;
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 1_000_000_003;
  }
  return hash.toString(36);
}

/**
 * Compiles a CSS module the way Storybook's css-loader does in spirit: local class names are hashed,
 * `:global(...)` wrappers are stripped so the inner selector is injected as real CSS.
 */
export function compileCssModule(mod: CssModuleSource): CompiledCssModule {
  const basename = cssModuleBasename(mod.name);
  const id = basename.replace(/\.module\.css$/i, '').replace(/[^\w-]+/g, '_') || 'css';
  const suffix = hashString(`${basename}\0${mod.source}`);
  const locals: Record<string, string> = {};
  const protectedGlobals: string[] = [];

  const withoutGlobals = mod.source.replace(/:global\(([^)]*)\)/g, (_match, inner: string) => {
    const token = `__PG_GLOBAL_${protectedGlobals.length}__`;
    protectedGlobals.push(inner);
    return token;
  });

  const cssText = withoutGlobals
    .replace(/(^|[^A-Za-z0-9_-])\.([A-Za-z_][\w-]*)/g, (_match, before: string, local: string) => {
      if (!locals[local]) {
        locals[local] = `${id}__${local}--${suffix}`;
      }
      return `${before}.${locals[local]}`;
    })
    .replace(/__PG_GLOBAL_(\d+)__/g, (_match, index: string) => protectedGlobals[Number(index)]);

  return {
    name: basename,
    specifier: toCssModuleSpecifier(basename),
    locals,
    cssText,
  };
}

export function compileCssModules(mods: readonly CssModuleSource[]): CompiledCssModule[] {
  return mods.map(compileCssModule);
}

export function updateCssModuleSource(
  modules: readonly CssModuleSource[],
  name: string,
  source: string,
): CssModuleSource[] {
  return modules.map(mod => (mod.name === name ? { ...mod, source } : mod));
}

export function findCompiledCssModule(
  specifier: string,
  modules: readonly CompiledCssModule[],
): CompiledCssModule | undefined {
  const exact = modules.find(mod => mod.specifier === specifier);
  if (exact) {
    return exact;
  }

  const basename = cssModuleBasename(specifier);
  return modules.find(mod => cssModuleBasename(mod.specifier) === basename || mod.name === basename);
}
