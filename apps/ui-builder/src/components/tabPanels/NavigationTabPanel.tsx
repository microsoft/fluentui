import * as React from 'react';

import { JSONTreeElement } from '../types';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { ComponentTree } from '../ComponentTree';
import { useCallback } from 'react';

const useStyles = makeStyles({ button: { ...shorthands.margin('0.5rem', 'auto') } });

export type NavigatorTabPanelProps = {
  jsonTree: JSONTreeElement;
  onAddComponent?: (uuid: string, where: string) => void;
  onCloneComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDeleteSelectedComponent?: () => void;
  onDragStart?: (info: any, e: any) => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onMoveComponent?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  selectedComponent?: JSONTreeElement;
};

export const NavigatorTabPanel: React.FunctionComponent<NavigatorTabPanelProps> = ({
  jsonTree,
  onCloneComponent,
  onDeleteSelectedComponent,
  onMoveComponent,
  onOpenAddComponentDialog,
  onSelectComponent,
  selectedComponent,
}: NavigatorTabPanelProps) => {
  const styles = useStyles();

  const onClick = useCallback(() => {
    onOpenAddComponentDialog('', 'first');
  }, [onOpenAddComponentDialog]);

  return (
    <div>
      {(!jsonTree?.props?.children || jsonTree?.props?.children?.length === 0) && (
        <Button onClick={onClick} className={styles.button}>
          Insert first component
        </Button>
      )}
      <ComponentTree
        onAddComponent={onOpenAddComponentDialog}
        onCloneComponent={onCloneComponent}
        onDeleteSelectedComponent={onDeleteSelectedComponent}
        onMoveComponent={onMoveComponent}
        onSelectComponent={onSelectComponent}
        selectedComponent={selectedComponent}
        tree={jsonTree}
      />
    </div>
  );
};
