/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
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
  TableRowData,
  Theme,
  tokens,
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
  cellRow: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  badge: {
    marginRight: tokens.spacingHorizontalS,
  },
  colorPreview: {
    display: 'inline',
    paddingLeft: '5px',
    paddingRight: '5px',
    ...shorthands.borderRadius('10px'),
  },
});

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

const columnsDef: TableColumnDefinition<TestResult>[] = [
  createTableColumn<TestResult>({
    columnId: 'colorTokens',
    renderHeaderCell: () => <>Token</>,
  }),
  createTableColumn<TestResult>({
    columnId: 'check',
    renderHeaderCell: () => <>Check</>,
  }),
  createTableColumn<TestResult>({
    columnId: 'usageExample',
    renderHeaderCell: () => <>Usage example</>,
  }),
];

export const TokenIssueList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();

  const [columns] = React.useState<TableColumnDefinition<TestResult>[]>(columnsDef);

  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    colorTokens: {
      minWidth: 320,
    },
    check: {
      minWidth: 330,
    },
    usageExample: {},
  });

  const { brand, coveredTokens, tests, colorOverrides, onNewOverride, themeOverrides, themeName } = props;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items: tests!,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })],
  );

  const rows = getRows();

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
          {coveredTokens.map(token => {
            const colorValue: Brands = colorOverrides[token];
            const usage = (usageList as unknown as Record<string, string>)[token];
            const handleColorChange: MenuProps['onCheckedValueChange'] = (e, data) => {
              const newColor = parseInt(data.checkedItems[0] as string, 10) as Brands;
              onNewOverride?.(token, newColor);
            };

            const overridenTokens = Object.keys(themeOverrides);

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
                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <MenuButton size="small" shape="circular" icon={<CircleFilled primaryFill={brand[colorValue]} />}>
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
                </TableCell>
                <TableCell>
                  {rows &&
                    rows
                      .filter(o => o.item.testInfo!.currToken === token)
                      .map((rowData: TableRowData<TestResult>) => {
                        const testType = rowData.item.testType;
                        let hex: string = '';
                        let output;
                        let desiredOutput;
                        const testUnits = testType === TestType.contrastRatio ? 'ratio' : '% dif';
                        const compToken = rowData.item.testInfo?.compToken;
                        if (testType === TestType.contrastRatio) {
                          const testInfo = rowData.item.testInfo as ContrastRatioTest;
                          hex = testInfo.compHex;
                          output = testInfo.ratio;
                          desiredOutput = testInfo.desiredRatio;
                        } else if (testType === TestType.luminosity) {
                          const testInfo = rowData.item.testInfo as LuminosityTest;
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
                            {`${testUnits}: `}
                            {output}, expected: {desiredOutput}
                          </div>
                        );
                      })}
                </TableCell>
                <TableCell>
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
