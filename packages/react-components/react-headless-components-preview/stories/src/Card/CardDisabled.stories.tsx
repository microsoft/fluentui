import * as React from 'react';
import { Card, CardHeader, CardPreview } from '@fluentui/react-headless-components-preview/card';

import styles from './card.module.css';

export const Disabled = (): React.ReactNode => (
  <Card
    className={`${styles.card} ${styles.cardSelectable}`}
    disabled
    selected
    onSelectionChange={() => {
      /* no-op */
    }}
    checkbox={{ className: styles.checkbox, 'aria-label': 'Select card' }}
  >
    <CardPreview className={styles.preview}>
      <img
        className={styles.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={`${styles.header} ${styles.headerWithSelect}`}
      header={<div className={styles.headerTitle}>Disabled card</div>}
      description={<div className={styles.headerDescription}>Selection is locked</div>}
    />

    <div className={styles.body}>
      A disabled card sets `aria-disabled="true"` on the root and short-circuits selection toggling.
    </div>
  </Card>
);
