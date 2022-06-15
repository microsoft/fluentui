import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Accordion, AccordionPanel, AccordionItem, AccordionHeader, Body1, Theme } from '@fluentui/react-components';
import { ContrastRatioPair } from './AccessibilityChecker';

export interface AccessibilityListProps {
  theme: Theme;
  AAAPairs: ContrastRatioPair[];
  AAPairs: ContrastRatioPair[];
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
  const AAPairs = props.AAPairs;
  const AAAPairs = props.AAAPairs;

  let messageBar;
  if (nonAccPairs.length + AAPairs.length + AAAPairs.length > 0 && nonAccPairs.length > 0) {
    messageBar = <Body1>Your color palette has {nonAccPairs.length.toString()} accessibility errors.</Body1>;
  } else {
    messageBar = <Body1>Looking good! Your color palette doesn't have any accessibility issues.</Body1>;
  }

  return (
    <>
      <br />
      {messageBar}
      <Accordion multiple defaultOpenItems="Inaccessible">
        <AccordionItem value="Inaccessible">
          <AccordionHeader size="large">Inaccessible pairs</AccordionHeader>
          <AccordionPanel>
            {nonAccPairs.map(i => {
              return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="AA">
          <AccordionHeader size="large">AA pairs</AccordionHeader>
          <AccordionPanel>
            {AAPairs.map(i => {
              return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="AAA">
          <AccordionHeader size="large">AAA pairs</AccordionHeader>
          <AccordionPanel>
            {AAAPairs.map(i => {
              return <AccessibilityRow key={i.toString()} contrastRatioPair={i} />;
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
