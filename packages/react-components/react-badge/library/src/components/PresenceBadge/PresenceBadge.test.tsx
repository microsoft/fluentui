import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { PresenceBadge } from './PresenceBadge';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import type { PresenceBadgeStatus } from './PresenceBadge.types';
import { DEFAULT_STRINGS as STATUS_LABELS } from './usePresenceBadge';

describe('PresenceBadge', () => {
  isConformant({
    Component: PresenceBadge,
    displayName: 'PresenceBadge',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts `presenceBadgeClassNames` still holds
    // `fui-PresenceBadge` / `fui-PresenceBadge__<slot>` strings AND that they are rendered.
    // Both are false by design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed
    // the export to `{ root }` and re-pointed it at the group marker.
    // `component-has-group-marker` (now a default test) is its replacement and asserts the contract that
    // actually holds now — including the D15.1 `classList[0]` invariant the static used to
    // satisfy incidentally (D16.2/D16.6).
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const { container } = render(<PresenceBadge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each(Object.keys(STATUS_LABELS) as PresenceBadgeStatus[])('renders correct aria label for "%s" status', status => {
    const { getByLabelText } = render(<PresenceBadge status={status} />);
    expect(getByLabelText(STATUS_LABELS[status])).toBeTruthy();
  });
});
