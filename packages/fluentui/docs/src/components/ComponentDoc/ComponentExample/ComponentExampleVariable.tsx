import { Input, InputProps, Popup } from '@fluentui/react-northstar';
import * as React from 'react';
import ComponentExampleColorPicker from './ComponentExampleColorPicker';

export type ComponentExampleVariableProps = {
  componentName: string;
  onChange: (componentName: string, variableName: string, variableValue: string) => void;
  variableName: string;
  variableType: 'color' | 'string';
  variableValue: string;
};

const ComponentExampleVariable: React.FunctionComponent<ComponentExampleVariableProps> = props => {
  const { componentName, onChange, variableName, variableType, variableValue } = props;

  const handleInputChange = React.useCallback(
    (e, data: InputProps) => {
      onChange(componentName, variableName, data.value as string);
    },
    [componentName, onChange, variableName],
  );
  const handleColorChange = React.useCallback(
    (colorValue: string) => {
      onChange(componentName, variableName, colorValue);
    },
    [componentName, onChange, variableName],
  );

  return (
    <div style={{ padding: '0.25rem' }}>
      {variableType === 'string' && <div>{variableName}</div>}
      {variableType === 'string' && <Input onChange={handleInputChange} value={variableValue} />}

      {variableType === 'color' && (
        <Popup
          pointing
          trigger={
            <div style={{ display: 'inline-block', cursor: 'pointer' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '1rem',
                  height: '1rem',
                  marginRight: '0.5rem',
                  verticalAlign: 'middle',
                  background: variableValue,
                  boxShadow: '0 0 0 1px black, 0 0 0 2px white',
                }}
              />
              {variableName}
            </div>
          }
          align="start"
          position="below"
          content={<ComponentExampleColorPicker onChange={handleColorChange} variableValue={variableValue} />}
        />
      )}
    </div>
  );
};

export default React.memo(ComponentExampleVariable);
