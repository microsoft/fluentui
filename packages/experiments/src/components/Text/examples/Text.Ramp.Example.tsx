/** @jsx withSlots */
import { Text, Stack, IStackSlot } from '@uifabric/experiments';
import { IFontStyles } from '@uifabric/experiments/lib/Styling';
import {
  withSlots,
  createComponent,
  getSlots,
  IComponent,
  IComponentStyles,
  IHTMLSlot,
  IStyleableComponentProps
} from '@uifabric/experiments/lib/Foundation';

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

interface ITableSlots {
  root?: IStackSlot;
  table?: IHTMLSlot;
  header?: IHTMLSlot;
}

type ITableStyles = IComponentStyles<ITableSlots>;

interface ITableProps extends ITableSlots, IStyleableComponentProps<ITableProps, {}, ITableStyles> {
  className?: string;
  headers: string[];
  title: string;
}

type ITableComponent = IComponent<ITableProps, {}, ITableStyles>;

const TableView: ITableComponent['view'] = props => {
  const Slots = getSlots<ITableProps, ITableSlots>(props, {
    root: Stack,
    table: 'table',
    header: 'tr'
  });

  return (
    <Slots.root className={props.className} gap={20}>
      <Text variant="medium">{props.title}</Text>
      <Slots.table>
        <thead>
          <Slots.header>
            {props.headers.map((header: string) => (
              <Text key={header} as="td">
                {header}
              </Text>
            ))}
          </Slots.header>
        </thead>
        <tbody>{props.children}</tbody>
      </Slots.table>
    </Slots.root>
  );
};

const Table: React.StatelessComponent<ITableProps> = createComponent({
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
