import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { RatingDisplay } from './RatingDisplay';

describe('RatingDisplay', () => {
  isConformant({
    Component: RatingDisplay,
    displayName: 'RatingDisplay',
    requiredProps: { count: 1160, value: 4.5 },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });
  it('renders the correct number of items', () => {
    const { getByRole } = render(<RatingDisplay max={10} />);
    expect(getByRole('img').children.length).toEqual(10);
  });
  it('renders the valueText slot when a value is provided', () => {
    const { getByText } = render(<RatingDisplay value={3} />);
    const valueText = getByText('3');
    expect(valueText).toBeDefined();
    expect(valueText.classList.contains('fui-RatingDisplay__valueText')).toBeTruthy();
  });
  it('does not render the valueText slot when a value is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector('.fui-RatingDisplay__valueText')).toBeNull();
  });
  it('renders the countText slot when a count is provided', () => {
    const { getByText } = render(<RatingDisplay count={1160} />);
    const countText = getByText('1,160');
    expect(countText).toBeDefined();
    expect(countText.classList.contains('fui-RatingDisplay__countText')).toBeTruthy();
  });
  it('does not render the countText slot when a count is not provided', () => {
    const { container } = render(<RatingDisplay />);
    expect(container?.querySelector('.fui-RatingDisplay__countText')).toBeNull();
  });
  it('renders only one item when compact is true', () => {
    const { getByRole } = render(<RatingDisplay compact />);
    const items = getByRole('img');
    expect(items.getElementsByClassName('fui-RatingItem').length).toEqual(1);
  });
});
