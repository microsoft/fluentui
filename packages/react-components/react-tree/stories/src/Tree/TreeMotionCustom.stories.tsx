import * as React from 'react';
import type { JSXElement, PersonaProps } from '@fluentui/react-components';
import {
  Field,
  makeStyles,
  motionTokens,
  Persona,
  Slider,
  Switch,
  tokens,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import description from './TreeMotionCustom.stories.md';

const personaData = [
  {
    name: 'Kevin Sturgis',
    image: 'persona-male.png',
    status: 'available' as const,
    useImage: true,
    secondaryText: 'Available',
  },
  { name: 'Sarah Chen', status: 'busy' as const, useImage: false, secondaryText: 'In a meeting' },
  {
    name: 'Jessica Brown',
    image: 'persona-female.png',
    status: 'busy' as const,
    useImage: true,
    secondaryText: 'Do not disturb',
  },
  { name: 'Emily Johnson', status: 'available' as const, useImage: false, secondaryText: 'Available' },
  { name: 'David Kim', status: 'offline' as const, useImage: false, secondaryText: 'Offline' },
  {
    name: 'Michael Rodriguez',
    image: 'persona-male.png',
    status: 'away' as const,
    useImage: true,
    secondaryText: 'Away',
  },
];

const avatarFor = (useImage?: boolean, image?: string): PersonaProps['avatar'] =>
  useImage
    ? {
        image: {
          src: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/${image}`,
        },
      }
    : { color: 'colorful' };

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const MotionCustom = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(1000);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);

  const renderItems = (items: typeof personaData) =>
    items.map(item => (
      <TreeItem key={item.name} itemType="leaf">
        <TreeItemLayout>
          <Persona
            name={item.name}
            secondaryText={item.secondaryText}
            presence={{ status: item.status }}
            avatar={avatarFor(item.useImage, item.image)}
          />
        </TreeItemLayout>
      </TreeItem>
    ));

  const easing = motionTokens.curveDecelerateMid;

  return (
    <>
      <div className={classes.controls}>
        <Field label={`Duration: ${duration}ms`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Switch
          label="Animate opacity"
          checked={animateOpacity}
          onChange={(_, data) => setAnimateOpacity(data.checked)}
        />
      </div>

      <Tree aria-label="Motion Custom">
        <TreeItem itemType="branch">
          <TreeItemLayout>Team A</TreeItemLayout>
          <Tree collapseMotion={{ duration, easing, animateOpacity }}>{renderItems(personaData.slice(0, 3))}</Tree>
        </TreeItem>
        <TreeItem itemType="branch">
          <TreeItemLayout>Team B</TreeItemLayout>
          <Tree collapseMotion={{ duration, easing, animateOpacity }}>{renderItems(personaData.slice(3))}</Tree>
        </TreeItem>
        <TreeItem itemType="branch">
          <TreeItemLayout>Team C</TreeItemLayout>
          <Tree collapseMotion={{ duration, easing, animateOpacity }}>{renderItems(personaData)}</Tree>
        </TreeItem>
      </Tree>
    </>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
