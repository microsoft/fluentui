import * as React from 'react';
import {
  DetailsHeader,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IDetailsListProps,
  IGroup,
} from '@fluentui/react/lib/DetailsList';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { ITheme } from '@fluentui/react/lib/Styling';
import { styled, classNamesFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IInterfaceProperty, IEnumProperty, InterfacePropertyType } from '../../utilities/parser/index';
import { IPropertiesTableSetStyleProps, IPropertiesTableSetStyles } from './PropertiesTableSet.types';
import { getStyles } from './PropertiesTableSet.styles';

export interface IPropertiesTableProps {
  title?: string;
  properties: IInterfaceProperty[] | IEnumProperty[];
  renderAsEnum?: boolean;
  key?: string;
  /** Theme provided by higher-order component. */
  theme?: ITheme;
  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IPropertiesTableSetStyleProps, IPropertiesTableSetStyles>;
}

const getClassNames = classNamesFunction<IPropertiesTableSetStyleProps, IPropertiesTableSetStyles>();

const renderCell = (text: string) => {
  // When the text is passed to this function, it has had newline characters removed,
  // so this regex will match backtick sequences that span multiple lines.
  const regex = /`.*?`/g;
  let regexResult: RegExpExecArray | null;
  const codeBlocks: { index: number; text: string }[] = [];
  while ((regexResult = regex.exec(text))) {
    codeBlocks.push({
      index: regexResult.index,
      text: regexResult[0],
    });
  }

  if (codeBlocks.length === 0) {
    return <span>{text}</span>;
  }

  const eltChildren: JSX.Element[] = [];

  let codeIndex = 0;
  let textIndex = 0;
  while (textIndex < text.length && codeIndex < codeBlocks.length) {
    const codeBlock = codeBlocks[codeIndex];
    if (textIndex < codeBlock.index) {
      const str = text.substring(textIndex, codeBlock.index);
      eltChildren.push(<span key={textIndex}>{str}</span>);
      textIndex += str.length;
    } else {
      eltChildren.push(<code key={textIndex}>{codeBlock.text.substring(1, codeBlock.text.length - 1)}</code>);
      codeIndex++;
      textIndex += codeBlock.text.length;
    }
  }
  if (textIndex < text.length) {
    eltChildren.push(<span key={textIndex}>{text.substring(textIndex, text.length)}</span>);
  }

  return <span>{eltChildren}</span>;
};

type PropertyName = keyof IInterfaceProperty | keyof IEnumProperty;

const createRenderCell = (propertyName: PropertyName) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (item: IInterfaceProperty | IEnumProperty) => renderCell((item as any)[propertyName]);
};

const getColumns = (columns: Array<Partial<IColumn> & { key: PropertyName; name: string }>): IColumn[] => {
  return columns.map(column => ({
    fieldName: column.key,
    minWidth: 130,
    maxWidth: 150,
    isCollapsible: false,
    isResizable: true,
    isMultiline: !column.isRowHeader,
    onRender: createRenderCell(column.key),
    ...column,
  }));
};

const DEFAULT_COLUMNS: IColumn[] = getColumns([
  { key: 'name', name: 'Name', minWidth: 150, maxWidth: 250, isRowHeader: true },
  { key: 'type', name: 'Type' },
  { key: 'defaultValue', name: 'Default value' },
  { key: 'description', name: 'Description', minWidth: 300, maxWidth: 400 },
]);

const ENUM_COLUMNS: IColumn[] = getColumns([
  { key: 'name', name: 'Name', minWidth: 150, maxWidth: 250, isRowHeader: true },
  { key: 'description', name: 'Description', minWidth: 300, maxWidth: 400 },
]);

const onShouldVirtualize = () => false;

const onRenderHeader: IDetailsListProps['onRenderDetailsHeader'] = props => {
  return (
    <DetailsHeader
      {...props!}
      ariaLabelForToggleAllGroupsButton={props!.isAllCollapsed ? 'Expand all groups' : 'Collapse all groups'}
    />
  );
};

class PropertiesTableBase extends React.PureComponent<IPropertiesTableProps> {
  public static defaultProps: Partial<IPropertiesTableProps> = {
    title: 'Properties',
  };

  private _properties: IInterfaceProperty[] | IEnumProperty[];
  private _groups: IGroup[] | undefined;

  constructor(props: IPropertiesTableProps) {
    super(props);

    this._properties = (props.properties as IInterfaceProperty[])
      .sort((a: IInterfaceProperty, b: IInterfaceProperty) =>
        a.interfacePropertyType < b.interfacePropertyType
          ? -1
          : a.interfacePropertyType > b.interfacePropertyType
          ? 1
          : a.name < b.name
          ? -1
          : a.name > b.name
          ? 1
          : 0,
      )
      .map((prop: IInterfaceProperty | IEnumProperty, index: number) => ({ ...prop, key: index }));

    this._groups = !props.renderAsEnum ? this._getGroups() : undefined;
  }

  public render(): JSX.Element | null {
    const { title, renderAsEnum, styles, theme } = this.props;

    if (this._properties.length === 0) {
      return null;
    }

    const classNames = getClassNames(styles, { theme });

    return (
      <div className={classNames.tableRoot}>
        <h2 className={classNames.tableHeader}>{title}</h2>
        <DetailsList
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          items={this._properties}
          groups={this._groups}
          columns={renderAsEnum ? ENUM_COLUMNS : DEFAULT_COLUMNS}
          styles={classNames.subComponentStyles.list}
          onShouldVirtualize={onShouldVirtualize}
          onRenderDetailsHeader={onRenderHeader}
        />
      </div>
    );
  }

  private _getGroups(): IGroup[] {
    const groups: IGroup[] = [];
    let index = 0;

    index = this._tryAddGroup(InterfacePropertyType.required, 'Required members', index, groups);
    index = this._tryAddGroup(InterfacePropertyType.optional, 'Optional members', index, groups);
    index = this._tryAddGroup(InterfacePropertyType.deprecated, 'Deprecated members', index, groups);

    return groups;
  }

  private _tryAddGroup(typeToCompare: InterfacePropertyType, name: string, index: number, allGroups: IGroup[]): number {
    const props = this._properties as IInterfaceProperty[];
    let group: IGroup | undefined = undefined;

    while (index < props.length) {
      const prop = props[index];

      if (prop.interfacePropertyType !== typeToCompare) {
        break;
      }

      if (!group) {
        group = {
          key: name,
          name,
          startIndex: index,
          count: 0,
        };
        allGroups.push(group);
      }
      group.count++;
      index++;
    }

    return index;
  }
}

export const PropertiesTable: React.FunctionComponent<IPropertiesTableProps> = styled<
  IPropertiesTableProps,
  IPropertiesTableSetStyleProps,
  IPropertiesTableSetStyles
>(PropertiesTableBase, getStyles, undefined, {
  scope: 'PropertiesTable',
});
