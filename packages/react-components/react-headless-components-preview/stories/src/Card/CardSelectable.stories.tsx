import * as React from 'react';
import type { CardOnSelectionChangeEvent } from '@fluentui/react-headless-components-preview/card';
import { Card, CardHeader, CardPreview } from '@fluentui/react-headless-components-preview/card';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

import styles from './card.module.css';

const CardContent = ({ title }: { title: string }): React.ReactElement => (
  <>
    <CardPreview className={styles.preview}>
      <img
        className={styles.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={`${styles.header} ${styles.headerWithSelect}`}
      image={
        <div className={styles.headerImage}>
          <img
            className={styles.headerImg}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png"
            alt=""
          />
        </div>
      }
      header={<div className={styles.headerTitle}>{title}</div>}
      description={<div className={styles.headerDescription}>Developer</div>}
      action={
        <div className={styles.headerAction}>
          <button type="button" aria-label="More options" className={styles.iconButton}>
            <MoreHorizontalRegular />
          </button>
        </div>
      }
    />

    <div className={styles.body}>
      Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
    </div>
  </>
);

export const Selectable = (): React.ReactNode => {
  const [selected, setSelected] = React.useState(false);

  const onSelectionChange = (_event: CardOnSelectionChangeEvent, data: { selected: boolean }) => {
    setSelected(data.selected);
  };

  return (
    <div className={styles.list}>
      <Card
        className={`${styles.card} ${styles.cardSelectable}`}
        selected={selected}
        onSelectionChange={onSelectionChange}
        checkbox={{ className: styles.checkbox, 'aria-label': 'Select card' }}
      >
        <CardContent title="Selectable card" />
      </Card>

      <p className={styles.status}>Selected: {String(selected)}</p>
    </div>
  );
};
