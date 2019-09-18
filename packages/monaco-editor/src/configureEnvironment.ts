export interface IMonacoConfig {
  /** Root path where the Monaco files will be at runtime */
  baseUrl: string;
  /** Whether to use minified versions of the files (`.min.js`) */
  useMinified?: boolean;
  /**
   * Whether to use a configuration variant which works when this script lives
   * on a different domain than the core Monaco scripts
   */
  crossDomain?: boolean;
}

const globalObj = (typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}) as Window & {
  MonacoEnvironment?: any;
  MonacoConfig?: IMonacoConfig;
  // TODO: remove once fabric-website homepage.htm is updated
  appPath?: string;
  jsSuffix?: string;
};

const labelMap: { [key: string]: string } = {
  typescript: 'ts',
  javascript: 'ts',
  css: 'css',
  scss: 'css',
  less: 'css',
  html: 'html',
  json: 'json'
};

export function getMonacoConfig(): IMonacoConfig | undefined {
  return (
    globalObj.MonacoConfig ||
    // TODO: remove once fabric-website homepage.htm is updated
    // temporary back-compat hack
    (globalObj.MonacoEnvironment && globalObj.appPath && globalObj.jsSuffix
      ? {
          baseUrl: globalObj.appPath,
          useMinified: globalObj.jsSuffix === '.min.js'
        }
      : undefined)
  );
}

// TODO: remove once fabric-website homepage.htm is updated
let hasConfigured = false;

/**
 * Add required global configuration to make Monaco work. (Doesn't directly load anything.)
 * If neither `config` nor the global `MonacoConfig` are provided, does nothing.
 * @param config - Configuration settings. Defaults to the `MonacoConfig` global if it exists.
 */
export function configureEnvironment(config?: IMonacoConfig): void {
  config = config || getMonacoConfig();
  if (!!(globalObj.MonacoEnvironment && hasConfigured) || !config) {
    return;
  }
  hasConfigured = true;

  const { baseUrl, useMinified, crossDomain } = config!;
  const baseUrlNoSlash = baseUrl.slice(-1) === '/' ? baseUrl.slice(0, -1) : baseUrl;
  const minPart = useMinified ? '.min' : '';

  globalObj.MonacoEnvironment = {
    getWorkerUrl: (workerId: string, label: string) => {
      const workerName = labelMap[label] || 'editor';
      const path = `${baseUrlNoSlash}/${workerName}.worker${minPart}.js`;

      if (crossDomain) {
        // This is needed for cases where the JS files will be on a different domain (the CDN)
        // instead of the domain the HTML is running on. Web workers (used by Monaco) can't be
        // loaded by script residing on a different domain, so we use this proxy script on the
        // main domain to load the worker script. (Also do this with localhost/devhost for testing.)
        // https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
        return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(`importScripts("${path}");`);
      }
      return path;
    }
  };
}
