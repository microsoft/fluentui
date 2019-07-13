import * as React from 'react';
import { classNamesFunction, DefaultButton, IStyle, Overlay } from 'office-ui-fabric-react';

interface IOverlayExampleStyles {
  root: IStyle;
}

const exampleStyles: IOverlayExampleStyles = {
  root: [
    'OverlayExample-content',
    {
      background: 'blue',
      bottom: '0',
      color: 'white',
      left: '0',
      padding: '10px',
      position: 'absolute',
      right: '0'
    }
  ]
};

export class OverlayDarkExample extends React.Component<
  {},
  {
    isOverlayVisible: boolean;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = { isOverlayVisible: false };
  }

  public render(): JSX.Element {
    const { isOverlayVisible } = this.state;
    const getClassNames = classNamesFunction<{}, IOverlayExampleStyles>();
    const classNames = getClassNames(exampleStyles, {});

    return (
      <div>
        <DefaultButton onClick={this._toggleOverlay} text="Show the overlay" />
        {isOverlayVisible && (
          <Overlay isDarkThemed={true} onClick={this._setVisibilityFalse}>
            <div className={classNames.root}>
              <p>I am content within the overlay.</p>
            </div>
          </Overlay>
        )}
      </div>
    );
  }

  private _setVisibilityFalse = (): void => {
    this.setState({ isOverlayVisible: false });
  };

  private _toggleOverlay = (): void => {
    this.setState({ isOverlayVisible: !this.state.isOverlayVisible });
  };
}
