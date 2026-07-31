import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';
import type { TagProps } from './Tag.types';
import { render } from '@testing-library/react';

const requiredProps: TagProps = {
  dismissible: true,
  icon: 'i',
  media: 'media',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('Tag', () => {
  isConformant<TagProps>({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (now a default test) replaces it: it
    // asserts the group marker IS stamped and is never `classList[0]` (D16.2 / D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('should render root as a span', () => {
    const { getByTestId } = render(<Tag data-testid="testid">Tag</Tag>);
    expect(getByTestId('testid').tagName).toBe('SPAN');
  });

  it('should render root as a button for dismissible tag', () => {
    const { queryByRole } = render(<Tag dismissible>Tag</Tag>);
    expect(queryByRole('button')).not.toBe(null);
  });
});
