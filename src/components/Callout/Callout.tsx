import * as React from 'react';
import './Callout.scss';
import { ICalloutProps } from './Callout.Props';

export default class Callout extends React.Component<ICalloutProps, any> {

  public render() {
    let { title, subText, links } = this.props;
    let linkElements;

    if (links && links.length) {
      linkElements = (
        <div className='ms-Callout-actions'>
          { links.map(link => (
          <a href={ link.url } className='ms-Callout-link ms-Link ms-Link--hero'>{ link.name }</a>
          )) }
        </div>
      );
    }

    return (
      <div className='ms-Callout ms-Callout--arrowLeft'>
        <div className='ms-Callout-main'>
          <div className='ms-Callout-header'>
            <p className='ms-Callout-title'>
              { title }
            </p>
          </div>
          <div className='ms-Callout-inner'>
            <div className='ms-Callout-content'>
              <p className='ms-Callout-subText'>
                { subText }
              </p>
            </div>
            { linkElements }
          </div>
        </div>
      </div>
    );
  }
}
