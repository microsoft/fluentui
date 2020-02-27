import * as React from 'react';
import { Button, Grid, Popup } from '@fluentui/react';

const PopupWithButton = props => (
  <Popup
    align={props.align}
    content={
      <>
        <p>A popup with a pointer.</p>
        <p>
          Is aligned to <code>{props.align}</code>.
        </p>
      </>
    }
    pointing
    position={props.position}
    trigger={<Button icon={props.icon} styles={{ padding: props.padding, height: '64px', minWidth: '64px' }} title="Show popup" />}
  />
);

const triggers = [
  {
    position: 'above',
    align: 'start',
    icon: { name: 'arrow-up', circular: true, bordered: true },
    padding: '5px 42px 18px 5px'
  },
  {
    position: 'above',
    align: 'center',
    icon: { name: 'arrow-up', circular: true, bordered: true },
    padding: '5px 5px 18px 5px'
  },
  {
    position: 'above',
    align: 'end',
    icon: { name: 'arrow-up', circular: true, bordered: true },
    padding: '5px 5px 18px 42px'
  },
  {
    position: 'below',
    align: 'start',
    icon: { name: 'arrow-down', circular: true, bordered: true },
    padding: '18px 42px 5px 5px'
  },
  {
    position: 'below',
    align: 'center',
    icon: { name: 'arrow-down', circular: true, bordered: true },
    padding: '18px 5px 5px 5px'
  },
  {
    position: 'below',
    align: 'end',
    icon: { name: 'arrow-down', circular: true, bordered: true },
    padding: '18px 5px 5px 42px'
  },
  {
    position: 'before',
    align: 'top',
    icon: { name: 'arrow-left', circular: true, bordered: true },
    padding: '5px 42px 18px 5px'
  },
  {
    position: 'before',
    align: 'center',
    icon: { name: 'arrow-left', circular: true, bordered: true },
    padding: '5px 42px 5px 5px'
  },
  {
    position: 'before',
    align: 'bottom',
    icon: { name: 'arrow-left', circular: true, bordered: true },
    padding: '18px 42px 5px 5px'
  },
  {
    position: 'after',
    align: 'top',
    icon: { name: 'arrow-right', circular: true, bordered: true },
    padding: '5px 5px 18px 42px'
  },
  {
    position: 'after',
    align: 'center',
    icon: { name: 'arrow-right', circular: true, bordered: true },
    padding: '5px 5px 5px 42px'
  },
  {
    position: 'after',
    align: 'bottom',
    icon: { name: 'arrow-right', circular: true, bordered: true },
    padding: '18px 5px 5px 42px'
  }
];

const PopupExamplePointing = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    {triggers.map(({ position, align, icon, padding }) => (
      <PopupWithButton align={align} icon={icon} key={`${position}-${align}`} padding={padding} position={position} />
    ))}
  </Grid>
);

export default PopupExamplePointing;
