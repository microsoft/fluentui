import * as React from 'react';
import { Text, VerticalStack } from '@uifabric/experiments';
import { IFontVariants, IFontSizes, IFontWeights, IFontFamilies } from '@uifabric/experiments/lib/Styling';
import { ISemanticColors, IPalette, ITheme } from '@uifabric/experiments/lib/Styling';
import { createStatelessComponent } from '@uifabric/experiments/lib/Foundation';

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
  { name: 'h5', usage: 'h5' }
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

const Colors: ISetting<keyof ISemanticColors | keyof IPalette>[] = [
  { name: 'themePrimary', usage: '' },
  { name: 'bodyText', usage: '' },
  { name: 'errorText', usage: '' }
];

interface ITableProps {
  className?: string;
  title: string;
  headers: string[];
  children: React.ReactNode;
  theme?: ITheme;
}

const Table = createStatelessComponent<ITableProps, {}, {}>({
  view: (props: ITableProps) => (
    <VerticalStack className={props.className} gap={20}>
      <Text variant="h3">{props.title}</Text>
      <table>
        <thead>
          <tr>
            {props.headers.map((header: string) => (
              <td key={header}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </VerticalStack>
  ),
  displayName: 'Table',
  styles: {
    table: {}
  }
});

interface ITableRowProps {
  cells: React.ReactNode[];
}

const TableRow: React.StatelessComponent<ITableRowProps> = (props: ITableRowProps) => (
  <tr>
    {props.cells.map((cell: string) => (
      <td key={cell}>{cell}</td>
    ))}
  </tr>
);

export const TextRampExample = () => (
  <VerticalStack gap={40}>
    <Table title="Variants" headers={['Variant', 'Example', 'Usage']}>
      {Variants.map((setting: ISetting<keyof IFontVariants>) => (
        <TableRow
          key={setting.name}
          cells={[
            setting.name,
            <Text key={setting.name + 'text'} variant={setting.name}>
              {TestText}
            </Text>,
            setting.usage
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
      {Colors.map((setting: ISetting<keyof ISemanticColors | keyof IPalette>) => (
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
