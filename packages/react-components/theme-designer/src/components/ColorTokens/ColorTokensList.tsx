/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  Divider,
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
  tokens,
  Subtitle2,
} from '@fluentui/react-components';
import type { AccentColors } from './BrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled } from '@fluentui/react-icons';

import { usageList } from './UsageList';

export interface ColorTokensListProps {
  brand: BrandVariants;
  brandColors: AccentColors;
  colorOverrides: AccentColors;
  dispatchColorOverrides: React.Dispatch<{ colorToken: string; newValue: Brands }>;
}

const useStyles = makeStyles({
  root: {},
  colorLabel: {
    color: tokens.colorBrandForeground1,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  row: {
    paddingLeft: '5px',
    paddingRight: '5px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    paddingTop: tokens.spacingVerticalXXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
  },
});

export const ColorTokensList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();
  const { brand, brandColors, colorOverrides, dispatchColorOverrides } = props;

  const newColors = { ...brandColors, ...colorOverrides };

  console.log(colorOverrides);

  return (
    <div>
      {Object.keys(newColors).map(color => {
        const colorValue = newColors[color];
        const usage = ((usageList as unknown) as Record<string, string>)[color];

        const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
          const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
          dispatchColorOverrides({ colorToken: color, newValue: newColor });
        };

        const brandRamp: Brands[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];

        return (
          <>
            <div key={color.toString()} className={styles.row}>
              <div className={styles.col}>
                <Subtitle2 className={styles.colorLabel}>{color}</Subtitle2>
                <Subtitle2>Global.Color.Brand.{colorValue}</Subtitle2>
              </div>
              <div>
                <Menu>
                  <MenuTrigger>
                    <MenuButton shape="circular" icon={<CircleFilled primaryFill={brand[colorValue]} />}>
                      Untitled {colorValue}
                    </MenuButton>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList onCheckedValueChange={handleColorChange}>
                      {brandRamp.map(brandValue => {
                        const brandValueString = brandValue.toString();
                        return (
                          <MenuItemRadio
                            key={brandValueString}
                            icon={<CircleFilled primaryFill={brand[brandValue]} />}
                            name={brandValueString}
                            value={brandValueString}
                          >
                            Untitled {brandValueString}
                          </MenuItemRadio>
                        );
                      })}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
              <div className={styles.col}>{usage}</div>
            </div>
            <Divider />
          </>
        );
      })}
    </div>
  );
};
