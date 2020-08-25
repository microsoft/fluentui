import * as _ from 'lodash';
import * as React from 'react';
import { Divider, Slider, Menu, Popup, Text, Flex } from '@fluentui/react-northstar';
import { ComponentExampleColorPicker } from '@fluentui/docs-components';
import { ComponentInfo } from '../componentInfo/types';
import { JSONTreeElement } from './types';
import { MultiTypeKnob } from '../config';

const designUnit = 1;
const sizeRamp = [
  designUnit * 0,
  designUnit * 0.25,
  designUnit * 0.5,
  designUnit * 0.75,
  designUnit * 1,
  designUnit * 1.25,
  designUnit * 1.5,
  designUnit * 1.75,
  designUnit * 2,
  designUnit * 2.25,
  designUnit * 2.5,
  designUnit * 2.75,
  designUnit * 3,
  designUnit * 3.25,
  designUnit * 3.5,
  designUnit * 3.75,
  designUnit * 4,
  designUnit * 4.25,
  designUnit * 4.5,
  designUnit * 4.75,
  designUnit * 5,
  designUnit * 5.25,
  designUnit * 5.5,
  designUnit * 5.75,
  designUnit * 6,
  designUnit * 6.25,
  designUnit * 6.5,
  designUnit * 6.75,
];
const designUnitLarge = 4;
const sizeRampLarge = [
  designUnitLarge * 0,
  designUnitLarge * 0.25,
  designUnitLarge * 0.5,
  designUnitLarge * 0.75,
  designUnitLarge * 1,
  designUnitLarge * 1.25,
  designUnitLarge * 1.5,
  designUnitLarge * 1.75,
  designUnitLarge * 2,
  designUnitLarge * 2.25,
  designUnitLarge * 2.5,
  designUnitLarge * 2.75,
  designUnitLarge * 3,
  designUnitLarge * 3.25,
  designUnitLarge * 3.5,
  designUnitLarge * 3.75,
  designUnitLarge * 4,
  designUnitLarge * 4.25,
  designUnitLarge * 4.5,
  designUnitLarge * 4.75,
  designUnitLarge * 5,
  designUnitLarge * 5.25,
  designUnitLarge * 5.5,
  designUnitLarge * 5.75,
  designUnitLarge * 6,
  designUnitLarge * 6.25,
  designUnitLarge * 6.5,
  designUnitLarge * 6.75,
];

const knobs = [
  { kind: 'divider', label: 'Colors' },

  { kind: 'color', label: 'background' },
  { kind: 'color', label: 'color' },
  { kind: 'color', label: 'borderColor' },

  { kind: 'divider', label: 'Border' },

  { kind: 'slider', label: 'borderRadius', ramp: sizeRamp },
  { kind: 'slider', label: 'borderWidth', ramp: sizeRamp },

  { kind: 'divider', label: 'Position' },

  { kind: 'slider', label: 'top', ramp: sizeRamp },
  { kind: 'slider', label: 'bottom', ramp: sizeRamp },
  { kind: 'slider', label: 'left', ramp: sizeRamp },
  { kind: 'slider', label: 'right', ramp: sizeRamp },

  { kind: 'divider', label: 'Padding' },

  { kind: 'slider', label: 'paddingTop', ramp: sizeRamp },
  { kind: 'slider', label: 'paddingRight', ramp: sizeRamp },
  { kind: 'slider', label: 'paddingBottom', ramp: sizeRamp },
  { kind: 'slider', label: 'paddingLeft', ramp: sizeRamp },

  { kind: 'divider', label: 'Margin' },

  { kind: 'slider', label: 'marginTop', ramp: sizeRamp },
  { kind: 'slider', label: 'marginRight', ramp: sizeRamp },
  { kind: 'slider', label: 'marginBottom', ramp: sizeRamp },
  { kind: 'slider', label: 'marginLeft', ramp: sizeRamp },

  { kind: 'divider', label: 'Dimensions' },

  { kind: 'slider', label: 'width', ramp: sizeRampLarge },
  { kind: 'slider', label: 'height', ramp: sizeRampLarge },

  { kind: 'slider', label: 'minWidth', ramp: sizeRampLarge },
  { kind: 'slider', label: 'minHeight', ramp: sizeRampLarge },

  { kind: 'slider', label: 'maxWidth', ramp: sizeRampLarge },
  { kind: 'slider', label: 'maxHeight', ramp: sizeRampLarge },
];

const rowStyle = { padding: '0.1rem 0.25rem' };

type DesignKnobProps = {
  onPropChange: ({
    jsonTreeElement,
    name,
    value,
  }: {
    jsonTreeElement: JSONTreeElement;
    name: string;
    value: string;
  }) => void;
  info: ComponentInfo;
  jsonTreeElement: JSONTreeElement;
};

export const Knobs: React.FunctionComponent<DesignKnobProps> = ({ onPropChange, info, jsonTreeElement }) => {
  const [menuActivePane, setMenuActivePane] = React.useState('props');
  return (
    <div>
      <Menu
        defaultActiveIndex={0}
        items={[
          {
            key: 'props',
            content: 'Props',
            onClick: () => setMenuActivePane('props'),
          },
          {
            key: 'design',
            content: 'Design',
            onClick: () => setMenuActivePane('design'),
          },
        ]}
        underlined
        primary
        styles={{ marginBottom: '1rem', marginTop: '1.5rem' }}
      />
      {menuActivePane === 'props' &&
        info.props
          // only allow knobs for regular props, not default props
          .filter(prop => !/default[A-Z]/.test(prop.name))
          .map(prop => {
            const propValue = jsonTreeElement.props?.[prop.name];
            const types = _.uniq(_.map(prop.types, 'name'));
            const isLiteral = _.every(types, name => name === 'literal');
            const options = isLiteral ? _.map(prop.types, 'value') : null;

            const defaultValues = {
              boolean: false,
              number: 0,
              string: '',
            };

            const value = typeof propValue !== 'undefined' ? propValue : defaultValues[types[0]];

            return (
              <MultiTypeKnob
                key={prop.name}
                label={prop.name}
                types={types as any}
                literalOptions={options}
                value={value}
                onChange={value => {
                  onPropChange({ jsonTreeElement, name: prop.name, value });
                }}
              />
            );
          })}

      {menuActivePane === 'design' &&
        _.map(knobs, knob => {
          const currentValue =
            (jsonTreeElement.props && jsonTreeElement.props.styles && jsonTreeElement.props.styles[knob.label]) ||
            '#000';

          return (
            <div key={knob.label} style={{ ...rowStyle, marginBottom: '0.5rem' }}>
              {knob.kind === 'slider' ? (
                <>
                  <code style={{ float: 'right' }}>{JSON.stringify(currentValue, null, 2)}</code>
                  <div>{knob.label}</div>
                  <Slider
                    fluid
                    step={1}
                    min={0}
                    max={knob.ramp.length - 1}
                    value={currentValue ? knob.ramp.indexOf(parseFloat(currentValue)) : 0}
                    onChange={(e, data) => {
                      onPropChange({
                        jsonTreeElement,
                        name: `design-${knob.label}`,
                        value: `${knob.ramp[+data.value]}rem`,
                      });
                    }}
                  />
                </>
              ) : knob.kind === 'divider' ? (
                <Divider content={knob.label} style={{ width: '100%' }} />
              ) : knob.kind === 'color' ? (
                <Popup
                  content={
                    <ComponentExampleColorPicker
                      onChange={(color: string) => {
                        onPropChange({ jsonTreeElement, name: `design-${knob.label}`, value: color });
                      }}
                      variableValue={knob.label}
                    />
                  }
                  position="below"
                  align="end"
                  trigger={
                    <Flex>
                      <div
                        style={{
                          width: '1.2rem',
                          height: '1.2rem',
                          marginTop: 'auto',
                          marginRight: '0.5rem',
                          background: `${currentValue}`,
                          border: '1px solid #000',
                        }}
                      />
                      <Text content={knob.label} />
                    </Flex>
                  }
                />
              ) : (
                <div>UNKNOWN</div>
              )}
            </div>
          );
        })}
    </div>
  );
};
