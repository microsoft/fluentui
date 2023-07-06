import * as React from 'react';
import { CopyRegular, DeleteRegular } from '@fluentui/react-icons';
import {
  Button,
  useFocusableGroup,
  makeStyles,
  shorthands,
  tokens,
  createFocusOutlineStyle,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    ...shorthands.padding('10px'),

    display: 'flex',
    ...shorthands.gap('5px'),
    position: 'relative',

    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    ...createFocusOutlineStyle(),
  },
  body: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  actions: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },
  pane: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Default = () => {
  const styles = useStyles();
  const attributes = useFocusableGroup();

  return (
    <div className={styles.pane}>
      <div tabIndex={0} aria-label="A chat message" {...attributes} className={styles.container}>
        <div className={styles.body}>Hello world!</div>
        <div className={styles.actions}>
          <Button aria-label="Copy message" icon={<CopyRegular />} size="small" />
          <Button aria-label="Delete message" icon={<DeleteRegular />} size="small" />
        </div>
      </div>

      <div tabIndex={0} aria-label="A chat message" {...attributes} className={styles.container}>
        <div className={styles.body}>How are you doing?</div>
        <div className={styles.actions}>
          <Button aria-label="Copy message" icon={<CopyRegular />} size="small" />
          <Button aria-label="Delete message" icon={<DeleteRegular />} size="small" />
        </div>
      </div>
    </div>
  );
};
