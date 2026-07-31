import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { TreeItemPersonaLayout } from './TreeItemPersonaLayout';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProvider } from '../../contexts';

const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <TreeItemProvider
    value={{
      value: '',
      selectionRef: React.createRef(),
      layoutRef: React.createRef(),
      subtreeRef: React.createRef(),
      actionsRef: React.createRef(),
      expandIconRef: React.createRef(),
      treeItemRef: React.createRef(),
      isActionsVisible: true,
      isAsideVisible: true,
      itemType: 'leaf',
      open: false,
      checked: false,
    }}
  >
    {children}
  </TreeItemProvider>
);

describe('TreeItemPersonaLayout', () => {
  isConformant({
    Component: TreeItemPersonaLayout,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TreeItemPersonaLayout',
    disabledTests: [
      // Was disabled because aside and actions cannot be visible at the same time; it is now
      // disabled for a stronger reason — `component-has-static-classnames-object` asserts the
      // `fui-<Component>__<slot>` BEM format DECISIONS.md D16.1 removed.
      // `component-has-group-marker` (now a default test) replaces it: it asserts the group marker IS
      // stamped and is never `classList[0]` (D16.2 / D16.6).
      'component-has-static-classnames-object',
      // `classname-overrides-win` (extraTests below) pins the styling override contract
      // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
      // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    requiredProps: {
      description: 'description',
      expandIcon: 'expandIcon',
      actions: 'actions',
      aside: 'aside',
      selector: {},
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemPersonaLayout>Default TreeItemPersonaLayout</TreeItemPersonaLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
