/* tslint:disable */
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { mergeStyles, IStyle } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { M365Nav } from './M365Nav';
import { IM365NavProps, IM365NavState } from "./M365Nav.types";
import { M365SlimNav } from './M365SlimNav';
import { getM365NavStyle, getM365NavItemStyle } from './M365Nav.styles';

export class M365NavToggler extends React.Component<IM365NavProps, IM365NavState> {
  constructor(props: IM365NavProps) {
    super(props);

    this.state = {
      isNavCollapsed: props.isNavCollapsed ? props.isNavCollapsed : false
    };
  }

  public render() {
    if (!this.props.groups || this.props.groups.length == 0) {
      return null;
    }

    const isNavCollapsed = this.state.isNavCollapsed;
    const navStyle = getM365NavStyle(isNavCollapsed as boolean);

    return (
      <div className={mergeStyles(navStyle)}>
        {
          this.renderExpandCollapseNavItem()
        }
        {
          isNavCollapsed ?
            <M365SlimNav
              groups={this.props.groups}
              selectedKey={this.props.selectedKey}
              navScrollerId={this.props.navScrollerId} />
            :
            <M365Nav
              groups={this.props.groups}
              selectedKey={this.props.selectedKey} />
        }
      </div>
    );
  }

  private onNavCollapseClicked(_ev: React.MouseEvent<HTMLElement>): void {
    this.setState((prevState: IM365NavState) => {
      var isNavCollapsed = !prevState.isNavCollapsed;

      // inform the caller about the collapse event
      if (!!this.props.onNavCollapsedCallback) {
        this.props.onNavCollapsedCallback(isNavCollapsed);
      }

      return {
        isNavCollapsed: isNavCollapsed
      } as IM365NavState;
    });
  }

  private renderExpandCollapseNavItem(): React.ReactElement<{}> {
    const style: IStyle = {
      textAlign: "right"
    };

    const isNavCollapsed = this.state.isNavCollapsed;
    const navItemStyle = getM365NavItemStyle();

    return (
      <a
        tabIndex={0}
        onClick={this.onNavCollapseClicked.bind(this)}
        aria-expanded={isNavCollapsed ? "false" : "true"}
        data-hint="ReactLeftNav"
        data-value="ToggleNavCollapse">
        <div className={mergeStyles(navItemStyle.root, style)}>
          <Icon
            className={mergeStyles(navItemStyle.iconColumn)}
            iconName="GlobalNavButton"
            aria-hidden="true"
          />
        </div>
      </a>
    );
  }
}
/* tslint:enable */
