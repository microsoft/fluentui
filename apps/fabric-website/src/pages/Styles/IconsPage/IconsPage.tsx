import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { IconGrid } from '../../../components/IconGrid/IconGrid';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
const pageStyles: any = require('../../PageStyles.module.scss');

const iconData = require('../../../../node_modules/office-ui-fabric-core/src/data/icons.json');

export class IconsPage extends React.Component<any, any> {
  public render() {
    return (
      <div className={ pageStyles.pageTypography }>
        <PageHeader
          pageTitle='Icons'
          links={
            [
              {
                'text': 'Implementation',
                'location': 'implementation'
              },
              {
                'text': 'Icons',
                'location': 'icons'
              }
            ]
          }
          backgroundColor='#006f94'
        />

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='implementation'>Implementation</h2>
          <p>Fabric uses a custom font for its iconography. This font contains glyphs that you can scale, color, and style in any way. You can even flip them for right-to-left localization. To use the icons, combine the base ms-Icon class with a modifier class for the specific icon.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>`
          }
        </CodeBlock>
        <div className={ pageStyles.u_maxTextWidth }>
          <p>Note the <code>aria-hidden</code> attribute, which prevents screen readers from reading the icon. In cases where meaning is conveyed only through the icon, such as an icon-only navigation bar, use the <a href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute'><code>aria-label</code> attribute</a> on the button for accessibility.</p>
        </div>

        <strong>See the <a href='#/styles/brand-icons'>brand icons page</a> for multi-color product and document icons.</strong>

        <h2 id='icons'>Icons</h2>

        <IconGrid icons={ iconData } />
      </div>
    );
  }

}
