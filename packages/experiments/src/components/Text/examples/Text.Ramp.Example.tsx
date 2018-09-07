import * as React from 'react';
import { Text, VerticalStack } from '@uifabric/experiments';
import { IFontVariants, IFontSizes, IFontWeights, IFontFamilies, IStyle } from '@uifabric/experiments/lib/Styling';
import { ISemanticTextColors, IPalette, ITheme } from '@uifabric/experiments/lib/Styling';
import { createStatelessComponent, IStyleableComponentProps, IViewComponentProps } from '@uifabric/experiments/lib/Foundation';

const TestText = 'The quick brown fox jumped over the lazy dog.';

interface ISetting<TType> {
  name: TType;
  usage: string;
}

const Variants: ISetting<keyof IFontVariants>[] = [
  { name: 'default', usage: 'default' },
  { name: 'caption', usage: 'caption' },
  { name: 'h1', usage: 'h1' },
  { name: 'h2', usage: 'h2' },
  { name: 'h3', usage: 'h3' },
  { name: 'h4', usage: 'h4' },
  { name: 'h5', usage: 'h5' },
  { name: 'link', usage: 'link' }
];

const Sizes: ISetting<keyof IFontSizes>[] = [
  { name: 'mini', usage: 'usage here.' },
  { name: 'xSmall', usage: 'usage here.' },
  { name: 'small', usage: 'usage here.' },
  { name: 'smallPlus', usage: 'usage here.' },
  { name: 'medium', usage: 'usage here.' },
  { name: 'mediumPlus', usage: 'usage here.' },
  { name: 'large', usage: 'usage here.' },
  { name: 'xLarge', usage: 'usage here.' },
  { name: 'xxLarge', usage: 'usage here.' },
  { name: 'mega', usage: 'usage here.' }
];

const Weights: ISetting<keyof IFontWeights>[] = [
  { name: 'default', usage: '' },
  { name: 'light', usage: '' },
  { name: 'regular', usage: '' },
  { name: 'semibold', usage: '' },
  { name: 'bold', usage: '' }
];

const Families: ISetting<keyof IFontFamilies>[] = [{ name: 'default', usage: '' }, { name: 'monospace', usage: '' }];

const Colors: ISetting<keyof ISemanticTextColors | keyof IPalette>[] = [
  { name: 'bodyText', usage: '' },
  { name: 'link', usage: '' },
  { name: 'linkHovered', usage: '' },
  { name: 'actionLink', usage: '' },
  { name: 'actionLinkHovered', usage: '' }
];

interface ITableStyles {
  root: IStyle;
  table: IStyle;
  header: IStyle;
}

// Note I intuitively tried to extend IStyleableComponentProps... this was confusing.
interface ITableProps extends IStyleableComponentProps<ITableProps, ITableStyles> {
  className?: string;
  title: string;
  headers: string[];
  children: React.ReactNode;
  theme?: ITheme;
}

const Table = createStatelessComponent<ITableProps, ITableStyles>({
  view: (props: IViewComponentProps<ITableProps, ITableStyles>) => (
    <VerticalStack className={props.className} gap={20}>
      <Text variant="h3">{props.title}</Text>
      <table className={props.classNames.table}>
        <thead>
          <tr className={props.classNames.header}>
            {props.headers.map((header: string) => (
              <Text key={header} as="td" weight="bold">
                {header}
              </Text>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </VerticalStack>
  ),
  displayName: 'Table',
  styles: {
    table: {
      borderCollapse: 'collapse'
    },
    header: {
      borderBottom: '1px solid black'
    }
  }
});

interface ITableRowProps {
  cells: React.ReactNode[];
}

const TableRow: React.StatelessComponent<ITableRowProps> = (props: ITableRowProps) => (
  <tr>
    {props.cells.map((cell: string) => (
      <Text as="td" key={cell}>
        {cell}
      </Text>
    ))}
  </tr>
);

export const TextRampExample = () => (
  <VerticalStack gap={40}>
    <Text>Default text should render using the "default" variant.</Text>

    <Table title="Variants" headers={['Variant', 'Example', 'Usage']}>
      {Variants.map((setting: ISetting<keyof IFontVariants>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} variant={setting.name}>
              {TestText}
            </Text>,
            <Text key={setting.name + 'usage'}>setting.usage</Text>
          ]}
        />
      ))}
    </Table>

    <Table title="Sizes" headers={['Size', 'Example', 'Usage']}>
      {Sizes.map((setting: ISetting<keyof IFontSizes>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} size={setting.name}>
              {TestText}
            </Text>,
            setting.usage
          ]}
        />
      ))}
    </Table>

    <Table title="Weights" headers={['Weight', 'Example', 'Usage']}>
      {Weights.map((setting: ISetting<keyof IFontWeights>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} weight={setting.name}>
              {TestText}
            </Text>,
            setting.usage
          ]}
        />
      ))}
    </Table>

    <Table title="Families" headers={['Family', 'Example', 'Usage']}>
      {Families.map((setting: ISetting<keyof IFontFamilies>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} family={setting.name}>
              {TestText}
            </Text>,
            setting.usage
          ]}
        />
      ))}
    </Table>

    <Table title="Colors" headers={['Color', 'Example']}>
      {Colors.map((setting: ISetting<keyof ISemanticTextColors | keyof IPalette>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} color={setting.name}>
              {TestText}
            </Text>
          ]}
        />
      ))}
    </Table>
  </VerticalStack>
);
