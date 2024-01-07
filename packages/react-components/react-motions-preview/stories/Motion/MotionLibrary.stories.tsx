import {
  makeStyles,
  shorthands,
  tokens,
  Label,
  Slider,
  useId,
  TabList,
  Tab,
  TabListProps,
  Divider,
} from '@fluentui/react-components';
import { atom, createAtom } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './MotionLibrary.stories.md';

const useClasses = makeStyles({
  controlBar: {
    display: 'grid',
    gridTemplateColumns: '1fr min-content min-content',
    ...shorthands.gap('10px'),

    ...shorthands.border('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium, tokens.borderRadiusMedium, 0, 0),
    ...shorthands.padding('10px'),
  },

  controls: {
    display: 'flex',
  },
  meter: {
    alignSelf: 'center',
    ...shorthands.padding('4px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralForeground3),
    fontFamily: tokens.fontFamilyNumeric,
    backgroundColor: tokens.colorNeutralBackground4,
    height: 'min-content',
  },
  slider: {
    width: '250px',
  },
  label: {
    alignSelf: 'center',
  },

  panel: {
    display: 'grid',

    ...shorthands.borderLeft('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRight('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderBottom('3px', 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(0, 0, tokens.borderRadiusMedium, tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.gap('6px'),
    ...shorthands.padding('5px'),
    alignItems: 'center',

    backgroundColor: tokens.colorNeutralBackground3Selected,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius('50%'),

    width: '100px',
    height: '100px',
  },
});

const components = Object.fromEntries(
  Object.entries(atom).map(([groupName, definitions]) => [
    groupName,
    Object.entries(definitions)
      .map(([name, motion]) => [name, createAtom(motion())])
      .map(([name, Component]) => [
        name,
        (props: { children: React.ReactElement; playbackRate: number }) => {
          const imperativeRef = React.useRef<MotionImperativeRef>();

          React.useEffect(() => {
            imperativeRef.current?.setPlaybackRate(props.playbackRate / 100);
          }, [props.playbackRate]);
          console.log(props);
          return (
            <Component imperativeRef={imperativeRef} iterations={Infinity}>
              {props.children}
            </Component>
          );
        },
      ]),
  ]),
);
const componentGroups = Object.keys(components);

export const MotionLibrary = () => {
  const classes = useClasses();
  const sliderId = useId();

  const [selectedValue, setSelectedValue] = React.useState<string>(() => componentGroups[0]);
  const handleTabSelect: TabListProps['onTabSelect'] = (ev, data) => {
    setSelectedValue(data.value as string);
  };

  const [playbackRate, setPlaybackRate] = React.useState<number>(10);

  return (
    <>
      <div className={classes.controlBar}>
        <TabList onTabSelect={handleTabSelect} selectedValue={selectedValue} size="large">
          {componentGroups.map(groupName => (
            <Tab key={groupName} value={groupName}>
              {groupName.slice(0, 1).toUpperCase() + groupName.slice(1)}
            </Tab>
          ))}
        </TabList>
        <Divider vertical />
        <div className={classes.controls}>
          <Label className={classes.label} htmlFor={sliderId}>
            <code>playbackRate</code>
          </Label>
          <Slider
            className={classes.slider}
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            id={sliderId}
            max={100}
            step={10}
          />
          <div className={classes.meter}>{playbackRate}%</div>
        </div>
      </div>

      <div className={classes.panel}>
        {components[selectedValue].map(([name, Component]) => (
          <div className={classes.card} key={name as string}>
            <Component playbackRate={playbackRate}>
              <div className={classes.item} />
            </Component>
            <code>{name}</code>
          </div>
        ))}
      </div>
    </>
  );
};

MotionLibrary.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
