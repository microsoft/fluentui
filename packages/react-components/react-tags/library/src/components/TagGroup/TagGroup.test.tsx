import '@testing-library/jest-dom';
import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { TagGroup } from './TagGroup';
import { isConformant } from '../../testing/isConformant';
import { render, fireEvent } from '@testing-library/react';
import { Tag } from '../Tag/index';

describe('TagGroup', () => {
  isConformant({
    Component: TagGroup,
    displayName: 'TagGroup',
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

  it('should invoke onDismiss when clicking on children Tag', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    fireEvent.click(getByRole('button'));

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('should invoke onDismiss on children Tag delete keyDown', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    fireEvent.keyDown(getByRole('button'), { key: 'Delete' });

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('if disabled, should disable children Tags', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    expect(getByRole('button')).toBeDisabled();
  });

  it('if disabled, should override children Tags disabled prop', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value={'1'} disabled={false} dismissible />
      </TagGroup>,
    );

    expect(getByRole('button')).toBeDisabled();
  });
});
