import { scaffold } from './sandbox-scaffold';

describe(`sabdbox-scaffold`, () => {
  const config = {
    dependencies: {},
    storyExportToken: `DefaultTitle`,
    storyFile: `
          import * as React from 'react';
          import { Text } from '@proj/react-components';

          export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
        `,
    description: 'react sandbox demo',
    title: 'react sandbox',
    requiredDependencies: {},
    optionalDependencies: {},
    devDependencies: {},
  };
  describe(`cra`, () => {
    it(`should generate scaffold for codesandbox-browser`, () => {
      const actual = scaffold.cra({
        bundler: 'cra',
        provider: 'codesandbox-browser',
        ...config,
      });

      expect(actual).toMatchInlineSnapshot(`
        Object {
          "package.json": "{
          \\"main\\": \\"src/index.tsx\\",
          \\"dependencies\\": {},
          \\"devDependencies\\": {
            \\"@types/react\\": \\"^17\\",
            \\"@types/react-dom\\": \\"^17\\",
            \\"typescript\\": \\"~4.7.0\\",
            \\"react-scripts\\": \\"^5.0.0\\",
            \\"@babel/plugin-proposal-private-property-in-object\\": \\"latest\\"
          },
          \\"scripts\\": {
            \\"start\\": \\"react-scripts start\\",
            \\"build\\": \\"react-scripts build\\",
            \\"test\\": \\"react-scripts test --env=jsdom\\",
            \\"eject\\": \\"react-scripts eject\\"
          },
          \\"browserslist\\": [
            \\">0.2%\\",
            \\"not dead\\",
            \\"not ie <= 11\\",
            \\"not op_mini all\\"
          ]
        }",
          "public/index.html": "<div id=\\"root\\"></div>",
          "src/App.tsx": "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import { Example } from './example';

        const App = () => {
            return (
              <FluentProvider theme={webLightTheme}>
                <Example />
              </FluentProvider>
            );
        };

        export default App;",
          "src/example.tsx": "
                  import * as React from 'react';
                  import { Text } from '@proj/react-components';

                  export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
                
        export { DefaultTitle as Example };
        ",
          "src/index.tsx": "import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App';

        const root = createRoot(document.getElementById('root') as HTMLElement);

        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );",
          "tsconfig.json": "{
          \\"include\\": [
            \\"./src/**/*\\"
          ],
          \\"compilerOptions\\": {
            \\"strict\\": true,
            \\"esModuleInterop\\": true,
            \\"lib\\": [
              \\"dom\\",
              \\"es2015\\"
            ],
            \\"jsx\\": \\"react-jsx\\"
          }
        }",
        }
      `);
    });

    it(`should generate scaffold for codesandbox-cloud`, () => {
      const actual = scaffold.cra({
        bundler: 'cra',
        provider: 'codesandbox-cloud',
        ...config,
      });

      expect(actual).toMatchInlineSnapshot(`
        Object {
          ".codesandbox/tasks.json": "{
          \\"setupTasks\\": [
            {
              \\"name\\": \\"Install Dependencies\\",
              \\"command\\": \\"yarn install\\"
            }
          ],
          \\"tasks\\": {
            \\"dev\\": {
              \\"name\\": \\"dev\\",
              \\"runAtStart\\": true,
              \\"command\\": \\"yarn start\\",
              \\"preview\\": {
                \\"port\\": 3000
              }
            },
            \\"build\\": {
              \\"name\\": \\"build\\",
              \\"command\\": \\"yarn build\\",
              \\"runAtStart\\": false
            },
            \\"preview\\": {
              \\"name\\": \\"preview\\",
              \\"command\\": \\"yarn preview\\",
              \\"runAtStart\\": false
            }
          }
        }",
          ".devcontainer/Dockerfile": "FROM node:16-bullseye",
          ".devcontainer/devcontainer.json": "{
          \\"name\\": \\"Devcontainer\\",
          \\"build\\": {
            \\"dockerfile\\": \\"./Dockerfile\\"
          }
        }",
          "package.json": "{
          \\"main\\": \\"src/index.tsx\\",
          \\"dependencies\\": {},
          \\"devDependencies\\": {
            \\"@types/react\\": \\"^17\\",
            \\"@types/react-dom\\": \\"^17\\",
            \\"typescript\\": \\"~4.7.0\\",
            \\"react-scripts\\": \\"^5.0.0\\",
            \\"@babel/plugin-proposal-private-property-in-object\\": \\"latest\\"
          },
          \\"scripts\\": {
            \\"start\\": \\"react-scripts start\\",
            \\"build\\": \\"react-scripts build\\",
            \\"test\\": \\"react-scripts test --env=jsdom\\",
            \\"eject\\": \\"react-scripts eject\\"
          },
          \\"browserslist\\": [
            \\">0.2%\\",
            \\"not dead\\",
            \\"not ie <= 11\\",
            \\"not op_mini all\\"
          ]
        }",
          "public/index.html": "<div id=\\"root\\"></div>",
          "src/App.tsx": "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import { Example } from './example';

        const App = () => {
            return (
              <FluentProvider theme={webLightTheme}>
                <Example />
              </FluentProvider>
            );
        };

        export default App;",
          "src/example.tsx": "
                  import * as React from 'react';
                  import { Text } from '@proj/react-components';

                  export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
                
        export { DefaultTitle as Example };
        ",
          "src/index.tsx": "import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App';

        const root = createRoot(document.getElementById('root') as HTMLElement);

        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );",
          "tsconfig.json": "{
          \\"include\\": [
            \\"./src/**/*\\"
          ],
          \\"compilerOptions\\": {
            \\"strict\\": true,
            \\"esModuleInterop\\": true,
            \\"lib\\": [
              \\"dom\\",
              \\"es2015\\"
            ],
            \\"jsx\\": \\"react-jsx\\"
          }
        }",
        }
      `);
    });

    it(`should generate scaffold for stackblitz-cloud`, () => {
      const actual = scaffold.cra({
        bundler: 'cra',
        provider: 'stackblitz-cloud',
        ...config,
      });

      expect(actual).toMatchInlineSnapshot(`
        Object {
          ".stackblitzrc": "{}",
          "package.json": "{
          \\"main\\": \\"src/index.tsx\\",
          \\"dependencies\\": {},
          \\"devDependencies\\": {
            \\"@types/react\\": \\"^17\\",
            \\"@types/react-dom\\": \\"^17\\",
            \\"typescript\\": \\"~4.7.0\\",
            \\"react-scripts\\": \\"^5.0.0\\",
            \\"@babel/plugin-proposal-private-property-in-object\\": \\"latest\\"
          },
          \\"scripts\\": {
            \\"start\\": \\"react-scripts start\\",
            \\"build\\": \\"react-scripts build\\",
            \\"test\\": \\"react-scripts test --env=jsdom\\",
            \\"eject\\": \\"react-scripts eject\\"
          },
          \\"browserslist\\": [
            \\">0.2%\\",
            \\"not dead\\",
            \\"not ie <= 11\\",
            \\"not op_mini all\\"
          ]
        }",
          "public/index.html": "<div id=\\"root\\"></div>",
          "src/App.tsx": "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import { Example } from './example';

        const App = () => {
            return (
              <FluentProvider theme={webLightTheme}>
                <Example />
              </FluentProvider>
            );
        };

        export default App;",
          "src/example.tsx": "
                  import * as React from 'react';
                  import { Text } from '@proj/react-components';

                  export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
                
        export { DefaultTitle as Example };
        ",
          "src/index.tsx": "import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App';

        const root = createRoot(document.getElementById('root') as HTMLElement);

        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );",
          "tsconfig.json": "{
          \\"include\\": [
            \\"./src/**/*\\"
          ],
          \\"compilerOptions\\": {
            \\"strict\\": true,
            \\"esModuleInterop\\": true,
            \\"lib\\": [
              \\"dom\\",
              \\"es2015\\"
            ],
            \\"jsx\\": \\"react-jsx\\"
          }
        }",
        }
      `);
    });
  });

  describe(`vite`, () => {
    it(`should throw error if used with 'codesandbox-browser'`, () => {
      const actual = () =>
        scaffold.vite({
          provider: 'codesandbox-browser',
          bundler: 'vite',
          ...config,
        });

      expect(actual).toThrowErrorMatchingInlineSnapshot(`"vite is not supported on codesandbox-browser"`);
    });

    it(`should generate scaffold for codesandbox-cloud`, () => {
      const actual = scaffold.vite({
        provider: 'codesandbox-cloud',
        bundler: 'vite',
        ...config,
      });

      expect(actual).toMatchInlineSnapshot(`
        Object {
          ".codesandbox/tasks.json": "{
          \\"setupTasks\\": [
            {
              \\"name\\": \\"Install Dependencies\\",
              \\"command\\": \\"yarn install\\"
            }
          ],
          \\"tasks\\": {
            \\"dev\\": {
              \\"name\\": \\"dev\\",
              \\"runAtStart\\": true,
              \\"command\\": \\"yarn dev\\",
              \\"preview\\": {
                \\"port\\": 5173
              }
            },
            \\"build\\": {
              \\"name\\": \\"build\\",
              \\"command\\": \\"yarn build\\",
              \\"runAtStart\\": false
            },
            \\"preview\\": {
              \\"name\\": \\"preview\\",
              \\"command\\": \\"yarn preview\\",
              \\"runAtStart\\": false
            }
          }
        }",
          ".devcontainer/Dockerfile": "FROM node:16-bullseye",
          ".devcontainer/devcontainer.json": "{
          \\"name\\": \\"Devcontainer\\",
          \\"build\\": {
            \\"dockerfile\\": \\"./Dockerfile\\"
          }
        }",
          "index.html": "<!doctype html>
        <html lang=\\"en\\">
          <head>
            <meta charset=\\"UTF-8\\" />
            <link rel=\\"icon\\" type=\\"image/svg+xml\\" href=\\"/vite.svg\\" />
            <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />
            <title>Vite + React + TS</title>
          </head>
          <body>
            <div id=\\"root\\"></div>
            <script type=\\"module\\" src=\\"/src/index.tsx\\"></script>
          </body>
        </html>",
          "package.json": "{
          \\"name\\": \\"vite-react-typescript-starter\\",
          \\"private\\": true,
          \\"version\\": \\"0.0.0\\",
          \\"type\\": \\"module\\",
          \\"scripts\\": {
            \\"dev\\": \\"vite\\",
            \\"build\\": \\"tsc && vite build\\",
            \\"preview\\": \\"vite preview\\"
          },
          \\"dependencies\\": {},
          \\"devDependencies\\": {
            \\"@types/react\\": \\"^17\\",
            \\"@types/react-dom\\": \\"^17\\",
            \\"typescript\\": \\"~4.7.0\\",
            \\"@vitejs/plugin-react\\": \\"^4.2.0\\",
            \\"vite\\": \\"^5.0.0\\"
          }
        }",
          "src/App.tsx": "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import { Example } from './example';

        const App = () => {
            return (
              <FluentProvider theme={webLightTheme}>
                <Example />
              </FluentProvider>
            );
        };

        export default App;",
          "src/example.tsx": "
                  import * as React from 'react';
                  import { Text } from '@proj/react-components';

                  export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
                
        export { DefaultTitle as Example };
        ",
          "src/index.tsx": "import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App';

        const root = createRoot(document.getElementById('root') as HTMLElement);

        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );",
          "tsconfig.json": "{
          \\"compilerOptions\\": {
            \\"target\\": \\"ES2020\\",
            \\"useDefineForClassFields\\": true,
            \\"lib\\": [
              \\"ES2020\\",
              \\"DOM\\",
              \\"DOM.Iterable\\"
            ],
            \\"module\\": \\"ESNext\\",
            \\"skipLibCheck\\": true,
            \\"moduleResolution\\": \\"node\\",
            \\"allowImportingTsExtensions\\": true,
            \\"resolveJsonModule\\": true,
            \\"isolatedModules\\": true,
            \\"noEmit\\": true,
            \\"jsx\\": \\"react-jsx\\",
            \\"strict\\": true,
            \\"noUnusedLocals\\": true,
            \\"noUnusedParameters\\": true,
            \\"noFallthroughCasesInSwitch\\": true
          },
          \\"include\\": [
            \\"src\\"
          ],
          \\"references\\": [
            {
              \\"path\\": \\"./tsconfig.node.json\\"
            }
          ]
        }",
          "tsconfig.node.json": "{
          \\"compilerOptions\\": {
            \\"composite\\": true,
            \\"skipLibCheck\\": true,
            \\"module\\": \\"ESNext\\",
            \\"moduleResolution\\": \\"bundler\\",
            \\"allowSyntheticDefaultImports\\": true
          },
          \\"include\\": [
            \\"vite.config.ts\\"
          ]
        }",
          "vite.config.ts": "import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [react()],
        })",
        }
      `);
    });

    it(`should generate scaffold for stackblitz-cloud`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
      });

      expect(actual).toMatchInlineSnapshot(`
        Object {
          ".stackblitzrc": "{}",
          "index.html": "<!doctype html>
        <html lang=\\"en\\">
          <head>
            <meta charset=\\"UTF-8\\" />
            <link rel=\\"icon\\" type=\\"image/svg+xml\\" href=\\"/vite.svg\\" />
            <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />
            <title>Vite + React + TS</title>
          </head>
          <body>
            <div id=\\"root\\"></div>
            <script type=\\"module\\" src=\\"/src/index.tsx\\"></script>
          </body>
        </html>",
          "package.json": "{
          \\"name\\": \\"vite-react-typescript-starter\\",
          \\"private\\": true,
          \\"version\\": \\"0.0.0\\",
          \\"type\\": \\"module\\",
          \\"scripts\\": {
            \\"dev\\": \\"vite\\",
            \\"build\\": \\"tsc && vite build\\",
            \\"preview\\": \\"vite preview\\"
          },
          \\"dependencies\\": {},
          \\"devDependencies\\": {
            \\"@types/react\\": \\"^17\\",
            \\"@types/react-dom\\": \\"^17\\",
            \\"typescript\\": \\"~4.7.0\\",
            \\"@vitejs/plugin-react\\": \\"^4.2.0\\",
            \\"vite\\": \\"^5.0.0\\"
          }
        }",
          "src/App.tsx": "import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import { Example } from './example';

        const App = () => {
            return (
              <FluentProvider theme={webLightTheme}>
                <Example />
              </FluentProvider>
            );
        };

        export default App;",
          "src/example.tsx": "
                  import * as React from 'react';
                  import { Text } from '@proj/react-components';

                  export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
                
        export { DefaultTitle as Example };
        ",
          "src/index.tsx": "import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App';

        const root = createRoot(document.getElementById('root') as HTMLElement);

        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );",
          "tsconfig.json": "{
          \\"compilerOptions\\": {
            \\"target\\": \\"ES2020\\",
            \\"useDefineForClassFields\\": true,
            \\"lib\\": [
              \\"ES2020\\",
              \\"DOM\\",
              \\"DOM.Iterable\\"
            ],
            \\"module\\": \\"ESNext\\",
            \\"skipLibCheck\\": true,
            \\"moduleResolution\\": \\"node\\",
            \\"allowImportingTsExtensions\\": true,
            \\"resolveJsonModule\\": true,
            \\"isolatedModules\\": true,
            \\"noEmit\\": true,
            \\"jsx\\": \\"react-jsx\\",
            \\"strict\\": true,
            \\"noUnusedLocals\\": true,
            \\"noUnusedParameters\\": true,
            \\"noFallthroughCasesInSwitch\\": true
          },
          \\"include\\": [
            \\"src\\"
          ],
          \\"references\\": [
            {
              \\"path\\": \\"./tsconfig.node.json\\"
            }
          ]
        }",
          "tsconfig.node.json": "{
          \\"compilerOptions\\": {
            \\"composite\\": true,
            \\"skipLibCheck\\": true,
            \\"module\\": \\"ESNext\\",
            \\"moduleResolution\\": \\"bundler\\",
            \\"allowSyntheticDefaultImports\\": true
          },
          \\"include\\": [
            \\"vite.config.ts\\"
          ]
        }",
          "vite.config.ts": "import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'

        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [react()],
        })",
        }
      `);
    });
  });

  describe(`extension params`, () => {
    it(`should re-export the story as Example from generated example.tsx`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
      });

      expect(actual['src/example.tsx']).toContain(`export { DefaultTitle as Example };`);
    });

    it(`should keep FluentProvider in App.tsx by default`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
      });

      expect(actual['src/App.tsx']).toContain(
        "import { FluentProvider, webLightTheme } from '@fluentui/react-components';",
      );
      expect(actual['src/App.tsx']).toContain("import { Example } from './example';");
    });

    it(`should merge devDependencies into Vite package.json`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        devDependencies: { tailwindcss: '^4.0.0', '@tailwindcss/vite': '^4.0.0' },
      });

      const pkg = JSON.parse(actual['package.json']);
      expect(pkg.devDependencies.tailwindcss).toBe('^4.0.0');
      expect(pkg.devDependencies['@tailwindcss/vite']).toBe('^4.0.0');
      expect(pkg.devDependencies.vite).toBe('^5.0.0');
      expect(pkg.dependencies.tailwindcss).toBeUndefined();
    });

    it(`should merge devDependencies into CRA package.json`, () => {
      const actual = scaffold.cra({
        provider: 'stackblitz-cloud',
        bundler: 'cra',
        ...config,
        devDependencies: { tailwindcss: '^4.0.0' },
      });

      const pkg = JSON.parse(actual['package.json']);
      expect(pkg.devDependencies.tailwindcss).toBe('^4.0.0');
      expect(pkg.devDependencies['react-scripts']).toBe('^5.0.0');
    });
  });

  describe(`transformFiles`, () => {
    it(`should patch an existing generated file`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        transformFiles: files => ({
          ...files,
          'vite.config.ts': files['vite.config.ts'].replace('react()', 'react(), tailwindcss()'),
        }),
      });

      expect(actual['vite.config.ts']).toContain('plugins: [react(), tailwindcss()]');
    });

    it(`should add a new file`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        transformFiles: files => ({ ...files, 'extra.txt': 'hello' }),
      });

      expect(actual['extra.txt']).toBe('hello');
      expect(actual['vite.config.ts']).toBeDefined();
    });

    it(`should drop a file when the returned map omits its key`, () => {
      const actual = scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        transformFiles: files => {
          const { 'index.html': _dropped, ...rest } = files;
          return rest;
        },
      });

      expect(actual['index.html']).toBeUndefined();
      expect(actual['src/App.tsx']).toBeDefined();
    });

    it(`should expose context to the callback`, () => {
      let captured: unknown;
      scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        requiredDependencies: { 'some-pkg': '^1.0.0' },
        optionalDependencies: { react: '^18' },
        devDependencies: { tailwindcss: '^4.0.0' },
        transformFiles: (files, ctx) => {
          captured = ctx;
          return files;
        },
      });

      expect(captured).toEqual({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        storyExportToken: 'DefaultTitle',
        storyFile: config.storyFile,
        dependencies: {},
        requiredDependencies: { 'some-pkg': '^1.0.0' },
        optionalDependencies: { react: '^18' },
        devDependencies: { tailwindcss: '^4.0.0' },
      });
    });

    it(`should see provider-specific extras in the input map (.stackblitzrc)`, () => {
      let capturedKeys: string[] = [];
      scaffold.vite({
        provider: 'stackblitz-cloud',
        bundler: 'vite',
        ...config,
        transformFiles: files => {
          capturedKeys = Object.keys(files);
          return files;
        },
      });

      expect(capturedKeys).toContain('.stackblitzrc');
      expect(capturedKeys).toContain('vite.config.ts');
    });
  });

  describe('applyCssModuleTransform (via scaffold.vite)', () => {
    const baseConfig = {
      bundler: 'vite' as const,
      provider: 'stackblitz-cloud' as const,
      dependencies: {},
      storyExportToken: 'Default',
      storyFile: `
        import * as React from 'react';
        import styles from './button.module.css';

        export const Default = () => <div className={styles.root}>hello</div>;
      `,
      description: 'test',
      title: 'test',
      requiredDependencies: {},
      optionalDependencies: {},
      devDependencies: {},
    };

    it('should not apply CSS module transform when cssModuleSources is absent', () => {
      const result = scaffold.vite(baseConfig);

      expect(result['src/styles/button.module.css']).toBeUndefined();
      expect(result['src/App.tsx']).not.toContain('./styles/tokens.css');
    });

    it('should add CSS module files under src/styles/', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [{ name: 'button.module.css', source: '.root { color: red; }' }],
        },
      });

      expect(result['src/styles/button.module.css']).toBe('.root { color: red; }');
    });

    it('should add tokens.css under src/styles/ when tokensSource is provided', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [{ name: 'button.module.css', source: '.root { color: red; }' }],
          tokensSource: ':root { --my-token: blue; }',
        },
      });

      expect(result['src/styles/tokens.css']).toBe(':root { --my-token: blue; }');
    });

    it('should prepend tokens.css import to App.tsx when tokensSource is provided', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [],
          tokensSource: ':root { --my-token: blue; }',
        },
      });

      expect(result['src/App.tsx'].startsWith("import './styles/tokens.css';")).toBe(true);
    });

    it('should not prepend tokens.css import when tokensSource is absent', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [{ name: 'button.module.css', source: '.root {}' }],
        },
      });

      expect(result['src/App.tsx']).not.toContain('./styles/tokens.css');
    });

    it('should rewrite relative module.css imports to ./styles/<basename>', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [{ name: 'button.module.css', source: '.root {}' }],
        },
      });

      expect(result['src/example.tsx']).toContain("from './styles/button.module.css'");
      expect(result['src/example.tsx']).not.toContain('./button.module.css');
    });

    it('should rewrite deeply nested relative imports to ./styles/<basename>', () => {
      const storyFile = `import styles from '../../components/button.module.css';\nexport const Default = () => <div className={styles.root} />;`;
      const result = scaffold.vite({
        ...baseConfig,
        storyFile,
        cssModuleSources: {
          cssModules: [{ name: 'button.module.css', source: '.root {}' }],
        },
      });

      expect(result['src/example.tsx']).toContain("'./styles/button.module.css'");
    });

    it('should include all provided CSS modules under src/styles/', () => {
      const result = scaffold.vite({
        ...baseConfig,
        cssModuleSources: {
          cssModules: [
            { name: 'button.module.css', source: '.root { color: red; }' },
            { name: 'card.module.css', source: '.root { color: blue; }' },
          ],
        },
      });

      expect(result['src/styles/button.module.css']).toBe('.root { color: red; }');
      expect(result['src/styles/card.module.css']).toBe('.root { color: blue; }');
    });
  });
});
