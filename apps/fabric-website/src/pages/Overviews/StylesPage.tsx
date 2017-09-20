import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import * as stylesImport from './Overviews.module.scss';
const styles: any = stylesImport;

export class StylesPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader pageTitle='Styles' backgroundColor='#006f94' />
        <div className={ css(styles.header, styles.headerStyles) }>
          <p>The <a href='https://github.com/OfficeDev/office-ui-fabric-core'>Fabric Core project</a> includes all of the base styling that&rsquo;s used throughout Microsoft. Explore each page to learn more about the core elements of Office's design language.</p>
          <ul className={ styles.features }>
            <li>
              <span className={ styles.title }>Official fonts and icons</span>
              <span className={ styles.description }>Core Fabric styling includes the icons, type, and colors we use to design and build our products.</span>
            </li>
            <li>
              <span className={ styles.title }>Microsoft&rsquo;s palette</span>
              <span className={ styles.description }>Making a custom component? These elements of our design language help you get started.</span>
            </li>
          </ul>
          <p>You can get the core styling with <a href='#/get-started#react'>Fabric React</a> or just <a href='#/get-started#core'>Fabric Core</a> on its own.</p>
          <p>Fabric&rsquo;s components use the core styling. To learn more about the fully-styled controls, check out the <a href='#/components'>components</a> page.</p>
          <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/styles-header.svg' } width='225' height='388' alt='Graphic showing elements of color and type' />
        </div>
      </div>
    );
  }

}