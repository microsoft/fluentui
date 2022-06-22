import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Body1, Divider, Theme } from '@fluentui/react-components';
import { ContrastRatioPair } from './ColorTokens';

export interface AccessibilityListProps {
  theme: Theme;
  highContrastPairs: ContrastRatioPair[];
  midContrastPairs: ContrastRatioPair[];
  lowContrastPairs: ContrastRatioPair[];
}

export interface AccessibilityRowProps {
  contrastRatioPair: ContrastRatioPair;
}

const useStyles = makeStyles({
  root: {},
  col: {
    display: 'flex',
    justifyContent: 'left',
  },
  row: {
    paddingLeft: '5px',
    paddingRight: '5px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    height: '50px',
  },
});

export const AccessibilityRow: React.FunctionComponent<AccessibilityRowProps> = props => {
  const input = props.contrastRatioPair;
  const styles = useStyles();
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>{input.contrastRatioValue}</div>
        <div className={styles.col}>{input.contrastRatioPair}</div>
        <div className={styles.col}>{props.contrastRatioPair.colorPair}</div>
      </div>
      <Divider />
    </>
  );
};

export const ColorTokensList: React.FunctionComponent<AccessibilityListProps> = props => {
  const nonAccPairs = props.lowContrastPairs;
  const midContrastPairs = props.midContrastPairs;
  const highContrastPairs = props.highContrastPairs;

  let messageBar;
  if (nonAccPairs.length + midContrastPairs.length + highContrastPairs.length > 0 && nonAccPairs.length > 0) {
    messageBar = <Body1>Your color palette has {nonAccPairs.length.toString()} accessibility errors.</Body1>;
  } else {
    messageBar = <Body1>Your color palette doesn't have any accessibility issues.</Body1>;
  }

  return (
    <>
      {highContrastPairs.map(i => {
        return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
      })}
    </>
  );
};
