import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Accordion, AccordionPanel, AccordionItem, AccordionHeader, Body1, Theme } from '@fluentui/react-components';
import { ContrastRatioPair } from './AccessibilityChecker';

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
    justifyContent: 'center',
  },
  colDesc: {
    display: 'flex',
    marginLeft: '5%',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 3fr',
    alignItems: 'center',
  },
});

export const AccessibilityRow: React.FunctionComponent<AccessibilityRowProps> = props => {
  const input = props.contrastRatioPair;
  const styles = useStyles();
  return (
    <div className={styles.row}>
      <div className={styles.col}>{input.contrastRatioValue}</div>
      <div className={styles.col}>{input.contrastRatioPair}</div>
      <div className={styles.col} style={{ backgroundColor: input.background, color: input.foreground }}>
        Example
      </div>
      <div className={styles.colDesc}>{props.contrastRatioPair.colorPair}</div>
    </div>
  );
};

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
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
      <br />
      {`To meet WCAG 2.1 accessibility requirements, text and images must meet a contrast ratio of 4.5:1, while large
      text and images must meet a contrast ratio of 3:1. `}
      {messageBar}
      <Accordion multiple defaultOpenItems="Inaccessible">
        <AccordionItem value="Inaccessible">
          <AccordionHeader size="large">Below 3:1</AccordionHeader>
          <AccordionPanel>
            {nonAccPairs.map(i => {
              return <AccessibilityRow key={i.colorPair} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="AA">
          <AccordionHeader size="large">Above 3:1</AccordionHeader>
          <AccordionPanel>
            {midContrastPairs.map(i => {
              return <AccessibilityRow key={i.colorPair} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="AAA">
          <AccordionHeader size="large">Above 4.5:1</AccordionHeader>
          <AccordionPanel>
            {highContrastPairs.map(i => {
              return <AccessibilityRow key={i.colorPair} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
