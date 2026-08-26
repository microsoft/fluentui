import * as React from 'react';
import { render } from '@testing-library/react';

import { Button } from './Button';

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('Button', () => {
  // Griffel gates the icon spacing on `!!state.root.children`
  // (react-button/src/components/Button/useButtonStyles.styles.ts:601). `data-empty` is the
  // windmod mirror of that one expression, so the two must agree case for case — including the
  // falsy-but-rendered values (`0`, `''`) that Badge deliberately counts instead.
  it('stamps data-empty on exactly the children Griffel treats as absent', () => {
    const { getByTestId } = render(
      <>
        <Button data-testid="text">Label</Button>
        <Button data-testid="zero">{0}</Button>
        <Button data-testid="emptyString">{''}</Button>
        <Button data-testid="none" />
        <Button data-testid="null">{null}</Button>
        <Button data-testid="false">{false}</Button>
        <Button data-testid="emptyArray">{[]}</Button>
      </>,
    );

    expect(getByTestId('text').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('zero').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('emptyString').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('none').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('null').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('false').hasAttribute('data-empty')).toBe(true);
    // An empty array is truthy, so Griffel keeps the spacing here — a child-counting predicate
    // would not.
    expect(getByTestId('emptyArray').hasAttribute('data-empty')).toBe(false);
  });

  // The falsy children never reach the DOM: `iconOnly` is
  // `Boolean(iconShorthand?.children && !props.children)` (useButton.ts:48) and renderButton
  // emits `{!iconOnly && state.root.children}`, so dropping the gap is what keeps the icon
  // centred rather than what strands it.
  it('renders no text for a falsy child beside an icon, so the dropped gap is correct', () => {
    const { getByTestId } = render(
      <>
        <Button data-testid="zero" icon={<Glyph />}>
          {0}
        </Button>
        <Button data-testid="emptyString" icon={<Glyph />}>
          {''}
        </Button>
        <Button data-testid="text" icon={<Glyph />}>
          Label
        </Button>
      </>,
    );

    expect(getByTestId('zero').textContent).toBe('');
    expect(getByTestId('zero').getAttribute('data-icon-only')).toBe('');
    expect(getByTestId('emptyString').textContent).toBe('');
    expect(getByTestId('emptyString').getAttribute('data-icon-only')).toBe('');

    expect(getByTestId('text').textContent).toBe('Label');
    expect(getByTestId('text').hasAttribute('data-icon-only')).toBe(false);
  });
});
