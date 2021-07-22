import * as React from 'react';
import { Header, Label, Menu } from '@fluentui/react-northstar';
import { tabListBehavior } from '@fluentui/accessibility';
import { AccessibilityTabPanel } from './tabPanels/AccessibilityTabPanel';
import { NavigatorTabPanel } from './tabPanels/NavigationTabPanel';
import { NavBarItem } from './NavBarItem';
import { AddIcon, MenuIcon, AccessibilityIcon } from '@fluentui/react-icons-northstar';
import { useMode } from '../hooks/useMode';
import { JSONTreeElement } from './types';
import { AccessibilityError } from '../accessibility/types';
import { AddTabPanel } from './tabPanels/AddTabPanel';

export type NavigationPanelProps = {
  accessibilityErrors: AccessibilityError[];
  activeTab: string;
  jsonTree: JSONTreeElement;
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onDragStart?: (info: any, e: any) => void;
  onGoToParentComponent?: () => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onMoveComponent?: (args: { clientX: number; clientY: number }) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onSwitchTab?: (tab: any) => void;
  selectedComponent?: JSONTreeElement;
};

export const NavigationPanel: React.FunctionComponent<NavigationPanelProps> = (props: NavigationPanelProps) => {
  const [{ mode }] = useMode();

  const accessErrorLabelStyle = {
    position: 'relative',
    right: '8px',
    top: '-5px',
    transform: 'rotate(0deg);',
    border: 'solid 1px white',
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
          isSelected={props.activeTab === 'add'}
          icon={<AddIcon size="large" outline />}
          onClickHandler={() => props.onSwitchTab('add')}
        />

        <NavBarItem
          title="Accessibility"
          isSelected={props.activeTab === 'accessibility'}
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
          isSelected={props.activeTab === 'nav'}
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
            {props.activeTab === 'add'
              ? 'Add components'
              : props.activeTab === 'accessibility'
              ? 'Accessibility'
              : 'Navigator'}
          </Header>
        </div>
        {props.activeTab === 'add' && <AddTabPanel onDragStart={props.onDragStart} />}
        {props.activeTab === 'accessibility' && (
          <AccessibilityTabPanel
            accessibilityErrors={props.accessibilityErrors}
            jsonTree={props.jsonTree}
            onAddComponent={props.onAddComponent}
            onCloneComponent={props.onCloneComponent}
            onDeleteSelectedComponent={props.onDeleteSelectedComponent}
            onDragStart={props.onDragStart}
            onOpenAddComponentDialog={props.onOpenAddComponentDialog}
            onMoveComponent={props.onMoveComponent}
            onSelectComponent={props.onSelectComponent}
            selectedComponent={props.selectedComponent}
          />
        )}
        {props.activeTab === 'nav' && (
          <NavigatorTabPanel
            jsonTree={props.jsonTree}
            onAddComponent={props.onAddComponent}
            onCloneComponent={props.onCloneComponent}
            onDeleteSelectedComponent={props.onDeleteSelectedComponent}
            onDragStart={props.onDragStart}
            onOpenAddComponentDialog={props.onOpenAddComponentDialog}
            onMoveComponent={props.onMoveComponent}
            onSelectComponent={props.onSelectComponent}
            selectedComponent={props.selectedComponent}
          />
        )}
      </div>
    </div>
  );
};
