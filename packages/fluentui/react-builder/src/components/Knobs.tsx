import * as _ from 'lodash';
import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { ComponentInfo, ComponentProp } from '../componentInfo/types';
import { JSONTreeElement } from './types';
import { MultiTypeKnob } from './MultiTypeKnob';
import { tabListBehavior } from '@fluentui/accessibility';
import { AccessibilityError } from '../accessibility/types';
import { ErrorPanel } from './ErrorPanel';

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

const A11YPROPS: ComponentProp[] = [
  {
    name: 'id',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'ID of an element',
    types: [{ name: 'string' }],
  },
  {
    name: 'role',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'accessiblerole of an element',
    types: [{ name: 'string' }],
  },
  {
    name: 'aria-label',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'define a string that labels the current element',
    types: [{ name: 'string' }],
  },
  {
    name: 'aria-labelledby',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'establishes relationships between objects and their label(s)',
    types: [{ name: 'string' }],
  },
  {
    name: 'aria-describedby',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'indicates the IDs of the elements that describe the object',
    types: [{ name: 'string' }],
  },
  {
    name: 'title',
    required: false,
    defaultValue: '',
    tags: [],
    description: 'specifies extra information about an element',
    types: [{ name: 'string' }],
  },
  {
    name: 'aria-hidden',
    required: false,
    defaultValue: false,
    tags: [],
    description: 'removes the element and all of its children from the accessibility tree',
    types: [{ name: 'boolean' }],
  },
  {
    name: 'tabIndex',
    required: false,
    defaultValue: 0,
    tags: [],
    description:
      'indicates that its element can be focused, and where it participates in sequential keyboard navigation',
    types: [{ name: 'number' }],
  },
  {
    name: 'data-is-focusable',
    required: false,
    defaultValue: false,
    tags: [],
    description: 'define if data is focusable',
    types: [{ name: 'boolean' }],
  },
];

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
  onPropDelete: ({ jsonTreeElement, name }: { jsonTreeElement: JSONTreeElement; name: string }) => void;
  info: ComponentInfo;
  jsonTreeElement: JSONTreeElement;
  elementAccessibilityErrors: AccessibilityError[];
  onPropUpdate: (args: { jsonTreeElement: JSONTreeElement }) => void;
};

const isHandledType = (type: string): boolean => {
  return ['boolean', 'string', 'literal', 'React.ElementType', 'number'].includes(type);
};

export const Knobs: React.FunctionComponent<DesignKnobProps> = ({
  elementAccessibilityErrors,
  info,
  jsonTreeElement,
  onPropUpdate: PROP_UPDATED,
  onPropChange,
  onPropDelete,
}) => {
  const [menuActivePane, setMenuActivePane] = React.useState<'props' | 'accessibility'>('props');
  const getValues = React.useCallback(
    prop => {
      const propValue = jsonTreeElement.props?.[prop.name];
      const tempTypes = _.uniq(_.map(prop.types, 'name'));
      const types = isHandledType(tempTypes[0]) ? tempTypes : _.uniq(_.map(prop.resolvedType, 'name'));
      const isLiteral = _.every(types, name => name === 'literal');
      // console.log(prop.name, types, prop);
      const options = isLiteral
        ? _.map(Array.isArray(prop.resolvedType) ? prop.resolvedType : prop.types, 'value')
        : null;

      const defaultValues = {
        boolean: false,
        number: 0,
        string: '',
        'React.ElementType': prop.defaultValue,
      };

      const value = typeof propValue !== 'undefined' ? propValue : defaultValues[types[0]];
      return { types, options, value };
    },
    [jsonTreeElement],
  );

  return (
    <div>
      {!_.isEmpty(elementAccessibilityErrors) && <ErrorPanel elementAccessibilityErrors={elementAccessibilityErrors} />}
      <Menu
        accessibility={tabListBehavior}
        defaultActiveIndex={0}
        items={[
          {
            key: 'props',
            content: 'Props',
            onClick: () => setMenuActivePane('props'),
          },
          {
            key: 'accessibility',
            content: 'Accessibility',
            onClick: () => setMenuActivePane('accessibility'),
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
            const { types, options, value } = getValues(prop);

            return (
              <MultiTypeKnob
                required={prop.required}
                key={prop.name}
                label={prop.name}
                types={types as any}
                options={options}
                value={value}
                onRemoveProp={() => {
                  onPropDelete({ jsonTreeElement, name: prop.name });
                }}
                onChange={value => {
                  onPropChange({ jsonTreeElement, name: prop.name, value });
                }}
                onPropUpdate={() => {
                  PROP_UPDATED({ jsonTreeElement });
                }}
              />
            );
          })}

      {menuActivePane === 'accessibility' &&
        A11YPROPS.filter(prop => !/default[A-Z]/.test(prop.name)).map(prop => {
          const { types, options, value } = getValues(prop);

          return (
            <MultiTypeKnob
              onRemoveProp={() => {
                onPropDelete({ jsonTreeElement, name: prop.name });
              }}
              required={prop.required}
              key={prop.name}
              label={prop.name}
              types={types as any}
              options={options}
              value={value}
              onChange={value => {
                onPropChange({ jsonTreeElement, name: prop.name, value });
              }}
              onPropUpdate={() => {
                PROP_UPDATED({ jsonTreeElement });
              }}
            />
          );
        })}
    </div>
  );
};
