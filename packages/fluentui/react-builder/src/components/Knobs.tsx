import * as _ from 'lodash';
import * as React from 'react';
import { Divider, Header, Slider } from '@fluentui/react';
import { ComponentInfo } from '@fluentui/docs/src/types';

const designUnit = 4;
const sizeRamp = [
  designUnit * 1,
  designUnit * 2,
  designUnit * 3,
  designUnit * 4,
  designUnit * 5,
  designUnit * 6,
  designUnit * 7,
  designUnit * 8,
  designUnit * 9,
  designUnit * 10
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
  { kind: 'slider', label: 'maxHeight', ramp: sizeRamp }
];

const rowStyle = { padding: '0.1rem 0.25rem' };

type DesignKnobProps = {
  onPropChange: ({ name, value }: { name: string; value: string }) => void;
  info: ComponentInfo;
  instance: any;
};

const Knobs: React.FC<DesignKnobProps> = ({ onPropChange, info, instance }) => {
  return (
    <div>
      <Header as="h4">Active Props</Header>
      {Object.keys(instance.props).map(name => {
        const val = instance.props[name];
        const type = typeof val;

        if (type === 'undefined') {
          return null;
        }

        const printed = type === 'function' ? 'Function' : type === 'object' && type !== null ? '{}' : JSON.stringify(val, null, 2);

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
      {_.map(knobs, knob => (
        <div key={knob.label} style={{ ...rowStyle, marginBottom: '0.5rem' }}>
          {knob.kind === 'slider' ? (
            <>
              <div>{knob.label}</div>
              <Slider
                fluid
                step={1}
                min={0}
                max={knob.ramp.length - 1}
                onChange={(e, data) => {
                  onPropChange({ name: knob.label, value: data.value });
                }}
              />
            </>
          ) : knob.kind === 'divider' ? (
            <Divider content={knob.label} style={{ width: '100%' }} />
          ) : (
            <div>UNKNOWN</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Knobs;
