import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import * as stylesImport from './ResourcesPage.module.scss';
const styles: any = stylesImport;

export class ResourcesPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Resources'
          links={
            [
              {
                'text': 'Design Toolkit & Assets',
                'location': 'toolkit-assets'
              },
              {
                'text': 'Tutorials & Resources',
                'location': 'tutorials-resources'
              },
              {
                'text': 'Reach out',
                'location': 'reach-out'
              }
            ]
          }
          backgroundColor='#ff8c00'
        />

        <div className={ styles.angle } />

        <div id='toolkit-assets' className={ styles.related }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <h2>Design Toolkit &amp; Assets</h2>
              </div>
              <div className={ css('ms-Grid-col ms-sm12 ms-lg8', styles.description) }>
                <p>To ensure a consistent look and feel for your project, here's where you can leverage essential elements. This section covers design and UI-related downloads for apps designed and built with Fabric.</p>

                <h3>Design Toolkit</h3>
                <p>The toolkit is built with Adobe XD and provides controls and layout templates that enable you to create seamless, beautiful Offices experiences.</p>
                <ul>
                  <li><a href='https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.xd'>Adobe XD Toolkit</a></li>
                  <li><a href='https://microsoft.sharepoint.com/teams/OfficeUIFabric97'>Adobe XD Toolkit (Microsoft employees)</a></li>
                </ul>

                <h3>Fonts</h3>
                <ul>
                  <li><a href='https://static2.sharepointonline.com/files/fabric/fabric-website/files/segoeui_fabricmdl2_icon_fonts.zip'>Segoe UI and Fabric MDL2 icon font</a></li>
                  <li><a href='https://microsoft.sharepoint.com/teams/OfficeUIFabric97/SitePages/Fabric%20MDL2%20Icons.aspx'>Segoe UI and Fabric MDL2 icon font (Microsoft employees)</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id='tutorials-resources' className={ styles.related }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <h2>Learn more with tutorials and resources</h2>
              </div>
              <div className={ css('ms-Grid-col ms-sm12 ms-lg8', styles.description) }>
                <p>Use the tutorials and additional resources on this page to learn how to get Fabric running in your projects.</p>

                <h3>Tutorials</h3>
                <p>Check out <a href='https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md'>Fabric&rsquo;s ToDo tutorial</a> to learn how to make a simple React app using Fabric components.</p>

                <h3>Add-ins</h3>
                <p>Fabric is the official UI toolkit for building a coherent user experience in your Office Add-ins. Check out some of these resources to learn more about how to use Fabric in your next Add-in.</p>
                <ul>
                  <li><a href='http://dev.office.com/docs/add-ins/overview/office-add-ins'>Add-ins overview</a></li>
                  <li><a href='http://dev.office.com/docs/add-ins/design/add-in-design'>Using Fabric in your Add-in</a></li>
                  <li><a href='http://dev.office.com/docs/add-ins/design/ux-design-patterns'>UX design pattern templates for Office Add-ins</a></li>
                </ul>

                <h3>SharePoint</h3>
                <p>SharePoint uses Fabric, so if you&rsquo;re building on top of or within a SharePoint experience, you can be sure that your UI will blend in. Check out these resources to learn more.</p>
                <ul>
                  <li><a href='http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview'>SharePoint Framework overview</a></li>
                  <li><a href='https://github.com/SharePoint/sp-dev-docs/wiki/Design-Great-Webparts'>Design guidance for web parts</a></li>                 <li><a href='http://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/use-fabric-react-components'>How to use Fabric React in a web part</a></li>
                  <li><a href='https://github.com/SharePoint/sp-dev-docs/wiki'>Get started with the SharePoint Framework and build a HelloWorld web part</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id='reach-out' className={ css(styles.related, styles.reachOut) }>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className='ms-Grid-col ms-sm12 ms-lg4'>
                <h2>We want to hear from you</h2>
              </div>
            </div>
            <div className='ms-Grid-row'>
              <div className={ css('ms-Grid-col ms-sm-12 ms-lg6', styles.channel) }>
                <div className={ styles.imageWrapper }>
                  <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-github.svg' } width='128' height='128' alt='Github logo' />
                </div>
                <span className={ styles.title }>GitHub</span>
                <span className={ styles.description }>We&rsquo;re on GitHub, so you can file issues and contribute to the projects.</span>
                <a href='https://github.com/OfficeDev?query=office-ui-fabric'>See projects</a>
              </div>
              <div className={ css('ms-Grid-col ms-sm-12 ms-lg6', styles.channel) }>
                <div className={ styles.imageWrapper }>
                  <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-twitter.svg' } width='128' height='128' alt='Twitter logo' />
                </div>
                <span className={ styles.title }>Twitter</span>
                <span className={ styles.description }>Follow us for the latest news, and tweet us with your questions and suggestions.</span>
                <a href='https://twitter.com/officeuifabric'>Join the conversation</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
