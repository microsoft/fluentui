import * as React from 'react';
import {
  makeStyles,
  shorthands,
  Body1,
  Caption1,
  Caption2,
  Display,
  LargeTitle,
  Subtitle1,
  Subtitle2,
  Title1,
  Title2,
  Title3,
} from '@fluentui/react-components';
import textPresetsMd from './TextPresets.md';

const useStyles = makeStyles({
  container: {
    ...shorthands.gap('16px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
});

export const Presets = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Display>Display - semibold, base1000</Display>
      <LargeTitle>LargeTitle - semibold, base900</LargeTitle>
      <Title1>Title1 - semibold, base800</Title1>
      <Title2>Title2 - semibold, base700</Title2>
      <Title3>Title3 - semibold, base600</Title3>
      <Subtitle1>Subtitle1 - semibold, base500</Subtitle1>
      <Subtitle2>Subtitle2 - semibold, base400</Subtitle2>
      <Body1>Body1 - regular, base300</Body1>
      <Caption1>Caption1 - regular, base200</Caption1>
      <Caption2>Caption2 - regular, base100</Caption2>
    </div>
  );
};

Presets.parameters = {
  docs: {
    description: {
      story: textPresetsMd,
    },
  },
};
