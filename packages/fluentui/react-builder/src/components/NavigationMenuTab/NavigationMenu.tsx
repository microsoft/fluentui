import { tabListBehavior } from '@fluentui/accessibility';
import { Button, Header, Label, Menu } from '@fluentui/react-northstar/';
import { NavBarItem } from './NavBarItem';
import * as React from 'react';
import { AccessibilityIcon, AddIcon, MenuIcon } from '@fluentui/react-icons-northstar';
import { ComponentTree } from './ComponentTree';
import { ComponentList } from '../ComponentList';
import { AccessibilityErrorMenu } from './AccessibilityErrorMenu';
import { AccessibilityError } from '../../accessibility/types';
import { DesignerMode, JSONTreeElement } from '../types';

export type NavigationMenuTabProps = {
  mode: DesignerMode;
  jsonTree: JSONTreeElement;
  activeTab?: string;
  selectedComponent?: JSONTreeElement;
  selectedComponentAccessibilityErrors?: AccessibilityError[];
  accessibilityErrors?: AccessibilityError[];
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onAddComponent?: (uuid: string, where: string) => void;
  onDragStart?: (info, e) => void;
  selectActiveTab?: (tab) => void;
};
export const NavigationMenuTab: React.FunctionComponent<NavigationMenuTabProps> = ({
  mode,
  jsonTree,
  activeTab,
  selectedComponent,
  selectedComponentAccessibilityErrors,
  accessibilityErrors,
  selectActiveTab,
  onDragStart,
  onAddComponent,
  onSelectComponent,
  onMoveComponent,
  onCloneComponent,
  onDeleteSelectedComponent,
}) => {
  const accessErrorLabelStyle = {
    position: 'relative',
    right: '5px',
    top: '-5px',
    transform: 'rotate(0deg);',
    border: 'solid 2px white',
    height: '18px',
    width: '18px',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={{ display: 'flex', flex: 1, minWidth: '10rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', minWidth: '1rem', overflow: 'auto' }}>
        <Menu
          accessibility={tabListBehavior}
          vertical
          styles={({ theme }) => ({
            background: '#FAF9F8',
            border: '0px',
            borderRight: `1px solid ${theme.siteVariables.colorScheme.default.border2}`,
            borderRadius: '0px',
            display: 'flex',
            flexDirection: 'column',
            width: '3.4rem',
            transition: 'opacity 0.2s',
            position: 'relative',
            padding: '0px',
            ...(mode === 'use' && {
              pointerEvents: 'none',
              opacity: 0,
            }),
          })}
        >
          <NavBarItem
            title="Add components"
            isSelected={activeTab === 'add'}
            icon={<AddIcon size="large" outline />}
            onClickHandler={() => selectActiveTab('add')}
          />

          <NavBarItem
            title="Accessibility"
            isSelected={activeTab === 'accessibility'}
            icon={
              accessibilityErrors.length !== 0 ? (
                <>
                  {' '}
                  <AccessibilityIcon size="large" />
                  <Label
                    design={accessErrorLabelStyle}
                    color={'red'}
                    content={accessibilityErrors.length}
                    circular
                    fluid
                  />{' '}
                </>
              ) : (
                <AccessibilityIcon size="large" outline />
              )
            }
            onClickHandler={() => selectActiveTab('accessibility')}
          />

          <NavBarItem
            title="Navigator"
            isSelected={activeTab === 'nav'}
            icon={<MenuIcon size="large" outline />}
            onClickHandler={() => selectActiveTab('nav')}
          />
        </Menu>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '22.85rem',
            transition: 'opacity 0.2s',
            ...(mode === 'use' && {
              pointerEvents: 'none',
              opacity: 0,
            }),
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px 0 20px',
              borderBottom: '1px solid #E1DFDD',
            }}
          >
            <Header as="h2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {activeTab === 'add' ? 'Add components' : activeTab === 'accessibility' ? 'Accessibility' : 'Navigator'}
            </Header>
          </div>
          {activeTab === 'add' && (
            <div>
              <ComponentList style={{ overflowY: 'auto' }} onDragStart={onDragStart} />
            </div>
          )}
          {activeTab === 'accessibility' && (
            <AccessibilityErrorMenu
              tree={jsonTree}
              selectedComponent={selectedComponent}
              accessibilityErrors={accessibilityErrors}
              onSelectComponent={onSelectComponent}
            />
          )}
          {activeTab === 'nav' && (
            <div>
              {(!jsonTree?.props?.children || jsonTree?.props?.children?.length === 0) && (
                <Button text content="Insert first component" fluid onClick={() => onAddComponent('', 'first')} />
              )}
              <ComponentTree
                tree={jsonTree}
                selectedComponent={selectedComponent}
                selectedComponentAccessibilityErrors={selectedComponentAccessibilityErrors}
                onSelectComponent={onSelectComponent}
                onCloneComponent={onCloneComponent}
                onMoveComponent={onMoveComponent}
                onDeleteSelectedComponent={onDeleteSelectedComponent}
                onAddComponent={onAddComponent}
              />
            </div>
          )}
        </div>
      </div>
      )
    </div>
  );
};
