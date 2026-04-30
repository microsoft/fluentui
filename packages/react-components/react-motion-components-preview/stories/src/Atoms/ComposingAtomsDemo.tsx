import * as React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { OpenRegular } from '@fluentui/react-icons';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { rotateAtom, blurAtom, scaleAtom } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  wrapper: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  title: {
    margin: 0,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  body: {
    display: 'flex',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  demoArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
    minHeight: '120px',
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  demoPane: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 220px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  demoBox: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'center',
  },
  codeArea: {
    flex: '1 1 auto',
    minWidth: 0,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    overflow: 'auto',
    '@media (max-width: 600px)': {
      borderLeft: 'none',
      borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    },
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'pre',
    margin: 0,
    display: 'block',
  },
});

const duration = 1000;
const exitDuration = 1000;
const easing = motionTokens.curveDecelerateMid;

// Custom "SpinBlur" — combines rotate + blur + scale
const SpinBlur = createPresenceComponent({
  enter: [
    rotateAtom({ direction: 'enter', duration, easing, axis: 'z', outAngle: -20, inAngle: 0 }),
    blurAtom({ direction: 'enter', duration, easing, outRadius: '8px', inRadius: '0px' }),
    scaleAtom({ direction: 'enter', duration, easing, outScale: 2 }),
  ],
  exit: [
    rotateAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: motionTokens.curveAccelerateMid,
      axis: 'z',
      outAngle: 90,
      inAngle: 0,
    }),
    blurAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: motionTokens.curveLinear,
      outRadius: '8px',
      inRadius: '0px',
    }),
    scaleAtom({ direction: 'exit', duration: exitDuration, easing: motionTokens.curveLinear, outScale: 0 }),
  ],
});

const codeSnippet = `const SpinBlur = createPresenceComponent({
  enter: [
    rotateAtom({ direction: 'enter', duration: 800, axis: 'z', outAngle: -20 }),
    blurAtom({ direction: 'enter', duration: 800, outRadius: '8px' }),
    scaleAtom({ direction: 'enter', duration: 800, outScale: 0.8 }),
  ],
  exit: [
    rotateAtom({ direction: 'exit', duration: 600, axis: 'z', outAngle: -20 }),
    blurAtom({ direction: 'exit', duration: 600, outRadius: '8px' }),
    scaleAtom({ direction: 'exit', duration: 600, outScale: 0.8 }),
  ],
});

// Usage — just like any presence component
<SpinBlur visible={isVisible}>
  <div>Your content</div>
</SpinBlur>`;

const stackblitzExampleCode = `import * as React from 'react';
import { makeStyles, tokens, Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createPresenceComponent } from '@fluentui/react-motion';
import { rotateAtom, blurAtom, scaleAtom } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '40px',
  },
  box: {
    padding: '24px 32px',
    backgroundColor: tokens.colorNeutralBackground3,
    border: \`1px solid \${tokens.colorNeutralStroke1}\`,
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 600,
    textAlign: 'center',
  },
});

const SpinBlur = createPresenceComponent({
  enter: [
    rotateAtom({ direction: 'enter', duration: 800, axis: 'z', outAngle: -20 }),
    blurAtom({ direction: 'enter', duration: 800, outRadius: '8px' }),
    scaleAtom({ direction: 'enter', duration: 800, outScale: 0.8 }),
  ],
  exit: [
    rotateAtom({ direction: 'exit', duration: 600, axis: 'z', outAngle: -20 }),
    blurAtom({ direction: 'exit', duration: 600, outRadius: '8px' }),
    scaleAtom({ direction: 'exit', duration: 600, outScale: 0.8 }),
  ],
});

export default function Example() {
  const classes = useClasses();
  const [visible, setVisible] = React.useState(true);

  return (
    <div className={classes.container}>
      <SpinBlur visible={visible}>
        <div className={classes.box}>SpinBlur ✨</div>
      </SpinBlur>
      <Button appearance="primary" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
}`;

const stackblitzFiles: Record<string, string> = {
  '.stackblitzrc': JSON.stringify({}),
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SpinBlur — Composing Motion Atoms</title>
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
  'src/example.tsx': stackblitzExampleCode,
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
      name: 'fluent-motion-spinblur-example',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: { dev: 'vite', build: 'tsc && vite build', preview: 'vite preview' },
      dependencies: {
        react: '^18',
        'react-dom': '^18',
        '@fluentui/react-components': '^9.0.0',
        '@fluentui/react-motion': 'latest',
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

function openInStackBlitz(doc: Document) {
  const form = doc.createElement('form');
  form.method = 'post';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${encodeURIComponent('src/example.tsx')}`;

  const addField = (name: string, value: string) => {
    const input = doc.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addField('project[template]', 'node');
  addField('project[title]', 'SpinBlur — Composing Motion Atoms');
  addField('project[description]', '# Custom presence component composed from rotateAtom + blurAtom + scaleAtom');

  Object.entries(stackblitzFiles).forEach(([path, content]) => {
    addField(`project[files][${path}]`, content);
  });

  doc.body.appendChild(form);
  form.submit();
  doc.body.removeChild(form);
}

export const ComposingAtomsDemo: React.FC = () => {
  const classes = useClasses();
  const { targetDocument } = useFluent();
  const [visible, setVisible] = React.useState(true);

  const handleToggle = React.useCallback(() => {
    setVisible(v => !v);
  }, []);

  const handleOpenStackBlitz = React.useCallback(() => {
    if (targetDocument) {
      openInStackBlitz(targetDocument);
    }
  }, [targetDocument]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h4 className={classes.title}>Custom "SpinBlur" — rotate + blur + scale</h4>
        <Button appearance="subtle" icon={<OpenRegular />} size="small" onClick={handleOpenStackBlitz}>
          Try in StackBlitz
        </Button>
      </div>
      <div className={classes.body}>
        <div className={classes.demoPane}>
          <div className={classes.demoArea}>
            <SpinBlur visible={visible}>
              <div className={classes.demoBox}>SpinBlur</div>
            </SpinBlur>
          </div>
          <div className={classes.buttonRow}>
            <Button appearance="primary" onClick={handleToggle}>
              {visible ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
        <div className={classes.codeArea}>
          <code className={classes.code}>{codeSnippet}</code>
        </div>
      </div>
    </div>
  );
};
