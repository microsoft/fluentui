import * as React from 'react';
import * as stylesImport from './Interstitials.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../PageStyles.module.scss');

export class FabricIOSPage extends React.Component<any, any> {
  public render() {
    return (
      <div className={ pageStyles.basePage }>
        <div className={ styles.header }>
          <h1>Office UI Fabric iOS</h1>
          <span>The Office design language for iOS</span>
          <a href='https://github.com/OfficeDev/office-ui-fabric-ios' className={ styles.button }>View Fabric iOS on GitHub</a>
        </div>

        <div className={ styles.overview }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg8'>
                <p className={ styles.overviewText }>Use Fabric styling and components written in native Swift to integrate your iOS experience with Office.</p>
                <p className={ styles.overviewText }>Fabric iOS includes core design elements along with components that are used in iOS Office products like the <a className={ styles.overviewLink } href='https://itunes.apple.com/us/app/microsoft-sharepoint/id1091505266'>SharePoint iOS app</a>.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={ styles.features }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Includes core Fabric styles</span>
                <p>Fabric iOS includes core styles such as colors, the official Office iOS type ramp, and guidance for adding your own icons.</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Adds unique components</span>
                <p>Fabric iOS includes native customizations to buttons, labels, and text fields along with unique components like InitialsView and LogoView.</p>
              </div>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <span className={ styles.featureHeadline }>Open source</span>
                <p>Fabric iOS is open source so you can file issues, submit bug fixes, or add new functionality. We welcome your contributions!</p>
              </div>
            </div>
          </div>
        </div>

        <span className={ styles.trademark }>All trademarks are the property of their respective owners.</span>

      </div>
    );
  }
}
