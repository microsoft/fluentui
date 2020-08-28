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
  json: 'json',
};

function getMonacoConfig(): IMonacoConfig | undefined {
  return (
    globalObj.MonacoConfig ||
    // TODO: remove once fabric-website homepage.htm is updated
    // temporary back-compat hack
    (globalObj.MonacoEnvironment && globalObj.appPath && globalObj.jsSuffix
      ? {
          baseUrl: globalObj.appPath,
          useMinified: globalObj.jsSuffix === '.min.js',
          crossDomain: globalObj.location.hostname.indexOf('microsoft.com') !== -1,
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
        // If the JS files will be on a different domain (the CDN) instead of the domain the HTML
        // is running on, we have to load the web worker scripts using a proxy. More info:
        // https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md

        // Next part varies for Chrome/Firefox/new Edge old Edge (new Edge uses Edg/ in UA)
        const isEdge = / Edge\//.test(navigator.userAgent);
        if (!isEdge) {
          // This approach (suggested in the docs) works in Chrome but not old Edge
          return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(`importScripts("${path}");`);
        } else {
          // This works in Edge but causes workers to run on the UI thread in Chrome
          // https://benohead.com/cross-domain-cross-browser-web-workers/
          const blob = new Blob([`importScripts("${path}")`], { type: 'application/javascript' });
          return URL.createObjectURL(blob);
        }
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
