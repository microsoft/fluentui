import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Accordion, AccordionPanel, AccordionItem, AccordionHeader, Body1, Theme } from '@fluentui/react-components';
import { ContrastRatioPair } from './AccessibilityChecker';

export interface AccessibilityListProps {
  theme: Theme;
  accessiblePairs: ContrastRatioPair[];
  nonAccessiblePairs: ContrastRatioPair[];
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
  const nonAccPairs = props.nonAccessiblePairs;
  const accPairs = props.accessiblePairs;

  let messageBar;
  if (nonAccPairs.length + accPairs.length > 0 && nonAccPairs.length > 0) {
    messageBar = (
      <Body1>
        Your color palette has {nonAccPairs.length.toString()} accessibility errors. Each pair of colors below should
        produce legible text and have a minimum contrast of 4.5.
      </Body1>
    );
  } else {
    messageBar = <Body1>Looking good! Your color palette doesn't have any accessibility issues.</Body1>;
  }

  return (
    <>
      <br />
      {messageBar}
      <Accordion multiple defaultOpenItems="2">
        <AccordionItem value="1">
          <AccordionHeader size="large">Accessible Pairs</AccordionHeader>
          <AccordionPanel>
            {accPairs.map(i => {
              return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader size="large">Inaccessible Pairs</AccordionHeader>
          <AccordionPanel>
            {nonAccPairs.map(i => {
              return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
