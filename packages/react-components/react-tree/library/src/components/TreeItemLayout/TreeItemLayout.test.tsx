import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { TreeItemLayout } from './TreeItemLayout';
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

describe('TreeItemLayout', () => {
  isConformant({
    Component: TreeItemLayout,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TreeItemLayout',
    disabledTests: [
      // This is disabled as aside and actions cannot be visible at the same time
      'component-has-static-classnames',
      'component-has-static-classnames-object',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
      // it was called with the consumer className last; this component now composes with
      // clsx and never calls mergeClasses, so the test can no longer observe the contract.
      // The guarantee itself is unchanged — clsx puts `root.className` last and the
      // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
      'make-styles-overrides-win',
    ],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    requiredProps: {
      iconAfter: 'iconAfter',
      iconBefore: 'iconBefore',
      expandIcon: 'expandIcon',
      actions: 'actions',
      aside: 'aside',
      selector: {},
    },
  });

  it('renders a default state', () => {
    const result = render(<TreeItemLayout>Default TreeItemLayout</TreeItemLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
