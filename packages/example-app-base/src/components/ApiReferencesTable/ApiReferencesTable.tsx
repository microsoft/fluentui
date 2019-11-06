import * as React from 'react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';
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
import { IApiInterfaceProperty, IApiEnumProperty, IMethod, IApiReferencesTableProps } from './ApiReferencesTableSet.types';
import { Markdown } from '../Markdown/index';
import { getCurrentUrl } from '../../utilities/getCurrentUrl';
import { codeFontFamily } from '../CodeSnippet/CodeSnippet.styles';

// TODO: remove
export { IApiReferencesTableProps };
export type IApiReferencesTableState = {};

export const XSMALL_GAP_SIZE = 2.5;
export const SMALL_GAP_SIZE = 8;
export const MEDIUM_GAP_SIZE = 16;
export const LARGE_GAP_SIZE = 48;

const DEPRECATED_COLOR = '#FFF1CC';
const rootClass = mergeStyles({
  selectors: {
    // Switch code blocks to a nicer font family and smaller size (monospace fonts tend to be large)
    code: { fontFamily: codeFontFamily, fontSize: '11px' }
  }
});
const theme = getTheme();
const rowStyles: Partial<IDetailsRowStyles> = {
  root: {
    color: theme.semanticColors.bodyText,
    selectors: {
      ':hover': {
        background: 'none',
        color: theme.semanticColors.bodyText
      }
    }
  },
  isMultiline: {
    wordBreak: 'break-word'
  }
};

const renderDeprecatedMessage = (deprecated?: boolean, deprecatedMessage?: string) => {
  deprecatedMessage = (deprecatedMessage || '').trim();
  if (deprecatedMessage) {
    // Ensure the messsage is formatted as a sentence
    deprecatedMessage = deprecatedMessage[0].toUpperCase() + deprecatedMessage.slice(1);
    if (deprecatedMessage.slice(-1)[0] !== '.') {
      deprecatedMessage += '.';
    }
  }
  return deprecated ? (
    <Text
      block
      variant="small"
      styles={{
        root: {
          backgroundColor: DEPRECATED_COLOR,
          padding: 10,
          borderRadius: 2
        }
      }}
    >
      Warning: this API is now obsolete. {deprecatedMessage && _extractCodeBlocks(deprecatedMessage)}
    </Text>
  ) : (
    undefined
  );
};

const referencesTableCell = (text: string, deprecated?: boolean, deprecatedMessage?: string) => {
  return (
    <>
      {deprecated && renderDeprecatedMessage(deprecated, deprecatedMessage)}
      <Text block variant="small" style={{ marginTop: deprecated ? '1em' : undefined }}>
        {_extractCodeBlocks(text)}
      </Text>
    </>
  );
};

export class ApiReferencesTable extends React.Component<IApiReferencesTableProps, IApiReferencesTableState> {
  public static defaultProps: Partial<IApiReferencesTableProps> = {
    title: 'Properties'
  };

  private _baseUrl: string;
  private _propertyColumns: IColumn[];
  private _methodColumns: IColumn[];
  private _properties: IApiInterfaceProperty[] | IApiEnumProperty[];
  private _methods: IMethod[] | undefined;
  private _isEnum: boolean = false;
  private _isClass: boolean = false;
  private _isTypeAlias: boolean = false;

  constructor(props: IApiReferencesTableProps) {
    super(props);

    const { properties, methods, renderAs } = props;

    if (renderAs === 'enum' || props.renderAsEnum) {
      this._properties = (properties as IApiEnumProperty[])
        .sort((a: IApiEnumProperty, b: IApiEnumProperty) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))
        .map((prop: IApiEnumProperty) => ({ ...prop, key: prop.name }));

      this._isEnum = true;
    } else {
      this._properties = (properties as IApiInterfaceProperty[])
        .sort((a: IApiInterfaceProperty, b: IApiInterfaceProperty) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        .map((prop: IApiInterfaceProperty) => ({ ...prop, key: prop.name }));

      this._isClass = !!(renderAs === 'class' || props.renderAsClass);
      this._isTypeAlias = !!(renderAs === 'typeAlias' || props.renderAsTypeAlias);

      if (this._isClass) {
        // Ensure the constructor is first
        this._methods = methods!
          .sort((a: IMethod, b: IMethod) => (a.name < b.name || a.name === 'constructor' ? -1 : a.name > b.name ? 1 : 0))
          .map((prop: IMethod) => ({ ...prop, key: prop.name }));
      }
    }

    this._baseUrl = getCurrentUrl();

    this._propertyColumns = [
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
      ...(this._isEnum
        ? [
            {
              key: 'value',
              name: 'Value',
              fieldName: 'value',
              minWidth: 100,
              maxWidth: 200,
              isCollapsible: false,
              isResizable: true,
              onRender: this.createRenderCellEnum('value'),
              columnActionsMode: ColumnActionsMode.disabled
            }
          ]
        : [
            {
              key: 'type',
              name: 'Type',
              fieldName: 'type',
              minWidth: 130,
              maxWidth: 150,
              isCollapsible: false,
              isResizable: true,
              isMultiline: true,
              onRender: this.createRenderCellType(),
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
            }
          ]),
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
        onRender: this.createRenderCellType(),
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
  }

  public render(): JSX.Element | null {
    const { extendsTokens, deprecated, deprecatedMessage } = this.props;
    const hasProperties = this._properties.length > 0;
    const hasMethods = this._methods && this._methods.length > 0;
    const description =
      (this.props.description || '').trim() ||
      // If this is an empty table with no description, add something basic to make clear that
      // the empty heading is intentional
      (!this._isTypeAlias && !hasProperties && !hasMethods ? '(No properties)' : undefined);

    return (
      <Stack className={rootClass} tokens={{ childrenGap: MEDIUM_GAP_SIZE }}>
        <Stack tokens={{ childrenGap: SMALL_GAP_SIZE }}>
          {this._renderTitle()}
          {renderDeprecatedMessage(deprecated, deprecatedMessage)}
          {(description || (extendsTokens && extendsTokens.length > 0)) && (
            <Stack tokens={{ childrenGap: XSMALL_GAP_SIZE }}>
              {description && <Markdown>{description}</Markdown>}
              {extendsTokens && this._parseILinkTokens(true, extendsTokens)}
            </Stack>
          )}
        </Stack>
        {this._isClass ? (
          this._renderClass()
        ) : hasProperties ? (
          <DetailsList
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            items={this._properties}
            columns={this._propertyColumns}
            onRenderRow={this._onRenderRow}
            onShouldVirtualize={this._onShouldVirtualize}
          />
        ) : (
          undefined
        )}
      </Stack>
    );
  }

  private renderCell = (
    item: IApiInterfaceProperty | IApiEnumProperty | IMethod,
    property: 'name' | 'description' | 'defaultValue' | 'value'
  ) => {
    let text = (item as any)[property] || ''; // tslint:disable-line:no-any
    // Format property names and defaults as code for easier reading
    if (property !== 'description' && text.indexOf('`') === -1) {
      text = '`' + text + '`';
    }

    // For description only, render a message if the property is deprecated.
    if (property === 'description') {
      return referencesTableCell(text, item.deprecated, item.deprecatedMessage);
    }
    return referencesTableCell(text);
  };

  private createRenderCellEnum = (propertyName: 'name' | 'description' | 'value') => (item: IApiEnumProperty) =>
    this.renderCell(item, propertyName);

  private createRenderCellInterface = (propertyName: 'name' | 'description' | 'defaultValue') => (item: IApiInterfaceProperty) =>
    this.renderCell(item, propertyName);

  private createRenderCellType = () => (item: IApiInterfaceProperty | IMethod) => this._parseILinkTokens(false, item.typeTokens);

  private _onShouldVirtualize = (): boolean => {
    return false;
  };

  private _renderClass(): JSX.Element | undefined {
    return (
      <Stack tokens={{ childrenGap: MEDIUM_GAP_SIZE }}>
        {this._properties.length > 0 && (
          <Stack tokens={{ childrenGap: SMALL_GAP_SIZE }}>
            <Text variant={'medium'}>Members</Text>
            <DetailsList
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              items={this._properties}
              columns={this._propertyColumns}
              onRenderRow={this._onRenderRow}
              onShouldVirtualize={this._onShouldVirtualize}
            />
          </Stack>
        )}
        {this._methods && this._methods.length > 0 && (
          <Stack tokens={{ childrenGap: SMALL_GAP_SIZE }}>
            <Text variant={'medium'}>Methods</Text>
            <DetailsList
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              items={this._methods}
              columns={this._methodColumns}
              onRenderRow={this._onRenderRow}
              onShouldVirtualize={this._onShouldVirtualize}
            />
          </Stack>
        )}
      </Stack>
    );
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
    return <DetailsRow {...props} styles={rowStyles} />;
  };

  private _parseILinkTokens(extend: boolean, linkTokens?: ILinkToken[]): JSX.Element | undefined {
    if (linkTokens && linkTokens.length > 0) {
      if (this._isTypeAlias) {
        return (
          <Text variant={'medium'}>
            <code>{this._parseILinkTokensHelper(linkTokens)}</code>
          </Text>
        );
      } else if (extend) {
        return <Text variant={'small'}>Extends {this._parseILinkTokensHelper(linkTokens)}</Text>;
      } else {
        return (
          <Text variant={'small'}>
            <code>{this._parseILinkTokensHelper(linkTokens)}</code>
          </Text>
        );
      }
    }

    return undefined;
  }

  private _parseILinkTokensHelper = (linkTokens: ILinkToken[]): JSX.Element | undefined => {
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
              if (cleanedSplit.length > 1 && cleanedSplit[1] === referencePage) {
                newTab = false;
              }
            } else {
              const componentPage = hash + token.hyperlinkedPage.toLowerCase();
              href = '#' + componentPage + '#' + token.text;
              if (cleanedSplit.length > 1 && cleanedSplit[1] === componentPage) {
                newTab = false;
              }
            }

            return (
              <Link href={href} key={token.text + index} target={newTab ? '_blank' : undefined}>
                <code>{token.text}</code>
              </Link>
            );
          } else if (token.text) {
            return <code key={token.text + index}>{token.text}</code>;
          } else {
            return undefined;
          }
        })}
      </>
    );
  };
}

/**
 * Loops through text and places code blocks in code elements
 */
function _extractCodeBlocks(text: string): React.ReactNode[] {
  // Unescape some characters
  text = (text || '').replace(/\\([@<>{}])/g, '$1');

  const result: React.ReactNode[] = [];
  let index = 0;
  let inCodeBlock = false;
  while (index < text.length) {
    let sectionEnd = text.indexOf('`', index);
    if (sectionEnd === -1) {
      sectionEnd = text.length;
    }
    const sectionContent = text.substring(index, sectionEnd);
    if (inCodeBlock) {
      result.push(<code key={index}>{sectionContent}</code>);
    } else {
      result.push(sectionContent);
    }
    inCodeBlock = !inCodeBlock;
    index = sectionEnd + 1;
  }
  return result;
}
