import * as React from 'react';
import { print, test } from './index';
import { render } from '@testing-library/react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { ProviderContext } from '@fluentui/react-shared-contexts';

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

const Test = ({ id }: { id?: string }) => {
  const styles1 = useStyles1();
  const styles2 = useStyles2();
  const styles3 = useStyles3();
  const styles = mergeClasses('static-class', styles1.root, styles1.paddingLeft, styles2.paddingRight, styles3.display);
  return <div data-testid={id} className={styles} />;
};

const rtlWrapper: React.FC = ({ children }) => (
  <ProviderContext.Provider value={{ dir: 'rtl', targetDocument: document }}>{children}</ProviderContext.Provider>
);

describe('jest-serializer-make-styles', () => {
  it('should check styles', () => {
    expect(render(<Test id="test" />).getByTestId('test')).toHaveStyle({
      display: 'none',
      paddingLeft: '10px',
      paddingRight: '20px',
    });
    expect(render(<Test id="rtl-test" />, { wrapper: rtlWrapper }).getByTestId('rtl-test')).toHaveStyle({
      display: 'none',
      paddingLeft: '20px',
      paddingRight: '10px',
    });
  });

  it('renders without generated classes', () => {
    expect(render(<Test />).container.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
      />
    `);
    expect(render(<Test />, { wrapper: rtlWrapper }).container.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
      />
    `);
  });
});

expect.addSnapshotSerializer({ print, test });
