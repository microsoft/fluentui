/** @jsx withSlots */
// @codepen
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IFontStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  withSlots,
  createComponent,
  getSlots,
  IComponent,
  IComponentStyles,
  IHTMLSlot,
  IStyleableComponentProps
} from 'office-ui-fabric-react/lib/Foundation';

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
  root?: IHTMLSlot;
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
    root: 'div',
    table: 'table',
    header: 'tr'
  });

  return (
    <Slots.root>
      <Text variant="medium" nowrap block>
        {props.title}
      </Text>
      <Slots.table>
        <thead>
          <Slots.header>
            {props.headers.map((header: string, index: number) => (
              <Text key={header + index} as="td" nowrap block>
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
      borderCollapse: 'collapse',
      margin: '10px 0'
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
    {props.cells.map((cell: string, index: number) => (
      <Text as="td" key={cell + index} nowrap block>
        {cell}
      </Text>
    ))}
  </tr>
);

export const TextRampExample = () => (
  <div>
    <Table title="Variants" headers={['Variant', 'Example', 'Usage']}>
      {Variants.map((setting: ISetting<keyof IFontStyles>, index: number) => (
        <TableRow
          key={setting.name + index}
          cells={[
            setting.name,
            <Text key={setting.name + 'text' + index} variant={setting.name} nowrap block>
              {TestText}
            </Text>,
            <Text key={setting.name + 'usage' + index} nowrap block>
              setting.usage
            </Text>
          ]}
        />
      ))}
    </Table>
  </div>
);
