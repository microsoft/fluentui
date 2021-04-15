import '@testing-library/jest-dom';
import * as React from 'react';
import { print, test } from './index';
import { render } from '@testing-library/react'; // (or /dom, /vue, ...)
import { makeStyles, ax } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const useStyles1 = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
  }),
  paddingLeft: {
    paddingLeft: '10px',
  },
});
const useStyles2 = makeStyles({
  paddingRight: {
    paddingRight: '20px',
  },
});
const useStyles3 = makeStyles({
  display: {
    display: 'none',
  },
});

const Test = () => {
  const styles1 = useStyles1();
  const styles2 = useStyles2();
  const styles3 = useStyles3();
  return (
    <div
      data-testid="test"
      className={ax('static-class', styles1.root, styles1.paddingLeft, styles2.paddingRight, styles3.display)}
    />
  );
};

const wrapper: React.FC = ({ children }) => <FluentProvider theme={webLightTheme}>{children}</FluentProvider>;
const rtlWrapper: React.FC = ({ children }) => (
  <FluentProvider dir="rtl" theme={webLightTheme}>
    {children}
  </FluentProvider>
);

describe('jest-serializer-make-styles', () => {
  it('should check styles', () => {
    expect(render(<Test />, { wrapper }).getByTestId('test')).toHaveStyle({
      display: 'none',
      paddingLeft: '10px',
      paddingRight: '20px',
    });
  });

  it('renders without generated classes', () => {
    const { container } = render(<Test />, { wrapper });
    expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
        data-testid="test"
      />
    `);
  });
  it('renders without generated classes rtl', () => {
    const { container } = render(<Test />, { wrapper: rtlWrapper });
    expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
        data-testid="test"
      />
    `);
  });
});

expect.addSnapshotSerializer({ print, test });
