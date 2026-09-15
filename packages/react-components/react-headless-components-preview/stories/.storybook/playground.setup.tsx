import * as React from 'react';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill/shadowless';
import { Provider } from '@fluentui/react-headless-components-preview/provider';
import { definePlaygroundSetup } from '@fluentui/react-storybook-addon-playground/setup';

import './tokens.css';

polyfillBodyAndObserve();

type HeadlessPlaygroundTheme = 'light' | 'dark';

const defaultCode = `import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview/button';

export default () => {
  const [count, setCount] = React.useState(0);

  return (
    <Button
      onClick={() => setCount(count + 1)}
      style={{
        height: 32,
        padding: '0 14px',
        border: 0,
        borderRadius: 999,
        background: 'var(--accent)',
        color: 'var(--accent-contrast)',
        cursor: 'pointer',
      }}
    >
      Clicked {count} times
    </Button>
  );
};
`;

export default definePlaygroundSetup<HeadlessPlaygroundTheme>({
  title: 'Fluent UI Playground',
  subtitle: 'Headless',
  defaultCode,
  themes: [
    { id: 'light', label: 'Light', value: 'light', dark: false },
    { id: 'dark', label: 'Dark', value: 'dark', dark: true },
  ],
  render: ({ Component, theme }) => (
    <Provider>
      <div data-theme={theme ?? 'light'} style={{ minHeight: '100%', background: 'var(--bg)', color: 'var(--text)' }}>
        <Component />
      </div>
    </Provider>
  ),
});
