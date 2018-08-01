import * as React from 'react';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps } from './CollapsibleSection.types';
import { createRef } from 'office-ui-fabric-react';
import { IStateComponentProps } from '../../Foundation';
import { BaseComponent, getRTL, KeyCodes } from '../../Utilities';

export interface ICollapsibleSectionState {
  collapsed: boolean;
}

// TODO: Reduce the amount of types needed as much as possible. Some ideas include having state and view components
//        extend or inherit createComponent constructs that automatically apply the correct characteristcs. For now,
//        these types are explicitly defined below.
export type ICollapsibleSectionStateProps = IStateComponentProps<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps
>;

export class CollapsibleSectionState extends BaseComponent<ICollapsibleSectionStateProps, ICollapsibleSectionState> {
  public static defaultProps: Partial<ICollapsibleSectionStateProps> = {
    defaultCollapsed: true
  };

  private _titleElement = createRef<HTMLElement>();

  constructor(props: ICollapsibleSectionStateProps) {
    super(props);

    this.state = { collapsed: props.defaultCollapsed! };
  }

  public render(): JSX.Element {
    const { collapsed = this.state.collapsed } = this.props;

    // TODO: check React 16 deriveStateFromProps
    const viewProps: ICollapsibleSectionViewProps = {
      collapsed,
      titleElementRef: this._titleElement,
      onToggleCollapse: this._onToggleCollapse,
      onKeyDown: this._onKeyDown,
      onRootKeyDown: this._onRootKeyDown
    };

    return this.props.renderView(viewProps);
  }

  private _onRootKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const rootKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    switch (ev.which) {
      case rootKey:
        if (ev.target !== this._titleElement.value && this._titleElement.value) {
          this._titleElement.value.focus();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        break;
    }
  };

  private _onToggleCollapse = () => {
    this.setState((state: ICollapsibleSectionState) => ({ collapsed: !state.collapsed }));
    if (this.props.titleProps && this.props.titleProps.onToggleCollapse) {
      this.props.titleProps.onToggleCollapse();
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const { collapsed } = this.state;
    const collapseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    const expandKey = getRTL() ? KeyCodes.left : KeyCodes.right;

    switch (ev.which) {
      case collapseKey:
        if (!collapsed) {
          this.setState({ collapsed: true });
          break;
        }
        return;

      case expandKey:
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
  };
}
