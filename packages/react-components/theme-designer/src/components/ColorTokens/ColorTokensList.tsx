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
  Subtitle2,
  Theme,
  tokens,
} from '@fluentui/react-components';
import { brandRamp } from '../../utils/getOverridableTokenBrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled, WarningRegular } from '@fluentui/react-icons';
import { usageList } from './UsageList';
import {
  calculateContrastRatio,
  ContrastRatioTest,
  LuminosityTest,
  TestResult,
  TestType,
} from '../../utils/getAccessibilityChecker';
import { ColorOverrideBrands, useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { contrast, hex_to_sRGB } from '../../colors';
import { accessiblePairs } from './AccessiblePairs';

export interface ColorTokensListProps {
  brand: BrandVariants;
  themeName: string;
  themeOverrides: Partial<Theme>;
  colorOverrides: ColorOverrideBrands;
  coveredTokens: string[];
  tests?: TestResult[];
  onNewOverride: (color: string, newColor: Brands) => void;
}

export interface ColorTokenRowProps {
  brand: BrandVariants;
  brandValue: Brands;
  token: string;
  brandValueString: string;
  selected: boolean;

  showContrast?: boolean;
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
  const { brand, brandValue, brandValueString, selected, token, showContrast } = props;

  const {
    state: { themeName, themeWithOverrides },
  } = useThemeDesigner();
  const calculateContrast = () => {
    const theme = {
      ...themeWithOverrides,
      [token]: brand[brandValue],
    };
    return Math.min(
      ...accessiblePairs[token].map(tokenPair => {
        const [compToken, ratio] = tokenPair;
        const { testInfo } = calculateContrastRatio(
          theme as unknown as Record<string, string>,
          token,
          compToken,
          ratio,
        );
        return (testInfo as ContrastRatioTest).ratio;
      }),
    );
  };

  const generateContrast = () => {
    if (showContrast) {
      return <> - Contrast: {calculateContrast()}</>;
    } else {
      return <></>;
    }
  };

  return (
    <MenuItemRadio
      icon={<CircleFilled primaryFill={brand[brandValue]} />}
      name={brandValueString}
      value={brandValueString}
    >
      <span className={selected ? styles.selected : ''}>
        {themeName} {brandValueString} {generateContrast()}
      </span>
    </MenuItemRadio>
  );
};

export const ColorTokensList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();

  const { brand, coveredTokens, tests, colorOverrides, onNewOverride, themeOverrides, themeName } = props;
  return (
    <div>
      {coveredTokens.map(token => {
        const colorValue: Brands = colorOverrides[token];
        const usage = (usageList as unknown as Record<string, string>)[token];
        const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
          const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
          onNewOverride?.(token, newColor);
        };

        const overridenTokens = Object.keys(themeOverrides);

        return (
          <div key={token.toString()}>
            <div className={styles.row}>
              <div className={styles.col}>
                {overridenTokens.includes(token) ? <Badge appearance="filled" color="success" size="tiny" /> : <> </>}
              </div>
              <div className={styles.col}>
                <Subtitle2 className={styles.colorLabel}>{token}</Subtitle2>
                <Subtitle2>Global.Color.Brand.{colorValue}</Subtitle2>
              </div>
              <div>
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <MenuButton shape="circular" icon={<CircleFilled primaryFill={brand[colorValue]} />}>
                      {themeName} {colorValue}
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
                              token={token}
                              brand={brand}
                              showContrast={!!tests}
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
                {tests ? (
                  tests.forEach(testResult => {
                    const testType = testResult.testType;
                    var hex: string = '';
                    var output;
                    var desiredOutput;
                    if (testType === TestType.contrastRatio) {
                      const testInfo = testResult.testInfo as ContrastRatioTest;
                      hex = testInfo.compHex;
                      output = testInfo.ratio;
                      desiredOutput = testInfo.desiredRatio;
                    } else if (testType == TestType.luminosity) {
                      const testInfo = testResult.testInfo as LuminosityTest;
                      hex = testInfo.compHex;
                      output = testInfo.percentDiff;
                      desiredOutput = testInfo.desiredPercentDiff;
                    }

                    return (
                      <div key={token + ' ' + hex}>
                        <WarningRegular color="red" /> {testType === TestType.contrastRatio ? 'Contrast' : 'Luminosity'}{' '}
                        {' against'}
                        <div
                          className={styles.colorPreview}
                          style={{
                            backgroundColor: brand[colorValue],
                            color: contrast(hex_to_sRGB(hex), hex_to_sRGB('#FFFFFF')) <= 4.5 ? 'black' : 'white',
                          }}
                        >
                          {hex}
                        </div>
                        is {output} - expected {desiredOutput}
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
