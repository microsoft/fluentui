import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { fuiSelector } from '@fluentui/react-utilities';
import { TreeItem } from './TreeItem';
import { isConformant } from '../../testing/isConformant';
import type { TreeItemProps } from './TreeItem.types';
import { treeItemClassNames } from './useTreeItemStyles.styles';
import { Tree } from '../../Tree';
import { treeItemLevelToken } from '../../utils/tokens';

describe('TreeItem', () => {
  isConformant<TreeItemProps>({
    Component: TreeItem,
    displayName: 'TreeItem',
    renderOptions: { wrapper: ({ children }) => <Tree>{children}</Tree> },
    getTargetElement(renderResult, attr) {
      // `treeItemClassNames.root` is the group marker after DECISIONS.md D16.1/D16.5, and
      // `'.' + 'group/fui-tree-item'` is an invalid SELECTOR — `fuiSelector()` escapes the `/`.
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
      return renderResult.container.querySelector(fuiSelector(treeItemClassNames.root)) ?? renderResult.container;
    },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (now a default test) replaces it: it
    // asserts the group marker IS stamped and is never `classList[0]` (D16.2 / D16.6). The
    // `has-static-classnames` testOptions that fed the deleted test went with it.
    disabledTests: ['component-has-static-classnames-object', 'consistent-callback-args', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <Tree>
        <TreeItem value="1" itemType="leaf">
          Default TreeItem
        </TreeItem>
      </Tree>,
    );
    expect(result.container.firstChild).toMatchSnapshot();
  });
  it('should not update open state when the TreeItem is a leaf', () => {
    const handleOpenChange = jest.fn();
    const result = render(
      <Tree onOpenChange={handleOpenChange}>
        <TreeItem onOpenChange={handleOpenChange} itemType="leaf">
          Default TreeItem
        </TreeItem>
      </Tree>,
    );
    fireEvent.click(result.getByText('Default TreeItem'));
    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it('should set the level CSS variable via inline style for levels greater than 10', () => {
    const depth = 12;
    const openItems: string[] = [];
    const renderNestedTree = (current: number): React.ReactElement => {
      if (current > 1) {
        openItems.push(`item-${current}`);
      }
      return (
        <TreeItem value={`item-${current}`} itemType={current === 1 ? 'leaf' : 'branch'}>
          <span>{`level ${current}`}</span>
          {current > 1 ? <Tree>{renderNestedTree(current - 1)}</Tree> : null}
        </TreeItem>
      );
    };
    const treeContent = renderNestedTree(depth);

    const result = render(<Tree defaultOpenItems={openItems}>{treeContent}</Tree>);

    // `treeItemClassNames.root` is the group marker after DECISIONS.md D16.1/D16.5, so the
    // selector needs `fuiSelector()` to escape the `/` (see `getTargetElement` above).
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
    const treeItems = result.container.querySelectorAll<HTMLElement>(fuiSelector(treeItemClassNames.root));
    expect(treeItems).toHaveLength(depth);

    // Levels 1..10 are handled by static classes and should not set the inline CSS variable
    // Levels > 10 fall back to an inline CSS variable for the indentation
    treeItems.forEach(item => {
      const ariaLevel = Number(item.getAttribute('aria-level'));
      const inlineLevel = item.style.getPropertyValue(treeItemLevelToken);
      if (ariaLevel > 10) {
        expect(inlineLevel).toBe(String(ariaLevel));
      } else {
        expect(inlineLevel).toBe('');
      }
    });
  });
});
