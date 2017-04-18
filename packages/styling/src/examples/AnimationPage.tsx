import * as React from 'react';
import { BaseComponent } from '@uifabric/utilities';
import { css, CSSProperties } from 'glamor';
import { classNames } from '../classNames/index';
import { defaultPalette } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { Page, PageHeader } from './components';

const styles: CSSProperties = {
  container: {
    position: 'relative',
    background: 'green',
    height: '100px'
  },
  leftThing: {
    position: 'absolute',
    left: '10px',
    padding: '0 0 0 10px',
    width: '100px',
    height: '100px',
    background: 'red',
    border: '20px'
  },
  rightThing: {
    ...fonts.xLarge,
    right: '10px',
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: 'orange'
  }
};

export class AnimationPage extends BaseComponent<{}, {}> {

  public render(): JSX.Element {
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
        { Object.keys(classNames.animations).map(className => <AnimationExample name={ className } />) }
      </Page>
    );
  }
}

const anExStyles = {
  root: {
    marginBottom: '20px'
  },
  title: {
    ...fonts.medium,
    marginBottom: '8px'
  },
  container: {
    position: 'relative',
    maxWidth: '400px',
    height: '100px',
    border: '1px solid black',
    backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg==")',
    backgroundRepeat: 'repeat',
  },
  animationBox: {
    position: 'absolute',

    background: defaultPalette.themePrimary,
    width: '25%',
    height: '100%'
  },
  isLeft: {
    left: 0,
    top: 0,
    width: '25%',
    height: '100%'
  },
  isRight: {
    right: 0,
    top: 0,
    width: '25%',
    height: '100%'
  },
  isTop: {
    left: 0,
    top: 0,
    width: '100%',
    height: '50%'
  },
  isBottom: {
    left: 0,
    bottom: 0,
    width: '100%',
    height: '50%'
  },
  isIn: {
    opacity: 0
  }
};

class AnimationExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      isAnimating: false
    };
  }

  public render() {
    let name: string = this.props.name;
    let isIn = name.indexOf('In') >= 0;
    let positioningStyle;
    let isInStyle = isIn ? anExStyles.isIn : null;

    if (name.indexOf('Left') >= 0) {
      positioningStyle = anExStyles.isRight;
    } else if (name.indexOf('Right') >= 0) {
      positioningStyle = anExStyles.isLeft;
    } else if (name.indexOf('Up') >= 0) {
      positioningStyle = isIn ? anExStyles.isBottom : anExStyles.isTop;
    } else {
      positioningStyle = isIn ? anExStyles.isTop : anExStyles.isBottom;
    }

    return (
      <div { ...css(anExStyles.root) } onClick={ this._onClick }>
        <div { ...css(anExStyles.title) }>{ this.props.name }</div>
        <div { ...css(anExStyles.container) }>
          <div
            { ...css(anExStyles.animationBox, positioningStyle, isInStyle) }
            className={ this.state.isAnimating && classNames.animations[this.props.name] } />
        </div>
      </div>
    );
  }

  private _onClick = () => {
    this.setState({ isAnimating: true });
    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 2000);
  };
}
