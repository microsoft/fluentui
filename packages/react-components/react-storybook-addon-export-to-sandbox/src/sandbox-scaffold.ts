import dedent from 'dedent';

import type { SandboxContext } from './public-types';
import type { Data } from './sandbox-utils';
import { serializeJson } from './utils';

const commonDevDeps = { '@types/react': '^17', '@types/react-dom': '^17', typescript: '~4.7.0' };

export const scaffold = {
  vite: (data: Data): Record<string, string> => {
    if (data.provider === 'codesandbox-browser') {
      throw new Error('vite is not supported on codesandbox-browser');
    }

    const base: Record<string, string> = {
      'index.html': Vite.getHTML(),
      'src/App.tsx': Vite.getApp(data),
      'src/index.tsx': Vite.getRootIndex(),
      'src/example.tsx': Vite.getExample(data),
      'tsconfig.json': Vite.getTsconfig(),
      'tsconfig.node.json': Vite.getTsconfigNode(),
      'vite.config.ts': Vite.getViteCfg(),
      'package.json': Vite.getPkgJson(data),
    };
    if (data.provider === 'stackblitz-cloud') {
      Object.assign(base, getStackblitzConfig());
    }
    if (data.provider === 'codesandbox-cloud') {
      Object.assign(base, getCodesandboxConfig('vite'));
    }
    return applyTransform(base, data);
  },
  cra: (data: Data): Record<string, string> => {
    const base: Record<string, string> = {
      'public/index.html': CRA.getHTML(),
      'src/App.tsx': CRA.getApp(data),
      'src/index.tsx': CRA.getRootIndex(),
      'src/example.tsx': CRA.getExample(data),
      'tsconfig.json': CRA.getTsconfig(),
      'package.json': CRA.getPkgJson(data),
    };
    if (data.provider === 'stackblitz-cloud') {
      Object.assign(base, getStackblitzConfig());
    }
    if (data.provider === 'codesandbox-cloud') {
      Object.assign(base, getCodesandboxConfig('cra'));
    }

    return applyTransform(base, data);
  },
};

function applyTransform(base: Record<string, string>, data: Data): Record<string, string> {
  let files = base;

  // Auto-inject CSS module files when detected by the babel plugin.
  // This replaces the need for a manual `withCssModuleSource` + `transformFiles`
  // callback in every story meta.
  if (data.cssModuleSources?.cssModules?.length || data.cssModuleSources?.tokensSource) {
    files = applyCssModuleTransform(files, data);
  }

  if (!data.transformFiles) {
    return files;
  }
  const ctx: SandboxContext = {
    provider: data.provider,
    bundler: data.bundler,
    storyExportToken: data.storyExportToken,
    storyFile: data.storyFile,
    dependencies: data.dependencies,
    requiredDependencies: data.requiredDependencies,
    optionalDependencies: data.optionalDependencies,
    devDependencies: data.devDependencies,
  };
  return data.transformFiles(files, ctx);
}

/**
 * Generates sandbox files for auto-detected CSS modules:
 *   1. Places each CSS module (and optional `tokens.css`) under `src/styles/`.
 *   2. Rewrites relative `*.module.css` imports in `src/example.tsx` to `./styles/<basename>`.
 *   3. Prepends `import './styles/tokens.css'` to `src/App.tsx` so design tokens cascade.
 */
function applyCssModuleTransform(files: Record<string, string>, data: Data): Record<string, string> {
  const next = { ...files };
  const { cssModuleSources } = data;

  for (const mod of cssModuleSources?.cssModules ?? []) {
    next[`src/styles/${mod.name}`] = mod.source;
  }

  if (cssModuleSources?.tokensSource) {
    next['src/styles/tokens.css'] = cssModuleSources.tokensSource;
  }

  // Rewrite relative *.module.css imports to ./styles/<basename>
  const example = next['src/example.tsx'];
  if (typeof example === 'string') {
    next['src/example.tsx'] = example.replace(/(['"])\.\.?\/[^'"]+\.module\.css\1/g, match => {
      const quote = match[0];
      const basename = match.slice(1, -1).split('/').pop();
      return `${quote}./styles/${basename}${quote}`;
    });
  }

  // Prepend tokens import to App.tsx
  const app = next['src/App.tsx'];
  if (cssModuleSources?.tokensSource && typeof app === 'string' && !app.includes('./styles/tokens.css')) {
    next['src/App.tsx'] = `import './styles/tokens.css';\n${app}`;
  }

  return next;
}

const Vite = {
  getHTML: () => dedent`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/index.tsx"></script>
    </body>
  </html>
  `,
  getRootIndex: getIndex,
  getExample,
  getApp,
  getViteCfg: () => {
    return dedent`
      import { defineConfig } from 'vite'
      import react from '@vitejs/plugin-react'

      // https://vitejs.dev/config/
      export default defineConfig({
        plugins: [react()],
      })
    `;
  },
  getTsconfigNode: () => {
    return serializeJson({
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true,
      },
      include: ['vite.config.ts'],
    });
  },
  getTsconfig: () => {
    return serializeJson({
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,

        /* Bundler mode */
        moduleResolution: 'node',
        // moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',

        /* Linting */
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    });
  },
  getPkgJson: (data: Data) => {
    return serializeJson({
      name: 'vite-react-typescript-starter',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        ...data.dependencies,
      },
      devDependencies: {
        ...commonDevDeps,
        '@vitejs/plugin-react': '^4.2.0',
        vite: '^5.0.0',
        ...data.devDependencies,
      },
    });
  },
};

const CRA = {
  getHTML: () => `<div id="root"></div>`,
  getRootIndex: getIndex,
  getExample,
  getApp,
  getTsconfig: () =>
    serializeJson({
      include: ['./src/**/*'],
      compilerOptions: {
        strict: true,
        esModuleInterop: true,
        lib: ['dom', 'es2015'],
        jsx: 'react-jsx',
      },
    }),
  getPkgJson: (data: Data) => {
    return serializeJson({
      main: 'src/index.tsx',
      dependencies: {
        ...data.dependencies,
      },
      devDependencies: {
        ...commonDevDeps,
        'react-scripts': '^5.0.0',
        '@babel/plugin-proposal-private-property-in-object': 'latest',
        ...data.devDependencies,
      },
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test --env=jsdom',
        eject: 'react-scripts eject',
      },
      browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
    });
  },
};

function getCodesandboxConfig(kind: 'cra' | 'vite') {
  const startConfig = {
    cra: { command: 'yarn start', preview: { port: 3000 } },
    vite: { command: 'yarn dev', preview: { port: 5173 } },
  };
  return {
    '.devcontainer/devcontainer.json': serializeJson({
      name: 'Devcontainer',
      build: {
        dockerfile: './Dockerfile',
      },
    }),
    '.devcontainer/Dockerfile': `FROM node:16-bullseye`,
    '.codesandbox/tasks.json': serializeJson({
      // These tasks will run in order when initializing your CodeSandbox project.
      setupTasks: [
        {
          name: 'Install Dependencies',
          command: 'yarn install',
        },
      ],

      // These tasks can be run from CodeSandbox. Running one will open a log in the app.
      tasks: {
        dev: {
          name: 'dev',
          runAtStart: true,
          ...startConfig[kind],
        },
        build: {
          name: 'build',
          command: 'yarn build',
          runAtStart: false,
        },
        preview: {
          name: 'preview',
          command: 'yarn preview',
          runAtStart: false,
        },
      },
    }),
  };
}

function getStackblitzConfig() {
  return {
    '.stackblitzrc': serializeJson({}),
  };
}

function getIndex() {
  return dedent`
    import * as React from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App';

    const root = createRoot(document.getElementById('root') as HTMLElement);

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  `;
}

function getExample(demoData: Data) {
  return `${demoData.storyFile}\nexport { ${demoData.storyExportToken} as Example };\n`;
}

function getApp(_data: Data) {
  return dedent`
    import { FluentProvider, webLightTheme } from '@fluentui/react-components';
    import { Example } from './example';

    const App = () => {
        return (
          <FluentProvider theme={webLightTheme}>
            <Example />
          </FluentProvider>
        );
    };

    export default App;
  `;
}
