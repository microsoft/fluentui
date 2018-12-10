import * as React from 'react';
import { Text, Stack } from '@uifabric/experiments';
import { IFontStyles, IStyle } from '@uifabric/experiments/lib/Styling';
import { createStatelessComponent, IStyleableComponentProps, IStatelessComponent } from '@uifabric/experiments/lib/Foundation';

const TestText = 'The quick brown fox jumped over the lazy dog.';

interface ISetting<TType> {
  name: TType;
  usage: string;
}

const Variants: ISetting<keyof IFontStyles>[] = [
  { name: 'tiny', usage: 'usage here.' },
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
}

type ITableComponent = IStatelessComponent<ITableProps, ITableStyles>;

const TableView: ITableComponent['view'] = props => (
  <Stack className={props.className} gap={20}>
    <Text variant="medium">{props.title}</Text>
    <table className={props.classNames.table}>
      <thead>
        <tr className={props.classNames.header}>
          {props.headers.map((header: string) => (
            <Text key={header} as="td">
              {header}
            </Text>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  </Stack>
);

const Table = createStatelessComponent<ITableProps, ITableStyles>({
  view: TableView,
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
  <Stack gap={40}>
    <Text>Default text should render using the "default" variant.</Text>

    <Table title="Variants" headers={['Variant', 'Example', 'Usage']}>
      {Variants.map((setting: ISetting<keyof IFontStyles>) => (
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
  </Stack>
);
