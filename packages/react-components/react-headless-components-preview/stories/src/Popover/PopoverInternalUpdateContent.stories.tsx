import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const InternalUpdateContent = (): React.ReactNode => {
  const [revealed, setRevealed] = React.useState(false);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (revealed) {
      linkRef.current?.focus();
    }
  }, [revealed]);

  return (
    <Popover onOpenChange={(_, data) => !data.open && setRevealed(false)}>
      <PopoverTrigger>
        <button className={styles.trigger}>Popover trigger</button>
      </PopoverTrigger>
      <PopoverSurface className={`${styles.surface} ${styles.surfaceWide}`}>
        <h3 className={styles.heading}>First panel</h3>
        <p className={`${styles.body} ${styles.bodySpaced}`}>
          Popover content can change while the popover is open. When new focusable content is revealed, move focus to it
          so keyboard users can continue interacting.
        </p>

        {revealed ? (
          <div className={styles.body}>
            Revealed content with{' '}
            <a ref={linkRef} href="#" className={styles.link}>
              a focusable link
            </a>
            .
          </div>
        ) : (
          <button className={styles.actionButton} onClick={() => setRevealed(true)}>
            Reveal more
          </button>
        )}
      </PopoverSurface>
    </Popover>
  );
};
