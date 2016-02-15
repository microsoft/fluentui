import * as React from 'react';
import { IContextualMenuItem, default as ContextualMenu } from './ContextualMenu';
import './ContextualMenuHost.scss';
import { css } from '../../utilities';

export interface IContextualMenuHostProps {
  items?: IContextualMenuItem[];
  targetElement?: HTMLElement;
  onDismiss?: () => void;
  className?: string;
}

const BEAK_WIDTH = 16;

export default class ContextualMenuHost extends React.Component<IContextualMenuHostProps, any> {

  public render() {
    let { items, targetElement, onDismiss, className } = this.props;
    let left = 0;
    let position = this._getRelativePositions();

    return (
      <div className={ css('ms-ContextualMenuHost', className) } ref='host'>
      { (items && items.length) ? (
        <div className='ms-ContextualMenuHost-menu' style={ position.menu }>
          <ContextualMenu items={ items } onDismiss={ onDismiss } topBeakStyle={ position.beak } />
        </div>
      ) : (
        null
      ) }
      </div>
    );
  }

  private _getRelativePositions() {
    let { targetElement } = this.props;
    let hostElement = (this.refs['host'] as HTMLElement);
    let position = {
      top: 0
    };
    let beakPosition = {
      display: 'block'
    };

    if (hostElement && targetElement) {
      let hostRect = hostElement.getBoundingClientRect();
      let targetRect = targetElement.getBoundingClientRect();

      let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);

      if (isLeftAligned) {
        position['left'] = targetRect.left - hostRect.left;
        beakPosition['left'] = (targetRect.width / 2) - (BEAK_WIDTH / 2);
      } else {
        position['right'] = hostRect.width - (targetRect.left - hostRect.left) - targetRect.width;
        beakPosition['right'] = (targetRect.width / 2) - (BEAK_WIDTH / 2);
      }

    }

    return {
      menu: position,
      beak: beakPosition
    };
  }

}