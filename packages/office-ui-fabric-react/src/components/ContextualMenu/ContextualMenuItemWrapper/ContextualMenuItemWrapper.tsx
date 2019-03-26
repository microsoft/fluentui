import * as React from 'react';
import { BaseComponent } from '../../../Utilities';
import { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { IContextualMenuItem } from '../../../ContextualMenu';

export class ContextualMenuItemWrapper extends BaseComponent<IContextualMenuItemWrapperProps, {}> {
  protected _onItemMouseEnter = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _onItemMouseLeave = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseLeave } = this.props;
    if (onItemMouseLeave) {
      onItemMouseLeave(item, ev);
    }
  };

  protected _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  };

  protected _onItemMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, ev.currentTarget as HTMLElement);
    }
  };

  protected _getSubMenuId = (item: IContextualMenuItem): string | undefined => {
    const { getSubMenuId } = this.props;
    if (getSubMenuId) {
      return getSubMenuId(item);
    }
  };

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return undefined;
  };
}
