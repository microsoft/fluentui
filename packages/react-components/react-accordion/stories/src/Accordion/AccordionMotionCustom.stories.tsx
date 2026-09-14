import * as React from 'react';
import type { JSXElement, PersonaProps } from '@fluentui/react-components';
import description from './AccordionMotionCustom.stories.md';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Field,
  makeStyles,
  motionTokens,
  Persona,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';

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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalS} 0`,
  },
});

export const MotionCustom = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(1000);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);

  const renderList = (items: typeof personaData) => (
    <div className={classes.list}>
      {items.map(item => (
        <Persona
          key={item.name}
          name={item.name}
          secondaryText={item.secondaryText}
          presence={{ status: item.status }}
          avatar={avatarFor(item.useImage, item.image)}
        />
      ))}
    </div>
  );

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

      <Accordion collapsible>
        <AccordionItem value="1">
          <AccordionHeader>Team A</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, easing, animateOpacity }}>
            {renderList(personaData.slice(0, 3))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Team B</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, easing, animateOpacity }}>
            {renderList(personaData.slice(3))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader>Team C</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, easing, animateOpacity }}>
            {renderList(personaData)}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
