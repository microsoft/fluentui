import * as React from 'react';
import { makeStyles, tokens, Button, shorthands } from '@fluentui/react-components';
import { OpenRegular } from '@fluentui/react-icons';
import { Fade } from '@fluentui/react-motion-components-preview';

const exampleCode = `import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Fade } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  card: {
    padding: '24px 32px',
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    fontSize: '16px',
    textAlign: 'center',
  },
});

export default function Example() {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px' }}>
      <Fade visible={visible}>
        <div className={classes.card}>Hello, Motion! ✨</div>
      </Fade>
      <Button appearance="primary" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
}`;

const useClasses = makeStyles({
  wrapper: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    border: `2px solid ${tokens.colorBrandStroke1}`,
    overflow: 'hidden',
    marginBottom: '32px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  headerTitle: {
    margin: '0',
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  body: {
    display: 'flex',
    gap: '0',
    '@media (max-width: 700px)': {
      flexDirection: 'column',
    },
  },
  demoPane: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '24px',
    minWidth: '200px',
    flex: '0 0 auto',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (max-width: 700px)': {
      borderRight: 'none',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 24px',
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    boxShadow: tokens.shadow4,
  },
  codePane: {
    flex: '1 1 auto',
    minWidth: '0',
    padding: '16px 20px',
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'auto',
  },
  code: {
    display: 'block',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'pre',
    margin: '0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  prereqs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    alignItems: 'center',
  },
  prereqCode: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase100,
    backgroundColor: tokens.colorNeutralBackground4,
    padding: '2px 6px',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
});

const stackblitzFiles: Record<string, string> = {
  '.stackblitzrc': JSON.stringify({}),
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fluent Motion Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
  'src/index.tsx': `import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Example from './example';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <Example />
    </FluentProvider>
  </React.StrictMode>,
);`,
  'src/example.tsx': exampleCode,
  'tsconfig.json': JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
      },
      include: ['src'],
    },
    null,
    2,
  ),
  'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })`,
  'package.json': JSON.stringify(
    {
      name: 'fluent-motion-example',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: { dev: 'vite', build: 'tsc && vite build', preview: 'vite preview' },
      dependencies: {
        react: '^18',
        'react-dom': '^18',
        '@fluentui/react-components': '^9.0.0',
        '@fluentui/react-motion-components-preview': 'latest',
      },
      devDependencies: {
        '@types/react': '^18',
        '@types/react-dom': '^18',
        '@vitejs/plugin-react': '^4.2.0',
        typescript: '~5.0.0',
        vite: '^5.0.0',
      },
    },
    null,
    2,
  ),
};

function openInStackBlitz() {
  const form = document.createElement('form');
  form.method = 'post';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${encodeURIComponent('src/example.tsx')}`;

  const addField = (name: string, value: string) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addField('project[template]', 'node');
  addField('project[title]', 'Fluent Motion Example');
  addField('project[description]', '# Quick start example for @fluentui/react-motion');

  Object.entries(stackblitzFiles).forEach(([path, content]) => {
    addField(`project[files][${path}]`, content);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

const codeSnippet = `import { Fade } from '@fluentui/react-motion-components-preview';

function MyComponent() {
  const [show, setShow] = React.useState(true);
  return (
    <>
      <Button onClick={() => setShow(!show)}>Toggle</Button>
      <Fade visible={show}>
        <div>Hello, Motion! ✨</div>
      </Fade>
    </>
  );
}`;

export const MotionIntroDemo: React.FC = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3 className={classes.headerTitle}>Get started in 30 seconds</h3>
        <Button appearance="subtle" icon={<OpenRegular />} size="small" onClick={openInStackBlitz}>
          Try in StackBlitz
        </Button>
      </div>
      <div className={classes.body}>
        <div className={classes.demoPane}>
          <Fade visible={visible}>
            <div className={classes.card}>Hello, Motion! ✨</div>
          </Fade>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </div>
        <div className={classes.codePane}>
          <code className={classes.code}>{codeSnippet}</code>
        </div>
      </div>
      <div className={classes.footer}>
        <span className={classes.prereqs}>
          <strong>Requires:</strong>
          <span className={classes.prereqCode}>@fluentui/react-components</span>+
          <span className={classes.prereqCode}>@fluentui/react-motion-components-preview</span>
        </span>
        <span>
          Or skip setup — click <strong>Try in StackBlitz</strong> for a ready-to-go playground.
        </span>
      </div>
    </div>
  );
};
