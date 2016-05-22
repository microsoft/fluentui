import * as React from 'react';
import { IProgressIndicatorProps } from './ProgressIndicator.Props';
import './ProgressIndicator.scss';

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
          <div className='ms-ProgressIndicator-progressBar' style={ { width: percentComplete + '%' } }></div>
        </div>
        <div className='ms-ProgressIndicator-itemDescription'>{ description }</div>
      </div>
    );
  }
}
