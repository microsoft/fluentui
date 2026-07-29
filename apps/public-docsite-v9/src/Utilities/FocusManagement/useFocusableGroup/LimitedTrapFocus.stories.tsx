import * as React from 'react';
import { CopyRegular, DeleteRegular } from '@fluentui/react-icons';
import { Button, useFocusableGroup, useId } from '@fluentui/react-components';

import styles from './focusableGroup.module.css';

export const LimitedTrapFocus = () => {
  const attributes = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });
  const labelId1 = useId('chat1');
  const labelId2 = useId('chat2');

  return (
    <ul className={styles['pane-trap']}>
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

LimitedTrapFocus.parameters = {
  docs: {
    description: {
      story: [
        'Limited trap focus requires the user to use the `Enter` key to move focus inside the container.',
        'Once the user is focused inside the container focus is trapped. The only way to move focus out of',
        'the container is to use the `Escape` key.',
      ].join('\n'),
    },
  },
};
