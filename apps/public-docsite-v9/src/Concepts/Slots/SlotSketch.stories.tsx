import * as React from 'react';

import { makeStyles, mergeClasses, shorthands, Input, tokens, typographyStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyItems: 'flex-start',
    ...shorthands.margin('5px'),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'space-between',
    ...shorthands.padding('5px', '20px'),
    backgroundColor: tokens.colorNeutralBackground3,
  },
  slot: {
    ...shorthands.border('3px', 'dotted', tokens.colorNeutralStroke2),
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    ...shorthands.margin('5px'),
  },
  imageSlot: {
    width: '30px',
    height: '30px',
    ...shorthands.margin('5px', '20px', '5px', '5px'),
  },
  image: {
    ...shorthands.margin('5px', '20px', '5px', '5px'),
  },
  title: {
    ...typographyStyles.subtitle2,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'space-between',
    flexGrow: 1,
    ...shorthands.padding('20px'),
    ...typographyStyles.body1,
    fontSize: tokens.fontSizeBase200,
  },
  component: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  inputSketch: {
    width: '100px',
  },
  contentSlot: {
    display: 'block',
    ...shorthands.border('3px', 'dotted', tokens.colorNeutralStroke2),
  },
  input: {
    width: '210px',
    ...shorthands.padding(0),
    minHeight: 0,
  },
  urlBefore: {
    ...shorthands.padding('10px', '5px'),
    backgroundColor: tokens.colorNeutralBackground3,
    ...typographyStyles.caption1Strong,
  },
  urlAfter: {
    ...shorthands.padding('10px', '5px'),
    backgroundColor: tokens.colorNeutralBackground3,
    ...typographyStyles.caption1Strong,
  },
});

export const SlotSketch = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.component}>
          <div className={mergeClasses(styles.slot, styles.contentSlot)}>Before</div>
          <div className={styles.inputSketch}>Placeholder text</div>
          <div className={mergeClasses(styles.slot, styles.contentSlot)}>After</div>
        </div>
      </div>
      <div className={styles.card}>
        <Input
          className={styles.input}
          contentBefore={<div className={styles.urlBefore}>www.</div>}
          contentAfter={<div className={styles.urlAfter}>.com</div>}
          placeholder="domain name here"
        />
      </div>
    </div>
  );
};
