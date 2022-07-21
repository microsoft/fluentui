import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { Button, Caption1, Text } from '@fluentui/react-components';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { contrast, hex_to_sRGB } from '@fluent-blocks/colors';
import { CopyRegular } from '@fluentui/react-icons';

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
    display: 'grid',
    gridTemplateColumns: '0.5em auto',
    gridTemplateRows: '0.5em 1fr 1fr 0.5em',
  },
  hexCopy: {
    justifyContent: 'space-between',
    gridColumnStart: 2,
    gridRowStart: 2,
  },
  hexColor: {
    justifyContent: 'left',
    alignItems: 'flex-start',
  },
  copyButton: {
    justifyContent: 'right',
    alignItems: 'flex-end',
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

  const [shownHex, setShownHex] = React.useState<number>(0);

  return (
    <div>
      <Caption1>Generated palette</Caption1>
      <div className={mergeClasses(styles.root, props.className)}>
        {getBrands(props.brandColors).map(brandKey => {
          const brandColor = props.brandColors[brandKey];
          const textColor = contrast(hex_to_sRGB(brandColor), hex_to_sRGB('#FFFFFF')) <= 4.5 ? 'black' : 'white';
          return (
            <div
              key={brandKey}
              className={styles.block}
              style={{
                backgroundColor: brandColor,
                color: textColor,
                flexGrow: shownHex === brandKey ? 0 : 1,
              }}
              onMouseEnter={() => setShownHex(brandKey)}
              onMouseLeave={() => setShownHex(0)}
            >
              {shownHex === brandKey ? (
                <div className={styles.hexCopy}>
                  <Text className={styles.hexColor}>{brandColor}</Text>
                  <Button
                    size="small"
                    className={styles.copyButton}
                    appearance="transparent"
                    icon={<CopyRegular color={textColor} />}
                    onClick={() => navigator.clipboard.writeText(brandColor)} // eslint-disable-line react/jsx-no-bind
                  />
                </div>
              ) : (
                <div />
              )}
              <Text className={styles.brandKey}>{brandKey}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
