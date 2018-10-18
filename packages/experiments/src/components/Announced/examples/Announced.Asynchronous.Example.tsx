import * as React from 'react';
import { Announced } from '../Announced';
import { createArray, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import './Announced.Example.scss';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export interface IAnnouncedAsynchronousExampleState {
  photos: { url: string; width: number; height: number }[];
  total: number;
  seconds: number;
  announced: JSX.Element;
  percentComplete: number;
}

export interface IAnnouncedAsynchronousExampleProps { }

/**
 * TODO: announce when focusing on a section that hasn't loaded yet
 */
export class AnnouncedAsynchronousExample extends React.Component<IAnnouncedAsynchronousExampleProps, IAnnouncedAsynchronousExampleState> {
  private _root = createRef<HTMLElement>();
  private timer: number;
  private increaseTotal: number;
  private delay: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      photos: this._createPhotos(),
      total: 0,
      seconds: 0,
      announced: <Announced message="" />,
      percentComplete: 0
    };

    this._renderPhotos = this._renderPhotos.bind(this);
    this._renderAnnounced = this._renderAnnounced.bind(this);
    this._onFocusPhotoCell = this._onFocusPhotoCell.bind(this);

    this.increaseTotal = setInterval(() => {
      if (this.state.total < this.state.photos.length) {
        this.setState({ total: this.state.total + 1 });
      }
    }, 2000);

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);

    this.delay = 10;
  }

  public render(): JSX.Element {
    const { percentComplete } = this.state;

    return (
      <div>
        <ProgressIndicator label={percentComplete < 1 ? 'Loading photos' : 'Finished loading photos'} percentComplete={percentComplete} />
        <FocusZone elementType="ul" className="ms-AnnouncedExamples-photoList">
          {this._renderAnnounced()}
          {this._renderPhotos()}
        </FocusZone>
      </div>
    );
  }

  public componentWillUnmount(): void {
    clearTimeout(this.timer);
    clearTimeout(this.increaseTotal);
  }

  public componentDidUpdate(): void {
    const percentComplete = this.state.total / this.state.photos.length;
    if (percentComplete !== this.state.percentComplete) {
      this.setState({ percentComplete: percentComplete });
    }
  }

  private _renderAnnounced(): JSX.Element {
    const { seconds, total, photos } = this.state;

    if (seconds % this.delay === 0) {
      // update after an amount of time specified by delay
      const result = <Announced message={`${total}/${photos.length} photos loaded`} id={'announced-' + total} />;
      return result;
    }
    return this.state.announced;
  }

  private _createPhotos(): { url: string; width: number; height: number }[] {
    const result = createArray(30, () => {
      return {
        url: `http://placehold.it/100x100`,
        width: 100,
        height: 100
      };
    });
    return result;
  }

  private _onFocusPhotoCell(): void {
    if (
      document.activeElement &&
      document.activeElement.children &&
      document.activeElement.children[0].className.startsWith('ms-Spinner')
    ) {
      this.setState({ announced: <Announced message={`Photo loading`} /> });
    }
  }

  private _renderPhotos(): JSX.Element[] {
    const result = this.state.photos.map((photo: { url: string; width: number; height: number }, index: number) => (
      <ul
        key={index}
        className="ms-AnnouncedExamples-photoCell"
        aria-posinset={index + 1}
        aria-setsize={this.state.photos.length}
        aria-label="Photo"
        data-is-focusable={true}
        ref={this._root}
        onFocus={this._onFocusPhotoCell}
      >
        {this.state.total > index ? (
          <Image src={photo.url} width={photo.width} height={photo.height} />
        ) : (
            <div />
          )}
      </ul>
    ));

    return result;
  }
}
