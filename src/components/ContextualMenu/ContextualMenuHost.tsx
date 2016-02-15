import * as React from 'react';
import { IContextualMenuItem, default as ContextualMenu } from './ContextualMenu';
import './ContextualMenuHost.scss';

export interface IContextualMenuHostProps {
  items?: IContextualMenuItem[];
  targetElement?: HTMLElement;
  onDismiss?: () => void;
}

export default class ContextualMenuHost extends React.Component<IContextualMenuHostProps, any> {
  public render() {
    let { items, targetElement, onDismiss } = this.props;
    let left = 0;

    return (
      <div className='ms-ContextualMenuHost' ref='host'>
      { (items && items.length) ? (
        <div className='ms-ContextualMenuHost-menu' style={ this._getRelativePosition() }>
          <ContextualMenu items={ items } onDismiss={ onDismiss} />
        </div>
      ) : (
        null
      ) }
      </div>
    );
  }

  private _getRelativePosition() {
    let { targetElement } = this.props;
    let hostElement = (this.refs['host'] as HTMLElement);
    let position = {
      top: 0
    };

    if (hostElement && targetElement) {
      let hostRect = hostElement.getBoundingClientRect();
      let targetRect = targetElement.getBoundingClientRect();

      let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);

      if (isLeftAligned) {
        position['left'] = targetRect.left - hostRect.left;
      } else {
        position['right'] = hostRect.width - (targetRect.left - hostRect.left) - targetRect.width;
      }

    }

    return position;
  }
}