import * as React from 'react';
import { AccessibilityTabPanel } from './tabPanels/AccessibilityTabPanel';
import { NavigatorTabPanel } from './tabPanels/NavigationTabPanel';
import { useMode } from '../hooks/useMode';
import { JSONTreeElement } from './types';
import { AccessibilityError } from '../accessibility/types';
import { AddTabPanel } from './tabPanels/AddTabPanel';

import { TabList, Tab, Tooltip, makeStyles, shorthands, tokens, mergeClasses } from '@fluentui/react-components';
import {
  AddFilled,
  AccessibilityFilled,
  AccessibilityCheckmarkRegular,
  TextBulletListTreeFilled,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: { display: 'flex', minWidth: '1rem', ...shorthands.overflow('auto'), paddingLeft: '0.25rem' },
  accessibilityError: { color: tokens.colorPaletteRedForeground1 },
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '22.85rem',
    transitionProperty: 'opacity',
    transitionDuration: '0.2s',
  },
  panelContainerModeUse: { pointerEvents: 'none', opacity: 0 },
  panelContainerHeader: {
    fontSize: '1rem',
    fontWeight: 'bold',
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralForegroundDisabled),
    ...shorthands.padding('0', '10px', '10px', '20px'),
  },
});

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

export const NavigationPanel: React.FunctionComponent<NavigationPanelProps> = ({
  accessibilityErrors,
  activeTab,
  jsonTree,
  onAddComponent,
  onCloneComponent,
  onDeleteSelectedComponent,
  onDragStart,
  onMoveComponent,
  onOpenAddComponentDialog,
  onSelectComponent,
  onSwitchTab,
  selectedComponent,
}: NavigationPanelProps) => {
  const [{ mode }] = useMode();
  const styles = useStyles();

  // hack for invalid tooltip positioning
  const [addRef, setAddRef] = React.useState<HTMLSpanElement | null>(null);
  const [accessibilityRef, setAccessibilityRef] = React.useState<HTMLSpanElement | null>(null);
  const [navRef, setNavRef] = React.useState<HTMLSpanElement | null>(null);

  const onTabSelect = React.useCallback((_e, data) => onSwitchTab(data.value), [onSwitchTab]);

  const printActiveTab = () => {
    switch (activeTab) {
      case 'add':
        return <AddTabPanel onDragStart={onDragStart} />;

      case 'accessibility':
        return (
          <AccessibilityTabPanel
            accessibilityErrors={accessibilityErrors}
            jsonTree={jsonTree}
            onAddComponent={onAddComponent}
            onCloneComponent={onCloneComponent}
            onDeleteSelectedComponent={onDeleteSelectedComponent}
            onDragStart={onDragStart}
            onOpenAddComponentDialog={onOpenAddComponentDialog}
            onMoveComponent={onMoveComponent}
            onSelectComponent={onSelectComponent}
            selectedComponent={selectedComponent}
          />
        );

      case 'nav':
        return (
          <NavigatorTabPanel
            jsonTree={jsonTree}
            onAddComponent={onAddComponent}
            onCloneComponent={onCloneComponent}
            onDeleteSelectedComponent={onDeleteSelectedComponent}
            onDragStart={onDragStart}
            onOpenAddComponentDialog={onOpenAddComponentDialog}
            onMoveComponent={onMoveComponent}
            onSelectComponent={onSelectComponent}
            selectedComponent={selectedComponent}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <div className={styles.container}>
      <TabList vertical selectedValue={activeTab} onTabSelect={onTabSelect}>
        <Tab
          value="add"
          icon={{
            ref: setAddRef,
            children: (
              <Tooltip relationship="label" hideDelay={0} content="Add components" positioning={{ target: addRef }}>
                <AddFilled />
              </Tooltip>
            ),
          }}
        />
        <Tab
          value="accessibility"
          icon={{
            ref: setAccessibilityRef,
            children: (
              <Tooltip
                relationship="label"
                hideDelay={0}
                positioning={{ target: accessibilityRef }}
                content={
                  accessibilityErrors.length === 0
                    ? 'Accessibility'
                    : 'Accessibility errors: ' + accessibilityErrors.length
                }
              >
                {accessibilityErrors.length > 0 ? (
                  <AccessibilityFilled className={styles.accessibilityError} />
                ) : (
                  <AccessibilityCheckmarkRegular />
                )}
              </Tooltip>
            ),
          }}
        />
        <Tab
          value="nav"
          icon={{
            ref: setNavRef,
            children: (
              <Tooltip relationship="label" hideDelay={0} content="Navigator" positioning={{ target: navRef }}>
                <TextBulletListTreeFilled />
              </Tooltip>
            ),
          }}
        />
      </TabList>
      <div className={mergeClasses(styles.panelContainer, mode === 'use' && styles.panelContainerModeUse)}>
        <h2 className={styles.panelContainerHeader}>
          {activeTab === 'add' ? 'Add components' : activeTab === 'accessibility' ? 'Accessibility' : 'Navigator'}
        </h2>
        {printActiveTab()}
      </div>
    </div>
  );
};
