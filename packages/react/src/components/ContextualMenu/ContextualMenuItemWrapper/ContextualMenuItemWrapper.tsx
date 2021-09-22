import * as React from 'react';
import { initializeComponentRef, shallowCompare } from '../../../Utilities';
import type { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';

export class ContextualMenuItemWrapper extends React.Component<IContextualMenuItemWrapperProps> {
  constructor(props: IContextualMenuItemWrapperProps) {
    super(props);
    initializeComponentRef(this);
  }

  public shouldComponentUpdate(newProps: IContextualMenuItemWrapperProps): boolean {
    return !shallowCompare(newProps, this.props);
  }

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

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return undefined;
  };
}
