import * as React from 'react';
import {
  Badge,
  createTableColumn,
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Theme,
  useTableColumnSizing_unstable,
  useTableFeatures,
} from '@fluentui/react-components';
import { brandRamp } from '../../utils/getOverridableTokenBrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled } from '@fluentui/react-icons';
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
import { useStyles } from './TokenList.styles';

export interface TokenIssueListProps {
  brand: BrandVariants;
  themeName: string;
  themeOverrides: Partial<Theme>;
  colorOverrides: ColorOverrideBrands;

  testType: TestType;
  coveredTokens: string[];
  tests: TestResult[];
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

const ColorTokenCol: React.FunctionComponent<ColorTokenRowProps> = props => {
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

const columnsDef: TableColumnDefinition<string>[] = [
  createTableColumn<string>({
    columnId: 'colorTokens',
    renderHeaderCell: () => <>Token</>,
  }),
  createTableColumn<string>({
    columnId: 'check',
    renderHeaderCell: () => <>Check</>,
  }),
  createTableColumn<string>({
    columnId: 'usageExample',
    renderHeaderCell: () => <>Usage example</>,
  }),
];

export const constructRowParameters = (
  colorOverrides: ColorOverrideBrands,
  token: string,
  onNewOverride: (color: string, newColor: Brands) => void,
  themeOverrides: Partial<Theme>,
) => {
  const colorValue: Brands = colorOverrides[token];
  const usage = (usageList as unknown as Record<string, string>)[token];
  const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
    const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
    onNewOverride?.(token, newColor);
  };

  const overridenTokens = Object.keys(themeOverrides);
  return { colorValue, usage, handleColorChange, overridenTokens };
};

export const TokenIssueList: React.FunctionComponent<TokenIssueListProps> = props => {
  const styles = useStyles();

  const [columns] = React.useState<TableColumnDefinition<string>[]>(columnsDef);

  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    colorTokens: {
      minWidth: 320,
    },
    check: {
      minWidth: 330,
    },
    usageExample: {},
  });

  const { brand, coveredTokens, tests, colorOverrides, onNewOverride, themeOverrides, themeName, testType } = props;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items: coveredTokens,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })],
  );

  return (
    <>
      <Table size="medium" aria-label="Table with color token and description" ref={tableRef}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell
                key={column.columnId}
                {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}
              >
                {column.renderHeaderCell()}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getRows().map(rowData => {
            const token = rowData.item;
            const { colorValue, usage, handleColorChange, overridenTokens } = constructRowParameters(
              colorOverrides,
              token,
              onNewOverride,
              themeOverrides,
            );

            return (
              <TableRow key={token}>
                <TableCell className={styles.cellRow}>
                  <div>
                    {overridenTokens.includes(token) ? (
                      <Badge className={styles.badge} appearance="filled" color="success" size="tiny" />
                    ) : (
                      <> </>
                    )}
                    <Subtitle2 className={styles.colorLabel}>{token}</Subtitle2>
                  </div>
                  <div className={styles.menu}>
                    <Menu>
                      <MenuTrigger disableButtonEnhancement>
                        <MenuButton
                          size="small"
                          shape="circular"
                          icon={<CircleFilled primaryFill={brand[colorValue]} />}
                        >
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
                                <ColorTokenCol
                                  token={token}
                                  brand={brand}
                                  showContrast={testType === TestType.contrastRatio}
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
                </TableCell>
                <TableCell className={styles.cellRow}>
                  {tests
                    .filter(o => o.testInfo!.currToken === token)
                    .map((testResult: TestResult) => {
                      let hex: string = '';
                      let output;
                      let desiredOutput;
                      const testUnits = testType === TestType.contrastRatio ? 'ratio' : '% dif';
                      const compToken = testResult.testInfo?.compToken;
                      if (testType === TestType.contrastRatio) {
                        const testInfo = testResult.testInfo as ContrastRatioTest;
                        hex = testInfo.compHex;
                        output = testInfo.ratio;
                        desiredOutput = testInfo.desiredRatio;
                      } else if (testType === TestType.luminosity) {
                        const testInfo = testResult.testInfo as LuminosityTest;
                        hex = testInfo.compHex;
                        output = testInfo.percentDiff;
                        desiredOutput = testInfo.desiredPercentDiff;
                      }

                      return (
                        <div key={token + ' ' + hex}>
                          {compToken} &nbsp;
                          <div
                            className={styles.colorPreview}
                            style={{
                              backgroundColor: brand[colorValue],
                              color: contrast(hex_to_sRGB(hex), hex_to_sRGB('#FFFFFF')) <= 4.5 ? 'black' : 'white',
                            }}
                          >
                            {hex.toUpperCase()}
                          </div>
                          <br />
                          <div className={styles.output}>{`${testUnits}: ${output}, expected: ${desiredOutput}`}</div>
                        </div>
                      );
                    })}
                </TableCell>
                <TableCell className={styles.cellRow}>
                  <div>{usage}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
