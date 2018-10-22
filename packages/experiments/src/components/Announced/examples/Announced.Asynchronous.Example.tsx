import * as React from 'react';
import { Announced } from '../Announced';
import { createArray, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './Announced.Example.scss';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export interface IAnnouncedAsynchronousExampleState {
  photos: { url: string; width: number; height: number }[];
  total: number;
  seconds: number;
  announced?: JSX.Element;
  percentComplete: number;
  loading: boolean;
}

export interface IAnnouncedAsynchronousExampleProps {}

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
      announced: undefined,
      percentComplete: 0,
      loading: false
    };

    this._renderPhotos = this._renderPhotos.bind(this);
    this._renderAnnounced = this._renderAnnounced.bind(this);
    this._onFocusPhotoCell = this._onFocusPhotoCell.bind(this);
    this._onToggleChange = this._onToggleChange.bind(this);

    this.increaseTotal = setInterval(() => {
      if (this.state.loading && this.state.total < this.state.photos.length) {
        this.setState({ total: this.state.total + 1 });
      }
    }, 2000);

    this.timer = setInterval(() => {
      if (this.state.loading) {
        this.setState({ seconds: this.state.seconds + 1 });

        if (this.state.seconds % this.delay === 0) {
          this.setState({
            announced: (
              <Announced message={`${this.state.total}/${this.state.photos.length} photos loaded`} id={'announced-' + this.state.total} />
            )
          });
        } else {
          this.setState({ announced: undefined });
        }
      }
    }, 1000);

    this.delay = 10;
  }

  public render(): JSX.Element {
    const { percentComplete } = this.state;

    return (
      <>
        <p>
          Turn on Narrator and check the toggle to start loading photos. Announced should announce the number of photos loaded every 10
          seconds, as that is the delay chosen for this example.
        </p>
        <p>When focusing on a photo that hasn't loaded yet, the Announced component should announce "Photo loading".</p>
        <Toggle label="Check to start loading photos" onText="Start/Resume" offText="Pause" onChange={this._onToggleChange} />
        <ProgressIndicator label={percentComplete < 1 ? 'Loading photos' : 'Finished loading photos'} percentComplete={percentComplete} />
        <FocusZone elementType="ul" className="ms-AnnouncedExamples-photoList">
          {this._renderAnnounced()}
          {this._renderPhotos()}
        </FocusZone>
      </>
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

  private _onToggleChange(): void {
    this.setState({ loading: !this.state.loading });
  }

  private _renderAnnounced(): JSX.Element | undefined {
    const { announced } = this.state;

    return announced;
  }

  private _createPhotos(): { url: string; width: number; height: number }[] {
    const width = 100;
    const height = 100;

    const result = createArray(30, () => {
      return {
        url: `http://placehold.it/${width}x${height}`,
        width: width,
        height: height
      };
    });
    return result;
  }

  private _onFocusPhotoCell(): void {
    if (
      document.activeElement &&
      document.activeElement.children &&
      document.activeElement.children[0] &&
      document.activeElement.children[0].children.length === 0
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
        {this.state.total > index ? <Image src={photo.url} width={photo.width} height={photo.height} /> : <div />}
      </ul>
    ));

    return result;
  }
}
