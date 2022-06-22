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
import type { AccentColors } from '../../utils/themes/createCustomLightTheme';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled } from '@fluentui/react-icons';

export interface ColorTokensListProps {
  brand: BrandVariants;
  colors: AccentColors;
  dispatchColors: React.Dispatch<{ colorToken: string; newValue: Brands }>;
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
  const { brand, colors, dispatchColors } = props;

  const usageList = {
    colorNeutralForeground2BrandHover: 'usage goes here',
    colorNeutralForeground2BrandPressed: 'usage goes here',
    colorNeutralForeground2BrandSelected: 'usage goes here',
    colorNeutralForeground3BrandHover: 'usage goes here',
    colorNeutralForeground3BrandPressed: 'usage goes here',
    colorNeutralForeground3BrandSelected: 'usage goes here',
    colorBrandForegroundLink: 'usage goes here',
    colorBrandForegroundLinkHover: 'usage goes here',
    colorBrandForegroundLinkPressed: 'usage goes here',
    colorBrandForegroundLinkSelected: 'usage goes here',
    colorCompoundBrandForeground1: 'usage goes here',
    colorCompoundBrandForeground1Hover: 'usage goes here',
    colorCompoundBrandForeground1Pressed: 'usage goes here',
    colorBrandForeground1: 'usage goes here',
    colorBrandForeground2: 'usage goes here',
    colorBrandForegroundInverted: 'usage goes here',
    colorBrandForegroundInvertedHover: 'usage goes here',
    colorBrandForegroundInvertedPressed: 'usage goes here',
    colorBrandForegroundOnLight: 'usage goes here',
    colorBrandForegroundOnLightHover: 'usage goes here',
    colorBrandForegroundOnLightPressed: 'usage goes here',
    colorBrandForegroundOnLightSelected: 'usage goes here',
    colorBrandBackground: 'usage goes here',
    colorBrandBackgroundHover: 'usage goes here',
    colorBrandBackgroundPressed: 'usage goes here',
    colorBrandBackgroundSelected: 'usage goes here',
    colorCompoundBrandBackground: 'usage goes here',
    colorCompoundBrandBackgroundHover: 'usage goes here',
    colorCompoundBrandBackgroundPressed: 'usage goes here',
    colorBrandBackgroundStatic: 'usage goes here',
    colorBrandBackground2: 'usage goes here',
    colorBrandBackgroundInvertedHover: 'usage goes here',
    colorBrandBackgroundInvertedPressed: 'usage goes here',
    colorBrandBackgroundInvertedSelected: 'usage goes here',
    colorNeutralStrokeAccessibleSelected: 'usage goes here',
    colorCompoundBrandStroke: 'usage goes here',
    colorCompoundBrandStrokeHover: 'usage goes here',
    colorCompoundBrandStrokePressed: 'usage goes here',
  };

  return (
    <div>
      {Object.keys(colors).map(color => {
        const colorValue = ((colors as unknown) as Record<string, Brands>)[color];
        const usage = ((usageList as unknown) as Record<string, string>)[color];
        if (!colorValue) {
          return;
        }

        const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
          const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
          dispatchColors({ colorToken: color, newValue: newColor });
        };

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
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[10]} />} name="10" value="10">
                        Untitled 10
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[20]} />} name="20" value="20">
                        Untitled 20
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[30]} />} name="30" value="30">
                        Untitled 30
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[40]} />} name="40" value="40">
                        Untitled 40
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[50]} />} name="50" value="50">
                        Untitled 50
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[60]} />} name="60" value="60">
                        Untitled 60
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[70]} />} name="70" value="70">
                        Untitled 70
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[80]} />} name="80" value="80">
                        Untitled 80
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[90]} />} name="90" value="90">
                        Untitled 90
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[100]} />} name="100" value="100">
                        Untitled 100
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[110]} />} name="110" value="110">
                        Untitled 110
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[120]} />} name="120" value="120">
                        Untitled 120
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[130]} />} name="130" value="130">
                        Untitled 130
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[140]} />} name="140" value="140">
                        Untitled 140
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[150]} />} name="150" value="150">
                        Untitled 150
                      </MenuItemRadio>
                      <MenuItemRadio icon={<CircleFilled primaryFill={brand[160]} />} name="160" value="160">
                        Untitled 160
                      </MenuItemRadio>
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
