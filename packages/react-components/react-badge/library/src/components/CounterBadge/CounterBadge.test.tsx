import * as React from 'react';
import '@testing-library/jest-dom';
import { CounterBadge } from './CounterBadge';
import { render, renderHook } from '@testing-library/react';
import { makeStyles } from '@griffel/react';
import { isConformant } from '../../testing/isConformant';

// eslint-disable-next-line @griffel/styles-file -- Test-only atomic rule for hidden-class assertions.
const useHiddenStyles = makeStyles({ hidden: { display: 'none' } });

const renderBadge = (ui: React.ReactElement) => {
  const result = render(ui);
  const { result: styles } = renderHook(useHiddenStyles);
  // Compare the atomic display rule without Griffel's merged-class metadata.
  const hiddenClassName = styles.current.hidden
    .split(' ')
    .filter(className => !className.startsWith('___'))
    .join(' ');
  return { ...result, hiddenClassName };
};

describe('CounterBadge', () => {
  isConformant({
    Component: CounterBadge,
    displayName: 'CounterBadge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const { container } = render(<CounterBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each([undefined, 0, 7, 100])('preserves and shows an explicit numeric zero child with count=%s', count => {
    const { getByTestId, hiddenClassName } = renderBadge(
      <CounterBadge count={count} data-testid="badge">
        {0}
      </CounterBadge>,
    );

    expect(getByTestId('badge')).toHaveTextContent(/^0$/);
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });

  it.each(['0', 'Custom content'])('preserves and shows explicit children %s', children => {
    const { getByTestId, hiddenClassName } = renderBadge(
      <CounterBadge count={7} data-testid="badge">
        {children}
      </CounterBadge>,
    );

    expect(getByTestId('badge')).toHaveTextContent(children);
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });

  it.each([undefined, null, false, ''])('uses count content for empty children %s', children => {
    const { getByTestId, hiddenClassName } = renderBadge(
      <CounterBadge count={7} data-testid="badge">
        {children}
      </CounterBadge>,
    );

    expect(getByTestId('badge')).toHaveTextContent(/^7$/);
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });

  it.each([undefined, null, false, ''])('hides a zero count with empty children %s', children => {
    const { getByTestId, hiddenClassName } = renderBadge(<CounterBadge data-testid="badge">{children}</CounterBadge>);

    expect(getByTestId('badge')).toBeEmptyDOMElement();
    expect(getByTestId('badge')).toHaveClass(hiddenClassName);
  });

  it('shows a zero count when showZero is set', () => {
    const { getByTestId, hiddenClassName } = renderBadge(<CounterBadge showZero data-testid="badge" />);

    expect(getByTestId('badge')).toHaveTextContent(/^0$/);
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });

  it('formats an overflowing count', () => {
    const { getByTestId, hiddenClassName } = renderBadge(
      <CounterBadge count={100} overflowCount={99} data-testid="badge" />,
    );

    expect(getByTestId('badge')).toHaveTextContent(/^99\+$/);
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });

  it('shows a dot without count content', () => {
    const { getByTestId, hiddenClassName } = renderBadge(<CounterBadge count={7} dot data-testid="badge" />);

    expect(getByTestId('badge')).toBeEmptyDOMElement();
    expect(getByTestId('badge')).not.toHaveClass(hiddenClassName);
  });
});
