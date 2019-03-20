import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import * as stylesImport from './IconsPage.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../../PageStyles.module.scss');

const iconData = require('office-ui-fabric-core/src/data/icons.json');

export class IconsPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={css(pageStyles.basePage, styles.iconsPage)}>
        <PageHeader
          pageTitle="Icons"
          links={[
            {
              text: 'Implementation',
              location: 'implementation'
            },
            {
              text: 'Icons',
              location: 'icons'
            }
          ]}
          backgroundColor="#006f94"
        />

        <div className={pageStyles.u_maxTextWidth}>
          <h2 id="implementation">Overview</h2>
          <p>
            Fabric uses a custom font for its iconography. This font contains glyphs that you can scale, color, and style in any way. You
            can even flip them for right-to-left localization. You can also <a href="https://aka.ms/fabric-design-downloads">download</a>{' '}
            and install the icon font to use it with various design apps like Sketch, Figma, or Adobe XD.
          </p>

          <p>
            <strong>
              The icons on this page refer to the general-use monoline icons. See the{' '}
              <a className={styles.iconsPageLink} href="#/styles/brand-icons">
                brand icons page
              </a>{' '}
              for multi-color product and document icons.
            </strong>
          </p>

          <h2>Usage</h2>

          <p>You can use Fabric's icons in a few ways, depending on if you're using Fabric React or Fabric Core.</p>

          <h3>Fabric Core</h3>
          <p>
            Begin by referencing the styles by adding this to the <code>head</code> element:
          </p>
        </div>

        <CodeBlock language="html" isLightTheme={true}>
          {`<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css">`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>
            Next, set the <code>dir</code> attribute on the html tag to indicate the reading direction for the page. This will select the
            appropriate icon for the user's reading direction.
          </p>
        </div>

        <CodeBlock language="html" isLightTheme={true}>
          {`<html dir="ltr">`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>Then, in your app, combine the base ms-Icon class with a modifier class for the specific icon:</p>
        </div>

        <CodeBlock language="html" isLightTheme={true}>
          {`<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>
            Note the <code>aria-hidden</code> attribute, which prevents screen readers from reading the icon. In cases where meaning is
            conveyed only through the icon, such as an icon-only navigation bar, use the{' '}
            <a
              className={styles.iconsPageLink}
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute"
            >
              <code>aria-label</code> attribute
            </a>{' '}
            on the button for accessibility.
          </p>

          <h3>Fabric React</h3>

          <p>
            If you're using Fabric React, note that icons are not included in your bundle by default. To make the icons available, you will
            need to initialize them with a call to <code>@uifabric/icon</code>
            's <code>initializeIcons</code> function, usually at the root of your app:
          </p>
        </div>

        <CodeBlock language="javascript" isLightTheme={true}>
          {`import { initializeIcons } from '@uifabric/icons';
initializeIcons();`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>
            By default, this will load the icon fonts from the CDN used by OneDrive, SharePoint, and other Microsoft products. If you want
            to control where the fonts are served from, you can host them from another CDN or file share and pass that location to{' '}
            <code>initializeIcons</code>:
          </p>
        </div>

        <CodeBlock language="javascript" isLightTheme={true}>
          {`initializeIcons('https://my.cdn.com/path/to/icons/');`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>
            For an explanation of what <code>initializeIcons</code> does, and more details, check out Fabric's{' '}
            <a href="https://github.com/OfficeDev/office-ui-fabric-react/wiki/Using-icons">wiki page for Using icons</a>.
          </p>

          <p>
            Once you've initialized the icons, you can use the{' '}
            <a href="https://developer.microsoft.com/en-us/fabric#/components/icon">Icon component</a> in your app like any other Fabric
            component:
          </p>
        </div>

        <CodeBlock language="javascript" isLightTheme={true}>
          {`import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const MyIcon = () => (
  <Icon iconName="CompassNW" className="ms-IconExample" />
);

ReactDOM.render(<MyIcon />, document.body.firstChild);`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <p>
            Some components also include baked-in support for Icon via{' '}
            <a href="https://developer.microsoft.com/en-us/fabric#/components/icon#Implementation">iconProps</a>, which you can use to
            configure how the icon renders. Here's an example using IconButton:
          </p>
        </div>

        <CodeBlock language="javascript" isLightTheme={true}>
          {`import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

const MyIconButton = () => (
  <IconButton iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" />
);

ReactDOM.render(<MyIconButton />, document.body.firstChild);
`}
        </CodeBlock>

        <div className={pageStyles.u_maxTextWidth}>
          <h3>Fabric Icons tool</h3>

          <p>
            The Fabric Icons tool, <a href="https://aka.ms/uifabric-icons">{'https://aka.ms/uifabric-icons'}</a>, lets you search and browse
            all of Fabric's icons. You can also use it to create and maintain subsets of the icon font to use in your web apps, which are
            drop-in replacements for the default Fabric Core and Fabric React icon sets. In addition, the Fabric Icons tool is updated with
            new icons several times a month, whereas the default Fabric set is updated only occasionally. You can see detailed docs for the
            tool at <a href="https://aka.ms/uifabric-icons?help">{'https://aka.ms/uifabric-icons?help'}</a>.
          </p>
        </div>

        <h2 id="icons">Icons</h2>

        <IconGrid icons={iconData} />
      </div>
    );
  }
}
