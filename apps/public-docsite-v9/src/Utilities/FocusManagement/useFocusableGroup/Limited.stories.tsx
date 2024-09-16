import * as React from 'react';
import { CopyRegular, DeleteRegular } from '@fluentui/react-icons';
import {
  Button,
  useFocusableGroup,
  makeStyles,
  tokens,
  createFocusOutlineStyle,
  useId,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: '10px',
    display: 'flex',
    gap: '5px',
    position: 'relative',
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,

    ...createFocusOutlineStyle(),
  },
  body: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  actions: {
    display: 'flex',
    gap: '5px',
  },
  pane: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Limited = () => {
  const styles = useStyles();
  const attributes = useFocusableGroup({ tabBehavior: 'limited' });
  const labelId1 = useId('chat1');
  const labelId2 = useId('chat2');

  return (
    <ul className={styles.pane}>
      <li tabIndex={0} aria-labelledby={labelId1} {...attributes} className={styles.container}>
        <div className={styles.body} id={labelId1}>
          Hello world!
        </div>
        <div className={styles.actions}>
          <Button aria-label="Copy message" icon={<CopyRegular />} size="small" />
          <Button aria-label="Delete message" icon={<DeleteRegular />} size="small" />
        </div>
      </li>

      <li tabIndex={0} aria-labelledby={labelId2} {...attributes} className={styles.container}>
        <div className={styles.body} id={labelId2}>
          How are you doing?
        </div>
        <div className={styles.actions}>
          <Button aria-label="Copy message" icon={<CopyRegular />} size="small" />
          <Button aria-label="Delete message" icon={<DeleteRegular />} size="small" />
        </div>
      </li>
    </ul>
  );
};

Limited.parameters = {
  docs: {
    description: {
      story: [
        'Limited behaviour allows the user to use `Enter` to move focus inside the container. The user can leave',
        'the focusable container either by tabbing out after the last focusable element or using the `Escape` key.',
      ].join('\n'),
    },
  },
};
