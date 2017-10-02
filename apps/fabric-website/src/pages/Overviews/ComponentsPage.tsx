import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import * as stylesImport from './Overviews.module.scss';
const styles: any = stylesImport;

export class ComponentsPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader pageTitle='Components' backgroundColor='#038387' />

        <div className={ css(styles.header, styles.headerComponents) }>
          <p>Fabric&rsquo;s robust, up-to-date components are built with the React framework. Look through the component list to see the building blocks that are available using Fabric React.</p>
          <ul className={ styles.features }>
            <li>
              <span className={ styles.title }>Reusable patterns</span>
              <span className={ styles.description }>Fabric&rsquo;s components help you get buttons, navigation, and more that look like Office quickly and easily. They also contain extra functionality that helps your app act like Office too.</span>
            </li>
            <li>
              <span className={ styles.title }>Used in Office products</span>
              <span className={ styles.description }>Many Fabric React components are used in our products. We make improvements and bug fixes frequently, ensuring they work as designed across all of the <a href='https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/BROWSERSUPPORT.md'>supported browsers</a>.</span>
            </li>
          </ul>
          <p>After you&rsquo;ve explored the components, <a href='#/get-started'>get started with Fabric React in your project</a>.</p>
          <p>Fabric comes in many flavors so you can choose the one that works for you. Check out <a href='#/angular-js'>ngOfficeUIFabric</a> and <a href='#/fabric-ios'>Fabric iOS</a> to learn more about each option.</p>
          <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/components-header.svg' } width='284' height='388' alt='Illustrated representation of a DatePicker and Persona list control.' />
          <span className={ styles.title }>Design Toolkit</span>
          <span className={ styles.descriptionLarge }>The Fabric design toolkit is built with Adobe XD and provides controls and layout templates that enable you to create seamless, beautiful Office experiences.</span>
          <a href='#/resources'>Learn more</a>
        </div>
      </div>
    );
  }

}