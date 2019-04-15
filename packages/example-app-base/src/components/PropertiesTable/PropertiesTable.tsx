import * as React from 'react';
import { assign, IRenderFunction, getDocument } from 'office-ui-fabric-react/lib/Utilities';
import {
  DetailsList,
  DetailsRow,
  IDetailsRowProps,
  IDetailsRowStyles,
  DetailsListLayoutMode,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { IInterfaceProperty, IEnumProperty, ILinkToken, IMethod } from '../../utilities/parser/index';

export interface IPropertiesTableProps {
  title?: string;
  properties: IInterfaceProperty[] | IEnumProperty[];
  methods?: IMethod[];
  renderAsEnum?: boolean;
  renderAsClass?: boolean;
  key?: string;
  name?: string;
  description?: string;
  extendsTokens?: ILinkToken[];
}

export interface IPropertiesTableState {
  properties: IInterfaceProperty[] | IEnumProperty[];
  methods?: IMethod[];
  isEnum: boolean;
  isClass: boolean;
}

export const XSMALL_GAP_SIZE = 2.5;
export const SMALL_GAP_SIZE = 8;
export const MEDIUM_GAP_SIZE = 16;
export const LARGE_GAP_SIZE = 48;

export class PropertiesTable extends React.Component<IPropertiesTableProps, IPropertiesTableState> {
  public static defaultProps: Partial<IPropertiesTableProps> = {
    title: 'Properties'
  };

  private _baseUrl: string;
  private defaultColumns: IColumn[];
  private methodColumns: IColumn[];
  private enumColumns: IColumn[];

  constructor(props: IPropertiesTableProps) {
    super(props);

    if (props.renderAsEnum) {
      const properties = (props.properties as IEnumProperty[])
        .sort((a: IEnumProperty, b: IEnumProperty) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))
        .map((prop: IEnumProperty, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties,
        isEnum: true,
        isClass: !!props.renderAsClass
      };
    } else if (props.renderAsClass) {
      const members = (props.properties as IInterfaceProperty[])
        .sort((a: IInterfaceProperty, b: IInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IInterfaceProperty, index: number) => assign({}, prop, { key: index }));

      const methods = (props.methods as IMethod[])
        .sort((a: IMethod, b: IMethod) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IMethod, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties: members,
        isEnum: !!props.renderAsEnum,
        isClass: true,
        methods: methods
      };
    } else {
      const properties = (props.properties as IInterfaceProperty[])
        .sort((a: IInterfaceProperty, b: IInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IInterfaceProperty, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties,
        isEnum: !!props.renderAsEnum,
        isClass: !!props.renderAsClass
      };
    }

    const doc = getDocument();
    this._baseUrl = doc ? document.location.href : '';

    this.defaultColumns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 250,
        isCollapsible: false,
        isRowHeader: true,
        isResizable: true,
        onRender: this.createRenderCellInterface('name')
      },
      {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        minWidth: 130,
        maxWidth: 150,
        isCollapsible: false,
        isResizable: true,
        isMultiline: true,
        onRender: this.createRenderCellType('typeTokens')
      },
      {
        key: 'defaultValue',
        name: 'Default value',
        fieldName: 'defaultValue',
        minWidth: 130,
        maxWidth: 150,
        isCollapsible: false,
        isResizable: true,
        isMultiline: true,
        onRender: this.createRenderCellInterface('defaultValue')
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 400,
        isCollapsible: false,
        isResizable: true,
        isMultiline: true,
        onRender: this.createRenderCellInterface('description')
      }
    ];

    this.methodColumns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 250,
        isCollapsible: false,
        isRowHeader: true,
        isResizable: true,
        onRender: this.createRenderCellInterface('name')
      },
      {
        key: 'signature',
        name: 'Signature',
        fieldName: 'signature',
        minWidth: 200,
        maxWidth: 300,
        isCollapsible: false,
        isResizable: true,
        isMultiline: true,
        onRender: this.createRenderCellSignature('typeTokens')
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 400,
        isCollapsible: false,
        isResizable: true,
        isMultiline: true,
        onRender: this.createRenderCellInterface('description')
      }
    ];

    this.enumColumns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 250,
        isCollapsible: false,
        isRowHeader: true,
        isResizable: true,
        onRender: this.createRenderCellEnum('name')
      },
      {
        key: 'value',
        name: 'Value',
        fieldName: 'value',
        minWidth: 100,
        maxWidth: 200,
        isCollapsible: false,
        isResizable: true,
        onRender: this.createRenderCellEnum('value')
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 400,
        isCollapsible: false,
        isResizable: true,
        onRender: this.createRenderCellEnum('description')
      }
    ];
  }

  public renderCell = (text: string) => {
    // When the text is passed to this function, it has had newline characters removed,
    // so this regex will match backtick sequences that span multiple lines.
    const regex = new RegExp('`[^`]*`', 'g');
    let regexResult: RegExpExecArray | null;
    const codeBlocks: { index: number; text: string }[] = [];
    while ((regexResult = regex.exec(text)) !== null) {
      codeBlocks.push({
        index: regexResult.index,
        text: regexResult[0]
      });
    }

    if (codeBlocks.length === 0) {
      return <Text variant="small">{text}</Text>;
    }

    const eltChildren: JSX.Element[] = [];

    let codeIndex = 0;
    let textIndex = 0;
    while (textIndex < text.length && codeIndex < codeBlocks.length) {
      const codeBlock = codeBlocks[codeIndex];
      if (textIndex < codeBlock.index) {
        const str = text.substring(textIndex, codeBlock.index);
        eltChildren.push(<span key={textIndex} dangerouslySetInnerHTML={{ __html: str }} />);
        textIndex += str.length;
      } else {
        eltChildren.push(<code key={textIndex}>{codeBlock.text.substring(1, codeBlock.text.length - 1)}</code>);
        codeIndex++;
        textIndex += codeBlock.text.length;
      }
    }
    if (textIndex < text.length) {
      eltChildren.push(<span key={textIndex} dangerouslySetInnerHTML={{ __html: text.substring(textIndex, text.length) }} />);
    }

    return <Text variant="small">{eltChildren}</Text>;
  };

  public renderCellType = (typeTokens: ILinkToken[]) => {
    // TODO: fix this.
    return this._parseILinkTokens(false, typeTokens);
  };

  public createRenderCellEnum = (propertyName: keyof IEnumProperty) => (item: IEnumProperty) => this.renderCell(item[propertyName]);

  public createRenderCellInterface = (propertyName: 'name' | 'description' | 'defaultValue') => (item: IInterfaceProperty) =>
    this.renderCell(item[propertyName]);

  public createRenderCellType = (propertyName: 'typeTokens') => (item: IInterfaceProperty) => this.renderCellType(item[propertyName]);

  public createRenderCellSignature = (propertyName: 'typeTokens') => (item: IMethod) => this.renderCellType(item[propertyName]);

  public render(): JSX.Element | null {
    const { description, extendsTokens } = this.props;
    const { properties, isEnum, isClass } = this.state;

    return (
      <Stack gap={MEDIUM_GAP_SIZE}>
        {description && description !== '' && (extendsTokens && extendsTokens.length > 0) ? (
          <Stack gap={SMALL_GAP_SIZE}>
            {this._renderTitle()}
            {(description && description !== '') || (extendsTokens && extendsTokens.length > 0) ? (
              <Stack gap={XSMALL_GAP_SIZE}>
                {this._renderDescription()}
                {this._renderExtends()}
              </Stack>
            ) : (
              undefined
            )}
          </Stack>
        ) : (
          this._renderTitle()
        )}
        {isClass ? (
          this._renderClass()
        ) : properties.length >= 1 ? (
          <DetailsList
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            items={properties}
            columns={isEnum ? this.enumColumns : this.defaultColumns}
            onRenderRow={this._onRenderRow}
          />
        ) : (
          undefined
        )}
      </Stack>
    );
  }

  private _renderClass(): JSX.Element | undefined {
    const { properties, methods } = this.state;

    return methods ? (
      <Stack gap={MEDIUM_GAP_SIZE}>
        <Stack gap={SMALL_GAP_SIZE}>
          <Text variant={'medium'}>Members</Text>
          <DetailsList
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            items={properties}
            columns={this.defaultColumns}
            onRenderRow={this._onRenderRow}
          />
        </Stack>
        <Stack gap={SMALL_GAP_SIZE}>
          <Text variant={'medium'}>Methods</Text>
          <DetailsList
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            items={methods}
            columns={this.methodColumns}
            onRenderRow={this._onRenderRow}
          />
        </Stack>
      </Stack>
    ) : (
      <Stack gap={SMALL_GAP_SIZE}>
        <Text variant={'medium'}>Members</Text>
        <DetailsList
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          items={properties}
          columns={this.defaultColumns}
          onRenderRow={this._onRenderRow}
        />
      </Stack>
    );
  }

  private _renderExtends(): JSX.Element | undefined {
    const { extendsTokens } = this.props;

    return this._parseILinkTokens(true, extendsTokens);
  }

  private _renderDescription(): JSX.Element | undefined {
    const { description } = this.props;

    return description && description !== '' ? (
      <Text variant={'medium'}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Text>
    ) : (
      undefined
    );
  }

  private _renderTitle(): JSX.Element | undefined {
    const { title, name } = this.props;

    return title ? (
      <Text variant={'xLarge'}>
        <div dangerouslySetInnerHTML={{ __html: title }} id={name} />
      </Text>
    ) : (
      undefined
    );
  }

  private _onRenderRow(props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element {
    const { item } = props;
    const rowStyles: Partial<IDetailsRowStyles> = {
      root: {
        selectors: {
          ':hover': {
            background: 'transparent'
          }
        }
      },
      isMultiline: {
        wordBreak: 'break-word'
      }
    };

    const deprecatedRowStyles = mergeStyles([
      {
        background: '#ffffcc'
      },
      'DetailsRow-deprecated'
    ]);

    if (item.deprecated === true) {
      const deprecatedStyles: Partial<IDetailsRowStyles> = {
        root: {
          background: '#FFFFCC',
          selectors: {
            ':hover': {
              background: '#FFFFCC'
            }
          }
        }
      };

      return (
        <div className={deprecatedRowStyles}>
          Warning. This API is now obsolete.
          {defaultRender!({
            ...props,
            styles: rowStyles && deprecatedStyles
          })}
        </div>
      );
    }

    return <DetailsRow {...props} styles={rowStyles} />;
  }

  private _parseILinkTokens(extend: boolean, linkTokens?: ILinkToken[]): JSX.Element | undefined {
    if (linkTokens && linkTokens.length > 0) {
      if (extend) {
        return (
          <Text variant={'small'} className="PropertiesTable-extends">
            {'Extends '}
            {linkTokens.map((token: ILinkToken, index: number) => {
              let match: RegExpMatchArray | null = null;
              let hash: string = '/components/';
              if (this._baseUrl !== '') {
                match = this._baseUrl.match(/\/\w+\//);
                if (match !== null) {
                  hash = match[0];
                }
              }
              if (token.pageKind && token.hyperlinkedPage) {
                let href;
                if (token.pageKind === 'References') {
                  href = '#' + hash + token.pageKind.toLowerCase() + '/' + token.hyperlinkedPage.toLowerCase() + '#' + token.text;
                } else {
                  href = '#' + hash + token.hyperlinkedPage.toLowerCase() + '#' + token.text;
                }
                return (
                  <Link href={href} key={token.text + index}>
                    {token.text}
                  </Link>
                );
              } else if (token.text) {
                return token.text;
              } else {
                return undefined;
              }
            })}
          </Text>
        );
      } else {
        return (
          <Text variant={'small'} className="PropertiesTable-extends">
            <code>
              {linkTokens.map((token: ILinkToken, index: number) => {
                let match: RegExpMatchArray | null = null;
                let hash: string = '/components/';
                if (this._baseUrl !== '') {
                  match = this._baseUrl.match(/\/\w+\//);
                  if (match !== null) {
                    hash = match[0];
                  }
                }
                if (token.pageKind && token.hyperlinkedPage) {
                  let href;
                  if (token.pageKind === 'References') {
                    href = '#' + hash + token.pageKind.toLowerCase() + '/' + token.hyperlinkedPage.toLowerCase() + '#' + token.text;
                  } else {
                    href = '#' + hash + token.hyperlinkedPage.toLowerCase() + '#' + token.text;
                  }
                  return (
                    <Link href={href} key={token.text + index}>
                      <code>{token.text}</code>
                    </Link>
                  );
                } else if (token.text) {
                  return <code>{token.text}</code>;
                } else {
                  return undefined;
                }
              })}
            </code>
          </Text>
        );
      }
    }

    return undefined;
  }
}
