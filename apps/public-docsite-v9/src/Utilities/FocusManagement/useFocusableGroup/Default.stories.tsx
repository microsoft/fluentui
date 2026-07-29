import * as React from 'react';
import { CopyRegular, DeleteRegular } from '@fluentui/react-icons';
import { Button, useFocusableGroup, useId } from '@fluentui/react-components';

import styles from './focusableGroup.module.css';

export const Default = () => {
  const attributes = useFocusableGroup();
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
