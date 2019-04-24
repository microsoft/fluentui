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
import { IApiInterfaceProperty, IApiEnumProperty, ILinkToken, IMethod } from './ApiReferencesTableSet.types';

export interface IApiReferencesTableProps {
  title?: string;
  properties: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
  renderAsEnum?: boolean;
  renderAsClass?: boolean;
  key?: string;
  name?: string;
  description?: string;
  extendsTokens?: ILinkToken[];
}

export interface IApiReferencesTableState {
  properties: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
  isEnum: boolean;
  isClass: boolean;
}

export const XSMALL_GAP_SIZE = 2.5;
export const SMALL_GAP_SIZE = 8;
export const MEDIUM_GAP_SIZE = 16;
export const LARGE_GAP_SIZE = 48;

export class ApiReferencesTable extends React.Component<IApiReferencesTableProps, IApiReferencesTableState> {
  public static defaultProps: Partial<IApiReferencesTableProps> = {
    title: 'Properties'
  };

  private _baseUrl: string;
  private _defaultColumns: IColumn[];
  private _methodColumns: IColumn[];
  private _enumColumns: IColumn[];

  constructor(props: IApiReferencesTableProps) {
    super(props);

    if (props.renderAsEnum) {
      const properties = (props.properties as IApiEnumProperty[])
        .sort((a: IApiEnumProperty, b: IApiEnumProperty) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))
        .map((prop: IApiEnumProperty, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties,
        isEnum: true,
        isClass: false
      };
    } else if (props.renderAsClass) {
      const members = (props.properties as IApiInterfaceProperty[])
        .sort((a: IApiInterfaceProperty, b: IApiInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IApiInterfaceProperty, index: number) => assign({}, prop, { key: index }));

      const methods = (props.methods as IMethod[])
        .sort((a: IMethod, b: IMethod) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IMethod, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties: members,
        isEnum: false,
        isClass: true,
        methods: methods
      };
    } else {
      const properties = (props.properties as IApiInterfaceProperty[])
        .sort((a: IApiInterfaceProperty, b: IApiInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IApiInterfaceProperty, index: number) => assign({}, prop, { key: index }));

      this.state = {
        properties,
        isEnum: !!props.renderAsEnum,
        isClass: !!props.renderAsClass
      };
    }

    const doc = getDocument();
    this._baseUrl = doc ? document.location.href : '';

    this._defaultColumns = [
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

    this._methodColumns = [
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

    this._enumColumns = [
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

  public renderCell = (text: string, deprecated: boolean = false) => {
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
      return (
        <>
          {deprecated ? (
            <>
              <Text block variant="small">
                Warning: this API is now obsolete.
              </Text>
              <br />
            </>
          ) : (
            undefined
          )}
          <Text block variant="small">
            {text}
          </Text>
        </>
      );
    }

    const eltChildren = this._extractCodeBlocks(text, codeBlocks);

    return (
      <>
        {deprecated ? (
          <>
            <Text block variant="small">
              Warning: this API is now obsolete.
            </Text>
            <br />
          </>
        ) : (
          undefined
        )}
        <Text block variant="small">
          {eltChildren}
        </Text>
      </>
    );
  };

  public renderCellType = (typeTokens: ILinkToken[]) => {
    return this._parseILinkTokens(false, typeTokens);
  };

  public createRenderCellEnum = (propertyName: keyof IApiEnumProperty) => (item: IApiEnumProperty) => this.renderCell(item[propertyName]);

  public createRenderCellInterface = (propertyName: 'name' | 'description' | 'defaultValue') => (item: IApiInterfaceProperty) =>
    this.renderCell(item[propertyName], propertyName === 'description' && item.deprecated);

  public createRenderCellType = (propertyName: 'typeTokens') => (item: IApiInterfaceProperty) => this.renderCellType(item[propertyName]);

  public createRenderCellSignature = (propertyName: 'typeTokens') => (item: IMethod) => this.renderCellType(item[propertyName]);

  public render(): JSX.Element | null {
    const { description, extendsTokens } = this.props;
    const { properties, isEnum, isClass } = this.state;

    return (
      <Stack gap={MEDIUM_GAP_SIZE}>
        {description && extendsTokens && extendsTokens.length > 0 ? (
          <Stack gap={SMALL_GAP_SIZE}>
            {this._renderTitle()}
            {(description || (extendsTokens && extendsTokens.length > 0)) && (
              <Stack gap={XSMALL_GAP_SIZE}>
                {this._renderDescription()}
                {this._renderExtends()}
              </Stack>
            )}
          </Stack>
        ) : (
          this._renderTitle()
        )}
        {isClass
          ? this._renderClass()
          : properties.length >= 1 && (
              <DetailsList
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                items={properties}
                columns={isEnum ? this._enumColumns : this._defaultColumns}
                onRenderRow={this._onRenderRow}
              />
            )}
      </Stack>
    );
  }

  private _extractCodeBlocks(text: string, codeBlocks: { index: number; text: string }[]): JSX.Element[] {
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

    return eltChildren;
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
            columns={this._defaultColumns}
            onRenderRow={this._onRenderRow}
          />
        </Stack>
        <Stack gap={SMALL_GAP_SIZE}>
          <Text variant={'medium'}>Methods</Text>
          <DetailsList
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            items={methods}
            columns={this._methodColumns}
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
          columns={this._defaultColumns}
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

    return description ? <Text variant={'medium'}>{description}</Text> : undefined;
  }

  private _renderTitle(): JSX.Element | undefined {
    const { title, name } = this.props;

    return title ? (
      <Text variant={'xLarge'} id={name}>
        {title}
      </Text>
    ) : (
      undefined
    );
  }

  private _onRenderRow = (props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element => {
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

    if (item.deprecated === true) {
      const deprecatedStyles: Partial<IDetailsRowStyles> = {
        root: {
          background: '#FFF1CC',
          selectors: {
            ':hover': {
              background: '#FFF1CC'
            }
          }
        }
      };

      return <DetailsRow {...props} styles={rowStyles && deprecatedStyles} />;
    }

    return <DetailsRow {...props} styles={rowStyles} />;
  };

  private _parseILinkTokens(extend: boolean, linkTokens?: ILinkToken[]): JSX.Element | undefined {
    if (linkTokens && linkTokens.length > 0) {
      if (extend) {
        return (
          <Text variant={'small'}>
            {'Extends '}
            {this._parseILinkTokensHelper(linkTokens, true)}
          </Text>
        );
      } else {
        return (
          <Text variant={'small'}>
            <code>{this._parseILinkTokensHelper(linkTokens, false)}</code>
          </Text>
        );
      }
    }

    return undefined;
  }

  private _parseILinkTokensHelper(linkTokens: ILinkToken[], extend: boolean): JSX.Element | undefined {
    return (
      <>
        {linkTokens.map((token: ILinkToken, index: number) => {
          let match: RegExpMatchArray | null = null;
          let hash: string = '/components/';
          // get hash to set correct href value on the links for the local site vs. the Fabric site
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
                {extend ? token.text : <code>{token.text}</code>}
              </Link>
            );
          } else if (token.text) {
            return extend ? token.text : <code>{token.text}</code>;
          } else {
            return undefined;
          }
        })}
      </>
    );
  }
}
