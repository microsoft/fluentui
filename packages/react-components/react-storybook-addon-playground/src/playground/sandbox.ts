import type { ResolvedPlaygroundRuntimeManifest } from './runtime';

export const PLAYGROUND_REGISTER_CALLBACK = '__FLUENTUI_PLAYGROUND_REGISTER_V1__';
export const PLAYGROUND_SCRIPT_LOADER_CALLBACK = '__FLUENTUI_PLAYGROUND_LOAD_SCRIPT_V1__';

function escapeInlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** Maximum console messages forwarded per second; the rest are summarized so a logging loop cannot flood the shell. */
export const CONSOLE_MESSAGES_PER_SECOND = 100;
const CONSOLE_LEVELS = ['log', 'info', 'warn', 'error', 'debug'] as const;
export type PlaygroundConsoleLevel = (typeof CONSOLE_LEVELS)[number];

function getOrigin(url: string): string | undefined {
  try {
    const { origin } = new URL(url);
    return origin && origin !== 'null' ? origin : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Content Security Policy for the preview document. The iframe origin is opaque, so `'self'` would match nothing:
 * trusted sources are the explicit origins that serve the Storybook runtime (scripts, lazy chunks, styles, fonts).
 * Inline and eval are required because the bootstrap is inline and user code runs through `new Function`. Network
 * access (`fetch`, XHR, WebSocket), nested frames, and form submissions to other origins are blocked. Images and media
 * may load from any HTTPS URL so examples can show avatars and pictures.
 */
export function createSandboxContentSecurityPolicy(manifest: ResolvedPlaygroundRuntimeManifest): string {
  const origins = Array.from(
    new Set(
      [manifest.baseUrl, manifest.typings, ...manifest.scripts, ...manifest.styles]
        .map(getOrigin)
        .filter((origin): origin is string => Boolean(origin)),
    ),
  ).join(' ');

  return [
    `default-src 'none'`,
    `script-src 'unsafe-inline' 'unsafe-eval' ${origins}`,
    `style-src 'unsafe-inline' ${origins}`,
    `font-src data: ${origins}`,
    `img-src data: blob: https: ${origins}`,
    `media-src data: blob: https: ${origins}`,
    `connect-src ${origins}`,
    `worker-src blob: ${origins}`,
    `base-uri ${origins}`,
    `form-action 'none'`,
    `frame-src 'none'`,
    `object-src 'none'`,
  ].join('; ');
}

function escapeHtmlAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Builds the `srcDoc` for the sandboxed preview iframe. The bootstrap script registers a callback that the consumer
 * runtime entry invokes once React + module loaders + setup are available, then evaluates user code on `run` messages.
 *
 * @param parentOrigin - origin of the playground shell; messages to the parent are only delivered to this origin.
 */
export function createSandboxDocument(
  manifest: ResolvedPlaygroundRuntimeManifest,
  token: string,
  parentOrigin = '*',
): string {
  const bootstrap = `
(() => {
  const token = ${escapeInlineJson(token)};
  const callbackName = ${escapeInlineJson(PLAYGROUND_REGISTER_CALLBACK)};
  const scriptLoaderName = ${escapeInlineJson(PLAYGROUND_SCRIPT_LOADER_CALLBACK)};
  const baseUrl = ${escapeInlineJson(manifest.baseUrl)};
  const initialScripts = ${escapeInlineJson(manifest.scripts)};
  const allowedScriptFiles = new Set(${escapeInlineJson(manifest.allowedScriptFiles ?? [])});
  const inlineStyles = ${escapeInlineJson(manifest.inlineStyles ?? [])};
  const parentOrigin = ${escapeInlineJson(parentOrigin)};
  let runtime;
  let root;
  let RenderBoundary;
  let activeRunId = 0;
  // Unlike activeRunId, this is not reset while the shell invalidates a run, so logs keep their version.
  let latestRunId = 0;
  let successfulRun;
  let moduleEffects = [];
  const nativeSetTimeout = window.setTimeout.bind(window);

  const send = message => parent.postMessage({
    source: 'fluentui-playground',
    token,
    ...message,
  }, parentOrigin);

  let nextScriptRequestId = 0;
  const scriptRequests = new Map();
  const loadedScripts = new Map();
  const canBridgeScript = url => allowedScriptFiles.has(url) && new URL(url).origin === parentOrigin;
  window.addEventListener('message', event => {
    const message = event.data;
    if (
      event.source !== parent ||
      !message ||
      message.source !== 'fluentui-playground' ||
      message.token !== token ||
      message.type !== 'script-response'
    ) {
      return;
    }
    const request = scriptRequests.get(message.requestId);
    if (!request) {
      return;
    }
    scriptRequests.delete(message.requestId);
    window.clearTimeout(request.timeout);
    if (typeof message.error === 'string') {
      request.reject(new Error(message.error));
    } else if (typeof message.scriptSource === 'string') {
      request.resolve(message.scriptSource);
    } else {
      request.reject(new Error('Invalid playground runtime script response.'));
    }
  });

  const requestScript = url => new Promise((resolve, reject) => {
    const requestId = ++nextScriptRequestId;
    const timeout = nativeSetTimeout(() => {
      scriptRequests.delete(requestId);
      reject(new Error('Timed out loading playground runtime script "' + url + '".'));
    }, 120000);
    scriptRequests.set(requestId, { resolve, reject, timeout });
    send({ type: 'script-request', requestId, url });
  });
  const loadScript = url => {
    let promise = loadedScripts.get(url);
    if (!promise) {
      promise = canBridgeScript(url)
        ? requestScript(url).then(source => {
            const script = document.createElement('script');
            script.textContent = source;
            // Automatic Webpack publicPath cannot infer a URL from an inline script.
            const previousPublicPath = bridgeScript.publicPath;
            bridgeScript.publicPath = baseUrl;
            try {
              document.head.appendChild(script);
            } finally {
              bridgeScript.publicPath = previousPublicPath;
              script.remove();
            }
          })
        : new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load the playground runtime script "' + url + '".'));
            document.head.appendChild(script);
          });
      loadedScripts.set(url, promise);
      promise.catch(() => loadedScripts.delete(url));
    }
    return promise;
  };
  const bridgeScript = (url, done) => {
    const absoluteUrl = new URL(url, baseUrl).href;
    if (!canBridgeScript(absoluteUrl)) {
      return false;
    }
    loadScript(absoluteUrl).then(
      () => done({ type: 'load', target: { src: absoluteUrl } }),
      error => done({ type: 'error', target: { src: absoluteUrl }, error }),
    );
    return true;
  };
  if (allowedScriptFiles.size > 0) {
    window[scriptLoaderName] = bridgeScript;
  }

  const formatValue = (value, depth, seen) => {
    if (typeof value === 'string') {
      return depth === 0 ? value : JSON.stringify(value);
    }
    if (typeof value === 'function') {
      return '[Function ' + (value.name || 'anonymous') + ']';
    }
    if (typeof value === 'bigint') {
      return value + 'n';
    }
    if (value === null || typeof value !== 'object') {
      return String(value);
    }
    if (value instanceof Error) {
      return value.name + ': ' + value.message;
    }
    if (typeof Node !== 'undefined' && value instanceof Node) {
      return value.nodeType === 1 ? '<' + value.nodeName.toLowerCase() + '>' : '[' + value.nodeName + ']';
    }
    if (seen.has(value)) {
      return '[Circular]';
    }
    if (depth >= 3) {
      return Array.isArray(value) ? '[Array]' : '[Object]';
    }
    seen.add(value);
    try {
      if (Array.isArray(value)) {
        const items = value.slice(0, 50).map(item => formatValue(item, depth + 1, seen));
        if (value.length > 50) {
          items.push('… ' + (value.length - 50) + ' more');
        }
        return '[' + items.join(', ') + ']';
      }
      const keys = Object.keys(value);
      const entries = keys.slice(0, 50).map(key => {
        let item;
        try {
          item = formatValue(value[key], depth + 1, seen);
        } catch (error) {
          item = '[Thrown: ' + formatValue(error, depth + 1, seen) + ']';
        }
        return key + ': ' + item;
      });
      if (keys.length > 50) {
        entries.push('… ' + (keys.length - 50) + ' more');
      }
      const name = value.constructor && value.constructor !== Object ? value.constructor.name + ' ' : '';
      return name + (entries.length ? '{ ' + entries.join(', ') + ' }' : '{}');
    } finally {
      seen.delete(value);
    }
  };

  const formatConsoleArgs = args => {
    const rest = Array.from(args);
    let text = '';
    if (typeof rest[0] === 'string' && /%[sdifoOc%]/.test(rest[0])) {
      const template = rest.shift();
      text = template.replace(/%([sdifoOc%])/g, (match, directive) => {
        if (directive === '%') {
          return '%';
        }
        if (rest.length === 0) {
          return match;
        }
        const value = rest.shift();
        if (directive === 'c') {
          return '';
        }
        if (directive === 'd' || directive === 'i') {
          return String(parseInt(value, 10));
        }
        if (directive === 'f') {
          return String(parseFloat(value));
        }
        return directive === 's' && typeof value === 'string' ? value : formatValue(value, 0, new Set());
      });
    }
    const parts = rest.map(value => formatValue(value, 0, new Set()));
    const message = (text ? [text, ...parts] : parts).join(' ');
    return message.length > 10000 ? message.slice(0, 10000) + '… (truncated)' : message;
  };

  let consoleWindowStart = 0;
  let consoleCount = 0;
  let suppressedConsole = 0;
  const flushSuppressedConsole = () => {
    if (suppressedConsole > 0) {
      send({
        type: 'console',
        level: 'warn',
        runId: latestRunId,
        message: suppressedConsole + ' console messages were not shown because the preview logged too quickly.',
      });
      suppressedConsole = 0;
    }
  };
  ${escapeInlineJson(CONSOLE_LEVELS)}.forEach(level => {
    const original = console[level];
    console[level] = function (...args) {
      original.apply(console, args);
      const now = Date.now();
      if (now - consoleWindowStart >= 1000) {
        consoleWindowStart = now;
        consoleCount = 0;
        flushSuppressedConsole();
      }
      if (++consoleCount > ${CONSOLE_MESSAGES_PER_SECOND}) {
        if (suppressedConsole++ === 0) {
          nativeSetTimeout(flushSuppressedConsole, 1000);
        }
        return;
      }
      try {
        send({ type: 'console', level, runId: latestRunId, message: formatConsoleArgs(args) });
      } catch (error) {
        // Formatting user values must never break the code that logged them.
      }
    };
  });

  // Timers and global listeners created while a module is evaluated belong to that module version. They are
  // disposed when a newer version replaces it, so live edits do not stack intervals or listeners.
  const collectModuleEffects = evaluate => {
    const effects = [];
    const patches = [
      [window, 'setTimeout', id => () => window.clearTimeout(id)],
      [window, 'setInterval', id => () => window.clearInterval(id)],
      [window, 'requestAnimationFrame', id => () => window.cancelAnimationFrame(id)],
    ].map(([target, name, dispose]) => {
      const original = target[name];
      target[name] = function (...args) {
        const id = original.apply(target, args);
        effects.push(dispose(id));
        return id;
      };
      return () => {
        target[name] = original;
      };
    });
    [window, document].forEach(target => {
      const original = target.addEventListener;
      target.addEventListener = function (type, listener, options) {
        original.call(target, type, listener, options);
        effects.push(() => target.removeEventListener(type, listener, options));
      };
      patches.push(() => {
        target.addEventListener = original;
      });
    });
    try {
      evaluate();
    } catch (error) {
      effects.forEach(dispose => dispose());
      throw error;
    } finally {
      patches.forEach(restore => restore());
    }
    return effects;
  };

  const formatError = error => (error instanceof Error ? error.name + ': ' + error.message : String(error));

  const sendError = (error, runId, previewRetained = false) => {
    if (runId !== activeRunId) {
      return;
    }
    send({
      type: 'error',
      runId,
      previewRetained,
      kind: error && error.kind ? error.kind : 'runtime',
      message: formatError(error),
    });
  };

  // Failures before the runtime registers (a setup module throwing, a runtime script failing to load) cannot be
  // attributed to a run; report the first one so the shell can stop waiting for "ready".
  let initFailed = false;
  const sendInitError = message => {
    if (runtime || initFailed) {
      return;
    }
    initFailed = true;
    send({ type: 'init-error', message });
  };

  const reportAsyncError = event => {
    const error = 'reason' in event ? event.reason : event.error || event.message;
    if (!runtime) {
      sendInitError(formatError(error));
      return;
    }
    if (!activeRunId) {
      return;
    }

    successfulRun = undefined;
    sendError(error, activeRunId);
  };

  window.addEventListener('error', reportAsyncError);
  window.addEventListener('unhandledrejection', reportAsyncError);
  // Resource load errors do not bubble, so listen in the capture phase.
  window.addEventListener(
    'error',
    event => {
      const target = event.target;
      if (target && target !== window && target.tagName === 'SCRIPT') {
        sendInitError('Failed to load the playground runtime script "' + target.src + '".');
      }
    },
    true,
  );

  const isComponentLike = value =>
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && '$$typeof' in value);

  const pickComponent = exports => {
    if (isComponentLike(exports.default)) {
      return exports.default;
    }
    if (isComponentLike(exports.Default)) {
      return exports.Default;
    }
    for (const [name, value] of Object.entries(exports)) {
      if (name !== '__esModule' && isComponentLike(value)) {
        return value;
      }
    }
    const error = new Error('Nothing to render. Export a component as default, Default, or another named export.');
    error.kind = 'export';
    throw error;
  };

  window[callbackName] = nextRuntime => {
    try {
      registerRuntime(nextRuntime);
    } catch (error) {
      runtime = undefined;
      sendInitError(formatError(error));
    }
  };

  const registerRuntime = nextRuntime => {
    runtime = nextRuntime;
    RenderBoundary = class extends runtime.React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
      }

      static getDerivedStateFromError(error) {
        return { error };
      }

      componentDidCatch(error) {
        successfulRun = undefined;
        sendError(error, this.props.runId);
      }

      componentDidMount() {
        this.reportSuccess();
      }

      componentDidUpdate() {
        this.reportSuccess();
      }

      reportSuccess() {
        if (!this.state.error && this.props.runId === activeRunId) {
          successfulRun = this.props.run;
          send({ type: 'success', runId: this.props.runId });
        }
      }

      render() {
        return this.state.error ? null : this.props.children;
      }
    };
    const setup = runtime.setup || {};
    const metadata = {
      title: setup.title,
      subtitle: setup.subtitle,
      defaultCode: setup.defaultCode,
      themes: (setup.themes || []).map(theme => ({
        id: theme.id,
        label: theme.label,
        dark: theme.dark,
      })),
    };
    delete window[callbackName];
    send({ type: 'ready', metadata });
  };

  window.addEventListener('message', async event => {
    const message = event.data;
    if (
      event.source !== parent ||
      !message ||
      message.source !== 'fluentui-playground' ||
      message.token !== token ||
      !runtime
    ) {
      return;
    }

    if (message.type === 'invalidate') {
      activeRunId = 0;
      return;
    }
    if (message.type !== 'run') {
      return;
    }

    // Effects of a newly evaluated module version until they replace the current ones.
    let pendingModuleEffects;
    try {
      activeRunId = message.runId;
      latestRunId = message.runId;
      const previous = successfulRun;
      const cssLocals = JSON.stringify((message.cssModules || []).map(mod => [mod.specifier, mod.locals]));
      const reuseComponent = message.preserveState && previous &&
        previous.code === message.code && previous.cssLocals === cssLocals;
      const isCssSpecifier = name => /\\.css$/i.test(name);
      const cssModules = new Map((message.cssModules || []).map(mod => [mod.specifier, mod]));
      const findCssModule = name => {
        if (cssModules.has(name)) {
          return cssModules.get(name);
        }
        const basename = name.split('/').pop();
        for (const mod of cssModules.values()) {
          if (mod.name === basename || (mod.specifier && mod.specifier.split('/').pop() === basename)) {
            return mod;
          }
        }
        return undefined;
      };
      const requested = message.requiredModules || [];
      const allowedModules = runtime.allowedModules || Object.keys(runtime.moduleLoaders);
      const isAllowedModule = name =>
        allowedModules.includes(name) && Object.prototype.hasOwnProperty.call(runtime.moduleLoaders, name);
      const unavailable = requested.filter(name => !isAllowedModule(name) && !findCssModule(name));
      if (unavailable.length > 0) {
        const error = new Error('Cannot import ' + unavailable.map(name => '"' + name + '"').join(', ') + '.');
        error.kind = 'import';
        throw error;
      }

      const loaded = reuseComponent ? [] : await Promise.all(
        requested.filter(name => !findCssModule(name)).map(async name => [name, await runtime.moduleLoaders[name]()])
      );
      // A later edit can supersede a slow lazy import in the same iframe.
      if (message.runId !== activeRunId) {
        return;
      }
      const modules = new Map(loaded);

      const sandboxRequire = name => {
        if (typeof name !== 'string') {
          const error = new Error('Module specifier must be a string.');
          error.kind = 'import';
          throw error;
        }
        const cssModule = findCssModule(name);
        if (cssModule) {
          return Object.assign(Object.create(null), {
            __esModule: true,
            // Structured cloning restores Object.prototype; class names like "constructor" must not inherit.
            default: Object.assign(Object.create(null), cssModule.locals),
          }, cssModule.locals);
        }
        if (isCssSpecifier(name)) {
          const error = new Error('CSS module "' + name + '" is not available in this playground session.');
          error.kind = 'import';
          throw error;
        }
        if (!isAllowedModule(name) || !modules.has(name)) {
          const error = new Error('Module "' + name + '" is not available.');
          error.kind = 'import';
          throw error;
        }
        return modules.get(name);
      };
      let Component;
      if (reuseComponent) {
        Component = previous.Component;
      } else {
        const sandboxModule = { exports: Object.create(null) };
        // User code runs with sandbox-global access; isolation depends on Preview's opaque-origin iframe sandbox.
        const evaluate = new Function('require', 'exports', 'module', message.code);
        pendingModuleEffects = collectModuleEffects(() =>
          evaluate(sandboxRequire, sandboxModule.exports, sandboxModule),
        );
        Component = pickComponent(sandboxModule.exports);
      }

      const setup = runtime.setup || {};
      const selectedTheme = (setup.themes || []).find(theme => theme.id === message.themeId);
      const element = setup.render
        ? setup.render({ Component, theme: selectedTheme && selectedTheme.value })
        : runtime.React.createElement(Component);
      const nextRun = {
        Component,
        code: message.code,
        cssLocals,
        componentKey: reuseComponent ? previous.componentKey : message.runId,
      };
      const guardedElement = runtime.React.createElement(
        RenderBoundary,
        { key: nextRun.componentKey, runId: message.runId, run: nextRun },
        element,
      );

      // Evaluation/import errors leave the last successful DOM and styles untouched.
      document.querySelectorAll('style[data-playground-css]').forEach(node => node.remove());
      (message.cssModules || []).forEach(mod => {
        const style = document.createElement('style');
        style.setAttribute('data-playground-css', mod.specifier);
        style.textContent = mod.cssText;
        document.head.appendChild(style);
      });
      root = root || runtime.createRoot(document.getElementById('root'));
      root.render(guardedElement);
      if (pendingModuleEffects) {
        moduleEffects.forEach(dispose => dispose());
        moduleEffects = pendingModuleEffects;
        pendingModuleEffects = undefined;
      }
    } catch (error) {
      // A version that failed to render must not leave its timers and listeners running.
      if (pendingModuleEffects) {
        pendingModuleEffects.forEach(dispose => dispose());
      }
      sendError(error, message.runId, Boolean(successfulRun));
    }
  });

  (async () => {
    try {
      for (const { href, cssText } of inlineStyles) {
        const style = document.createElement('style');
        // The emitted filename matches mini-css-extract-plugin with automatic or explicit public paths.
        style.setAttribute('data-href', href.slice(baseUrl.length));
        style.textContent = cssText;
        document.head.appendChild(style);
      }
      for (const script of initialScripts) {
        await loadScript(script);
        if (initFailed) {
          break;
        }
      }
    } catch (error) {
      sendInitError(formatError(error));
    }
  })();
})();
`;
  const styles = manifest.styles.map(style => `<link rel="stylesheet" href=${escapeInlineJson(style)} />`).join('');

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Security-Policy" content="${escapeHtmlAttribute(
      createSandboxContentSecurityPolicy(manifest),
    )}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href=${escapeInlineJson(manifest.baseUrl)} />
    ${styles}
    <style>
      html, body, #root { min-height: 100%; margin: 0; }
      body { padding: 24px; box-sizing: border-box; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>${bootstrap}</script>
  </body>
</html>`;
}
