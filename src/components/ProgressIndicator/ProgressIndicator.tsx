import * as React from 'react';
import { IProgressIndicatorProps } from './ProgressIndicator.Props';
import { css } from '../../utilities/css';
import './ProgressIndicator.scss';

// if the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios
const ZERO_THRESHOLD = 0.01;

export class ProgressIndicator extends React.Component<IProgressIndicatorProps, any> {
  public static defaultProps = {
    title: '',
    description: '',
    percentComplete: 0
  };

  public render() {
    let { title, description, percentComplete } = this.props;

    percentComplete = Math.min(100, Math.max(0, percentComplete * 100));

    return (
      <div className='ms-ProgressIndicator'>
        <div className='ms-ProgressIndicator-itemName'>{ title }</div>
        <div className='ms-ProgressIndicator-itemProgress'>
          <div className='ms-ProgressIndicator-progressTrack'></div>
          <div className={ css('ms-ProgressIndicator-progressBar', {
              'smoothTransition': percentComplete > ZERO_THRESHOLD
            })}
            style={ { width: percentComplete + '%' } }
            role='progressbar'
            aria-valuemin='0'
            aria-valuemax='100'
            aria-valuenow={ percentComplete.toFixed().toString() }>
          </div>
        </div>
        <div className='ms-ProgressIndicator-itemDescription'>{ description }</div>
      </div>
    );
  }
}
