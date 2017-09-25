import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as stylesImport from './Interstitials.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../PageStyles.module.scss');

export class AngularJSPage extends React.Component<any, any> {
  public render() {
    return (
      <div className={ pageStyles.basePage }>
        <div className={ styles.header }>
          <h1>ngOfficeUIFabric</h1>
          <span>A community-driven project that simplifies implementing Fabric in Angular-based apps</span>
          <a href='http://ngofficeuifabric.com/' className={ styles.button }>View ngOfficeUIFabric&rsquo;s site</a>
        </div>

        <div className={ styles.overview }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg8'>
                <p className={ styles.overviewText }>Using Angular to build out your experience? The ngOfficeUIFabric project makes it easy to use Fabric in Angular-based apps.</p>
                <p className={ styles.overviewText }>ngOfficeUIFabric is a community effort to build components for Angular-based apps. Watch the Channel 9 video, <a className={ styles.overviewLink } href='https://channel9.msdn.com/Shows/Office-Dev-Show/Office-Dev-Show-Episode-25-Angular-Directives-for-Office-UI-Fabric'>Angular Directives for Office UI Fabric</a>, to learn more about the project.</p>
              </div>
              <div className={ css('ms-Grid-col ms-sm12 ms-lg4', styles.overviewImageWrapper) }>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-angular-black.svg' } width='200' height='200' />
              </div>
            </div>
          </div>
        </div>

        <div className={ styles.features }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Efficient and easy to use</span>
                <p>ngOfficeUIFabric includes Angular elements that not only implement Fabric controls like tables, input controls, and lists, but also add functionality.</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Community-driven</span>
                <p>This project is built by developers to help developers who want to use Angular and blend in with Office. Your contributions are welcome!</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Based on Fabric</span>
                <p>This project uses Fabric styles for its components. Because Fabric is open source, you can create a version that uses your favorite framework too.</p>
              </div>
            </div>
          </div>
        </div>

        <span className={ styles.trademark }>All trademarks are the property of their respective owners.</span>

      </div>
    );
  }
}
