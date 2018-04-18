import * as React from 'react';
import { shallow } from 'enzyme';

import { OverflowSet } from './OverflowSet';
import * as sinon from 'sinon';
import { IOverflowSetItemProps } from './OverflowSet.types';
import { CommandBarButton } from '../../Button';
import { mount, ReactWrapper } from 'enzyme';
import { convertSequencesToKeytipID, fullKeySequencesAreEqual, IKeySequence, find } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { KeytipManager, constructKeytipExecuteTargetFromId, KeytipTree, IKeytipTreeNode } from '../../utilities/keytips';

function getTreeNode(keytipTree: KeytipTree, keySequences: IKeySequence[]): IKeytipTreeNode | undefined {
  return keytipTree.getNode(convertSequencesToKeytipID(keySequences));
}

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

  function delay(millisecond: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, millisecond));
  }

  describe('keytip tests', () => {
    let overflowSet: ReactWrapper;
    let overflowKeytips: any;
    let items: IOverflowSetItemProps[];
    let overflowItems: IOverflowSetItemProps[];

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
      keytipManager.currentSequence = '';

      overflowKeytips = {
        overflowItemKeytip1: {
          content: 'A',
          keySequences: ['a'],
          onExecute: jest.fn()
        },
        overflowItemKeytip2: {
          content: 'B',
          keySequences: ['b'],
          onExecute: jest.fn()
        },
        overflowItemKeytip3: {
          content: 'C',
          keySequences: ['c'],
          onExecute: jest.fn()
        },
        overflowItemKeytip4: {
          content: 'D',
          keySequences: ['d'],
          onExecute: jest.fn()
        },
        overflowItemKeytip5: {
          content: 'E',
          keySequences: ['d', 'e'],
          onExecute: jest.fn()
        },
        overflowItemKeytip6: {
          content: 'F',
          keySequences: ['d', 'f'],
          onExecute: jest.fn()
        },
        overflowButtonKeytip: {
          // Overflow button
          content: 'X',
          keySequences: ['x'],
          onExecute: (el: HTMLElement) => {
            // Find the overflow button and manually click it to open the overflow menu
            overflowSet.find(constructKeytipExecuteTargetFromId('ktp-x')).simulate('click');
          }
        }
      };

      items = [
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

      overflowItems = [
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

      overflowSet = mount(
        (
          <OverflowSet
            onRenderItem={ onRenderItem }
            onRenderOverflowButton={ onRenderOverflowButton }
            items={ items }
            keytipSequences={ overflowKeytips.overflowButtonKeytip.keySequences }
          />
        ));
    });

    afterEach(() => {
      // Clean up the keytip items
      keytipManager.keytips = [];
      keytipManager.keytipTree = new KeytipTree();

      // Cleanup ContextualMenus that were created
      for (let i = 0; i < document.body.children.length; i++) {
        if (document.body.children[i].tagName === 'DIV') {
          document.body.removeChild(document.body.children[i]);
          i--;
        }
      }
    });

    describe('without submenus', () => {

      beforeEach(() => {
        overflowSet.setProps({
          overflowItems
        });
      });

      it('should register regular and persisted keytips', () => {
        // Persisted keytips will have the original key sequence of the items in the overflow
        const keytipTree = keytipManager.keytipTree;
        // Regular keytips
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip1.keySequences)).toBeDefined();
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip2.keySequences)).toBeDefined();
        // Persisted keytips
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip3.keySequences)).toBeDefined();
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip4.keySequences)).toBeDefined();
        // Overflow button keytip
        expect(getTreeNode(keytipTree, overflowKeytips.overflowButtonKeytip.keySequences)).toBeDefined();
      });

      it('should properly register and unregister keytips when items are moved to the overflow and back', () => {
        // Add the first overflow item to 'items'
        overflowSet.setProps({
          items: items.concat(overflowItems.slice(0, 1)),
          overflowItems: overflowItems.slice(1, 2)
        });

        // Should still have 5 keytips in the tree
        const keytipTree = keytipManager.keytipTree;
        // Regular keytips
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip1.keySequences)).toBeDefined();
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip2.keySequences)).toBeDefined();
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip3.keySequences)).toBeDefined();
        // Persisted keytips
        expect(getTreeNode(keytipTree, overflowKeytips.overflowItemKeytip4.keySequences)).toBeDefined();
        // Overflow button keytip
        expect(getTreeNode(keytipTree, overflowKeytips.overflowButtonKeytip.keySequences)).toBeDefined();
      });

      it('persisted keytip should execute function when triggered', () => {
        // Set current keytip at root, like we've entered keytip mode
        keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
        keytipManager.processInput('d');

        // D will be a persisted keytip, but it should call the onExecute of D
        expect(overflowKeytips.overflowItemKeytip4.onExecute).toBeCalled();

        // D has no children, we should be out of keytip mode (no current keytip)
        expect(keytipManager.keytipTree.currentKeytip).toBeUndefined();

        // No keytips should be visible
        keytipManager.getKeytips().forEach((keytip: IKeytipProps) => {
          expect(keytip.visible).toBeFalsy();
        });
      });

      it('triggering the overflow button keytip should register the menu item keytips with their modified sequence', () => {
        // Set current keytip at root, like we've entered keytip mode
        const keytipTree = keytipManager.keytipTree;
        keytipTree.currentKeytip = keytipTree.root;
        // Open the overflow menu
        keytipManager.processInput('x');

        delay(750).then(() => {
          // Opening the submenu should register the two keytips for those items
          const modifiedKeytip3Sequence = ['x', 'c'];
          const modifiedKeytip4Sequence = ['x', 'd'];
          expect(getTreeNode(keytipTree, modifiedKeytip3Sequence)).toBeDefined();
          expect(getTreeNode(keytipTree, modifiedKeytip4Sequence)).toBeDefined();

          // Those two keytips should now be visible in the Layer
          const submenuKeytips = keytipManager.getKeytips().filter((keytip: IKeytipProps) => {
            return keytip.content === 'C' || keytip.content === 'D';
          });
          submenuKeytips.forEach((submenuKeytip: IKeytipProps) => {
            expect(submenuKeytip.visible).toEqual(true);
          });
        });
      });

      it('overflowSetSequence gets set and unset correctly on overflowItems keytipProps when the overflow menu is opened', () => {
        // Set current keytip at root, like we've entered keytip mode
        const keytipTree = keytipManager.keytipTree;
        keytipTree.currentKeytip = keytipTree.root;
        // Open the overflow menu
        keytipManager.processInput('x');

        delay(750).then(() => {
          let managerKeytips = keytipManager.getKeytips();
          // item3
          let item3Keytip = find(managerKeytips, (keytip: IKeytipProps) => {
            return fullKeySequencesAreEqual(overflowKeytips.overflowItemKeytip3.keySequences, keytip.keySequences);
          });
          expect(fullKeySequencesAreEqual(item3Keytip!.overflowSetSequence!, overflowKeytips.overflowButtonKeytip.keySequences)).toEqual(true);
          // item4
          let item4Keytip = find(managerKeytips, (keytip: IKeytipProps) => {
            return fullKeySequencesAreEqual(overflowKeytips.overflowItemKeytip4.keySequences, keytip.keySequences);
          });
          expect(fullKeySequencesAreEqual(item4Keytip!.overflowSetSequence!, overflowKeytips.overflowButtonKeytip.keySequences)).toEqual(true);

          // Add the first overflow item to 'items'
          overflowSet.setProps({
            items: items.concat(overflowItems.slice(0, 1)),
            overflowItems: overflowItems.slice(1, 2)
          });

          managerKeytips = keytipManager.getKeytips();
          // item3
          item3Keytip = find(managerKeytips, (keytip: IKeytipProps) => {
            return fullKeySequencesAreEqual(overflowKeytips.overflowItemKeytip3.keySequences, keytip.keySequences);
          });
          expect(fullKeySequencesAreEqual(item3Keytip!.overflowSetSequence!, overflowKeytips.overflowButtonKeytip.keySequences)).toEqual(true);
          // item4
          item4Keytip = find(managerKeytips, (keytip: IKeytipProps) => {
            return fullKeySequencesAreEqual(overflowKeytips.overflowItemKeytip4.keySequences, keytip.keySequences);
          });
          expect(item4Keytip!.overflowSetSequence).toBeUndefined();
        });
      });

      it('correctly picks up a disabled keytip and doesn`t call it', () => {
        overflowItems = [
          {
            key: 'item3',
            name: 'Item 3',
            disabled: true,
            keytipProps: overflowKeytips.overflowItemKeytip3
          },
          {
            key: 'item4',
            name: 'Item 4',
            keytipProps: overflowKeytips.overflowItemKeytip4
          },
        ];
        overflowSet.setProps({
          overflowItems: overflowItems
        });
        keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
        keytipManager.processInput('c');
        // Nothing should happen, the current keytip should still be the root
        expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.root);
        expect(overflowKeytips.overflowItemKeytip3.onExecute).not.toBeCalled();
      });
    });

    describe('with submenus', () => {
      let item3: any;
      beforeEach(() => {
        item3 = { ...overflowItems[0] };
      });

      describe('without children keytips', () => {
        it('should not exit keytip mode after being triggered', () => {
          // Insert a submenu into one of the overflow items
          const overflowItemsWithSubMenu = [
            item3,
            {
              key: 'item4',
              name: 'Item 4',
              keytipProps: {
                ...overflowKeytips.overflowItemKeytip4,
                onExecute: (el: HTMLElement) => {
                  el.click();
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
            overflowItems: overflowItemsWithSubMenu
          });

          keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
          keytipManager.processInput('d');

          expect(keytipManager.keytipTree.currentKeytip).toBeDefined();
        });
      });

      describe('with children keytips', () => {
        let overflowItemsWithSubMenuAndKeytips: any[];

        beforeEach(() => {
          overflowItemsWithSubMenuAndKeytips = [
            item3,
            {
              key: 'item4',
              name: 'Item 4',
              keytipProps: {
                ...overflowKeytips.overflowItemKeytip4,
                onExecute: (el: HTMLElement) => {
                  el.click();
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
                    keytipProps: overflowKeytips.overflowItemKeytip6,
                    subMenuProps: {
                      items: [
                        {
                          key: 'item7',
                          name: 'Item 7',
                          keytipProps: {
                            content: 'X',
                            keySequences: ['d', 'f', 'x']
                          }
                        }
                      ]
                    }
                  },
                ]
              }
            },
          ];

          overflowSet.setProps({
            overflowItems: overflowItemsWithSubMenuAndKeytips
          });
        });

        it('should open the overflow and submenu when the persisted keytip is triggered', () => {
          const keytipTree = keytipManager.keytipTree;
          keytipTree.currentKeytip = keytipTree.root;
          keytipManager.processInput('d');

          // The two submenu keytips should be registered with their modified sequence in the tree
          const modifiedKeytip5Sequence = ['x', 'd', 'e'];
          const modifiedKeytip6Sequence = ['x', 'd', 'f'];
          const subMenu5Keytip = getTreeNode(keytipTree, modifiedKeytip5Sequence);
          expect(subMenu5Keytip).toBeDefined();
          const subMenu6Keytip = getTreeNode(keytipTree, modifiedKeytip6Sequence);
          expect(subMenu6Keytip).toBeDefined();

          delay(750).then(() => {
            // Those two keytips should now be visible in the Layer and have overflowSetSequence set
            const submenuKeytips = keytipManager.getKeytips().filter((keytip: IKeytipProps) => {
              return keytip.content === 'E' || keytip.content === 'F';
            });
            submenuKeytips.forEach((submenuKeytip: IKeytipProps) => {
              expect(submenuKeytip.visible).toEqual(true);
              expect(fullKeySequencesAreEqual(submenuKeytip.overflowSetSequence!, overflowKeytips.overflowButtonKeytip.keySequences)).toEqual(true);
            });
          });
        });
      });

      describe('with non-standard children keytips', () => {
        it('should respect itemSubMenuProvider when setting overflowSetSequence', () => {
          const overflowItemsWithSubMenuAndKeytips = [
            item3,
            {
              key: 'item4',
              name: 'Item 4',
              keytipProps: {
                ...overflowKeytips.overflowItemKeytip4,
                onExecute: (el: HTMLElement) => {
                  el.click();
                }
              },
              customSubMenu: {
                items: [
                  {
                    key: 'item5',
                    name: 'Item 5',
                    keytipProps: overflowKeytips.overflowItemKeytip5
                  },
                  {
                    key: 'item6',
                    name: 'Item 6',
                    keytipProps: overflowKeytips.overflowItemKeytip6,
                    customSubMenu: {
                      items: [
                        {
                          key: 'item7',
                          name: 'Item 7',
                          keytipProps: {
                            content: 'X',
                            keySequences: ['d', 'f', 'x']
                          }
                        }
                      ]
                    }
                  },
                ]
              }
            },
          ];

          overflowSet.setProps({
            overflowItems: overflowItemsWithSubMenuAndKeytips,
            itemSubMenuProvider: (item: IOverflowSetItemProps) => {
              if (item.customSubMenu) {
                return item.customSubMenu.items;
              }
              return undefined;
            }
          });

          // Open the submenu
          const keytipTree = keytipManager.keytipTree;
          keytipTree.currentKeytip = keytipTree.root;
          keytipManager.processInput('d');

          delay(750).then(() => {
            // Those two keytips should now be visible in the Layer and have overflowSetSequence set
            const submenuKeytips = keytipManager.getKeytips().filter((keytip: IKeytipProps) => {
              return keytip.content === 'E' || keytip.content === 'F';
            });
            submenuKeytips.forEach((submenuKeytip: IKeytipProps) => {
              expect(submenuKeytip.visible).toEqual(true);
              expect(fullKeySequencesAreEqual(submenuKeytip.overflowSetSequence!, overflowKeytips.overflowButtonKeytip.keySequences)).toEqual(true);
            });
          });
        });
      });
    });
  });
});