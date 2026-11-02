import * as React from 'react';
import { Image as ImageV9 } from '@fluentui/react-components';
import { mergeClasses } from '@fluentui/react-components';
import { useStyles } from './FitDifferences.styles';

export const FitDifferences = () => {
  const styles = useStyles();

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.flexColumn}>
        <div className={mergeClasses(styles.imageWrapperV8, styles.box)}>
          <img
            className={mergeClasses(styles.imageV8, styles.imageBox)}
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
            alt="v8-example"
          />
        </div>
        <p className={styles.caption}>100x100 v8 Image with border-radius style and imageFit.center</p>
      </div>
      <div className={styles.flexColumn}>
        <div className={mergeClasses(styles.imageWrapperV9, styles.box)}>
          <ImageV9
            className={styles.imageBox}
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
            shape="circular"
            fit="center"
            alt="v9-example"
          />
        </div>
        <p className={styles.caption}>100x100 v9 Image with shape="circular" and fit="center"</p>
      </div>
      <div className={styles.flexColumn}>
        <div className={mergeClasses(styles.imageWrapperV8, styles.box)}>
          <img
            className={mergeClasses(styles.imageV8, styles.imageBox)}
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
            alt="v8-example"
          />
        </div>
        <p className={styles.caption}>500x500 v8 Image with border-radius style and imageFit.center</p>
      </div>
      <div className={styles.flexColumn}>
        <div className={mergeClasses(styles.imageWrapperV9, styles.box)}>
          <ImageV9
            className={styles.imageBox}
            src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png"
            fit="center"
            shape="circular"
            alt="v9-example"
          />
        </div>
        <p className={styles.caption}>500x500 v9 Image with shape="circular" and fit="center"</p>
      </div>
    </div>
  );
};
