import * as React from 'react';
import { clsx } from 'clsx';
import { Button, Caption1, Text } from '@fluentui/react-components';
import styles from './Palette.module.css';
import type { Brands, BrandVariants } from '@fluentui/react-theme';
import { contrast, hex_to_sRGB } from '../../colors';
import { bundleIcon, CopyFilled, CopyRegular } from '@fluentui/react-icons';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface PaletteProps {
  className?: string;
}

const getBrands = (colors: BrandVariants): Brands[] => {
  return Object.keys(colors).map(color => parseInt(color, 10) as Brands);
};

export const Palette: React.FC<PaletteProps> = props => {
  const {
    state: { brand },
  } = useThemeDesigner();

  const CopyIcon = bundleIcon(CopyFilled, CopyRegular);

  return (
    <div>
      <Caption1>Generated palette</Caption1>
      <div className={clsx(styles.root, props.className)}>
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
              <div className={styles['hex-copy']}>
                <Text>{brandColor}</Text>
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<CopyIcon color={textColor} />}
                  onClick={() => navigator.clipboard.writeText(brandColor)} // eslint-disable-line react/jsx-no-bind
                />
              </div>
              <Text className={styles['brand-key']}>{brandKey}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
