import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { Button, Caption1, Text } from '@fluentui/react-components';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { contrast, hex_to_sRGB } from '../../colors';
import { bundleIcon, CopyFilled, CopyRegular } from '@fluentui/react-icons';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface PaletteProps {
  className?: string;
}

const hexCopyClassName = 'hexCopy';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '150px',
    justifyContent: 'space-evenly',
  },
  block: {
    display: 'grid',
    gridTemplateColumns: '0.5em auto',
    gridTemplateRows: '0.5em 1fr 1fr 0.5em',
    flexGrow: 1,
    flexShrink: 0,
    ':hover': {
      flexShrink: 1,
    },
    [`:hover .${hexCopyClassName}`]: {
      display: 'flex',
    },
  },
  hexCopy: {
    display: 'none',
    justifyContent: 'space-between',
    gridColumnStart: 2,
    gridRowStart: 2,
  },
  brandKey: {
    justifyContent: 'left',
    display: 'flex',
    alignItems: 'flex-end',
    gridColumnStart: 2,
    gridRowStart: 3,
  },
});

const getBrands = (colors: BrandVariants): Brands[] => {
  return Object.keys(colors).map(color => parseInt(color, 10) as Brands);
};

export const Palette: React.FC<PaletteProps> = props => {
  const styles = useStyles();

  const {
    state: { brand },
  } = useThemeDesigner();

  const CopyIcon = bundleIcon(CopyFilled, CopyRegular);

  return (
    <div>
      <Caption1>Generated palette</Caption1>
      <div className={mergeClasses(styles.root, props.className)}>
        {getBrands(brand).map(brandKey => {
          const brandColor = brand[brandKey].toUpperCase();
          const textColor = contrast(hex_to_sRGB(brandColor), hex_to_sRGB('#FFFFFF')) <= 4.5 ? 'black' : 'white';
          return (
            <div
              key={brandKey}
              className={styles.block}
              style={{
                backgroundColor: brandColor,
                color: textColor,
              }}
              onClick={() => {
                navigator.clipboard.writeText(brandColor);
              }}
            >
              <div className={`${styles.hexCopy} ${hexCopyClassName}`}>
                <Text>{brandColor}</Text>
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<CopyIcon color={textColor} />}
                  onClick={() => navigator.clipboard.writeText(brandColor)} // eslint-disable-line react/jsx-no-bind
                />
              </div>
              <Text className={styles.brandKey}>{brandKey}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
