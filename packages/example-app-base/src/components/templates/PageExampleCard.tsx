import { BaseComponent, IBaseProps, autobind, customizable } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle, mergeStyleSets, getFocusStyle, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { TypeScriptSnippet } from './TypeScriptSnippet';
import { PageHeader } from './PageHeader';

export interface IPageExampleCardStyles {
  root: IStyle;
  header: IStyle;
  headerText: IStyle;
  showCodeButton: IStyle;
}

export interface IPageExampleCardStyleProps {
  theme: ITheme;
}

export interface IPageExampleCardProps extends React.Props<PageExampleCard>, IBaseProps {
  theme?: ITheme;
  title?: string;
  code?: string;
  children?: JSX.Element;
}

export interface IPageExampleCardState {
  expanded: boolean;
}

const getDefaultStyles = (props: IPageExampleCardStyleProps): IPageExampleCardStyles => ({
  root: {},

  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'baseline',
    borderBottom: '1px solid ' + props.theme.palette.neutralLight
  },

  headerText: {
    flexGrow: 1
  },

  showCodeButton: [
    props.theme.fonts.small,
    getFocusStyle(props.theme),
    {
      background: 'transparent',
      border: '1px solid ' + props.theme.palette.neutralLight,
      borderBottom: 'none',
      height: 32,
      width: 110,
      borderRadius: '4px 4px 0 0',
      flexShrink: 0,
      outline: 'transparent',
      selectors: {
        ':hover': {
          background: props.theme.palette.neutralLight
        }
      }
    }
  ]
});

const getSubHeaderStyles = () => ({
  root: { flexGrow: 1 }
});

@customizable('PageExampleCard', ['theme', 'styles'])
export class PageExampleCard extends BaseComponent<IPageExampleCardProps, IPageExampleCardState> {
  constructor(props: IPageExampleCardProps) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  public render(): JSX.Element {
    const { children, theme, code, title } = this.props;
    const { expanded } = this.state;
    const styleProps: IPageExampleCardStyleProps = { theme: theme! };
    const classNames: IProcessedStyleSet<IPageExampleCardStyles> = mergeStyleSets(getDefaultStyles(styleProps));

    return (
      <div className={classNames.root}>
        <div className={classNames.header}>
          <PageHeader styles={getSubHeaderStyles}>{title}</PageHeader>
          <button onClick={this._onToggleCode} className={classNames.showCodeButton}>
            {expanded ? 'Hide code' : 'Show code'}
          </button>
        </div>
        {expanded && <TypeScriptSnippet>{code}</TypeScriptSnippet>}
        {children}
      </div>
    );
  }

  @autobind
  private _onToggleCode(): void {
    this.setState({
      expanded: !this.state.expanded
    });
  }
}
