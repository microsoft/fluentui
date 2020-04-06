import * as React from 'react';
import { Button, Grid, Popup } from '@fluentui/react-northstar';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@fluentui/react-icons-northstar';

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
    trigger={
      <Button
        icon={props.icon}
        styles={{ padding: props.padding, height: '64px', minWidth: '64px' }}
        title="Show popup"
      />
    }
  />
);

const triggers = [
  {
    position: 'above',
    align: 'start',
    icon: <ArrowUpIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 42px 18px 5px',
  },
  {
    position: 'above',
    align: 'center',
    icon: <ArrowUpIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 5px 18px 5px',
  },
  {
    position: 'above',
    align: 'end',
    icon: <ArrowUpIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 5px 18px 42px',
  },
  {
    position: 'below',
    align: 'start',
    icon: <ArrowDownIcon {...{ circular: true, bordered: true }} />,
    padding: '18px 42px 5px 5px',
  },
  {
    position: 'below',
    align: 'center',
    icon: <ArrowDownIcon {...{ circular: true, bordered: true }} />,
    padding: '18px 5px 5px 5px',
  },
  {
    position: 'below',
    align: 'end',
    icon: <ArrowDownIcon {...{ circular: true, bordered: true }} />,
    padding: '18px 5px 5px 42px',
  },
  {
    position: 'before',
    align: 'top',
    icon: <ArrowLeftIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 42px 18px 5px',
  },
  {
    position: 'before',
    align: 'center',
    icon: <ArrowLeftIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 42px 5px 5px',
  },
  {
    position: 'before',
    align: 'bottom',
    icon: <ArrowLeftIcon {...{ circular: true, bordered: true }} />,
    padding: '18px 42px 5px 5px',
  },
  {
    position: 'after',
    align: 'top',
    icon: <ArrowRightIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 5px 18px 42px',
  },
  {
    position: 'after',
    align: 'center',
    icon: <ArrowRightIcon {...{ circular: true, bordered: true }} />,
    padding: '5px 5px 5px 42px',
  },
  {
    position: 'after',
    align: 'bottom',
    icon: <ArrowRightIcon {...{ circular: true, bordered: true }} />,
    padding: '18px 5px 5px 42px',
  },
];

const PopupExamplePointing = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    {triggers.map(({ position, align, icon, padding }) => (
      <PopupWithButton align={align} icon={icon} key={`${position}-${align}`} padding={padding} position={position} />
    ))}
  </Grid>
);

export default PopupExamplePointing;
