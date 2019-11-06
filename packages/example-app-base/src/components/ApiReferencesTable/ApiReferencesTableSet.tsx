import * as React from 'react';
import { ActionButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { ApiReferencesTable, MEDIUM_GAP_SIZE, LARGE_GAP_SIZE } from './ApiReferencesTable';
import { IApiReferencesTableProps, IApiInterfaceProperty, IMethod, IApiReferencesTableSetProps } from './ApiReferencesTableSet.types';
import { IEnumTableRowJson, ITableRowJson, ITableJson } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { extractAnchorLink } from '../../utilities/extractAnchorLink';
import { jumpToAnchor } from '../../utilities/index2';

export interface IApiReferencesTableSetState {
  showSeeMore: boolean;
}

const TITLE_LINE_HEIGHT = 31.5;

export class ApiReferencesTableSet extends React.Component<IApiReferencesTableSetProps, IApiReferencesTableSetState> {
  public static defaultProps: Partial<IApiReferencesTableSetProps> = {
    jumpToAnchors: true
  };

  private _tableProps: IApiReferencesTableProps[];

  constructor(props: IApiReferencesTableSetProps) {
    super(props);

    this.state = {
      showSeeMore: false
    };

    this._tableProps = this._generateTableProps();
  }

  public render(): JSX.Element {
    const { className } = this.props;
    return (
      <Stack tokens={{ childrenGap: LARGE_GAP_SIZE }} className={className}>
        {this._renderFirst()}
        {this._renderEach()}
      </Stack>
    );
  }

  public componentDidMount(): void {
    window.addEventListener('hashchange', this._onHashChange);

    const anchor = extractAnchorLink(window.location.hash);

    if (anchor && !this.state.showSeeMore) {
      const section = this._tableProps.filter(x => x.name === anchor)[0];
      if (section) {
        this.setState({
          showSeeMore: true
        });
      }
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener('hashchange', this._onHashChange);
  }

  public componentDidUpdate(prevProps: IApiReferencesTableSetProps, prevState: IApiReferencesTableSetState): void {
    if (prevState.showSeeMore === false && this.state.showSeeMore === true && this.props.jumpToAnchors) {
      jumpToAnchor(undefined, TITLE_LINE_HEIGHT);
    }
  }

  private _renderFirst(): JSX.Element | undefined {
    if (this._tableProps.length >= 1) {
      const item = this._tableProps[0];
      return <ApiReferencesTable {...item} />;
    }
    return undefined;
  }

  private _renderEach(): JSX.Element | undefined {
    const seeMoreButtonStyles: Partial<IButtonStyles> = {
      root: { paddingLeft: '0px' },
      textContainer: { paddingLeft: '4px' }
    };

    if (this._tableProps.length > 1) {
      return (
        <Stack tokens={{ childrenGap: MEDIUM_GAP_SIZE }}>
          <ActionButton
            iconProps={{ iconName: this.state.showSeeMore ? 'SkypeCircleMinus' : 'CirclePlus' }}
            onClick={this._onClickSeeMore}
            onRenderText={this._onRenderText}
            styles={seeMoreButtonStyles}
          >
            See More
          </ActionButton>
          {this.state.showSeeMore && (
            <Stack tokens={{ childrenGap: LARGE_GAP_SIZE }}>
              {this._tableProps.map((item: IApiReferencesTableProps, index: number) =>
                index !== 0 ? <ApiReferencesTable key={item.name} {...item} /> : undefined
              )}
            </Stack>
          )}
        </Stack>
      );
    }
    return undefined;
  }

  private _onHashChange = (): void => {
    const { showSeeMore } = this.state;

    const anchor = extractAnchorLink(window.location.hash);
    if (anchor) {
      this.props.jumpToAnchors && jumpToAnchor(anchor, TITLE_LINE_HEIGHT);

      if (!showSeeMore) {
        const section = this._tableProps.filter(x => x.name === anchor)[0];
        if (section) {
          this.setState({
            showSeeMore: true
          });
        }
      }
    }
  };

  private _onRenderText(): JSX.Element {
    return <Text variant="xLarge">See more</Text>;
  }

  private _onClickSeeMore = (): void => {
    this.setState({
      showSeeMore: !this.state.showSeeMore
    });
  };

  private _generateTableProps(): Array<IApiReferencesTableProps> {
    const results: Array<IApiReferencesTableProps> = [];

    const { jsonDocs } = this.props;

    if (jsonDocs) {
      const propsName: string = `I${jsonDocs.name}Props`;
      for (const table of jsonDocs.tables) {
        switch (table.kind) {
          case 'enum': {
            results.push(
              _generateTableProps(table, {
                renderAs: 'enum',
                properties: table.members as IEnumTableRowJson[]
              })
            );
            break;
          }
          case 'interface': {
            const interfaceProperty = _generateTableProps(table, {
              renderAs: 'interface',
              properties: table.members
            });

            // to ensure that I{componentName}Props comes first
            if (propsName === table.name) {
              results.unshift(interfaceProperty);
            } else {
              results.push(interfaceProperty);
            }

            break;
          }
          case 'class': {
            results.push(this._generateClassProperty(table));
            break;
          }
          case 'typeAlias': {
            results.push(
              _generateTableProps(table, {
                renderAs: 'typeAlias',
                properties: []
              })
            );
            break;
          }
        }
      }
    }

    return results;
  }

  private _generateClassProperty(table: ITableJson): IApiReferencesTableProps {
    // class members are a mix of IApiInterfaceProperty and IMethod
    const classMembers: IApiInterfaceProperty[] = [];
    const classMethods: IMethod[] = [];

    const members: ITableRowJson[] = table.members as ITableRowJson[];
    members.forEach((member: ITableRowJson) => {
      if (member.kind === 'Method') {
        classMethods.push(member);
      } else {
        classMembers.push(member);
      }
    });

    // the class
    return _generateTableProps(table, {
      renderAs: 'class',
      properties: classMembers,
      methods: classMethods
    });
  }
}

function _generateTableProps(
  table: ITableJson,
  extraInfo: Required<Pick<IApiReferencesTableProps, 'properties' | 'renderAs'>> & Partial<IApiReferencesTableProps>
): IApiReferencesTableProps {
  return {
    title: table.kind && table.kind !== 'typeAlias' ? table.name + ' ' + table.kind : table.name,
    name: table.name,
    description: table.description,
    extendsTokens: table.extendsTokens,
    properties: [],
    deprecated: table.deprecated,
    deprecatedMessage: table.deprecatedMessage,
    ...extraInfo
  };
}
