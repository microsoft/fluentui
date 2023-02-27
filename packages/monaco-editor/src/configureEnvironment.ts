/**
 * Monaco editor global configuration.
 * This should match `packages/public-docsite-setup/src/types.ts`.
 *
 * (The types aren't shared directly because this package is intended to be usable outside of Fluent
 * and therefore shouldn't depend on an internal-use package, and `@fluentui/public-docsite-setup`
 * must be used in old Fabric versions where pulling in this package's newer typescript output
 * could cause problems due to unsupported syntax.)
 */
export interface IMonacoConfig {
  /** Root path where the Monaco files will be at runtime */
  baseUrl: string;
  /** Whether to use minified versions of the files (`.min.js`) */
  useMinified?: boolean;
  /**
   * Whether to use a configuration variant which works when the worker script lives on a
   * different domain than the website host (like a CDN).
   */
  crossDomain?: boolean;
}

// eslint-disable-next-line no-restricted-globals
const globalObj = (typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}) as Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MonacoEnvironment?: any;
  MonacoConfig?: IMonacoConfig;
};

const labelMap: { [key: string]: string } = {
  typescript: 'ts',
  javascript: 'ts',
  css: 'css',
  scss: 'css',
  less: 'css',
  html: 'html',
  json: 'json',
};

/**
 * Add required global configuration to make Monaco work. (Doesn't directly load anything.)
 * If neither `config` nor the global `MonacoConfig` are provided, does nothing.
 * @param config - Configuration settings. Defaults to the `MonacoConfig` global if it exists.
 */
export function configureEnvironment(config?: IMonacoConfig): void {
  config = config || globalObj.MonacoConfig;
  if (globalObj.MonacoEnvironment || !config) {
    return;
  }

  const { baseUrl, useMinified, crossDomain } = config!;
  const baseUrlNoSlash = baseUrl.slice(-1) === '/' ? baseUrl.slice(0, -1) : baseUrl;
  const minPart = useMinified ? '.min' : '';

  globalObj.MonacoEnvironment = {
    getWorkerUrl: (workerId: string, label: string) => {
      const workerName = labelMap[label] || 'editor';
      const path = `${baseUrlNoSlash}/${workerName}.worker${minPart}.js`;

      if (crossDomain) {
        // If the JS files will be on a different domain (the CDN) instead of the domain the HTML
        // is running on, we have to load the web worker scripts using a proxy. More info:
        // https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
        return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(`importScripts("${path}");`);
      }
      return path;
    },
  };
}

/**
 * Returns true if either MonacoEnvironment or MonacoConfig is set.
 */
export function isConfigAvailable(): boolean {
  return !!(globalObj.MonacoConfig || globalObj.MonacoEnvironment);
}
