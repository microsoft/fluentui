/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import {
  Badge,
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
import { brandRamp } from './getOverridableTokenBrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled, WarningRegular } from '@fluentui/react-icons';
import { usageList } from './UsageList';
import { ColorOverrideBrands } from './ColorTokens';
import { ContrastRatioList } from './getAccessibilityChecker';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AppContext } from '../../ThemeDesigner';

export interface ColorTokensListProps {
  brand: BrandVariants;
  brandColors: ColorOverrideBrands;
  colorOverride: ColorOverrideBrands;
  coveredTokens: string[];
  onNewOverride: (color: string, newColor: Brands) => void;
  failList?: ContrastRatioList;
}

export interface ColorTokenRowProps {
  brand: BrandVariants;
  brandValue: Brands;
  brandValueString: string;
  selected: boolean;
}

const useStyles = makeStyles({
  root: {},
  colorLabel: {
    color: tokens.colorBrandForeground1,
  },
  selected: {
    fontWeight: 'bold',
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
    gridTemplateColumns: '15px 1fr 1fr 1.5fr',
    gridTemplateRows: 'auto auto',
    alignItems: 'center',
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
  },
  row2: {
    gridColumnStart: '3',
  },
  colorPreview: {
    display: 'inline',
    paddingLeft: '5px',
    paddingRight: '5px',
    ...shorthands.borderRadius('10px'),
  },
});

const ColorTokenRow: React.FunctionComponent<ColorTokenRowProps> = props => {
  const styles = useStyles();
  const { brand, brandValue, brandValueString, selected } = props;

  const name = useContextSelector(AppContext, ctx => ctx.name);
  return (
    <MenuItemRadio
      icon={<CircleFilled primaryFill={brand[brandValue]} />}
      name={brandValueString}
      value={brandValueString}
    >
      <span className={selected ? styles.selected : ''}>
        {name} {brandValueString}
      </span>
    </MenuItemRadio>
  );
};

export const ColorTokensList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();

  const { brand, brandColors, colorOverride, coveredTokens, failList, onNewOverride } = props;
  const newColors: ColorOverrideBrands = { ...brandColors, ...colorOverride };

  const name = useContextSelector(AppContext, ctx => ctx.name);

  return (
    <div>
      {coveredTokens.map(color => {
        const colorValue: Brands = newColors[color];
        const usage = ((usageList as unknown) as Record<string, string>)[color];

        const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
          const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
          onNewOverride?.(color, newColor);
        };

        const overridenTokens = Object.keys(colorOverride);

        return (
          <div key={color.toString()}>
            <div className={styles.row}>
              <div className={styles.col}>
                {overridenTokens.includes(color) ? <Badge appearance="filled" color="success" size="tiny" /> : <> </>}
              </div>
              <div className={styles.col}>
                <Subtitle2 className={styles.colorLabel}>{color}</Subtitle2>
                <Subtitle2>Global.Color.Brand.{colorValue}</Subtitle2>
              </div>
              <div>
                <Menu>
                  <MenuTrigger>
                    <MenuButton shape="circular" icon={<CircleFilled primaryFill={brand[colorValue]} />}>
                      {name} {colorValue}
                    </MenuButton>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList onCheckedValueChange={handleColorChange}>
                      {brandRamp.map(brandValue => {
                        const selected = colorValue === brandValue;
                        const brandValueString = brandValue.toString();
                        return (
                          <div key={brandValueString}>
                            <ColorTokenRow
                              brand={brand}
                              brandValue={brandValue}
                              brandValueString={brandValueString}
                              selected={selected}
                            />
                          </div>
                        );
                      })}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </div>
              <div className={styles.col}>{usage}</div>
              <div className={styles.row2}>
                {failList ? (
                  failList[color].map(fail => {
                    const { compHex, ratio, desiredRatio } = fail;
                    return (
                      <div key={color + ' ' + compHex}>
                        <WarningRegular color="red" /> Contrast against{' '}
                        <div
                          className={styles.colorPreview}
                          style={{ backgroundColor: brand[colorValue], color: compHex }}
                        >
                          {compHex}
                        </div>{' '}
                        is {ratio} - expected {desiredRatio}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};
