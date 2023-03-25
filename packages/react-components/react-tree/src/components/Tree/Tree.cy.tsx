import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeProps,
  treeItemLayoutClassNames,
  treeItemClassNames,
} from '@fluentui/react-tree';
import { Button } from '@fluentui/react-button';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const Example = (props: TreeProps) => {
  return (
    <Tree id="tree" aria-label="Tree" {...props}>
      <TreeItem id="item1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem id="item1__item1">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem id="item1__item2">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem id="item1__item3">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem id="item2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem id="item2__item1">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem id="item2__item1__item1">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

describe('Tree', () => {
  it('should have all but first level items hidden', () => {
    mount(<Example />);
    cy.get('#item1__item1').should('not.exist');
    cy.get('#item1__item2').should('not.exist');
    cy.get('#item1__item3').should('not.exist');
    cy.get('#item2__item1').should('not.exist');
    cy.get('#item2__item1__item1').should('not.exist');
  });

  it('should have all items visible', () => {
    mount(<Example defaultOpenItems={['item1', 'item2', 'item2__item1']} />);
    cy.get('#item1__item1').should('exist');
    cy.get('#item1__item2').should('exist');
    cy.get('#item1__item3').should('exist');
    cy.get('#item2__item1').should('exist');
    cy.get('#item2__item1__item1').should('exist');
  });

  describe('Mouse interactions', () => {
    it('should expand/collapse item on layout click', () => {
      mount(<Example />);
      cy.get('#item1__item1').should('not.exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('#item1__item1').should('exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('#item1__item1').should('not.exist');
    });
    it('should expand/collapse item on expandIcon click only', () => {
      mount(
        <Example
          onOpenChange={(event, data) => {
            if (data.type === 'Click') {
              event.preventDefault();
            }
          }}
        />,
      );
      cy.get('#item1__item1').should('not.exist');
      cy.get(`#item1 .${treeItemClassNames.expandIcon}`).realClick();
      cy.get('#item1__item1').should('exist');
      cy.get(`#item1 .${treeItemClassNames.expandIcon}`).realClick();
      cy.get('#item1__item1').should('not.exist');

      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realClick();
      cy.get('#item1__item1').should('not.exist');
    });
    it('should not expand/collapse item on actions click', () => {
      mount(
        <Tree id="tree" aria-label="Tree">
          <TreeItem
            actions={
              <>
                <Button id="action">action</Button>
              </>
            }
            id="item1"
          >
            <TreeItemLayout>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem id="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>,
      );
      cy.get('#item1__item1').should('not.exist');
      cy.get('#item1').focus();
      cy.get(`#action`).realClick();
      cy.get('#item1__item1').should('not.exist');
    });
  });
  describe('Keyboard interactions', () => {
    it('should expand/collapse item on Enter key', () => {
      mount(<Example />);
      cy.get('#item1').focus();
      cy.get('#item1__item1').should('not.exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realPress('{enter}');
      cy.get('#item1__item1').should('exist');
    });
    it('should expand item on Right key', () => {
      mount(<Example />);
      cy.get('#item1').focus();
      cy.get('#item1__item1').should('not.exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realPress('{rightarrow}');
      cy.get('#item1__item1').should('exist');
    });
    it('should collapse item on Left key', () => {
      mount(<Example />);
      cy.get('#item1').focus();
      cy.get('#item1__item1').should('not.exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realPress('{rightarrow}');
      cy.get('#item1__item1').should('exist');
      cy.get(`#item1 .${treeItemLayoutClassNames.root}`).realPress('{leftarrow}');
      cy.get('#item1__item1').should('not.exist');
    });
    it('should focus on actions when pressing tab key', () => {
      mount(
        <Tree id="tree" aria-label="Tree">
          <TreeItem
            actions={
              <>
                <Button id="action">action</Button>
              </>
            }
            id="item1"
          >
            <TreeItemLayout>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem id="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>,
      );
      cy.focused().should('not.exist');
      cy.document().realPress('Tab');
      cy.get('#item1').should('be.focused');
      cy.document().realPress('Tab');
      cy.get('#action').should('be.focused');
    });
    it('should not expand/collapse item on actions Enter/Space key', () => {
      mount(
        <Tree id="tree" aria-label="Tree">
          <TreeItem
            actions={
              <>
                <Button id="action">action</Button>
              </>
            }
            id="item1"
          >
            <TreeItemLayout>level 1, item 1</TreeItemLayout>
            <Tree>
              <TreeItem id="item1__item1">
                <TreeItemLayout>level 2, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>,
      );
      cy.focused().should('not.exist');
      cy.document().realPress('Tab');
      cy.get('#item1').should('be.focused');
      cy.document().realPress('Tab');
      cy.get('#action').should('be.focused').realPress('{enter}');
      cy.get('#item1__item1').should('not.exist');
      cy.get('#action').should('be.focused').realPress('Space');
      cy.get('#item1__item1').should('not.exist');
    });
    it('should focus on first item when pressing tab key', () => {
      mount(<Example />);
      cy.focused().should('not.exist');
      cy.document().realPress('Tab');
      cy.get('#item1').should('be.focused');
    });
    it('should focus out of tree when pressing tab key inside tree.', () => {
      mount(<Example />);
      cy.focused().should('not.exist');
      cy.document().realPress('Tab');
      cy.get('#item1').should('be.focused');
      cy.focused().realPress('Tab');
      cy.focused().should('not.exist');
    });
    describe('Navigation', () => {
      it('should move with Up/Down keys', () => {
        mount(<Example />);
        cy.get('#item1').focus().realPress('{downarrow}');
        cy.get('#item2').should('be.focused');
        cy.focused().realPress('Tab').should('not.exist');
      });
      it('should move with Left/Right keys', () => {
        mount(<Example defaultOpenItems={['item2', 'item2__item1']} />);
        cy.get('#item1').focus().realPress('{downarrow}');
        cy.get('#item2').should('be.focused').realPress('{rightarrow}');
        cy.get('#item2__item1').should('be.focused').realPress('{rightarrow}');
        cy.get('#item2__item1__item1').should('be.focused').realPress('{leftarrow}');
        cy.get('#item2__item1').should('be.focused').realPress('{leftarrow}').realPress('{leftarrow}');
        cy.get('#item2').should('be.focused');
      });
      it('should move to last item with End key', () => {
        mount(<Example defaultOpenItems={['item1', 'item2', 'item2__item1']} />);
        cy.get('#item1').focus().realPress('{end}');
        cy.get('#item2__item1__item1').should('be.focused');
      });
      it('should move to first item with Home key', () => {
        mount(<Example defaultOpenItems={['item1', 'item2', 'item2__item1']} />);
        cy.get('#item1').focus().realPress('{end}');
        cy.get('#item2__item1__item1').should('be.focused').realPress('{home}');
        cy.get('#item1').should('be.focused');
      });
    });
  });
});
