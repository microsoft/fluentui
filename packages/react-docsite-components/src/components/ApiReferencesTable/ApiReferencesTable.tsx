import * as React from 'react';
import { mergeStyles, getTheme } from '@fluentui/react/lib/Styling';
import {
  DetailsList,
  DetailsRow,
  IDetailsRowProps,
  IDetailsRowStyles,
  DetailsListLayoutMode,
  IColumn,
  ColumnActionsMode,
} from '@fluentui/react/lib/DetailsList';
import { Link } from '@fluentui/react/lib/Link';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text, ITextStyles } from '@fluentui/react/lib/Text';
import { ILinkToken } from '@fluentui/react/lib/common/DocPage.types';
import { useConst } from '@fluentui/react-hooks';
import {
  IApiInterfaceProperty,
  IApiEnumProperty,
  IMethod,
  IApiReferencesTableProps,
} from './ApiReferencesTableSet.types';
import { Markdown } from '../Markdown/index';
import { codeFontFamily } from '../CodeSnippet/CodeSnippet.styles';
import { titleCase } from '../../utilities/string';

export type IApiReferencesTableState = {};

/** @internal */
type IApiDetailsListProps = (IApiEnumDetailsListProps | IApiPropertyDetailsListProps | IApiMethodDetailsListProps) & {
  ariaLabel?: string;
  tokenResolver: IApiReferencesTableProps['tokenResolver'];
};
/** Do not use directly */
interface IApiEnumDetailsListProps {
  itemKind: 'enum';
  items: IApiEnumProperty[];
}
/** Do not use directly */
interface IApiPropertyDetailsListProps {
  itemKind: 'property';
  items: IApiInterfaceProperty[];
}
/** Do not use directly */
interface IApiMethodDetailsListProps {
  itemKind: 'method';
  items: IMethod[];
}

/** @internal */
export const gapTokens = {
  xsmall: { childrenGap: 2.5 },
  small: { childrenGap: 8 },
  medium: { childrenGap: 16 },
  large: { childrenGap: 48 },
};

const DEPRECATED_COLOR = '#FFF1CC';
const deprecatedTextStyles: Partial<ITextStyles> = {
  root: {
    backgroundColor: DEPRECATED_COLOR,
    padding: 10,
    borderRadius: 2,
  },
};

const theme = getTheme();
const rootClass = mergeStyles({
  selectors: {
    // Switch code blocks to a nicer font family and smaller size (monospace fonts tend to be large)
    code: { fontFamily: codeFontFamily, fontSize: '11px' },
    // Fix margins around Members/Methods h4 and control font size
    h4: { margin: '16px 0 -8px 0', fontSize: '16px' },
  },
});

export class ApiReferencesTable extends React.Component<IApiReferencesTableProps, IApiReferencesTableState> {
  public static defaultProps: Partial<IApiReferencesTableProps> = {
    title: 'Properties',
  };

  private _isEnum: boolean;
  private _isClass: boolean;
  private _isTypeAlias: boolean;

  constructor(props: IApiReferencesTableProps) {
    super(props);

    const { renderAs } = props;
    this._isEnum = !!(renderAs === 'enum' || props.renderAsEnum);
    this._isClass = !!(renderAs === 'class' || props.renderAsClass);
    this._isTypeAlias = !!(renderAs === 'typeAlias' || props.renderAsTypeAlias);
  }

  public render(): JSX.Element | null {
    const { extendsTokens, deprecated, deprecatedMessage, tokenResolver, properties, methods } = this.props;

    const hasProperties = properties.length > 0;
    const hasMethods = methods && methods.length > 0;
    const hasExtendsTokens = extendsTokens && extendsTokens.length > 0;

    const description =
      (this.props.description || '').trim() ||
      // If this is an empty table with no description, add something basic to make clear that
      // the empty heading is intentional
      (!this._isTypeAlias && !hasProperties && !hasMethods ? '(No properties)' : undefined);

    return (
      <Stack className={rootClass} tokens={gapTokens.medium}>
        <Stack tokens={gapTokens.small}>
          {this._renderTitle()}
          {deprecated && _renderDeprecatedMessage(deprecatedMessage)}
          {(description || hasExtendsTokens) && (
            <Stack tokens={gapTokens.xsmall}>
              {description && <Markdown>{description}</Markdown>}
              {hasExtendsTokens && (
                <Text variant="small">Extends &nbsp;{_renderLinkTokens(tokenResolver, extendsTokens!)}</Text>
              )}
            </Stack>
          )}
        </Stack>
        {(hasMethods || hasProperties) && this._renderTables()}
      </Stack>
    );
  }

  private _renderTables(): JSX.Element | undefined {
    const { properties, methods, tokenResolver, title } = this.props;

    if (this._isClass) {
      // Render class members and methods tables
      return (
        <Stack tokens={gapTokens.medium}>
          {properties.length > 0 && (
            <Stack tokens={gapTokens.small}>
              <h4>Members</h4>
              <ApiDetailsList
                ariaLabel={`${title} Members`}
                itemKind="property"
                items={properties as IApiInterfaceProperty[]}
                tokenResolver={tokenResolver}
              />
            </Stack>
          )}
          {methods && methods.length > 0 && (
            <Stack tokens={gapTokens.small}>
              <h4>Methods</h4>
              <ApiDetailsList
                ariaLabel={`${title} Methods`}
                itemKind="method"
                items={methods!}
                tokenResolver={tokenResolver}
              />
            </Stack>
          )}
        </Stack>
      );
    }

    // Render enum or interface property tables
    // (the calling method already verified that at least one property is defined)
    return this._isEnum ? (
      <ApiDetailsList
        ariaLabel={title}
        itemKind="enum"
        items={properties as IApiEnumProperty[]}
        tokenResolver={tokenResolver}
      />
    ) : (
      <ApiDetailsList
        ariaLabel={title}
        itemKind="property"
        items={properties as IApiInterfaceProperty[]}
        tokenResolver={tokenResolver}
      />
    );
  }

  private _renderTitle(): JSX.Element | undefined {
    const { title, name } = this.props;

    return title ? (
      // This heading must be programmatically focusable for simulating jumping to an anchor
      <Text variant="xLarge" as="h3" styles={{ root: { marginTop: 0 } }} id={name} tabIndex={-1}>
        {title}
      </Text>
    ) : undefined;
  }
}

/**
 * Memoized DetailsList wrapper handling scenarios specific to API reference tables.
 */
const ApiDetailsList: React.FunctionComponent<IApiDetailsListProps> = React.memo(props => {
  // Alphabetize the items and add a key to each one.
  const { itemKind, items, ariaLabel } = props;
  const processedItems: IApiEnumProperty[] | IApiInterfaceProperty[] | IMethod[] = useConst(() => {
    if (itemKind === 'enum') {
      return (items as IApiEnumProperty[])
        .sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))
        .map(item => ({ ...item, key: item.name }));
    }
    return (items as IApiInterfaceProperty[] | IMethod[])
      .sort((a, b) => {
        // Ensure anything required comes first if handling props.
        if (itemKind === 'property' && !!a.required !== !!b.required) {
          return a.required ? -1 : 1;
        }
        // Ensure the constructor is first if handling methods.
        if (itemKind === 'method' && a.name === 'constructor') {
          return -1;
        }
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
      .map(item => ({ ...item, key: item.name }));
  });

  const columns = useConst(() => _getColumns(props));

  return (
    <DetailsList
      items={processedItems}
      ariaLabelForGrid={ariaLabel}
      columns={columns}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderRow={_onRenderRow}
      onShouldVirtualize={_returnFalse}
    />
  );
});

const _returnFalse = () => false;

const rowStyles: Partial<IDetailsRowStyles> = {
  root: {
    color: theme.semanticColors.bodyText,
    selectors: {
      ':hover': {
        background: 'none',
        color: theme.semanticColors.bodyText,
      },
    },
  },
  isMultiline: { wordBreak: 'break-word' },
};
function _onRenderRow(props: IDetailsRowProps) {
  return <DetailsRow {...props} styles={rowStyles} />;
}

/** Field names used in the API list (used in generating columns and renderers) */
type ApiListFieldName = 'name' | 'value' | 'type' | 'defaultValue' | 'description' | 'signature';

/** Map from field name to min and max widths (used in generating columns) */
const columnWidths: { [K in ApiListFieldName]: [number, number] } = {
  name: [150, 250],
  value: [100, 200],
  type: [130, 150],
  defaultValue: [130, 150],
  description: [300, 400],
  signature: [200, 300],
};

/** Map from item kind to list of column names (used in generating columns) */
const columnNames: { [K in IApiDetailsListProps['itemKind']]: ApiListFieldName[] } = {
  enum: ['name', 'value', 'description'],
  method: ['name', 'signature', 'description'],
  property: ['name', 'type', 'defaultValue', 'description'],
};

function _getColumns(props: IApiDetailsListProps): IColumn[] {
  const { itemKind, tokenResolver } = props;
  return columnNames[itemKind].map((fieldName: ApiListFieldName): IColumn => {
    const [minWidth, maxWidth] = columnWidths[fieldName];

    return {
      name: fieldName === 'defaultValue' ? 'Default value' : titleCase(fieldName),
      fieldName,
      key: fieldName,
      minWidth,
      maxWidth,
      isCollapsible: false,
      isResizable: true,
      isMultiline: fieldName !== 'name' && fieldName !== 'value',
      isRowHeader: fieldName === 'name',
      columnActionsMode: ColumnActionsMode.disabled,
      onRender: (item: IApiInterfaceProperty | IApiEnumProperty | IMethod) => {
        if (fieldName === 'type' || fieldName === 'signature') {
          const typeTokens = (item as IMethod | IApiInterfaceProperty).typeTokens;
          if (typeTokens && typeTokens.length > 0) {
            return <Text variant="small">{_renderLinkTokens(tokenResolver, typeTokens)}</Text>;
          }
          return undefined;
        }
        return _renderCell(item, fieldName);
      },
    };
  });
}

function _renderCell(
  item: IApiInterfaceProperty | IApiEnumProperty | IMethod,
  property: 'name' | 'description' | 'defaultValue' | 'value',
) {
  let text = (item as any)[property] || ''; // eslint-disable-line @typescript-eslint/no-explicit-any
  // Format property names and defaults as code for easier reading
  if (property !== 'description' && text.indexOf('`') === -1) {
    text = '`' + text + '`';
  }

  // For description only, render a message if the property is deprecated.
  if (property === 'description') {
    return _referencesTableCell(text, { deprecated: item.deprecated, deprecatedMessage: item.deprecatedMessage });
  }
  if (property === 'name' && (item as IApiInterfaceProperty).required) {
    return _referencesTableCell(text, { required: true });
  }
  return _referencesTableCell(text);
}

function _referencesTableCell(
  text: string,
  options: Pick<IApiInterfaceProperty, 'deprecated' | 'deprecatedMessage' | 'required'> = {},
) {
  const { deprecated, deprecatedMessage, required } = options;
  return (
    <>
      {deprecated && _renderDeprecatedMessage(deprecatedMessage)}
      <Text block variant="small" style={{ marginTop: deprecated ? '1em' : undefined }}>
        {_extractCodeBlocks(text)}
        {required && <em> (required)</em>}
      </Text>
    </>
  );
}

function _renderDeprecatedMessage(deprecatedMessage?: string) {
  deprecatedMessage = (deprecatedMessage || '').trim();
  if (deprecatedMessage) {
    // Ensure the message is formatted as a sentence
    deprecatedMessage = deprecatedMessage[0].toUpperCase() + deprecatedMessage.slice(1);
    if (deprecatedMessage.slice(-1)[0] !== '.') {
      deprecatedMessage += '.';
    }
  }
  return (
    <Text block variant="small" styles={deprecatedTextStyles}>
      Warning: this API is now obsolete. {deprecatedMessage && _extractCodeBlocks(deprecatedMessage)}
    </Text>
  );
}

/**
 * Convert from a list of tokens to a list of actual links and code segments.
 */
function _renderLinkTokens(
  tokenResolver: IApiReferencesTableProps['tokenResolver'],
  linkTokens: ILinkToken[],
): React.ReactNode[] {
  return linkTokens.map((token: ILinkToken, index: number) => {
    if (token.text) {
      const key = token.text + index;

      if (token.linkedPage && token.linkedPageGroup) {
        return (
          <Link key={key} {...tokenResolver(token as Required<ILinkToken>)} underline>
            <code>{token.text}</code>
          </Link>
        );
      }
      return <code key={key}>{token.text}</code>;
    }
    return undefined;
  });
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
