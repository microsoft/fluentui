import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { Text, Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants } from '@fluentui/react-theme';

export interface PaletteProps {
  className?: string;
  brandColors: BrandVariants;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '150px',
    justifyContent: 'space-evenly',
  },
  block: {
    justifyContent: 'left',
    display: 'flex',
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  whiteText: {
    color: 'white',
  },
});

const getBrands = (colors: BrandVariants): Brands[] => {
  return Object.keys(colors).map(color => parseInt(color, 10) as Brands);
};

export const Palette: React.FC<PaletteProps> = props => {
  const styles = useStyles();

  return (
    <div>
      <Caption1>Generated Palette</Caption1>
      <div className={mergeClasses(styles.root, props.className)}>
        {getBrands(props.brandColors).map(brandKey => {
          const brandColor = props.brandColors[brandKey];
          return (
            <div
              key={brandKey}
              className={brandKey <= 80 ? mergeClasses(styles.block, styles.whiteText) : styles.block}
              style={{ backgroundColor: brandColor }}
            >
              <Text>{brandKey}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
