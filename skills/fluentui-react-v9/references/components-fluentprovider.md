# Components/FluentProvider

The FluentProvider transforms a passed theme to CSS variables and passes other settings to Fluent UI components.

## Props

| Name                        | Type                                                                                                                                                                                                                                      | Required | Default | Description                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `as`                        | `"div"`                                                                                                                                                                                                                                   | No       |         |                                                                  |
| `applyStylesToPortals`      | `boolean`                                                                                                                                                                                                                                 | No       | true    | Passes styles applied to a component down to portals if enabled. |
| `customStyleHooks_unstable` | `Partial<{ useAccordionHeaderStyles_unstable: CustomStyleHook; useAccordionItemStyles_unstable: CustomStyleHook; useAccordionPanelStyles_unstable: CustomStyleHook; ... 189 more ...; useVirtualizerStyles_unstable: CustomStyleHook; }>` | No       |         | Sets the hooks for custom styling components.                    |
| `dir`                       | `"ltr" "rtl"`                                                                                                                                                                                                                             | No       |         | Sets the direction of text & generated styles.                   |
| `targetDocument`            | `Document`                                                                                                                                                                                                                                | No       |         | Provides the document, can be undefined during SSR render.       |
| `theme`                     | `Partial<Theme>`                                                                                                                                                                                                                          | No       |         | Sets the theme used in a scope.                                  |
| `overrides_unstable`        | `OverridesContextValue`                                                                                                                                                                                                                   | No       |         |                                                                  |
| `ref`                       | `Ref<HTMLDivElement>`                                                                                                                                                                                                                     | No       |         |                                                                  |

## Examples

### Apply Styles To Portals

`applyStylesToPortals` controls if styles from FluentProvider should be applied to components that use Portal component.

```tsx
import {
  createDOMRenderer,
  makeStyles,
  tokens,
  FluentProvider,
  Portal,
  RendererProvider,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import * as ReactDOM from 'react-dom';

const useStyles = makeStyles({
  provider: {
    border: `3px solid ${tokens.colorBrandForeground2}`,
    borderRadius: '5px',
    padding: '5px',

    backgroundColor: tokens.colorBrandBackground2,
    marginBottom: '20px',
  },
  portal: {
    border: `3x dotted ${tokens.colorPaletteDarkOrangeBorder2}`,
    padding: '5px',
  },
});

type FrameRendererProps = {
  children: (externalDocument: Document, renderer: ReturnType<typeof createDOMRenderer>) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;
  const renderer = React.useMemo(() => createDOMRenderer(contentDocument), [contentDocument]);

  React.useEffect(() => {
    if (contentDocument) {
      const el = contentDocument.createElement('div');
      contentDocument.body.appendChild(el);

      setContainer(el);
    }
  }, [contentDocument]);

  return (
    <>
      <iframe ref={setFrameRef} style={{ height: 300, width: 700, border: 'none' }} />
      {contentDocument && container && ReactDOM.createPortal(children(contentDocument, renderer), container)}
    </>
  );
};

const ApplyStylesToPortalsExample: React.FC<{ targetDocument?: Document }> = ({ targetDocument }) => {
  const styles = useStyles();

  return (
    <>
      <FluentProvider className={styles.provider} targetDocument={targetDocument}>
        <div>An element inside a provider</div>
        <Portal>
          <div className={styles.portal}>
            A portal created by FluentProvider with <code>applyStylesToPortals={`{true}`}</code>. Styles from
            FluentProvider are applied
          </div>
        </Portal>
      </FluentProvider>

      <FluentProvider className={styles.provider} applyStylesToPortals={false} targetDocument={targetDocument}>
        <div>An element inside a provider</div>
        <Portal>
          <div className={styles.portal}>
            A portal created by FluentProvider with <code>applyStylesToPortals={`{false}`}</code>. Styles from
            FluentProvider are not applied
          </div>
        </Portal>
      </FluentProvider>
    </>
  );
};

export const ApplyStylesToPortals = (): JSXElement => (
  // FrameRenderer is redundant this example, it's used only to render portals inside an iframe
  // to make them visible in Storybook
  <FrameRenderer>
    {(externalDocument, renderer) => (
      <RendererProvider renderer={renderer} targetDocument={externalDocument}>
        <ApplyStylesToPortalsExample targetDocument={externalDocument} />
      </RendererProvider>
    )}
  </FrameRenderer>
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  teamsDarkTheme,
  teamsLightTheme,
  tokens,
  webLightTheme,
  Button,
  FluentProvider,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  button: {
    marginTop: '5px',
  },
  provider: {
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  },
  text: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: '20px',
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();
  return (
    <>
      <div>
        <FluentProvider className={styles.provider} theme={webLightTheme}>
          <div className={styles.text}>Web Light Theme</div>
          <Button className={styles.button}>Web Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider className={styles.provider} theme={teamsLightTheme}>
          <div className={styles.text}>Teams Light Theme</div>
          <Button className={styles.button}>Teams Light Theme</Button>
        </FluentProvider>
      </div>
      <div>
        <FluentProvider className={styles.provider} theme={teamsDarkTheme}>
          <div className={styles.text}>Teams Dark Theme</div>
          <Button className={styles.button}>Teams Dark Theme</Button>
        </FluentProvider>
      </div>
    </>
  );
};
```

### Dir

A Fluent provider can render text left-to-right (LTR) or right-to-left (RTL).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, FluentProvider } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '300px',
  },
  text: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: '18px',
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  },
});

export const Dir = (): JSXElement => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.example}>
        <FluentProvider>
          <div className={styles.text}>Text left to right</div>
        </FluentProvider>
        <FluentProvider dir="rtl" lang="ar">
          <div className={styles.text}>نص من اليمين إلى اليسار</div>
        </FluentProvider>
      </div>
    </>
  );
};
```

### Frame

A FluentProvider does not cross an iframe boundary. To render into iframes pass a proper `Document` instance to `targetDocument` prop on FluentProvider & RendererProvider.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import * as ReactDOM from 'react-dom';
import {
  createDOMRenderer,
  makeStyles,
  tokens,
  Button,
  FluentProvider,
  RendererProvider,
} from '@fluentui/react-components';

const useExampleStyles = makeStyles({
  button: {
    marginTop: '5px',
  },
  text: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: '20px',
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  },
});

const useProviderStyles = makeStyles({
  provider: {
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  },
});

type FrameRendererProps = {
  children: (externalDocument: Document, renderer: ReturnType<typeof createDOMRenderer>) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;
  const renderer = React.useMemo(() => createDOMRenderer(contentDocument), [contentDocument]);

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{
          height: 100,
          width: 500,
          border: '3px dashed salmon',
          padding: 10,
        }}
        title="An example of Provider in iframe"
      />

      {contentDocument && ReactDOM.createPortal(children(contentDocument, renderer), contentDocument.body)}
    </>
  );
};

const Example: React.FC<{ children?: React.ReactNode }> = props => {
  const styles = useExampleStyles();

  return (
    <>
      <div className={styles.text}>{props.children}</div>
      <Button className={styles.button}>A button</Button>
    </>
  );
};

export const Frame = (): JSXElement => {
  const styles = useProviderStyles();

  return (
    <>
      <FluentProvider className={styles.provider}>
        <Example>Content rendered outside iframe</Example>
      </FluentProvider>

      <FrameRenderer>
        {(externalDocument, renderer) => (
          <RendererProvider renderer={renderer} targetDocument={externalDocument}>
            <FluentProvider className={styles.provider} targetDocument={externalDocument}>
              <Example>
                Content rendered <b>within</b> iframe
              </Example>
            </FluentProvider>
          </RendererProvider>
        )}
      </FrameRenderer>
    </>
  );
};
```

### Nested

A Fluent provider can be nested to override some or all of a tokens.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, webLightTheme, FluentProvider } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `5px solid ${tokens.colorBrandStroke1}`,
    borderRadius: '5px',
    margin: '5px',
  },
  text: {
    padding: '5px',
    fontSize: '18px',
  },
});

export const Nested = (): JSXElement => {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.example}>
        <div className={styles.text}>Web Light Theme using brand tokens</div>

        <FluentProvider
          theme={{
            colorBrandStroke1: '#780510',
            colorBrandBackground2: '#fa8072',
            colorBrandForeground2: '#780510',
          }}
        >
          <div className={styles.example}>
            <div className={styles.text}>Nested FluentProvider with partial theme</div>
          </div>
        </FluentProvider>
      </div>
    </FluentProvider>
  );
};
```
