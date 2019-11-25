import * as React from 'react';
import { ActionButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { ApiReferencesTable, gapTokens } from './ApiReferencesTable';
import { IApiReferencesTableProps, IApiInterfaceProperty, IMethod, IApiReferencesTableSetProps } from './ApiReferencesTableSet.types';
import { ITableRowJson, IPageJson } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { extractAnchorLink } from '../../utilities/extractAnchorLink';
import { jumpToAnchor } from '../../utilities/index2';
import { getTokenResolver } from './tokenResolver';

export interface IApiReferencesTableSetState {
  showSeeMore: boolean;
}

const TITLE_LINE_HEIGHT = 31.5;
const seeMoreButtonStyles: Partial<IButtonStyles> = {
  root: { paddingLeft: '0px' },
  textContainer: { paddingLeft: '4px' }
};

export class ApiReferencesTableSet extends React.Component<IApiReferencesTableSetProps, IApiReferencesTableSetState> {
  public static defaultProps: Partial<IApiReferencesTableSetProps> = {
    jumpToAnchors: true
  };

  private _tableProps: IApiReferencesTableProps[];

  constructor(props: IApiReferencesTableSetProps) {
    super(props);

    this.state = { showSeeMore: false };

    this._tableProps = _generateTableProps(props.jsonDocs);
  }

  public render(): JSX.Element {
    const { className } = this.props;
    return (
      <Stack tokens={gapTokens.large} className={className}>
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
        this.setState({ showSeeMore: true });
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
    if (this._tableProps.length > 1) {
      return (
        <Stack tokens={gapTokens.medium}>
          <ActionButton
            iconProps={{ iconName: this.state.showSeeMore ? 'SkypeCircleMinus' : 'CirclePlus' }}
            onClick={this._onClickSeeMore}
            onRenderText={this._onRenderText}
            styles={seeMoreButtonStyles}
          >
            See more
          </ActionButton>
          {this.state.showSeeMore && (
            <Stack tokens={gapTokens.large}>
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
          this.setState({ showSeeMore: true });
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
}

function _generateTableProps(jsonDocs: IPageJson | undefined): IApiReferencesTableProps[] {
  if (!jsonDocs) {
    return [];
  }

  const tokenResolver = getTokenResolver();

  const propsName: string = `I${jsonDocs.name}Props`;
  const results: IApiReferencesTableProps[] = [];

  for (const table of jsonDocs.tables) {
    const { kind, name } = table;

    const tableProps: IApiReferencesTableProps = {
      ...table,
      title: kind !== 'typeAlias' ? name + ' ' + kind : name,
      renderAs: kind,
      properties: table.members || [],
      tokenResolver: tokenResolver
    };

    if (kind === 'class') {
      // class members are a mix of IApiInterfaceProperty and IMethod
      const classMembers: IApiInterfaceProperty[] = (tableProps.properties = []);
      const classMethods: IMethod[] = (tableProps.methods = []);

      (tableProps.properties as ITableRowJson[]).forEach((member: ITableRowJson) => {
        if (member.kind === 'method') {
          classMethods.push(member);
        } else {
          classMembers.push(member);
        }
      });
    }

    // to ensure that I{componentName}Props comes first
    if (kind === 'interface' && propsName === table.name) {
      results.unshift(tableProps);
    } else {
      results.push(tableProps);
    }
  }

  return results;
}
