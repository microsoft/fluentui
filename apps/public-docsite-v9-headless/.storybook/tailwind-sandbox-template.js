const sandboxApp = `import { Provider } from '@fluentui/react-headless-components-preview';
import { Example } from './example';

const App = () => (
  <Provider>
    <Example />
  </Provider>
);

export default App;
`;

const tailwindSandboxTemplate = {
  devDependencies: {
    tailwindcss: '^4.0.0',
    '@tailwindcss/vite': '^4.0.0',
  },
  transformFiles: (/** @type {Record<string, string>} */ files) => ({
    ...files,
    'src/index.css': '@import "tailwindcss";\n',
    'src/App.tsx': sandboxApp,
    'src/index.tsx': `import './index.css';\n${files['src/index.tsx']}`,
    'vite.config.ts': files['vite.config.ts']
      .replace(
        "import react from '@vitejs/plugin-react'",
        "import react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/vite'",
      )
      .replace('plugins: [react()]', 'plugins: [react(), tailwindcss()]'),
  }),
};

module.exports = { tailwindSandboxTemplate };
