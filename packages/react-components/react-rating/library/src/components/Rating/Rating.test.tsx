import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Rating } from './Rating';

describe('Rating', () => {
  isConformant({
    Component: Rating,
    displayName: 'Rating',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: [
      // Statics removal (DECISIONS.md D16.1/D16.6). Rating no longer renders `fui-Rating`,
      // and `ratingClassNames` is now `{ root: 'group/fui-rating' }`, so all three
      // assertions in `component-has-static-classnames-object` — the export shape, the
      // `fui-<Component>` format and the rendered classes — no longer describe this
      // component. `component-has-group-marker` (now a default test) is its replacement: the group marker
      // is the sole public identity class now (D16.5).
      'component-has-static-classnames-object',
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });
  it('respects a default value', () => {
    const { getAllByRole } = render(<Rating defaultValue={3} />);
    const checkedItems = getAllByRole('radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems[0].getAttribute('value')).toBe('3');
    expect(checkedItems.length).toEqual(1);
  });
  it('only sets the selected rating item to checked', () => {
    const { getAllByRole } = render(<Rating value={3} />);
    const checkedItems = getAllByRole('radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems[0].getAttribute('value')).toBe('3');
    expect(checkedItems.length).toEqual(1);
  });
  it('renders the correct number of items', () => {
    const { getAllByRole } = render(<Rating max={10} />);
    const items = getAllByRole('radio');
    expect(items.length).toEqual(10);
  });
  it('calle onChange when a rating is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} />);
    const items = getAllByRole('radio');
    items[0].click();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('does not call onChange when a rating is clicked and the value is the same', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating value={3} onChange={onChange} />);
    const items = getAllByRole('radio');
    items[2].click();
    expect(onChange).toHaveBeenCalledTimes(0);
  });
  it('calls onChange with the correct value when a rating is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} />);
    const items = getAllByRole('radio');
    items[3].click();
    items[2].click();
    items[1].click();
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[0][1].value).toBe(4);
    expect(onChange.mock.calls[1][1].value).toBe(3);
    expect(onChange.mock.calls[2][1].value).toBe(2);
  });
  it('creates RadioItems with correct aria-labels', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={onChange} itemLabel={num => `item #${num}`} />);
    const items = getAllByRole('radio');
    expect(items[0].getAttribute('aria-label')).toBe('item #1');
    expect(items[1].getAttribute('aria-label')).toBe('item #2');
    expect(items[2].getAttribute('aria-label')).toBe('item #3');
  });
});
