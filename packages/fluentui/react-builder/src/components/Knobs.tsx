import * as _ from 'lodash';
import * as React from 'react';
import { Header /* Slider */ } from '@fluentui/react-northstar';
import { ComponentInfo } from '../componentInfo/types';
import { JSONTreeElement } from './types';
import { MultiTypeKnob } from '../config';

// const designUnit = 4;
// const sizeRamp = [
//   designUnit * 0,
//   designUnit * 0.5,
//   designUnit * 1,
//   designUnit * 2,
//   designUnit * 4,
//   designUnit * 8,
//   designUnit * 12,
// ];

// const knobs = [
//   { kind: 'divider', label: 'Position' },
//
//   { kind: 'slider', label: 'top', ramp: sizeRamp },
//   { kind: 'slider', label: 'bottom', ramp: sizeRamp },
//   { kind: 'slider', label: 'left', ramp: sizeRamp },
//   { kind: 'slider', label: 'right', ramp: sizeRamp },
//
//   { kind: 'divider', label: 'Padding' },
//
//   { kind: 'slider', label: 'paddingTop', ramp: sizeRamp },
//   { kind: 'slider', label: 'paddingRight', ramp: sizeRamp },
//   { kind: 'slider', label: 'paddingBottom', ramp: sizeRamp },
//   { kind: 'slider', label: 'paddingLeft', ramp: sizeRamp },
//
//   { kind: 'divider', label: 'Margin' },
//
//   { kind: 'slider', label: 'marginTop', ramp: sizeRamp },
//   { kind: 'slider', label: 'marginRight', ramp: sizeRamp },
//   { kind: 'slider', label: 'marginBottom', ramp: sizeRamp },
//   { kind: 'slider', label: 'marginLeft', ramp: sizeRamp },
//
//   { kind: 'divider', label: 'Dimensions' },
//
//   { kind: 'slider', label: 'width', ramp: sizeRamp },
//   { kind: 'slider', label: 'height', ramp: sizeRamp },
//
//   { kind: 'slider', label: 'minWidth', ramp: sizeRamp },
//   { kind: 'slider', label: 'minHeight', ramp: sizeRamp },
//
//   { kind: 'slider', label: 'maxWidth', ramp: sizeRamp },
//   { kind: 'slider', label: 'maxHeight', ramp: sizeRamp },
// ];
//
// const rowStyle = { padding: '0.1rem 0.25rem' };

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

export const Knobs: React.FunctionComponent<DesignKnobProps> = ({ onPropChange, info, jsonTreeElement }) => {
  return (
    <div>
      <Header as="h3">Props</Header>
      {info.props
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
      {/*
      <Header as="h3">Design</Header>
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
      */}
    </div>
  );
};
