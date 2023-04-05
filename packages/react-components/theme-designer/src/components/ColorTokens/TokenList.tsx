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
  Theme,
  tokens,
  useTableColumnSizing_unstable,
  useTableFeatures,
} from '@fluentui/react-components';
import { brandRamp } from '../../utils/getOverridableTokenBrandColors';
import { Brands, BrandVariants } from '@fluentui/react-theme';
import { CircleFilled } from '@fluentui/react-icons';
import { usageList } from './UsageList';
import { ColorOverrideBrands, useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface TokenIssueListProps {
  brand: BrandVariants;
  themeName: string;
  themeOverrides: Partial<Theme>;
  colorOverrides: ColorOverrideBrands;
  coveredTokens: string[];
  onNewOverride: (color: string, newColor: Brands) => void;
}

export interface ColorTokenRowProps {
  brand: BrandVariants;
  brandValue: Brands;
  token: string;
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
  const { brand, brandValue, brandValueString, selected } = props;

  const {
    state: { themeName },
  } = useThemeDesigner();

  return (
    <MenuItemRadio
      icon={<CircleFilled primaryFill={brand[brandValue]} />}
      name={brandValueString}
      value={brandValueString}
    >
      <span className={selected ? styles.selected : ''}>
        {themeName} {brandValueString}
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
    columnId: 'usageExample',
    renderHeaderCell: () => <>Usage example</>,
  }),
];

export const TokenList: React.FunctionComponent<TokenIssueListProps> = props => {
  const styles = useStyles();

  const [columns] = React.useState<TableColumnDefinition<string>[]>(columnsDef);

  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    colorTokens: {
      minWidth: 320,
    },
    usageExample: {
      minWidth: 240,
    },
  });

  const { brand, coveredTokens, colorOverrides, onNewOverride, themeOverrides, themeName } = props;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { columnSizing_unstable, tableRef } = useTableFeatures(
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
