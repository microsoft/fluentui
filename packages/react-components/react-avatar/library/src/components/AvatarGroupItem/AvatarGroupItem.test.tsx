import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { render, screen } from '@testing-library/react';
import { AvatarGroupItem } from './AvatarGroupItem';
import { AvatarGroupContext } from '../../contexts';
import { isConformant } from '../../testing/isConformant';

const testId = 'testId';

const ContextWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AvatarGroupContext.Provider value={{ isOverflow: true }}>{children}</AvatarGroupContext.Provider>
);

describe('AvatarGroupItem', () => {
  isConformant({
    Component: AvatarGroupItem,
    displayName: 'AvatarGroupItem',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because AvatarGroupItem no longer
    // publishes BEM statics (DECISIONS.md D16.1). Its sub-tests hard-code the
    // `fui-AvatarGroupItem` / `fui-AvatarGroupItem__<slot>` format (defaultTests.tsx:244-245,
    // 277), so it fails under the retained-constant policy just as it would under outright
    // deletion (D16.6). `component-has-group-marker` (now a default test) is its replacement.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    primarySlot: 'avatar',
    renderOptions: {
      wrapper: ContextWrapper,
    },
  });

  it('renders only an avatar when context provides false for isOverflow', () => {
    render(
      <AvatarGroupContext.Provider value={{ isOverflow: false }}>
        <AvatarGroupItem data-testid={testId} name="Katri Athokas" />
      </AvatarGroupContext.Provider>,
    );

    expect(screen.getByTestId(testId).textContent).toBe('KA');
  });

  it('renders a label and an avatar when context provides true for isOverflow', () => {
    render(
      <AvatarGroupContext.Provider value={{ isOverflow: true }}>
        <AvatarGroupItem name="Katri Athokas" overflowLabel={<span data-testid={testId}>Test Label</span>} />
      </AvatarGroupContext.Provider>,
    );

    expect(screen.getByTestId(testId).textContent).toBe('Test Label');
  });
});
