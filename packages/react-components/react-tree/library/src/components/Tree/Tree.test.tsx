import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemLayout } from '../TreeItemLayout/TreeItemLayout';
import { TreeItemPersonaLayout } from '../TreeItemPersonaLayout/TreeItemPersonaLayout';
import { treeItemLayoutClassNames } from '../TreeItemLayout/useTreeItemLayoutStyles.styles';

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
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
    // asserts the group marker IS stamped and is never `classList[0]` (D16.2 / D16.6).
    disabledTests: ['component-has-static-classnames-object', 'consistent-callback-args', 'make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tree>Default Tree</Tree>);
    expect(result.container).toMatchSnapshot();
  });
  it('should sync open state between Tree and TreeItem onOpenChange callback', () => {
    const handleOpenChange = jest.fn();

    const result = render(
      <Tree aria-label="Default" onOpenChange={handleOpenChange}>
        <TreeItem data-testid="tree-item" itemType="branch" open={true} onOpenChange={handleOpenChange}>
          parent
          <Tree>
            <TreeItem itemType="leaf">leaf</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>,
    );

    result.getByTestId('tree-item').click();

    expect(handleOpenChange).toHaveBeenNthCalledWith(1, expect.any(Object), expect.objectContaining({ open: false }));

    expect(handleOpenChange).toHaveBeenNthCalledWith(2, expect.any(Object), expect.objectContaining({ open: false }));
  });

  describe('selection control accessibility', () => {
    it.each([
      {
        case: 'multiselect',
        selectionMode: 'multiselect',
        role: 'checkbox',
        layout: <TreeItemLayout>Item 1</TreeItemLayout>,
        accessibleName: 'Item 1',
      },
      {
        case: 'single',
        selectionMode: 'single',
        role: 'radio',
        layout: <TreeItemLayout>Item 1</TreeItemLayout>,
        accessibleName: 'Item 1',
      },
      {
        case: 'TreeItemPersonaLayout',
        selectionMode: 'multiselect',
        role: 'checkbox',
        layout: <TreeItemPersonaLayout>Jane Doe</TreeItemPersonaLayout>,
        accessibleName: 'Jane Doe',
      },
    ] as const)('exposes a named $role selector ($case)', ({ selectionMode, role, layout, accessibleName }) => {
      render(
        <Tree aria-label="Tree" selectionMode={selectionMode}>
          <TreeItem itemType="leaf" value="item1">
            {layout}
          </TreeItem>
        </Tree>,
      );

      expect(screen.getByRole(role, { name: accessibleName })).toBeTruthy();
    });

    it.each([
      {
        case: 'TreeItemLayout',
        layout: <TreeItemLayout main={{ id: 'custom-main' }}>Item 1</TreeItemLayout>,
        mainId: 'custom-main',
        accessibleName: 'Item 1',
      },
      {
        case: 'TreeItemPersonaLayout',
        layout: <TreeItemPersonaLayout main={{ id: 'custom-persona-main' }}>Jane Doe</TreeItemPersonaLayout>,
        mainId: 'custom-persona-main',
        accessibleName: 'Jane Doe',
      },
    ] as const)('preserves a consumer-provided main ID ($case)', ({ layout, mainId, accessibleName }) => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            {layout}
          </TreeItem>
        </Tree>,
      );

      expect(screen.getByRole('checkbox', { name: accessibleName }).getAttribute('aria-labelledby')).toBe(mainId);
      expect(document.getElementById(mainId)?.textContent).toBe(accessibleName);
    });

    it('preserves a consumer-provided layout ID', () => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            <TreeItemLayout id="custom-layout" main={{ id: 'lower-priority-main-id' }}>
              Item 1
            </TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      const selector = screen.getByRole('checkbox', { name: 'Item 1' });
      const mainId = selector.getAttribute('aria-labelledby');
      const layout = document.getElementById('custom-layout');
      const main = document.getElementById('lower-priority-main-id');

      // The layout ROOT is still identifiable by class: its public identity class is the
      // named-group marker (DECISIONS.md D16.1/D16.5). `classList.contains` takes a TOKEN,
      // not a selector, so the `/` needs no escaping here — that is `fuiSelector`'s job.
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
      expect(layout?.classList.contains(treeItemLayoutClassNames.root)).toBe(true);
      expect(mainId).toBe('lower-priority-main-id');
      // The `main` SUB-SLOT has no public class handle any more — D16.1 removed
      // `fui-TreeItemLayout__main` deliberately. What this assertion was really checking is
      // that the consumer's id landed on the main slot rather than on some other element, so
      // it now checks that element's defining property: it holds the layout's label text.
      expect(main?.textContent).toBe('Item 1');
    });

    it('preserves a consumer-provided selector aria-label', () => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            <TreeItemLayout selector={{ 'aria-label': 'Custom selector label' }}>Item 1</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      const selector = screen.getByRole('checkbox', { name: 'Custom selector label' });
      expect(selector.getAttribute('aria-label')).toBe('Custom selector label');
      expect(selector.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('preserves a consumer-provided selector aria-labelledby', () => {
      render(
        <>
          <span id="external-selector-label">External selector label</span>
          <Tree aria-label="Tree" selectionMode="multiselect">
            <TreeItem itemType="leaf" value="item1">
              <TreeItemLayout selector={{ 'aria-labelledby': 'external-selector-label' }}>Item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </>,
      );

      expect(screen.getByRole('checkbox', { name: 'External selector label' }).getAttribute('aria-labelledby')).toBe(
        'external-selector-label',
      );
    });
  });
});
