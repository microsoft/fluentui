import * as _ from 'lodash';
import * as React from 'react';
import { Divider, Header, Slider } from '@fluentui/react-northstar';
import { ComponentInfo } from '@fluentui/docs/src/types';
import { JSONTreeElement } from './types';

const designUnit = 4;
const sizeRamp = [
  designUnit * 0,
  designUnit * 0.5,
  designUnit * 1,
  designUnit * 2,
  designUnit * 4,
  designUnit * 8,
  designUnit * 12,
];

const knobs = [
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

  { kind: 'slider', label: 'width', ramp: sizeRamp },
  { kind: 'slider', label: 'height', ramp: sizeRamp },

  { kind: 'slider', label: 'minWidth', ramp: sizeRamp },
  { kind: 'slider', label: 'minHeight', ramp: sizeRamp },

  { kind: 'slider', label: 'maxWidth', ramp: sizeRamp },
  { kind: 'slider', label: 'maxHeight', ramp: sizeRamp },
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
    value: number;
  }) => void;
  info: ComponentInfo;
  jsonTreeElement: JSONTreeElement;
};

const Knobs: React.FC<DesignKnobProps> = ({ onPropChange, info, jsonTreeElement }) => {
  return (
    <div>
      <Header as="h4">Active Props</Header>
      {Object.keys(jsonTreeElement.props).map(name => {
        const val = jsonTreeElement.props[name];
        const type = typeof val;

        if (type === 'undefined') {
          return null;
        }

        const printed =
          type === 'function' ? 'Function' : type === 'object' && type !== null ? '{}' : JSON.stringify(val, null, 2);

        return (
          <div key={name}>
            <code>
              {name} = {printed}
            </code>
          </div>
        );
      })}
      <Header as="h4">All Props</Header>
      {info.props.map(prop => {
        return <div key={prop.name}>{prop.name}</div>;
      })}
      <Header as="h4">Design</Header>
      {_.map(knobs, knob => {
        const value = jsonTreeElement.props && jsonTreeElement.props.design && jsonTreeElement.props.design[knob.label];

        return (
          <div key={knob.label} style={{ ...rowStyle, marginBottom: '0.5rem' }}>
            {knob.kind === 'slider' ? (
              <>
                <code style={{ float: 'right' }}>{JSON.stringify(value, null, 2)}</code>
                <div>{knob.label}</div>
                <Slider
                  fluid
                  step={1}
                  min={0}
                  max={knob.ramp.length - 1}
                  {...(value && {
                    value: jsonTreeElement.props.design[knob.label],
                  })}
                  onChange={(e, data) => {
                    onPropChange({ jsonTreeElement, name: knob.label, value: knob.ramp[+data.value] });
                  }}
                />
              </>
            ) : knob.kind === 'divider' ? (
              <Divider content={knob.label} style={{ width: '100%' }} />
            ) : (
              <div>UNKNOWN</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Knobs;
