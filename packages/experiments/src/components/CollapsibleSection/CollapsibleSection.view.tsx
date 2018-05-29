import * as React from 'react';
import { ICollapsibleSectionProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';
import { createRef } from 'office-ui-fabric-react';

export interface ICollapsibleSectionState {
  collapsed: boolean;
}

export type ICollapsibleSectionCombinedProps = ICollapsibleSectionProps & { styles: { [key in keyof ICollapsibleSectionStyles]: string } };

export class CollapsibleSectionView extends React.Component<
  ICollapsibleSectionCombinedProps,
  ICollapsibleSectionState
  > {
  private _titleElement = createRef<HTMLElement>();

  constructor(props: ICollapsibleSectionCombinedProps) {
    super(props);

    this.state = {
      collapsed: !!(props.defaultCollapsed === undefined
        ? props.collapsed
        : props.defaultCollapsed)
    };
  }

  public render(): JSX.Element {
    const { titleAs: TitleType, titleProps, children } = this.props;
    const { collapsed } = this.state;

    return (
      <div onKeyDown={ this._onRootKeyDown }>
        <TitleType
          { ...titleProps }
          focusElementRef={ this._titleElement }
          collapsed={ collapsed }
          onToggleCollapse={ this._onToggleCollapse }
          onKeyDown={ this._onKeyDown }
        />
        <div className={ this.props.styles.child }>
          { !collapsed && children }
        </div>
      </div>
    );
  }

  private _onRootKeyDown = (ev: React.KeyboardEvent<Element>) => {
    switch (ev.which) {
      case 37:
        if (
          ev.target !== this._titleElement.value &&
          this._titleElement.value
        ) {
          this._titleElement.value.focus();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        break;
    }
  }

  private _onToggleCollapse = () => {
    this.setState((state: ICollapsibleSectionState) => ({ collapsed: !state.collapsed }));
    // TODO: make sense of this in design and clean this up
    if (this.props.titleProps && this.props.titleProps.onToggleCollapse) {
      this.props.titleProps.onToggleCollapse();
    }
  }

  private _onKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const { collapsed } = this.state;

    switch (ev.which) {
      case 37: // left
        if (!collapsed) {
          this.setState({ collapsed: true });
          break;
        }
        return;

      case 39: // right
        if (collapsed) {
          this.setState({ collapsed: false });
          break;
        }
        return;

      default:
        return;
    }

    ev.preventDefault();
    ev.stopPropagation();
  }
}
