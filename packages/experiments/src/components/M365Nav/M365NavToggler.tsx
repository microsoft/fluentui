/* tslint:disable */
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import * as React from 'react';
import { M365Nav } from './M365Nav';
import {
  IM365NavProps,
  IM365NavState,
  IM365NavStyleProps,
  IM365NavStyles
} from "./M365Nav.types";
import { M365SlimNav } from './M365SlimNav';
import {
  getStyles
} from './M365Nav.styles';
import {
  styled,
  classNamesFunction
} from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<IM365NavStyleProps, IM365NavStyles>();

class M365NavTogglerComponent extends React.Component<IM365NavProps, IM365NavState> {
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

    const isCollapsed = this.state.isNavCollapsed;
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { isCollapsed });

    return (
      <div className={ classNames.root }>
        {
          this.renderExpandCollapseNavItem()
        }
        {
          isCollapsed ?
            <M365SlimNav
              groups={ this.props.groups }
              selectedKey={ this.props.selectedKey }
              navScrollerId={ this.props.navScrollerId } />
            :
            <M365Nav
              groups={ this.props.groups }
              selectedKey={ this.props.selectedKey } />
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
    const style: React.CSSProperties = {
      textAlign: "right"
    };

    const isNavCollapsed = this.state.isNavCollapsed;
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {});

    return (
      <a
        tabIndex={ 0 }
        onClick={ this.onNavCollapseClicked.bind(this) }
        aria-expanded={ isNavCollapsed ? "false" : "true" }
        data-hint="ReactLeftNav"
        data-value="ToggleNavCollapse">
        <div style={ style } className={ classNames.navItemRoot }>
          <Icon
            className={ classNames.navItemIconColumn }
            iconName="GlobalNavButton"
            aria-hidden="true"
          />
        </div>
      </a>
    );
  }
}

export const M365NavToggler = styled<IM365NavProps, IM365NavStyleProps, IM365NavStyles>(
  M365NavTogglerComponent,
  getStyles
);
/* tslint:enable */
