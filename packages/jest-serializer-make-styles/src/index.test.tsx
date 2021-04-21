import '@testing-library/jest-dom';
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

const Test = () => {
  const styles1 = useStyles1();
  const styles2 = useStyles2();
  const styles3 = useStyles3();
  return (
    <div
      data-testid="test"
      className={mergeClasses('static-class', styles1.root, styles1.paddingLeft, styles2.paddingRight, styles3.display)}
    />
  );
};

const rtlWrapper: React.FC = ({ children }) => (
  <ProviderContext.Provider value={{ dir: 'rtl' }}>{children}</ProviderContext.Provider>
);

describe('jest-serializer-make-styles', () => {
  it('should check styles', () => {
    expect(render(<Test />).getByTestId('test')).toHaveStyle({
      display: 'none',
      paddingLeft: '10px',
      paddingRight: '20px',
    });
  });

  it('renders without generated classes', () => {
    const { container } = render(<Test />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
        data-testid="test"
      />
    `);
  });
  it('renders without generated classes rtl', () => {
    const { container } = render(<Test />, { wrapper: rtlWrapper });
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="static-class"
        data-testid="test"
      />
    `);
  });
});

expect.addSnapshotSerializer({ print, test });
