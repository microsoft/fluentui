export interface CssModuleSources {
  cssModules?: Array<{ name: string; source: string }>;
  tokensSource?: string;
}

export interface SandboxData {
  storyFile: string;
  storyExportToken: string;
  title: string;
  description: string;
  requiredDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  cssModuleSources?: CssModuleSources;
}

const serialize = (value: object): string => JSON.stringify(value, null, 2);

function packageName(specifier: string): string {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
}

export function getDependencies(data: SandboxData): Record<string, string> {
  const detected: Record<string, string> = {};
  for (const match of data.storyFile.matchAll(/(?:from\s+|import\s*\()(['"])([^'"]+)\1/g)) {
    const specifier = match[2];
    if (specifier.startsWith('.') || specifier.startsWith('react/')) {
      continue;
    }
    const name = packageName(specifier);
    detected[name] ??= data.optionalDependencies[name] ?? 'latest';
  }
  return { ...detected, ...data.requiredDependencies };
}

export function scaffoldVite(data: SandboxData): Record<string, string> {
  const files: Record<string, string> = {
    'index.html':
      '<!doctype html><html><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div><script type="module" src="/src/index.tsx"></script></body></html>',
    'src/index.tsx': `import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<React.StrictMode><App /></React.StrictMode>);`,
    'src/App.tsx': `import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Example } from './example';

export default function App() {
  return <FluentProvider theme={webLightTheme}><Example /></FluentProvider>;
}`,
    'src/example.tsx': `${data.storyFile}\nexport { ${data.storyExportToken} as Example };\n`,
    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });`,
    'tsconfig.json': serialize({
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    }),
    'tsconfig.node.json': serialize({
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true,
      },
      include: ['vite.config.ts'],
    }),
    'package.json': serialize({
      name: 'fluent-ui-example',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: { dev: 'vite', build: 'tsc && vite build', preview: 'vite preview' },
      dependencies: getDependencies(data),
      devDependencies: { '@vitejs/plugin-react': '^4.2.0', vite: '^5.0.0', ...data.devDependencies },
    }),
    '.stackblitzrc': serialize({}),
  };

  for (const module of data.cssModuleSources?.cssModules ?? []) {
    files[`src/styles/${module.name}`] = module.source;
  }
  if (data.cssModuleSources?.tokensSource) {
    files['src/styles/tokens.css'] = data.cssModuleSources.tokensSource;
    files['src/App.tsx'] = `import './styles/tokens.css';\n${files['src/App.tsx']}`;
  }
  files['src/example.tsx'] = files['src/example.tsx'].replace(
    /(['"])\.\.?\/[^'"]+\.module\.css\1/g,
    path => `${path[0]}./styles/${path.slice(1, -1).split('/').pop()}${path[0]}`,
  );
  return files;
}

/** Scaffold the shared example and hand it to StackBlitz using the clicked button's document. */
export function openInStackBlitz(data: SandboxData, targetDocument: Document): void {
  const files = scaffoldVite(data);
  const form = targetDocument.createElement('form');
  form.method = 'post';
  form.target = '_blank';
  form.action = 'https://stackblitz.com/run?file=src%2Fexample.tsx';

  const fields = {
    'project[template]': 'node',
    'project[title]': data.title,
    'project[description]': `# ${data.description}`,
    ...Object.fromEntries(Object.entries(files).map(([name, content]) => [`project[files][${name}]`, content])),
  };
  for (const [name, value] of Object.entries(fields)) {
    const input = targetDocument.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  targetDocument.body.appendChild(form);
  try {
    form.submit();
  } finally {
    form.remove();
  }
}
