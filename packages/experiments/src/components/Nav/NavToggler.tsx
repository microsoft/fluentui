/* tslint:disable */
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
import { NavLink } from './NavLink';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/components/FocusZone';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavTogglerComponent extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      isNavCollapsed: props.isNavCollapsed ? props.isNavCollapsed : false,
      showMore: props.showMore ? props.showMore : false
    };

    this._onShowMoreLinkClicked = this._onShowMoreLinkClicked.bind(this);
  }

  public render() {
    if (!this.props.groups || this.props.groups.length == 0) {
      return null;
    }

    const {
      isNavCollapsed,
      showMore
    } = this.state;

    const { styles } = this.props;
    const classNames = getClassNames(styles!, { isCollapsed: isNavCollapsed });

    return (
      <div className={ classNames.root }>
        <FocusZone direction={ FocusZoneDirection.vertical }>
          {
            this._renderExpandCollapseNavItem()
          }
          {
            isNavCollapsed ?
              <SlimNav
                groups={ this.props.groups }
                selectedKey={ this.props.selectedKey }
                navScrollerId={ this.props.navScrollerId }
                dataHint={ this.props.dataHint }
                enableCustomization={ this.props.enableCustomization }
                showMore={ showMore }
                onShowMoreLinkClicked={ this._onShowMoreLinkClicked } />
              :
              <Nav
                groups={ this.props.groups }
                selectedKey={ this.props.selectedKey }
                dataHint={ this.props.dataHint }
                enableCustomization={ this.props.enableCustomization }
                showMore={ showMore }
                onShowMoreLinkClicked={ this._onShowMoreLinkClicked } />
          }
        </FocusZone>
      </div>
    );
  }

  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState((prevState: INavState) => {
      const isNavCollapsed = !prevState.isNavCollapsed;

      // inform the caller about the collapse event
      if (!!this.props.onNavCollapsedCallback) {
        this.props.onNavCollapsedCallback(isNavCollapsed);
      }

      return {
        isNavCollapsed: isNavCollapsed
      };
    });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _renderExpandCollapseNavItem(): React.ReactElement<{}> {
    const isNavCollapsed = this.state.isNavCollapsed;
    const { styles } = this.props;
    const classNames = getClassNames(styles!, {});

    return (
      <NavLink
        id="ToggleNavCollapse"
        href="#"
        onClick={ this._onNavCollapseClicked.bind(this) }
        ariaExpanded={ !isNavCollapsed }
        dataHint={ this.props.dataHint }
        dataValue="ToggleNavCollapse"
        rootClassName={ classNames.navToggler }
        leftIconName="GlobalNavButton"
        iconClassName={ classNames.navItemIconColumn }
        role="menu">
      </NavLink>
    );
  }

  private _onShowMoreLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState((prevState: INavState) => {
      return {
        showMore: !prevState.showMore
      };
    });

    ev.preventDefault();
    ev.stopPropagation();
  }
}

export const NavToggler = styled<INavProps, INavStyleProps, INavStyles>(
  NavTogglerComponent,
  getStyles
);
/* tslint:enable */