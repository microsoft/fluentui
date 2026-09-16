import type { ResolvedPlaygroundRuntimeManifest } from './runtime';

export const PLAYGROUND_REGISTER_CALLBACK = '__FLUENTUI_PLAYGROUND_REGISTER_V1__';

function escapeInlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/**
 * Builds the `srcDoc` for the sandboxed preview iframe. The bootstrap script registers a callback that the consumer
 * runtime entry invokes once React + module loaders + setup are available, then evaluates user code on `run` messages.
 */
export function createSandboxDocument(manifest: ResolvedPlaygroundRuntimeManifest, token: string): string {
  const bootstrap = `
(() => {
  const token = ${escapeInlineJson(token)};
  const callbackName = ${escapeInlineJson(PLAYGROUND_REGISTER_CALLBACK)};
  let runtime;
  let root;

  const send = message => parent.postMessage({
    source: 'fluentui-playground',
    token,
    ...message,
  }, '*');

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

  const getRequiredModules = code => {
    const modules = new Set();
    const regex = /\\brequire\\(\\s*(["'])([^"']+)\\1\\s*\\)/g;
    for (const match of code.matchAll(regex)) {
      modules.add(match[2]);
    }
    return Array.from(modules);
  };

  window[callbackName] = nextRuntime => {
    runtime = nextRuntime;
    delete window[callbackName];

    const setup = runtime.setup || {};
    send({
      type: 'ready',
      metadata: {
        title: setup.title,
        subtitle: setup.subtitle,
        defaultCode: setup.defaultCode,
        themes: (setup.themes || []).map(theme => ({
          id: theme.id,
          label: theme.label,
          dark: theme.dark,
        })),
      },
    });
  };

  window.addEventListener('message', async event => {
    const message = event.data;
    if (
      event.source !== parent ||
      !message ||
      message.source !== 'fluentui-playground' ||
      message.token !== token ||
      message.type !== 'run' ||
      !runtime
    ) {
      return;
    }

    try {
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
      const requested = getRequiredModules(message.code);
      const unavailable = requested.filter(name => !runtime.moduleLoaders[name] && !findCssModule(name));
      if (unavailable.length > 0) {
        const error = new Error('Cannot import ' + unavailable.map(name => '"' + name + '"').join(', ') + '.');
        error.kind = 'import';
        throw error;
      }

      const loaded = await Promise.all(
        requested.filter(name => !findCssModule(name)).map(async name => [name, await runtime.moduleLoaders[name]()])
      );
      const modules = new Map(loaded);

      document.querySelectorAll('style[data-playground-css]').forEach(node => node.remove());
      (message.cssModules || []).forEach(mod => {
        const style = document.createElement('style');
        style.setAttribute('data-playground-css', mod.specifier);
        style.textContent = mod.cssText;
        document.head.appendChild(style);
      });

      const require = name => {
        const cssModule = findCssModule(name);
        if (cssModule) {
          return Object.assign({ __esModule: true, default: cssModule.locals }, cssModule.locals);
        }
        if (isCssSpecifier(name)) {
          const error = new Error('CSS module "' + name + '" is not available in this playground session.');
          error.kind = 'import';
          throw error;
        }
        if (!modules.has(name)) {
          const error = new Error('Module "' + name + '" is not available.');
          error.kind = 'import';
          throw error;
        }
        return modules.get(name);
      };
      const module = { exports: {} };
      const evaluate = new Function('require', 'exports', 'module', message.code);
      evaluate(require, module.exports, module);

      const Component = pickComponent(module.exports);
      const setup = runtime.setup || {};
      const selectedTheme = (setup.themes || []).find(theme => theme.id === message.themeId);
      const element = setup.render
        ? setup.render({ Component, theme: selectedTheme && selectedTheme.value })
        : runtime.React.createElement(Component);

      root = root || runtime.createRoot(document.getElementById('root'));
      root.render(element);
      send({ type: 'success', runId: message.runId });
    } catch (error) {
      send({
        type: 'error',
        runId: message.runId,
        kind: error && error.kind ? error.kind : 'runtime',
        message: error instanceof Error ? error.name + ': ' + error.message : String(error),
      });
    }
  });
})();
`;
  const styles = manifest.styles.map(style => `<link rel="stylesheet" href=${escapeInlineJson(style)} />`).join('');
  const scripts = manifest.scripts.map(script => `<script src=${escapeInlineJson(script)}></script>`).join('');

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
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
    ${scripts}
  </body>
</html>`;
}
