import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Tree } from '../Tree';
import { TreeItem, TreeItemProps } from '../TreeItem';
import { TreeItemLayout } from '../TreeItemLayout';
import { TreeRootReset } from './TreeProvider';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useRestoreFocusTarget } from '@fluentui/react-tabster';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('TreeRootReset', () => {
  it('ensure that a subtree will be treated as a root tree', () => {
    const handleOpenChange1 = cy.spy().as('handleOpenChange1');
    const handleOpenChange2 = cy.spy().as('handleOpenChange2');

    mount(
      <Tree openItems={['item1']} onOpenChange={handleOpenChange1}>
        <TreeItem value="item1" data-testid="tree-item" itemType="branch">
          <TreeItemLayout
            actions={
              <>
                <TreeRootReset>
                  <Tree onOpenChange={handleOpenChange2}>
                    <TreeItem data-testid="item1" id="item1" value="item1" itemType="branch">
                      <TreeItemLayout>branch</TreeItemLayout>
                      <Tree>
                        <TreeItem data-testid="item2" value="item2" itemType="leaf">
                          leaf
                        </TreeItem>
                      </Tree>
                    </TreeItem>
                  </Tree>
                </TreeRootReset>
              </>
            }
          />
        </TreeItem>
      </Tree>,
    );
    cy.get('[data-testid="item2"]').should('not.exist');
    cy.get('[data-testid="tree-item"]').focus();
    cy.get('[data-testid="item1"]').realClick();
    cy.get('@handleOpenChange1').should('not.have.been.called');
    cy.get('@handleOpenChange2').should('have.been.called');
    cy.get('[data-testid="item2"]').should('exist');
  });
  it('ensures basic navigation between multiple trees', () => {
    mount(<Actions />);
    cy.get('[data-testid="item1"]').should('exist').focus();
    cy.get('[data-testid="item2"]').should('not.exist');
    cy.get('[data-testid="action-button"]').should('exist').realClick();
    cy.get('[data-testid="item2"]').should('exist').focus().realPress('{esc}');
    cy.get('[data-testid="action-button"]').should('be.focused').realPress(['Shift', 'Tab']);
    cy.get('[data-testid="item1"]').should('exist').should('be.focused');
  });
});

type CustomTreeItemProps = TreeItemProps;

const CustomTreeItem = ({ children, ...props }: CustomTreeItemProps) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  return (
    <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
      <TreeItemLayout
        actions={
          <>
            <Popover>
              <PopoverTrigger>
                <Button data-testid="action-button" aria-label="Edit" appearance="subtle" icon={<div />} />
              </PopoverTrigger>
              <PopoverSurface>
                <TreeRootReset>
                  <Tree aria-label="foo">
                    <TreeItem itemType="leaf">
                      <TreeItemLayout>Foo</TreeItemLayout>
                    </TreeItem>
                    <TreeItem itemType="leaf">
                      <TreeItemLayout>Foo</TreeItemLayout>
                    </TreeItem>
                    <TreeItem data-testid="item2" itemType="branch">
                      <TreeItemLayout>Foo</TreeItemLayout>
                      <Tree>
                        <TreeItem itemType="leaf">
                          <TreeItemLayout>Foo</TreeItemLayout>
                        </TreeItem>
                        <TreeItem itemType="leaf">
                          <TreeItemLayout>Foo</TreeItemLayout>
                        </TreeItem>
                      </Tree>
                    </TreeItem>
                  </Tree>
                </TreeRootReset>
              </PopoverSurface>
            </Popover>
          </>
        }
      >
        {layoutChildren}
      </TreeItemLayout>
      {subtree}
    </TreeItem>
  );
};

const Actions = () => {
  return (
    <Tree aria-label="Actions">
      <CustomTreeItem data-testid="item1" itemType="branch">
        item 1
        <Tree>
          <CustomTreeItem itemType="branch">
            item 1-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 1-1-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-2</CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-3</CustomTreeItem>
        </Tree>
      </CustomTreeItem>
      <CustomTreeItem itemType="branch">
        item 2
        <Tree>
          <CustomTreeItem itemType="branch">
            item 2-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 2-1-1</CustomTreeItem>
            </Tree>
          </CustomTreeItem>

          <CustomTreeItem itemType="branch">
            item 3
            <Tree>
              <CustomTreeItem itemType="leaf">item 3-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
        </Tree>
      </CustomTreeItem>
    </Tree>
  );
};
