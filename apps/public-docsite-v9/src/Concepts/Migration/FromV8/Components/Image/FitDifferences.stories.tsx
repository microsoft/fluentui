import * as React from 'react';
import { Image as ImageV9 } from '@fluentui/react-components';
import { makeStyles, tokens, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridWrapper: {
    display: 'grid',
    margin: '60px 0',
    gridTemplateColumns: 'repeat(2, 150px)',
    justifyContent: 'center',
    gap: '20px',
  },
  box: {
    height: '150px',
    width: '150px',
    boxSizing: 'border-box',
    border: '1px solid green',
  },
  imageBox: {
    border: '1px dashed red',
  },
  imageWrapperV9: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapperV8: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  imageV8: {
    display: 'block',
    position: 'absolute',
    borderRadius: `${tokens.borderRadiusCircular}`,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  auto: {
    height: 'auto',
    width: 'auto',
  },
  caption: {
    fontSize: '12px !important',
    lineHeight: tokens.lineHeightBase200,
    marginTop: '8px !important',
    textAlign: 'center',
  },
});

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
