import * as React from 'react';
import * as FUI from '@fluentui/react-northstar';
import { ComponentInfo } from '../componentInfo/types';

type ComponentAnatomySlotProps = {
  name: string;
};

export const ComponentAnatomy: React.FunctionComponent<{ componentInfo: ComponentInfo }> & {
  Slot: React.FunctionComponent<ComponentAnatomySlotProps>;
} = ({ componentInfo }) => {
  const shorthandProps = componentInfo.props.filter(propDef =>
    propDef.types.some(type => {
      return type.name === 'ShorthandValue' || type.name === 'ShorthandCollection';
    }),
  );

  if (shorthandProps.length === 0) {
    return null;
  }

  return (
    <div>
      <FUI.Header as="h3">Slots</FUI.Header>
      <ComponentAnatomy.Slot name="before" />
      {shorthandProps.map(propDef => (
        <ComponentAnatomy.Slot key={propDef.name} name={propDef.name} />
      ))}
      <ComponentAnatomy.Slot name="after" />
    </div>
  );
};

const ComponentAnatomySlot: React.FunctionComponent<ComponentAnatomySlotProps> = ({ name }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '4px',
      margin: '.25rem',
      padding: '0.2rem 0.5rem',
      background: name === 'before' || name === 'after' ? 'rgba(0, 127, 192, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    }}
  >
    <span>{name}</span>
    <span>+</span>
  </div>
);

ComponentAnatomy.Slot = ComponentAnatomySlot;
