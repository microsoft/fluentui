/* tslint:disable */
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import * as React from 'react';
import { Nav } from './Nav';
import {
  INavProps,
  INavState,
  INavStyleProps,
  INavStyles
} from "./Nav.types";
import { SlimNav } from './SlimNav';
import {
  getStyles
} from './Nav.styles';
import {
  styled,
  classNamesFunction
} from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavTogglerComponent extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      isNavCollapsed: props.isNavCollapsed ? props.isNavCollapsed : false
    };
  }

  public render() {
    if (!this.props.groups || this.props.groups.length == 0) {
      return null;
    }

    const isCollapsed = this.state.isNavCollapsed;
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { isCollapsed });

    return (
      <div className={ classNames.root }>
        {
          this._renderExpandCollapseNavItem()
        }
        {
          isCollapsed ?
            <SlimNav
              groups={ this.props.groups }
              selectedKey={ this.props.selectedKey }
              navScrollerId={ this.props.navScrollerId } />
            :
            <Nav
              groups={ this.props.groups }
              selectedKey={ this.props.selectedKey } />
        }
      </div>
    );
  }

  private _onNavCollapseClicked(_ev: React.MouseEvent<HTMLElement>): void {
    this.setState((prevState: INavState) => {
      const isNavCollapsed = !prevState.isNavCollapsed;

      // inform the caller about the collapse event
      if (!!this.props.onNavCollapsedCallback) {
        this.props.onNavCollapsedCallback(isNavCollapsed);
      }

      return {
        isNavCollapsed: isNavCollapsed
      } as INavState;
    });
  }

  private _renderExpandCollapseNavItem(): React.ReactElement<{}> {
    const isNavCollapsed = this.state.isNavCollapsed;
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {});

    return (
      <a
        onClick={ this._onNavCollapseClicked.bind(this) }
        aria-expanded={ isNavCollapsed ? "false" : "true" }
        data-hint="ReactLeftNav"
        data-value="ToggleNavCollapse">
        <div className={ classNames.navToggler }>
          <Icon
            className={ classNames.navItemIconColumn }
            iconName="GlobalNavButton"
            aria-hidden="true"
          />
        </div>
      </a >
    );
  }
}

export const NavToggler = styled<INavProps, INavStyleProps, INavStyles>(
  NavTogglerComponent,
  getStyles
);
/* tslint:enable */
