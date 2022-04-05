import * as React from 'react';
import { shorthands, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Divider } from '../Divider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  customHeightExample: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    minHeight: '192px',
  },
  customWidth: {
    width: '200px',
  },
  customHeight: {
    maxHeight: '50px',
  },
  customFont: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  customLineColor: {
    ':before': {
      ...shorthands.borderColor('#FF00FF'),
    },
    ':after': {
      ...shorthands.borderColor('#FF00FF'),
    },
  },
  customLineStyle: {
    ...shorthands.borderWidth('2px'),
    ':before': {
      borderTopStyle: 'dashed',
      borderTopWidth: '2px',
    },
    ':after': {
      borderTopStyle: 'dashed',
      borderTopWidth: '2px',
    },
  },
});

export const CustomStyles = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider className={styles.customWidth}>Custom width (200px)</Divider>
      </div>
      <div className={styles.customHeightExample}>
        <Divider vertical className={styles.customHeight}>
          Custom height (50px)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customFont}>Custom font (14px bold)</Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineColor}>Custom line color (#FF00FF)</Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineStyle}>Custom line style (2px dashed)</Divider>
      </div>
    </div>
  );
};

CustomStyles.parameters = {
  docs: {
    description: {
      story: 'A divider can have custom styles applied to both the label and the line.',
    },
  },
};
