import * as React from 'react';
import { Button, Header, Label, Menu } from '@fluentui/react-northstar';
import { tabListBehavior } from '@fluentui/accessibility';
import { ComponentList } from './ComponentList';
import { ComponentTree } from './ComponentTree';
import { AccessibilityErrorMenu } from './AccessibilityErrorMenu';
import { NavBarItem } from './NavBarItem';
import { AddIcon, MenuIcon, AccessibilityIcon } from '@fluentui/react-icons-northstar';
import { useMode } from '../hooks/useMode';
import { useDesignerState } from '../state/state';
import { JSONTreeElement } from './types';
import { AccessibilityError } from '../accessibility/types';

export type LeftNavProps = {
  accessibilityErrors: AccessibilityError[];
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onDragStart?: (info: any, e: any) => void;
  onGoToParentComponent?: () => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onSwitchTab?: (tab: any) => void;
  selectedComponent?: JSONTreeElement;
  selectedComponentAccessibilityErrors: AccessibilityError[];
};

export const LeftNav: React.FunctionComponent<LeftNavProps> = (props: LeftNavProps) => {
  const [{ mode }] = useMode();
  const [state] = useDesignerState();

  const { activeTab, jsonTree } = state;

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
          onClickHandler={() => props.onSwitchTab('add')}
        />

        <NavBarItem
          title="Accessibility"
          isSelected={activeTab === 'accessibility'}
          icon={
            props.accessibilityErrors.length !== 0 ? (
              <>
                {' '}
                <AccessibilityIcon size="large" />
                <Label
                  design={accessErrorLabelStyle}
                  color={'red'}
                  content={props.accessibilityErrors.length}
                  circular
                  fluid
                />{' '}
              </>
            ) : (
              <AccessibilityIcon size="large" outline />
            )
          }
          onClickHandler={() => props.onSwitchTab('accessibility')}
        />

        <NavBarItem
          title="Navigator"
          isSelected={activeTab === 'nav'}
          icon={<MenuIcon size="large" outline />}
          onClickHandler={() => props.onSwitchTab('nav')}
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
            <ComponentList style={{ overflowY: 'auto' }} onDragStart={props.onDragStart} />
          </div>
        )}
        {activeTab === 'accessibility' && (
          <AccessibilityErrorMenu
            tree={jsonTree}
            selectedComponent={props.selectedComponent}
            accessibilityErrors={props.accessibilityErrors}
            onSelectComponent={props.onSelectComponent}
          />
        )}
        {activeTab === 'nav' && (
          <div>
            {(!jsonTree?.props?.children || jsonTree?.props?.children?.length === 0) && (
              <Button
                text
                content="Insert first component"
                fluid
                onClick={() => props.onOpenAddComponentDialog('', 'first')}
              />
            )}
            <ComponentTree
              tree={jsonTree}
              selectedComponent={props.selectedComponent}
              selectedComponentAccessibilityErrors={props.selectedComponentAccessibilityErrors}
              onSelectComponent={props.onSelectComponent}
              onCloneComponent={props.onCloneComponent}
              onMoveComponent={props.onMoveComponent}
              onDeleteSelectedComponent={props.onDeleteSelectedComponent}
              onAddComponent={props.onAddComponent}
            />
          </div>
        )}
      </div>
    </div>
  );
};
