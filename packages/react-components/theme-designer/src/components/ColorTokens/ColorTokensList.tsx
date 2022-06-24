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
import { brandRamp } from './OverridableTokenBrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled } from '@fluentui/react-icons';
import type { ColorOverrides } from '../../utils/colorOverrides';

import { usageList } from './UsageList';

export interface ColorTokensListProps {
  brand: BrandVariants;
  brandColors: ColorOverrides;
  colorOverrides: ColorOverrides;
  dispatchColorOverrides: React.Dispatch<{ colorToken: string; newValue: Brands }>;
}

export interface ColorTokenRowProps {
  brand: BrandVariants;
  brandValue: Brands;
  brandValueString: string;
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

const ColorTokenRow: React.FunctionComponent<ColorTokenRowProps> = props => {
  const { brand, brandValue, brandValueString } = props;
  return (
    <MenuItemRadio
      icon={<CircleFilled primaryFill={brand[brandValue]} />}
      name={brandValueString}
      value={brandValueString}
    >
      Untitled {brandValueString}
    </MenuItemRadio>
  );
};

export const ColorTokensList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();
  const { brand, brandColors, colorOverrides, dispatchColorOverrides } = props;

  const newColors = { ...brandColors, ...colorOverrides };

  return (
    <div>
      {Object.keys(newColors).map(color => {
        const colorValue = newColors[color];
        const usage = ((usageList as unknown) as Record<string, string>)[color];

        const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
          const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
          dispatchColorOverrides({ colorToken: color, newValue: newColor });
        };

        return (
          <div key={color.toString()}>
            <div className={styles.row}>
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
                          <div key={brandValueString}>
                            <ColorTokenRow brand={brand} brandValue={brandValue} brandValueString={brandValueString} />
                          </div>
                        );
                      })}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
              <div className={styles.col}>{usage}</div>
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};
