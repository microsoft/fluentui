/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  css,
  createArray
} from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { MarqueeSelection, Selection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import './MarqueeSelection.Basic.Example.scss';

const PHOTOS = createArray(250, () => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);

  return {
    url: `http://placehold.it/${randomWidth}x100`,
    width: randomWidth,
    height: 100
  };
});

export interface IMarqueeSelectionBasicExampleState {
  isMarqueeEnabled: boolean;
}

export class MarqueeSelectionBasicExample extends React.Component<{}, IMarqueeSelectionBasicExampleState> {
  private _selection: Selection;
  private _isMounted: boolean;

  constructor() {
    super();

    this.state = {
      isMarqueeEnabled: true
    };

    this._selection = new Selection({
      onSelectionChanged: () => {
        if (this._isMounted) {
          this.forceUpdate();
        }
      }
    });

    this._selection.setItems(PHOTOS);
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public render() {
    return (
      <MarqueeSelection selection={ this._selection } isEnabled={ this.state.isMarqueeEnabled }>
        <Checkbox
          label='Is marquee enabled'
          defaultChecked={ true }
          onChange={ (ev, isMarqueeEnabled) => this.setState({ isMarqueeEnabled: isMarqueeEnabled! }) } />
        <p>Drag a rectangle around the items below to select them:</p>
        <ul className='ms-MarqueeSelectionBasicExample-photoList'>
          { PHOTOS.map((photo, index) => (
            <div
              key={ index }
              className={ css('ms-MarqueeSelectionBasicExample-photoCell', {
                'is-selected': this._selection.isIndexSelected(index)
              }) }
              data-is-focusable={ true }
              data-selection-index={ index }
              onClick={ () => console.log('clicked') }
              style={ { width: photo.width, height: photo.height } }>
              { index }
            </div>
          )) }
        </ul>
      </MarqueeSelection>
    );
  }

}
