import * as React from 'react';
import { Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-headless-components-preview/card';
import { MoreHorizontalRegular, ShareRegular, ArrowReplyRegular } from '@fluentui/react-icons';

import styles from './card.module.css';

export const Default = (): React.ReactNode => (
  <Card className={styles.card}>
    <CardPreview className={styles.preview}>
      <img
        className={styles.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={styles.header}
      image={
        <div className={styles.headerImage}>
          <img
            className={styles.headerImg}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png"
            alt=""
          />
        </div>
      }
      header={<div className={styles.headerTitle}>App Name</div>}
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

    <CardFooter className={styles.footer}>
      <button type="button" className={styles.footerButton}>
        <ArrowReplyRegular aria-hidden />
        Reply
      </button>
      <button type="button" className={styles.footerButton}>
        <ShareRegular aria-hidden />
        Share
      </button>
    </CardFooter>
  </Card>
);
