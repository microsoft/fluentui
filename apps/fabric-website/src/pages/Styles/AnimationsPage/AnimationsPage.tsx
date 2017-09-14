import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';

const pageStyles: any = require('../../PageStyles.module.scss');
const animationsData = require('../../../data/animations.json');

export class AnimationsPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Animations'
          links={
            [
              {
                'text': 'Usage',
                'location': 'usage'
              },
              {
                'text': 'Implementation',
                'location': 'implementation'
              },
              {
                'text': 'Animations',
                'location': 'animations'
              }
            ]
          }
          backgroundColor='#006f94'
        />
        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='usage'>Usage</h2>
          <p>Use the animation library to create web experiences that integrate with Office 365. You can use the animation CSS classes for navigation, panels, dialogs, and more. Animations include directionality (up, down, left, right relating to origin and completion of tasks), enter/exit (fade in, fade out, zoom in, zoom out), and duration (speed of enter/exit relating to urgency or content type).</p>
          <p>When choosing a motion for side panels, consider the origin of the triggering element. Use the motion to create a link between the action and the resulting UI. For example, if the triggering element is on the right side of the interface, consider having the panel move in from the right.</p>
          <p>When choosing a motion for dialogs, consider the origin and tone of the content. For a warning or error dialog, a quick fade in might be appropriate. If the dialog appears when a user chooses an item to get more information, a scale-up might be appropriate.</p>
        </div>
        <h2 id='implementation'>Implementation</h2>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<div class="ms-slideRightIn10">This content will slide in.</div>`
          }
        </CodeBlock>

        <h2 id='animations'>Animations</h2>
        <Table content={ animationsData } isAnimation={ true } responsive={ true } />
      </div>
    );
  }
}
