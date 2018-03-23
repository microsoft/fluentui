import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import { OverflowSet } from './OverflowSet';
import * as sinon from 'sinon';
import { IOverflowSetItemProps } from './OverflowSet.types';
import { CommandBarButton } from '../../Button';
import { mount, ReactWrapper } from 'enzyme';
import { convertSequencesToKeytipID, fullKeySequencesAreEqual, ktpLayerId } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager, constructKeytipExecuteTargetFromId, KeytipTree } from '../../utilities/keytips';

describe('OverflowSet', () => {
  it('does not render overflow when there are no overflow items', () => {
    const onRenderItem = sinon.spy();
    const onRenderOverflowButton = sinon.spy();
    shallow(<OverflowSet onRenderItem={ onRenderItem } onRenderOverflowButton={ onRenderOverflowButton } />);

    expect(onRenderOverflowButton.called).toEqual(false);
  });

  it('does not render overflow when overflow items is an empty array', () => {
    const onRenderItem = sinon.spy();
    const onRenderOverflowButton = sinon.spy();
    shallow(<OverflowSet onRenderItem={ onRenderItem } onRenderOverflowButton={ onRenderOverflowButton } overflowItems={ [] } />);

    expect(onRenderOverflowButton.called).toEqual(false);
  });

  describe('keytip tests', () => {
    let overflowSet: ReactWrapper;

    const overflowKeytips: any = {
      overflowItemKeytip1: {
        content: 'A',
        keySequences: [{ keys: ['a'] }],
        onExecute: jest.fn()
      },
      overflowItemKeytip2: {
        content: 'B',
        keySequences: [{ keys: ['b'] }],
        onExecute: jest.fn()

      },
      overflowItemKeytip3: {
        content: 'C',
        keySequences: [{ keys: ['c'] }],
        onExecute: jest.fn()

      },
      overflowItemKeytip4: {
        content: 'D',
        keySequences: [{ keys: ['d'] }],
        onExecute: jest.fn()

      },
      overflowItemKeytip5: {
        content: 'E',
        keySequences: [{ keys: ['d'] }, { keys: ['e'] }],
        onExecute: jest.fn()

      },
      overflowItemKeytip6: {
        content: 'F',
        keySequences: [{ keys: ['d'] }, { keys: ['f'] }],
        onExecute: jest.fn()

      },
      overflowButtonKeytip: {
        // Overflow button
        content: 'X',
        keySequences: [{ keys: ['x'] }],
        onExecute: (el: HTMLElement) => {
          // Find the overflow button and manually click it to open the overflow menu
          overflowSet.find(constructKeytipExecuteTargetFromId('ktp-x')).simulate('click');
        },
        hasChildrenNodes: true
      }
    };

    const items = [
      {
        key: 'item1',
        name: 'Item 1',
        keytipProps: overflowKeytips.overflowItemKeytip1
      },
      {
        key: 'item2',
        name: 'Item 2',
        keytipProps: overflowKeytips.overflowItemKeytip2
      },
    ];

    const overflowItems = [
      {
        key: 'item3',
        name: 'Item 3',
        keytipProps: overflowKeytips.overflowItemKeytip3
      },
      {
        key: 'item4',
        name: 'Item 4',
        keytipProps: overflowKeytips.overflowItemKeytip4
      },
    ];

    const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
      return (
        <CommandBarButton
          { ...item }
          menuProps={ item.subMenuProps }
        >{ item.name }
        </CommandBarButton>
      );
    };

    const onRenderOverflowButton = (overflowElements: any[] | undefined): JSX.Element => {
      return (
        <CommandBarButton
          menuIconProps={ { iconName: 'More' } }
          menuProps={ { items: overflowElements! } }
          keytipProps={ overflowKeytips.overflowButtonKeytip }
        />
      );
    };

    const keytipManager = KeytipManager.getInstance();

    beforeEach(() => {
      keytipManager.currentSequence = { keys: [] };

      overflowSet = mount(
        (
          <OverflowSet
            onRenderItem={ onRenderItem }
            onRenderOverflowButton={ onRenderOverflowButton }
            keytipSequences={ overflowKeytips.overflowButtonKeytip.keySequences }
          />
        ));
    });

    afterEach(() => {
      // Clean up the keytip items
      keytipManager.keytips = [];
      keytipManager.keytipTree = new KeytipTree();
    });

    it('should register regular and persisted keytips', () => {
      // Persisted keytips will have the original key sequence of the items in the overflow
      overflowSet.setProps({
        items,
        overflowItems,
      });

      const keytipTree = keytipManager.keytipTree;
      // Regular keytips
      const item1Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip1.keySequences)];
      expect(item1Keytip).toBeDefined();
      const item2Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip2.keySequences)];
      expect(item2Keytip).toBeDefined();
      // Persisted keytips
      const item3Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip3.keySequences)];
      expect(item3Keytip).toBeDefined();
      const item4Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip4.keySequences)];
      expect(item4Keytip).toBeDefined();
      // Overflow button keytip
      const overflowButtonKeytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowButtonKeytip.keySequences)];
      expect(overflowButtonKeytip).toBeDefined();
    });

    it('should properly register and unregister keytips when items are moved to the overflow and back', () => {
      overflowSet.setProps({
        overflowItems
      });

      // Add the first overflow item to 'items'
      overflowSet.setProps({
        items: items.concat(overflowItems.slice(0, 1)),
        overflowItems: overflowItems.slice(1, 2)
      });

      // Should still have 5 keytips in the tree
      const keytipTree = keytipManager.keytipTree;
      // Regular keytips
      const item1Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip1.keySequences)];
      expect(item1Keytip).toBeDefined();
      const item2Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip2.keySequences)];
      expect(item2Keytip).toBeDefined();
      const item3Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip3.keySequences)];
      expect(item3Keytip).toBeDefined();
      // Persisted keytips
      const item4Keytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowItemKeytip4.keySequences)];
      expect(item4Keytip).toBeDefined();
      // Overflow button keytip
      const overflowButtonKeytip = keytipTree.nodeMap[convertSequencesToKeytipID(overflowKeytips.overflowButtonKeytip.keySequences)];
      expect(overflowButtonKeytip).toBeDefined();
    });

    it('persisted keytip should execute function when triggered', () => {
      overflowSet.setProps({
        items,
        overflowItems
      });

      // Set current keytip at root, like we've entered keytip mode
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('d');

      // D will be a persisted keytip, but it should call the onExecute of D
      expect(overflowKeytips.overflowItemKeytip4.onExecute).toBeCalled();

      // D has no children, we should be out of keytip mode (no current keytip)
      expect(keytipManager.keytipTree.currentKeytip).toBeUndefined();

      // No keytips should be visible
      const keytips = keytipManager.keytips;
      keytips.forEach((keytip: IKeytipProps) => {
        expect(keytip.visible).toBeFalsy();
      });
    });

    it('triggering the overflow button keytip should register the menu item keytips with their modified sequence', () => {
      overflowSet.setProps({
        items,
        overflowItems
      });

      // Set current keytip at root, like we've entered keytip mode
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('x');

      // Opening the submenu should register the two keytips for those items
      const modifiedKeytip3Sequence = [{ keys: ['x'] }, { keys: ['c'] }];
      const modifiedKeytip4Sequence = [{ keys: ['x'] }, { keys: ['d'] }];
      const overflowItem3Keytip = keytipManager.keytipTree.nodeMap[convertSequencesToKeytipID(modifiedKeytip3Sequence)];
      expect(overflowItem3Keytip).toBeDefined();
      const overflowItem4Keytip = keytipManager.keytipTree.nodeMap[convertSequencesToKeytipID(modifiedKeytip4Sequence)];
      expect(overflowItem4Keytip).toBeDefined();

      // Those two keytips should now be visible in the Layer
      const submenuKeytips = keytipManager.keytips.filter((keytip: IKeytipProps) => {
        return fullKeySequencesAreEqual(keytip.keySequences, modifiedKeytip3Sequence) ||
          fullKeySequencesAreEqual(keytip.keySequences, modifiedKeytip4Sequence);
      });
      submenuKeytips.forEach((submenuKeytip: IKeytipProps) => {
        expect(submenuKeytip.visible).toEqual(true);
      });
    });

    describe('persisted keytip with a submenu', () => {
      it('children keytips should open the overflow and submenu', () => {
        const overflowItemsWithSubMenuAndKeytips = [
          {
            key: 'item3',
            name: 'Item 3',
            keytipProps: overflowKeytips.overflowItemKeytip3
          },
          {
            key: 'item4',
            name: 'Item 4',
            keytipProps: {
              ...overflowKeytips.overflowItemKeytip4,
              hasChildrenNodes: true,
              onExecute: (el: HTMLElement) => {
                debugger;
                el.focus();
                // ReactTestUtils.Simulate.click(el);
              }
            },
            subMenuProps: {
              items: [
                {
                  key: 'item5',
                  name: 'Item 5',
                  keytipProps: overflowKeytips.overflowItemKeytip5
                },
                {
                  key: 'item6',
                  name: 'Item 6',
                  keytipProps: overflowKeytips.overflowItemKeytip6
                },
              ]
            }
          },
        ];

        debugger;
        overflowSet.setProps({
          items,
          overflowItems: overflowItemsWithSubMenuAndKeytips
        });

        keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
        debugger;
        keytipManager.processInput('d');

        // The two submenu keytips should be registered with their modified sequence
        const modifiedKeytip5Sequence = [{ keys: ['x'] }, { keys: ['d'] }, { keys: ['e'] }];
        const modifiedKeytip6Sequence = [{ keys: ['x'] }, { keys: ['d'] }, { keys: ['f'] }];
        const subMenu5Keytip = keytipManager.keytipTree.nodeMap[convertSequencesToKeytipID(modifiedKeytip5Sequence)];
        expect(subMenu5Keytip).toBeDefined();
        const subMenu6Keytip = keytipManager.keytipTree.nodeMap[convertSequencesToKeytipID(modifiedKeytip6Sequence)];
        expect(subMenu6Keytip).toBeDefined();

        // Those two keytips should now be visible in the Layer
        const submenuKeytips = keytipManager.keytips.filter((keytip: IKeytipProps) => {
          return fullKeySequencesAreEqual(keytip.keySequences, modifiedKeytip5Sequence) ||
            fullKeySequencesAreEqual(keytip.keySequences, modifiedKeytip6Sequence);
        });
        submenuKeytips.forEach((submenuKeytip: IKeytipProps) => {
          expect(submenuKeytip.visible).toEqual(true);
        });

        // Assert that the correct DOM elements are showing
      });

      /*
      it('persisted keytip with a submenu and no children keytips should also exit keytip mode after being triggered', () => {
        // Insert a submenu into one of the overflow items
        const overflowItemsWithSubmenu = [
          {
            key: 'item3',
            name: 'Item 3',
            keytipProps: overflowKeytips.overflowItemKeytip3
          },
          {
            key: 'item4',
            name: 'Item 4',
            keytipProps: {
              ...overflowKeytips.overflowItemKeytip4,
              onExecute: (el: HTMLElement) => {
                // Find the overflow button and manually click it to open the overflow menu
                overflowSet.find(constructKeytipExecuteTargetFromId('ktp-x-4')).simulate('click');
              }
            },
            subMenuProps: {
              items: [
                {
                  key: 'item5',
                  name: 'Item 5'
                },
                {
                  key: 'item6',
                  name: 'Item 6'
                },
              ]
            }
          },
        ];

        overflowSet.setProps({
          items,
          overflowItems: overflowItemsWithSubmenu
        });

        keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
        keytipManager.processInput('d');

        // The two keytips for the submenu items
      });
    */
    });
  });
});
