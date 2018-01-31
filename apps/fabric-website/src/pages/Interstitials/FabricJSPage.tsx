import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as stylesImport from './Interstitials.module.scss';
const styles: any = stylesImport;

export class FabricJSPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className={ styles.header }>
          <h1>Office UI Fabric JS</h1>
          <span>Simple components that focus on appearance and styling</span>
          <a href='https://dev.office.com/fabric-js/' className={ styles.button }>View Fabric JS</a>
        </div>

        <div className={ styles.overview }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg8'>
                <p className={ styles.overviewText }>Fabric JS provides a set of basic components that show the visual language of Office.</p>
                <p className={ styles.overviewText }>This open source project includes components that don&rsquo;t require a framework. You can use them to create simple experiences or extend them with the framework of your choice.</p>
              </div>
              <div className={ css('ms-Grid-col ms-sm12 ms-lg4', styles.overviewImageWrapper) }>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-js-black.svg' } width='200' height='200' />
              </div>
            </div>
          </div>
        </div>

        <div className={ styles.features }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Focused on styling</span>
                <p>Fabric JS shows the basic visuals of the core Fabric building blocks. The components are simple and lightweight.</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Framework-independent</span>
                <p>Use Fabric JS components directly in simple experiences or as the foundation for controls that you implement in a different framework.</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Open source</span>
                <p>Fabric JS is open source so you can file issues, submit bug fixes, or add new functionality. We welcome your contributions!</p>
              </div>
            </div>
          </div>
        </div>

        <span className={ styles.trademark }>All trademarks are the property of their respective owners.</span>

      </div>
    );
  }
}
