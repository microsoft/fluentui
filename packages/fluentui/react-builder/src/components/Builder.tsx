import * as React from 'react';
import { AccessibilityError } from '../accessibility/types';
import { CanvasWindow } from './CanvasWindow';
import { ComponentPropertiesPanel } from './ComponentPropertiesPanel';
import { NavigationPanel } from './NavigationPanel';
import { DesignerMode, JSONTreeElement } from './types';
import { DesignerState } from '../state/state';
import { ComponentInfo } from '../componentInfo/types';

type onPropChangeArgs = {
  jsonTreeElement: JSONTreeElement;
  name: string;
  value: number;
};
export type BuilderProps = {
  accessibilityErrors: AccessibilityError[];
  activeTab: string;
  getShareableLink: () => string;
  isExpanding: boolean;
  isSelecting: boolean;
  jsonTree: JSONTreeElement;
  mode: DesignerMode;
  onAddComponent?: (uuid: string, where: string) => void;
  onCanvasMouseUp: () => void;
  onCloneComponent: (e: MouseEvent) => void;
  onDeleteSelectedComponent: () => void;
  onDrag: (e: MouseEvent) => void;
  onDragStart?: (info: any, e: any) => void;
  onDropPositionChange: (dropParent: any, dropIndex: any) => void;
  onGoToParentComponent: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onMoveComponent: (e: MouseEvent) => void;
  onOpenAddComponentDialog?: (uuid: string, where: string) => void;
  onPropChange: (args: onPropChangeArgs) => void;
  onPropDelete: (args: { jsonTreeElement: JSONTreeElement; name: string }) => void;
  onPropUpdate: (args: { jsonTreeElement: JSONTreeElement }) => void;
  onSelectComponent: (jsonTreeElement: JSONTreeElement) => void;
  onSourceCodeChange: (code: any, jsonTree: any) => void;
  onSourceCodeError: (code: any, error: any) => void;
  onSwitchTab?: (tab: any) => void;
  onSwitchToStore: () => void;
  selectedComponent: JSONTreeElement;
  selectedComponentAccessibilityErrors: AccessibilityError[];
  selectedComponentInfo: ComponentInfo;
  selectedJSONTreeElement: JSONTreeElement;
  showJSONTree: boolean;
  state: DesignerState;
};

export const Builder: React.FunctionComponent<BuilderProps> = (props: BuilderProps) => {
  return (
    <div style={{ display: 'flex', flex: 1, minWidth: '10rem', overflow: 'hidden' }}>
      <NavigationPanel
        accessibilityErrors={props.accessibilityErrors}
        activeTab={props.activeTab}
        jsonTree={props.jsonTree}
        onAddComponent={props.onAddComponent}
        onCloneComponent={props.onCloneComponent}
        onDeleteSelectedComponent={props.onDeleteSelectedComponent}
        onDragStart={props.onDragStart}
        onGoToParentComponent={props.onGoToParentComponent}
        onMoveComponent={props.onMoveComponent}
        onOpenAddComponentDialog={props.onOpenAddComponentDialog}
        onSelectComponent={props.onSelectComponent}
        onSwitchTab={props.onSwitchTab}
        selectedComponent={props.selectedComponent}
      />

      <CanvasWindow
        getShareableLink={props.getShareableLink}
        isExpanding={props.isExpanding}
        isSelecting={props.isSelecting}
        onCanvasMouseUp={props.onCanvasMouseUp}
        onCloneComponent={props.onCloneComponent}
        onDeleteSelectedComponent={props.onDeleteSelectedComponent}
        onDrag={props.onDrag}
        onDropPositionChange={props.onDropPositionChange}
        onGoToParentComponent={props.onGoToParentComponent}
        onKeyDown={props.onKeyDown}
        onMoveComponent={props.onMoveComponent}
        onPropUpdate={props.onPropUpdate}
        onSelectComponent={props.onSelectComponent}
        onSourceCodeChange={props.onSourceCodeChange}
        onSourceCodeError={props.onSourceCodeError}
        selectedComponent={props.selectedComponent}
        selectedComponentAccessibilityErrors={props.selectedComponentAccessibilityErrors}
        showJSONTree={props.showJSONTree}
        state={props.state}
        onSwitchToStore={props.onSwitchToStore}
      />

      <ComponentPropertiesPanel
        componentAccessibilityErrors={props.selectedComponentAccessibilityErrors}
        mode={props.mode}
        onPropUpdate={props.onPropUpdate}
        onPropChange={props.onPropChange}
        onPropDelete={props.onPropDelete}
        selectedComponentInfo={props.selectedComponentInfo}
        selectedJSONTreeElement={props.selectedJSONTreeElement}
      />
    </div>
  );
};
