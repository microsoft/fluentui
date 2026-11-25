import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { Tree } from './Tree';
import { TreeItem } from './TreeItem/TreeItem';
import { TreeItemLayout } from './TreeItemLayout/TreeItemLayout';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('Tree', () => {
  it('keeps disabled items navigable while blocking native selection and disclosure', () => {
    const onOpenChange = cy.stub().as('openChange');
    const onCheckedChange = cy.stub().as('checkedChange');
    mount(
      <Tree
        aria-label="Files"
        selectionMode="multiselect"
        onOpenChange={onOpenChange}
        onCheckedChange={onCheckedChange}
      >
        <TreeItem itemType="leaf" value="first">
          <TreeItemLayout>First</TreeItemLayout>
        </TreeItem>
        <TreeItem disabled itemType="branch" value="disabled">
          <TreeItemLayout expandIcon="Expand" selector={{ disabled: false }}>
            Unavailable
          </TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" value="last">
          <TreeItemLayout>Last</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    cy.contains('[role="treeitem"]', 'First').focus().realPress('ArrowDown');
    cy.contains('[role="treeitem"]', 'Unavailable')
      .should('be.focused')
      .should('have.attr', 'aria-disabled', 'true')
      .realPress('Space');
    cy.contains('[role="treeitem"]', 'Unavailable').realPress('Enter');
    cy.contains('[role="treeitem"]', 'Unavailable').realPress('ArrowRight');
    cy.contains('[role="treeitem"]', 'Unavailable').should('have.attr', 'aria-expanded', 'false');
    cy.contains('Expand').realClick();
    cy.contains('[role="treeitem"]', 'Unavailable').find('input').should('be.disabled');
    cy.get('@openChange').should('not.have.been.called');
    cy.get('@checkedChange').should('not.have.been.called');
    cy.contains('[role="treeitem"]', 'Unavailable').focus().realPress('ArrowDown');
    cy.contains('[role="treeitem"]', 'Last').should('be.focused').realPress('Space');
    cy.get('@checkedChange').should('have.been.calledOnce');
  });

  it('continues keyboard navigation after a selector is clicked', () => {
    mount(
      <Tree aria-label="Files" selectionMode="multiselect">
        <TreeItem itemType="leaf" value="readme">
          <TreeItemLayout>README</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" value="license">
          <TreeItemLayout>LICENSE</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    cy.get('input[aria-labelledby]').first().realClick();
    cy.contains('[role="treeitem"]', 'README').should('be.focused').realPress('ArrowDown');
    cy.contains('[role="treeitem"]', 'LICENSE').should('be.focused');
  });

  it('moves between the actions with ArrowLeft and leaves them from the first action in treegrid mode', () => {
    mount(
      <Tree aria-label="Files" navigationMode="treegrid">
        <TreeItem itemType="leaf" value="readme">
          <TreeItemLayout
            actions={{
              visible: true,
              children: (
                <>
                  <button>Rename</button>
                  <button>Delete</button>
                </>
              ),
            }}
          >
            README
          </TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    cy.contains('[role="treeitem"]', 'README').focus().realPress('ArrowRight');
    cy.contains('button', 'Rename').should('be.focused').realPress('ArrowRight');
    cy.contains('button', 'Delete').should('be.focused').realPress('ArrowLeft');
    cy.contains('button', 'Rename').should('be.focused').realPress('ArrowLeft');
    cy.contains('[role="treeitem"]', 'README').should('be.focused');
  });
  it('moves between the actions with ArrowLeft and leaves them from the last action in rtl treegrid mode', () => {
    mount(
      <div dir="rtl">
        <Tree aria-label="Files" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="readme">
            <TreeItemLayout
              actions={{
                visible: true,
                children: (
                  <>
                    <button>Rename</button>
                    <button>Delete</button>
                  </>
                ),
              }}
            >
              README
            </TreeItemLayout>
          </TreeItem>
        </Tree>
      </div>,
    );

    cy.contains('[role="treeitem"]', 'README').focus().realPress('ArrowRight');
    cy.contains('button', 'Rename').should('be.focused').realPress('ArrowLeft');
    cy.contains('button', 'Delete').should('be.focused').realPress('ArrowLeft');
    cy.contains('[role="treeitem"]', 'README').should('be.focused');
  });
});
