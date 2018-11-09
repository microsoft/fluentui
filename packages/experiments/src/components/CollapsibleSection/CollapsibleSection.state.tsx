import * as React from 'react';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps } from './CollapsibleSection.types';
import { BaseState } from '../../utilities/BaseState';
import { getRTL, KeyCodes } from '../../Utilities';

// export type ICollapsibleSectionStateProps = IBaseStateComponentProps<
//   ICollapsibleSectionProps,
//   ICollapsibleSectionViewProps
// >;

// const CollapsibleSectionStateTransforms: IStateTransforms<ICollapsibleSectionProps, ICollapsibleSectionViewProps> = [
//   {
//     transform: 'toggle',
//     prop: 'collapsed',
//     defaultValueProp: 'defaultCollapsed',
//     defaultValue: true,
//     onInput: 'onToggleCollapse'
//   }
// ];

export type ICollapsibleSectionState = Pick<
  ICollapsibleSectionViewProps,
  'collapsed' | 'titleElementRef' | 'onClick' | 'onKeyDown' | 'onRootKeyDown'
>;

export class CollapsibleSectionState extends BaseState<ICollapsibleSectionProps, ICollapsibleSectionViewProps, ICollapsibleSectionState> {
  private _titleElement = React.createRef<HTMLElement>();

  constructor(props: CollapsibleSectionState['props']) {
    super(props, {
      controlledProps: ['collapsed']
    });

    this.state = {
      collapsed: !!props.defaultCollapsed,
      onClick: this._onClick,
      onKeyDown: this._onKeyDown,
      onRootKeyDown: this._onRootKeyDown,
      titleElementRef: this._titleElement
    };
  }

  private _onClick = (ev: React.MouseEvent<Element>) => {
    this.setState({ collapsed: !this.state.collapsed });
    ev.preventDefault();
    ev.stopPropagation();
  };

  private _onRootKeyDown = (ev: React.KeyboardEvent<Element>) => {
    const rootKey = getRTL() ? KeyCodes.right : KeyCodes.left;
    switch (ev.which) {
      case rootKey:
        if (this._titleElement && this._titleElement.current && ev.target !== this._titleElement.current) {
          this._titleElement.current.focus();
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        break;
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
