import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { Page, PageHeader } from './components';
import { AnimationTile } from './AnimationTile';
import { animationClassNames } from '@uifabric/styling';
import { getStyles } from './AnimationPage.styles';
import { CSSProperties } from 'glamor';

export class AnimationPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
    const styles: CSSProperties = getStyles();

    return (
      <Page>
        <PageHeader text='Animations' />
        <p>
          Use the animation library to create web experiences that integrate with Office 365.
          You can use the animation CSS classes for navigation, panels, dialogs, and more.
          Animations include directionality (up, down, left, right relating to origin and
          completion of tasks), enter/exit (fade in, fade out, zoom in, zoom out), and
          duration (speed of enter/exit relating to urgency or content type).
        </p>

        <p>
          When choosing a motion for side panels, consider the origin of the triggering
          element. Use the motion to create a link between the action and the resulting UI.
          For example, if the triggering element is on the right side of the interface,
          consider having the panel move in from the right.
        </p>

        <p>
          When choosing a motion for dialogs, consider the origin and tone of the content.
          For a warning or error dialog, a quick fade in might be appropriate. If the dialog
          appears when a user chooses an item to get more information, a scale-up might be
          appropriate.
        </p>

        <PageHeader text='Implementation' />

        <code>
          TODO
        </code>

        <PageHeader text='Animations' />
        <div className={ styles.grid }>
          { Object.keys(animationClassNames).map((name: string) => (
            <div className={ styles.tile } key={ name }>
              <AnimationTile name={ name } />
            </div>
          )) }
        </div>
      </Page>
    );
  }
}
