import * as React from 'react';
import { shorthands, makeStyles } from '@fluentui/react-make-styles';
import { Divider } from '../Divider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: theme => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: theme.colorNeutralBackground1,
  }),
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
