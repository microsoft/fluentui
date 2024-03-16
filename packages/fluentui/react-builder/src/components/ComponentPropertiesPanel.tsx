import * as React from 'react';
import { AccessibilityError } from '../accessibility/types';
import { ComponentInfo } from '../componentInfo/types';
import { Description } from './Description';
import { Knobs } from './Knobs';
import { DesignerMode, JSONTreeElement } from './types';

type onPropChangeArgs = {
  jsonTreeElement: JSONTreeElement;
  name: string;
  value: number;
};
export type ComponentPropertiesPanelProps = {
  componentAccessibilityErrors: AccessibilityError[];
  mode: DesignerMode;
  onPropUpdate: (args: { jsonTreeElement: JSONTreeElement }) => void;
  onPropChange: (args: onPropChangeArgs) => void;
  onPropDelete: (args: { jsonTreeElement: JSONTreeElement; name: string }) => void;
  selectedComponentInfo: ComponentInfo;
  selectedJSONTreeElement: JSONTreeElement;
};

export const ComponentPropertiesPanel: React.FunctionComponent<ComponentPropertiesPanelProps> = (
  props: ComponentPropertiesPanelProps,
) => {
  return (
    (props.selectedComponentInfo && (
      <div
        role="complementary"
        aria-label="Component properties"
        style={{
          width: '20rem',
          padding: '1rem',
          overflow: 'auto',
          transition: 'opacity 0.2s',
          ...(props.mode === 'use' && {
            pointerEvents: 'none',
            opacity: 0,
          }),
        }}
      >
        <Description
          selectedJSONTreeElement={props.selectedJSONTreeElement}
          componentInfo={props.selectedComponentInfo}
        />

        {props.selectedJSONTreeElement && (
          <Knobs
            onPropChange={props.onPropChange}
            onPropDelete={props.onPropDelete}
            info={props.selectedComponentInfo}
            jsonTreeElement={props.selectedJSONTreeElement}
            elementAccessibilityErrors={props.componentAccessibilityErrors}
            onPropUpdate={props.onPropUpdate}
          />
        )}
      </div>
    )) || <div />
  );
};
