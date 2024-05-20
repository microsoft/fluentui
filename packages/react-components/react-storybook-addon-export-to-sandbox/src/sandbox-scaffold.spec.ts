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
        import { DefaultTitle as Example } from './example';

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
        import { DefaultTitle as Example } from './example';

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
        import { DefaultTitle as Example } from './example';

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
        import { DefaultTitle as Example } from './example';

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
        import { DefaultTitle as Example } from './example';

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
});
