import 'cypress-real-events';
import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  TreeProps,
  Tree,
  TreeItem,
  TreeItemLayout,
  treeItemLayoutClassNames,
  TreeItemValue,
} from '@fluentui/react-tree';
import { Button } from '@fluentui/react-button';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const TreeTest: React.FC<TreeProps> = props => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button id="before-button">before button</button>

      <Tree id="tree" aria-label="Tree" {...props}>
        {props.children ?? (
          <>
            <TreeItem itemType="branch" value="item1" data-testid="item1">
              <TreeItemLayout>level 1, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf" value="item1__item2" data-testid="item1__item2">
                  <TreeItemLayout>level 2, item 2</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf" value="item1__item3" data-testid="item1__item3">
                  <TreeItemLayout>level 2, item 3</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="branch" value="item2" data-testid="item2">
              <TreeItemLayout>level 1, item 2</TreeItemLayout>
              <Tree>
                <TreeItem itemType="branch" value="item2__item1" data-testid="item2__item1">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  <Tree>
                    <TreeItem itemType="leaf" value="item2__item1__item1" data-testid="item2__item1__item1">
                      <TreeItemLayout>level 3, item 1</TreeItemLayout>
                    </TreeItem>
                  </Tree>
                </TreeItem>
              </Tree>
            </TreeItem>
          </>
        )}
      </Tree>

      <button id="after-button">after button</button>
    </div>
  );
};
TreeTest.displayName = 'Tree';

describe('Tree', () => {
  it('should have all but first level items hidden', () => {
    mount(<TreeTest />);

    cy.get('[data-testid="item1__item1"]').should('not.exist');
    cy.get('[data-testid="item1__item2"]').should('not.exist');
    cy.get('[data-testid="item1__item3"]').should('not.exist');
    cy.get('[data-testid="item2__item1"]').should('not.exist');
    cy.get('[data-testid="item2__item1__item1"]').should('not.exist');
  });

  it('should have all items visible', () => {
    mount(<TreeTest defaultOpenItems={['item1', 'item2', 'item2__item1']} />);

    cy.get('[data-testid="item1__item1"]').should('exist');
    cy.get('[data-testid="item1__item2"]').should('exist');
    cy.get('[data-testid="item1__item3"]').should('exist');
    cy.get('[data-testid="item2__item1"]').should('exist');
    cy.get('[data-testid="item2__item1__item1"]').should('exist');
  });

  describe('Mouse interactions', () => {
    it('should expand/collapse item on layout click', () => {
      mount(<TreeTest />);

      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('[data-testid="item1__item1"]').should('exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });

    it('should expand/collapse item on expandIcon click only', () => {
      const ExpandIconTest = () => {
        const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set());
        return (
          <TreeTest
            openItems={openItems}
            onOpenChange={(_, data) => {
              if (data.type === 'ExpandIconClick') {
                const newSet = new Set(openItems);
                data.open ? newSet.add(data.value) : newSet.delete(data.value);
                setOpenItems(newSet);
              }
            }}
          />
        );
      };

      mount(<ExpandIconTest />);

      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.expandIcon}`).realClick();
      cy.get('[data-testid="item1__item1"]').should('exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.expandIcon}`).realClick();
      cy.get('[data-testid="item1__item1"]').should('not.exist');

      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });

    it('should not expand/collapse item on actions click', () => {
      mount(
        <TreeTest id="tree" aria-label="Tree">
          <TreeItem itemType="branch" value="item1" data-testid="item1">
            <TreeItemLayout actions={<Button id="action">action!</Button>}>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </TreeTest>,
      );

      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get(`#action`).realClick();
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });
  });

  describe('Keyboard interactions', () => {
    it('should expand/collapse item on Enter key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress('{enter}');
      cy.get('[data-testid="item1__item1"]').should('exist');
    });

    it('should expand item on right key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress('{rightarrow}');
      cy.get('[data-testid="item1__item1"]').should('exist');
    });

    it('should not expand item on alt + right key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress(['Alt', 'ArrowRight']);
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });

    it('should collapse item on left key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress('{rightarrow}');
      cy.get('[data-testid="item1__item1"]').should('exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress('{leftarrow}');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });

    it('should not collapse item on alt + left key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress('ArrowRight');
      cy.get('[data-testid="item1__item1"]').should('exist');
      cy.get(`[data-testid="item1"] .${treeItemLayoutClassNames.root}`).realPress(['Alt', 'ArrowLeft']);
      cy.get('[data-testid="item1__item1"]').should('exist');
    });

    it('should focus on actions when pressing tab key', () => {
      mount(
        <TreeTest id="tree" aria-label="Tree">
          <TreeItem itemType="branch" value="item1" data-testid="item1">
            <TreeItemLayout actions={<Button id="action">action</Button>}>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </TreeTest>,
      );

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.focused().realPress('Tab');
      cy.get('#action').should('be.focused');
    });

    describe('navigationMode="treegrid"', () => {
      it('should focus on actions/treeitem when pressing right/left arrow', () => {
        mount(
          <TreeTest openItems={['item1']} navigationMode="treegrid" id="tree" aria-label="Tree">
            <TreeItem itemType="branch" value="item1" data-testid="item1">
              <TreeItemLayout actions={<Button id="action">action</Button>}>level 1, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
          </TreeTest>,
        );

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="item1"]').should('be.focused').realPress('{rightarrow}');
        cy.get('#action').should('be.focused').realPress('{leftarrow}');
        cy.get('[data-testid="item1"]').should('be.focused');
      });
    });

    it('should not expand/collapse item on actions Enter/Space key', () => {
      mount(
        <TreeTest id="tree" aria-label="Tree">
          <TreeItem itemType="branch" value="item1" data-testid="item1">
            <TreeItemLayout actions={<Button id="action">action</Button>}>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </TreeTest>,
      );

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.focused().realPress('Tab');
      cy.get('#action').should('be.focused').realPress('{enter}');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
      cy.get('#action').should('be.focused').realPress('Space');
      cy.get('[data-testid="item1__item1"]').should('not.exist');
    });

    it('should focus on first item when pressing tab key', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
    });

    it('should focus out of tree when pressing tab key inside tree.', () => {
      mount(<TreeTest />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.focused().realPress('Tab');
      cy.focused().should('have.id', 'after-button');
    });

    describe('Navigation', () => {
      it('should move with Up/Down keys', () => {
        mount(<TreeTest />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
        cy.get('[data-testid="item2"]').should('be.focused');
        cy.focused().realPress('Tab');
        cy.focused().should('have.id', 'after-button');
      });

      describe('navigationMode="treegrid"', () => {
        it('should move with Up/Down keys', () => {
          mount(
            <TreeTest openItems={['item1']} navigationMode="treegrid" id="tree" aria-label="Tree">
              <TreeItem itemType="branch" value="item1" data-testid="item1">
                <TreeItemLayout>level 1, item 1</TreeItemLayout>
                <Tree>
                  <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                    <TreeItemLayout actions={<Button id="action">action</Button>}>level 2, item 1</TreeItemLayout>
                  </TreeItem>
                  <TreeItem itemType="leaf" value="item1__item2" data-testid="item1__item2">
                    <TreeItemLayout>level 2, item 2</TreeItemLayout>
                  </TreeItem>
                </Tree>
              </TreeItem>
            </TreeTest>,
          );

          cy.get('#before-button').realClick().realPress('Tab');
          cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item1__item1"]').should('be.focused').realPress('{rightarrow}');
          cy.get('#action').should('be.focused').realPress('{uparrow}');
          cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item1__item1"]').should('be.focused').realPress('{rightarrow}');
          cy.get('#action').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item1__item2"]').should('be.focused');
        });

        it('should move with Left keys', () => {
          mount(<TreeTest navigationMode="treegrid" defaultOpenItems={['item2', 'item2__item1']} />);

          cy.get('#before-button').realClick().realPress('Tab');
          cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2__item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2__item1__item1"]').should('be.focused').realPress('{leftarrow}');
          cy.get('[data-testid="item2__item1"]').should('be.focused').realPress('{leftarrow}').realPress('{leftarrow}');
          cy.get('[data-testid="item2"]').should('be.focused');
        });

        it('should not move with Alt + Left keys', () => {
          mount(<TreeTest navigationMode="treegrid" defaultOpenItems={['item2', 'item2__item1']} />);

          cy.get('#before-button').realClick().realPress('Tab');
          cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2__item1"]').should('be.focused').realPress('{downarrow}');
          cy.get('[data-testid="item2__item1__item1"]').should('be.focused').realPress(['Alt', '{leftarrow}']);
          cy.get('[data-testid="item2__item1__item1"]').should('be.focused').realPress('{leftarrow}');
          cy.get('[data-testid="item2__item1"]').should('be.focused').realPress('{leftarrow}').realPress('{leftarrow}');
          cy.get('[data-testid="item2"]').should('be.focused');
        });
      });

      it('should move to last item with End key', () => {
        mount(<TreeTest defaultOpenItems={['item1', 'item2', 'item2__item1']} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="item1"]').should('be.focused').realPress('{end}');
        cy.get('[data-testid="item2__item1__item1"]').should('be.focused');
      });

      it('should move to first item with Home key', () => {
        mount(<TreeTest defaultOpenItems={['item1', 'item2', 'item2__item1']} />);

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="item1"]').should('be.focused').realPress('{end}');
        cy.get('[data-testid="item2__item1__item1"]').should('be.focused').realPress('{home}');
        cy.get('[data-testid="item1"]').should('be.focused');
      });

      it('should prevent scrolling when `preventScroll()` is called in navigation', () => {
        mount(
          <TreeTest
            onNavigation={(_event, data) => {
              data.preventScroll();
            }}
            defaultOpenItems={['item1', 'item2', 'item2__item1']}
          >
            {Array.from({ length: 200 }, (_, index) => (
              <TreeItem key={index} itemType="branch" value={`item${index}`} data-testid={`item${index}`}>
                <TreeItemLayout>level 0, item {index + 1}</TreeItemLayout>
              </TreeItem>
            ))}
          </TreeTest>,
        );

        cy.get('#before-button').realClick().realPress('Tab');
        cy.get('[data-testid="item0"]').should('be.focused').realPress('{end}');
        cy.get('[data-testid="item199"]').should('be.focused').isOutsideViewport();
      });
    });
  });

  describe('Keyboard + Mouse interactions', () => {
    it('actions should remain visible whenever a focused treeitem is hovered in/out', () => {
      mount(
        <TreeTest defaultOpenItems={['item1']} id="tree" aria-label="Tree">
          <TreeItem itemType="branch" value="item1" data-testid="item1">
            <TreeItemLayout actions={<Button id="action">action</Button>}>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem itemType="leaf" value="item2" data-testid="item2">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
        </TreeTest>,
      );

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused');
      cy.get('#action').should('be.visible').realHover();
      cy.get('[data-testid=item2]').realHover();
      cy.get('#action').should('be.visible');
    });
  });

  describe('Control open state per item', () => {
    it('should remain open when opening/closing a controlled item', () => {
      const OpenItemControlled = () => {
        return (
          <Tree aria-label="Open Item Controlled">
            <TreeItem open itemType="branch" value="tree-item-1" data-testid="tree-item-1">
              <TreeItemLayout>level 1, item 1</TreeItemLayout>
              <Tree>
                <TreeItem value="tree-item-1-1" data-testid="tree-item-1-1" itemType="leaf">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                </TreeItem>
                <TreeItem value="tree-tem-1-2" data-testid="tree-tem-1-2" itemType="leaf">
                  <TreeItemLayout>level 2, item 2</TreeItemLayout>
                </TreeItem>
                <TreeItem value="tree-item-1-3" data-testid="tree-item-1-3" itemType="leaf">
                  <TreeItemLayout>level 2, item 3</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="branch" value="tree-item-2" data-testid="tree-item-2">
              <TreeItemLayout>level 1, item 2</TreeItemLayout>
              <Tree>
                <TreeItem value="tree-item-2-1" data-testid="tree-item-2-1" itemType="branch">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  <Tree>
                    <TreeItem itemType="leaf">
                      <TreeItemLayout>level 3, item 1</TreeItemLayout>
                    </TreeItem>
                  </Tree>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        );
      };

      mount(<OpenItemControlled />);

      cy.get('[data-testid="tree-item-1"]').should('exist');
      cy.get('[data-testid="tree-item-2"]').should('exist');
      cy.get('[data-testid="tree-item-2-1"]').should('not.exist');
      cy.get('[data-testid="tree-item-1-1"]').should('exist');
      cy.get('[data-testid="tree-item-1"]').realClick();
      cy.get('[data-testid="tree-item-1-1"]').should('exist');
    });

    it('should remain closed when opening/closing a controlled item', () => {
      const OpenItemControlled = () => {
        return (
          <Tree aria-label="Open Item Controlled">
            <TreeItem open={false} itemType="branch" data-testid="tree-item-1" value="tree-item-1">
              <TreeItemLayout>level 1, item 1</TreeItemLayout>
              <Tree>
                <TreeItem data-testid="tree-item-1-1" value="tree-item-1-1" itemType="leaf">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                </TreeItem>
                <TreeItem data-testid="tree-tem-1-2" value="tree-tem-1-2" itemType="leaf">
                  <TreeItemLayout>level 2, item 2</TreeItemLayout>
                </TreeItem>
                <TreeItem data-testid="tree-item-1-3" value="tree-item-1-3" itemType="leaf">
                  <TreeItemLayout>level 2, item 3</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="branch" data-testid="tree-item-2" value="tree-item-2">
              <TreeItemLayout>level 1, item 2</TreeItemLayout>
              <Tree>
                <TreeItem data-testid="tree-item-2-1" value="tree-item-2-1" itemType="branch">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  <Tree>
                    <TreeItem data-testid="tree-item-2-1-1" value="tree-item-2-1-1" itemType="leaf">
                      <TreeItemLayout>level 3, item 1</TreeItemLayout>
                    </TreeItem>
                  </Tree>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        );
      };

      mount(<OpenItemControlled />);

      cy.get('[data-testid="tree-item-1"]').should('exist');
      cy.get('[data-testid="tree-item-1-1"]').should('not.exist');
      cy.get('[data-testid="tree-item-1"]').realClick();
      cy.get('[data-testid="tree-item-1-1"]').should('not.exist');
    });

    it('should not affect other items open state when opening/closing a controlled item', () => {
      const OpenItemControlled = () => {
        return (
          <Tree aria-label="Open Item Controlled">
            <TreeItem open={false} itemType="branch" data-testid="tree-item-1" value="tree-item-1">
              <TreeItemLayout>level 1, item 1</TreeItemLayout>
              <Tree>
                <TreeItem data-testid="tree-item-1-1" value="tree-item-1-1" itemType="leaf">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                </TreeItem>
                <TreeItem data-testid="tree-tem-1-2" value="tree-tem-1-2" itemType="leaf">
                  <TreeItemLayout>level 2, item 2</TreeItemLayout>
                </TreeItem>
                <TreeItem data-testid="tree-item-1-3" value="tree-item-1-3" itemType="leaf">
                  <TreeItemLayout>level 2, item 3</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem open={true} itemType="branch" data-testid="tree-item-2" value="tree-item-2">
              <TreeItemLayout>level 1, item 2</TreeItemLayout>
              <Tree>
                <TreeItem data-testid="tree-item-2-1" value="tree-item-2-1" itemType="branch">
                  <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  <Tree>
                    <TreeItem data-testid="tree-item-2-1-1" value="tree-item-2-1-1" itemType="leaf">
                      <TreeItemLayout>level 3, item 1</TreeItemLayout>
                    </TreeItem>
                  </Tree>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        );
      };

      mount(<OpenItemControlled />);

      cy.get('[data-testid="tree-item-2"]').should('exist');
      cy.get('[data-testid="tree-item-2-1"]').should('exist');
      cy.get('[data-testid="tree-item-2-1-1"]').should('not.exist');
      cy.get('[data-testid="tree-item-2-1"]').realClick();
      cy.get('[data-testid="tree-item-2-1-1"]').should('exist');
    });
  });

  describe('roving tab indexes', () => {
    it('should ensure roving tab indexes when focusing programmatically', () => {
      mount(<TreeTest defaultOpenItems={['item1', 'item2', 'item2__item1']} />);

      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item1__item1"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item1__item2"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item1__item3"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item2"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item2__item1"]').should('be.focused').realPress('Tab');
      cy.get('#after-button').should('be.focused').realPress(['Shift', 'Tab']);
      cy.get('[data-testid="item2__item1"]').should('be.focused');
    });

    it('should ensure roving tab indexes when children change', () => {
      const RovingTreeTest = () => {
        const [show, setShow] = React.useState(true);
        return (
          <>
            <button onClick={() => setShow(s => !s)} id="btn-before-tree">
              toggle tree
            </button>
            <TreeTest>
              {show && (
                <>
                  <TreeItem itemType="leaf" value="item1" data-testid="item1">
                    <TreeItemLayout>level 1, item 1</TreeItemLayout>
                  </TreeItem>
                  <TreeItem itemType="leaf" value="item2" data-testid="item2">
                    <TreeItemLayout>level 1, item 2</TreeItemLayout>
                  </TreeItem>
                </>
              )}
              <TreeItem itemType="leaf" value="item3" data-testid="item3">
                <TreeItemLayout>level 1, item 3</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf" value="item4" data-testid="item4">
                <TreeItemLayout>level 1, item 4</TreeItemLayout>
              </TreeItem>
            </TreeTest>
          </>
        );
      };

      mount(<RovingTreeTest />);

      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
      cy.get('#before-button').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item2"]')
        .should('be.focused')
        .should('have.attr', 'tabindex', '0')
        .get('#btn-before-tree')
        .realClick();
      cy.get('[data-testid="item3"]').should('have.attr', 'tabindex', '0');
    });

    it('should ensure a treeitem has tabIndex=0, when the current tabIndex=0 item is removed by collapsing its parent', () => {
      const RovingTreeTest = () => {
        const [openItems, setOpenItems] = React.useState(() => new Set<TreeItemValue>());
        return (
          <>
            <button onClick={() => setOpenItems(new Set())} id="btn-before-tree">
              close tree
            </button>
            <Tree
              openItems={openItems}
              onOpenChange={(_, data) => {
                setOpenItems(data.openItems);
              }}
            >
              <TreeItem itemType="branch" value="item1" data-testid="item1">
                <TreeItemLayout>level 1, item 1</TreeItemLayout>
                <Tree>
                  <TreeItem itemType="leaf" value="item2" data-testid="item1-1">
                    <TreeItemLayout>level 2, item 1</TreeItemLayout>
                  </TreeItem>
                </Tree>
              </TreeItem>
              <TreeItem itemType="leaf" value="item2" data-testid="item2">
                <TreeItemLayout>level 1, item 2</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf" value="item3" data-testid="item3">
                <TreeItemLayout>level 1, item 3</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf" value="item4" data-testid="item4">
                <TreeItemLayout>level 1, item 4</TreeItemLayout>
              </TreeItem>
            </Tree>
          </>
        );
      };

      mount(<RovingTreeTest />);

      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
      cy.get('#btn-before-tree').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused').realPress('Enter').realPress('{downarrow}');
      cy.get('[data-testid="item1-1"]').should('be.focused').should('have.attr', 'tabindex', '0');

      cy.get('#btn-before-tree').realClick();
      cy.get('[data-testid="item1-1"]').should('not.exist');
      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
    });

    it('should ensure a treeitem has tabIndex=0, when the current tabIndex=0 item is removed without focus', () => {
      const RovingTreeTest = () => {
        const [show, setShow] = React.useState(true);
        return (
          <>
            <button onClick={() => setShow(current => !current)} id="toggle-tree">
              toggle tree
            </button>
            <button id="before-tree">before tree</button>
            <Tree>
              <TreeItem itemType="leaf" value="item1" data-testid="item1">
                <TreeItemLayout>level 1, item 1</TreeItemLayout>
              </TreeItem>
              {show && (
                <TreeItem itemType="leaf" value="item2" data-testid="item2">
                  <TreeItemLayout>level 1, item 2</TreeItemLayout>
                </TreeItem>
              )}
              <TreeItem itemType="leaf" value="item3" data-testid="item3">
                <TreeItemLayout>level 1, item 3</TreeItemLayout>
              </TreeItem>
              <TreeItem itemType="leaf" value="item4" data-testid="item4">
                <TreeItemLayout>level 1, item 4</TreeItemLayout>
              </TreeItem>
            </Tree>
          </>
        );
      };

      mount(<RovingTreeTest />);

      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
      cy.get('#before-tree').realClick().realPress('Tab');
      cy.get('[data-testid="item1"]').should('be.focused').realPress('{downarrow}');
      cy.get('[data-testid="item2"]').should('be.focused').should('have.attr', 'tabindex', '0');
      cy.get('#toggle-tree').realClick();
      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
    });

    it('should ensure roving tab index will be properly initialized when the tree goes from empty to non-empty', () => {
      const RovingTreeTest = () => {
        const [show, setShow] = React.useState(false);
        return (
          <>
            <button onClick={() => setShow(current => !current)} id="btn-before-tree">
              toggle tree
            </button>
            <Tree>
              {show && (
                <>
                  <TreeItem itemType="leaf" value="item1" data-testid="item1">
                    <TreeItemLayout>level 1, item 1</TreeItemLayout>
                  </TreeItem>
                  <TreeItem itemType="leaf" value="item2" data-testid="item2">
                    <TreeItemLayout>level 1, item 2</TreeItemLayout>
                  </TreeItem>
                </>
              )}
            </Tree>
          </>
        );
      };

      mount(<RovingTreeTest />);

      cy.get('#btn-before-tree').realClick();
      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
      cy.get('[data-testid="item2"]').should('have.attr', 'tabindex', '-1');
      cy.get('#btn-before-tree').realClick();
      cy.get('[data-testid="item1"]').should('not.exist');
      cy.get('[data-testid="item2"]').should('not.exist');
      cy.get('#btn-before-tree').realClick();
      cy.get('[data-testid="item1"]').should('have.attr', 'tabindex', '0');
      cy.get('[data-testid="item2"]').should('have.attr', 'tabindex', '-1');
    });
  });
});

describe('TreeItem', () => {
  it('should not call onClick when clicking on: expand icon, actions or subtree', () => {
    const handleClick = cy.stub().as('onClick');

    mount(
      <TreeTest id="tree" aria-label="Tree">
        <TreeItem open onClick={handleClick} itemType="branch" value="item1" data-testid="item1">
          <TreeItemLayout
            expandIcon={{ 'data-testid': 'item1__expandIcon' } as {}}
            actions={{ visible: true, children: <Button id="action">action!</Button> }}
          >
            level 1, item 1
          </TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value="item1__item1" data-testid="item1__item1">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </TreeTest>,
    );

    cy.get('[data-testid="item1__item1"]').should('exist');
    cy.get(`#action`).realClick();
    cy.get('[data-testid="item1__item1"]').realClick();
    cy.get('[data-testid="item1__expandIcon"]').realClick();
    cy.get('@onClick').should('not.have.been.called');
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      isOutsideViewport(): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('isOutsideViewport', { prevSubject: true }, subject => {
  const windowInnerHeight = Cypress.config(`viewportHeight`);

  const bounding = subject[0].getBoundingClientRect();

  const bottomBoundOfWindow = windowInnerHeight;

  expect(bounding.top).to.be.greaterThan(bottomBoundOfWindow);

  return subject;
});
