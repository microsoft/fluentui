import * as React from 'react';
import { IRenderFunction, getDocument } from 'office-ui-fabric-react/lib/Utilities';
import {
  DetailsList,
  DetailsRow,
  IDetailsRowProps,
  IDetailsRowStyles,
  DetailsListLayoutMode,
  IColumn,
  ColumnActionsMode
} from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { ILinkToken } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { IApiInterfaceProperty, IApiEnumProperty, IMethod } from './ApiReferencesTableSet.types';
import { Markdown } from '../Markdown/index';

export interface IApiReferencesTableProps {
  title?: string;
  properties: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
  renderAsEnum?: boolean;
  renderAsClass?: boolean;
  renderAsTypeAlias?: boolean;
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
  isTypeAlias: boolean;
}

export const XSMALL_GAP_SIZE = 2.5;
export const SMALL_GAP_SIZE = 8;
export const MEDIUM_GAP_SIZE = 16;
export const LARGE_GAP_SIZE = 48;

const DEPRECATED_COLOR = '#FFF1CC';

const backticksRegex = new RegExp('`[^`]*`', 'g');

const referencesTableCell = (text: string | JSX.Element[], deprecated: boolean) => {
  return (
    <>
      {deprecated && (
        <Text
          block
          variant="small"
          styles={{
            root: {
              backgroundColor: DEPRECATED_COLOR,
              padding: 10,
              borderRadius: 2,
              marginBottom: text ? '1em' : undefined
            }
          }}
        >
          Warning: this API is now obsolete.
        </Text>
      )}
      <Text block variant="small">
        {text}
      </Text>
    </>
  );
};

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
        .map((prop: IApiEnumProperty) => ({ ...prop, key: prop.name }));

      this.state = {
        properties,
        isEnum: true,
        isClass: false,
        isTypeAlias: false
      };
    } else if (props.renderAsClass) {
      const members = (props.properties as IApiInterfaceProperty[])
        .sort((a: IApiInterfaceProperty, b: IApiInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IApiInterfaceProperty) => ({ ...prop, key: prop.name }));

      const methods = (props.methods as IMethod[])
        .sort((a: IMethod, b: IMethod) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IMethod) => ({ ...prop, key: prop.name }));

      this.state = {
        properties: members,
        isEnum: false,
        isClass: true,
        isTypeAlias: false,
        methods: methods
      };
    } else {
      const properties = (props.properties as IApiInterfaceProperty[])
        .sort((a: IApiInterfaceProperty, b: IApiInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IApiInterfaceProperty) => ({ ...prop, key: prop.name }));

      this.state = {
        properties,
        isEnum: !!props.renderAsEnum,
        isClass: !!props.renderAsClass,
        isTypeAlias: !!props.renderAsTypeAlias
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
        onRender: this.createRenderCellInterface('name'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellType('typeTokens'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellInterface('defaultValue'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellInterface('description'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellInterface('name'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellSignature('typeTokens'),
        columnActionsMode: ColumnActionsMode.disabled
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
        onRender: this.createRenderCellInterface('description'),
        columnActionsMode: ColumnActionsMode.disabled
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

  public render(): JSX.Element | null {
    const { description, extendsTokens } = this.props;
    const { properties, isEnum, isClass } = this.state;

    return (
      <Stack gap={MEDIUM_GAP_SIZE}>
        <Stack gap={SMALL_GAP_SIZE}>
          {this._renderTitle()}
          {(description || (extendsTokens && extendsTokens.length > 0)) && (
            <Stack gap={XSMALL_GAP_SIZE}>
              {this._renderDescription()}
              {this._renderExtends()}
            </Stack>
          )}
        </Stack>
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

  private renderCell = (text: string, deprecated: boolean = false) => {
    // When the text is passed to this function, it has had newline characters removed,
    // so the regex will match backtick sequences that span multiple lines.
    let regexResult: RegExpExecArray | null;
    const codeBlocks: { index: number; text: string }[] = [];
    while ((regexResult = backticksRegex.exec(text)) !== null) {
      codeBlocks.push({
        index: regexResult.index,
        text: regexResult[0]
      });
    }

    if (codeBlocks.length === 0) {
      return referencesTableCell(text, deprecated);
    }

    const textElements = this._extractCodeBlocks(text, codeBlocks);

    return referencesTableCell(textElements, deprecated);
  };

  private renderCellType = (typeTokens: ILinkToken[]) => {
    return this._parseILinkTokens(false, typeTokens);
  };

  private createRenderCellEnum = (propertyName: keyof IApiEnumProperty) => (item: IApiEnumProperty) => this.renderCell(item[propertyName]);

  private createRenderCellInterface = (propertyName: 'name' | 'description' | 'defaultValue') => (item: IApiInterfaceProperty) =>
    this.renderCell(item[propertyName], propertyName === 'description' && item.deprecated);

  private createRenderCellType = (propertyName: 'typeTokens') => (item: IApiInterfaceProperty) => this.renderCellType(item[propertyName]);

  private createRenderCellSignature = (propertyName: 'typeTokens') => (item: IMethod) => this.renderCellType(item[propertyName]);

  /**
   * Loops through text and places code blocks in code elements
   */
  private _extractCodeBlocks(text: string, codeBlocks: { index: number; text: string }[]): JSX.Element[] {
    const textElements: JSX.Element[] = [];

    let codeIndex = 0;
    let textIndex = 0;
    let key = 0;
    while (textIndex < text.length && codeIndex < codeBlocks.length) {
      const codeBlock = codeBlocks[codeIndex];
      if (textIndex < codeBlock.index) {
        const str = text.substring(textIndex, codeBlock.index);
        textElements.push(<span key={key}>{str}</span>);
        textIndex += str.length;
      } else {
        textElements.push(<code key={key}>{codeBlock.text.substring(1, codeBlock.text.length - 1)}</code>);
        codeIndex++;
        textIndex += codeBlock.text.length;
      }
      key++;
    }
    if (textIndex < text.length) {
      textElements.push(<span key={key}>{text.substring(textIndex, text.length)}</span>);
    }

    return textElements;
  }

  private _renderClass(): JSX.Element | undefined {
    const { properties, methods } = this.state;

    return (
      <Stack gap={MEDIUM_GAP_SIZE}>
        {properties && properties.length > 0 && (
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
        )}
        {methods && methods.length > 0 && (
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
        )}
      </Stack>
    );
  }

  private _renderExtends(): JSX.Element | undefined {
    const { extendsTokens } = this.props;

    return this._parseILinkTokens(true, extendsTokens);
  }

  private _renderDescription(): JSX.Element | undefined {
    const { description } = this.props;

    return description ? <Markdown>{description}</Markdown> : undefined;
  }

  private _renderTitle(): JSX.Element | undefined {
    const { title, name } = this.props;

    return title ? (
      <Text variant="xLarge" as="h3" styles={{ root: { marginTop: 0 } }} id={name}>
        {title}
      </Text>
    ) : (
      undefined
    );
  }

  private _onRenderRow = (props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element => {
    const rowStyles: Partial<IDetailsRowStyles> = {
      root: {
        selectors: {
          ':hover': {
            background: 'none'
          }
        }
      },
      isMultiline: {
        wordBreak: 'break-word'
      }
    };

    return <DetailsRow {...props} styles={rowStyles} />;
  };

  private _parseILinkTokens(extend: boolean, linkTokens?: ILinkToken[]): JSX.Element | undefined {
    const { isTypeAlias } = this.state;

    if (linkTokens && linkTokens.length > 0) {
      if (isTypeAlias) {
        return (
          <Text variant={'medium'}>
            <code>{this._parseILinkTokensHelper(linkTokens, false)}</code>
          </Text>
        );
      } else if (extend) {
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

  private _parseILinkTokensHelper = (linkTokens: ILinkToken[], extend: boolean): JSX.Element | undefined => {
    return (
      <>
        {linkTokens.map((token: ILinkToken, index: number) => {
          let hash: string = '/controls/web/';
          // get hash to set correct href value on the links for the local site vs. the Fabric site

          const split = this._baseUrl.split('#');
          const cleanedSplit = split.filter(value => !!value);
          if (cleanedSplit && cleanedSplit.length > 1) {
            // handle /references/referenceName structure
            if (cleanedSplit[1].indexOf('/references/') !== -1) {
              const indexOfReferenceName = cleanedSplit[1].lastIndexOf('/');
              const indexOfReferences = cleanedSplit[1].lastIndexOf('/', indexOfReferenceName - 1);
              hash = cleanedSplit[1].substring(0, indexOfReferences + 1);
            } else {
              const indexOfPageName = cleanedSplit[1].lastIndexOf('/');
              hash = cleanedSplit[1].substring(0, indexOfPageName + 1);
            }
          }
          if (token.pageKind && token.hyperlinkedPage) {
            let href;

            // whether the link should be opened in a new tab, defaults to true
            let newTab = true;

            if (token.pageKind === 'References') {
              const referencePage = hash + token.pageKind.toLowerCase() + '/' + token.hyperlinkedPage.toLowerCase();
              href = '#' + referencePage + '#' + token.text;
              if (cleanedSplit.length > 1) {
                if (cleanedSplit[1] === referencePage) {
                  newTab = false;
                }
              }
            } else {
              const componentPage = hash + token.hyperlinkedPage.toLowerCase();
              href = '#' + componentPage + '#' + token.text;
              if (cleanedSplit.length > 1) {
                if (cleanedSplit[1] === componentPage) {
                  newTab = false;
                }
              }
            }

            return (
              <Link href={href} key={token.text + index} target={newTab ? '_blank' : undefined}>
                {extend ? token.text : <code>{token.text}</code>}
              </Link>
            );
          } else if (token.text) {
            return extend ? token.text : <code key={token.text + index}>{token.text}</code>;
          } else {
            return undefined;
          }
        })}
      </>
    );
  };
}
