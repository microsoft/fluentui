import * as React from 'react';

import { css, createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { MarqueeSelection, Selection, IObjectWithKey } from 'office-ui-fabric-react/lib/MarqueeSelection';
import * as styles from './MarqueeSelection.Basic.Example.scss';

interface IPhoto extends IObjectWithKey {
  url: string;
  width: number;
  height: number;
}

const PHOTOS: IPhoto[] = createArray(250, (index: number) => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);

  return {
    key: index,
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

  constructor(props: {}) {
    super(props);

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

  public componentDidMount(): void {
    this._isMounted = true;
  }

  public render(): JSX.Element {
    return (
      <MarqueeSelection selection={this._selection} isEnabled={this.state.isMarqueeEnabled}>
        <Checkbox styles={{ root: { margin: '10px 0' } }} label="Is marquee enabled" defaultChecked={true} onChange={this._onChange} />
        <p>Drag a rectangle around the items below to select them:</p>
        <ul className={styles.photoList}>
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={css(styles.photoCell, this._selection.isIndexSelected(index) && 'is-selected')}
              data-is-focusable={true}
              data-selection-index={index}
              onClick={this._log('clicked')}
              style={{ width: photo.width, height: photo.height }}
            >
              {index}
            </div>
          ))}
        </ul>
      </MarqueeSelection>
    );
  }

  private _log(text: string): () => void {
    return (): void => {
      console.log(text);
    };
  }

  private _onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, isMarqueeEnabled: boolean | undefined): void => {
    this.setState({ isMarqueeEnabled: isMarqueeEnabled! });
  };
}
