import * as React from 'react';
import { Announced } from '../Announced';
import { createArray, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './Announced.Example.scss';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

const DELAY = 10;

export interface IAnnouncedAsynchronousExampleState {
  photos: { url: string; width: number; height: number }[];
  total: number;
  announced?: JSX.Element;
  percentComplete: number;
  loading: boolean;
  complete: boolean;
  timeSinceLastAnnounce: number;
}

export interface IAnnouncedAsynchronousExampleProps {}

export class AnnouncedAsynchronousExample extends React.Component<IAnnouncedAsynchronousExampleProps, IAnnouncedAsynchronousExampleState> {
  private _root = createRef<HTMLElement>();
  private timer: number;
  private increaseTotal: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      photos: this._createPhotos(),
      total: 0,
      announced: undefined,
      percentComplete: 0,
      loading: false,
      complete: false,
      timeSinceLastAnnounce: 0
    };

    this._renderPhotos = this._renderPhotos.bind(this);
    this._renderAnnounced = this._renderAnnounced.bind(this);
    this._onFocusPhotoCell = this._onFocusPhotoCell.bind(this);
    this._onToggleChange = this._onToggleChange.bind(this);

    this.increaseTotal = setInterval(() => {
      if (this.state.loading && this.state.total < this.state.photos.length) {
        this.setState({ total: this.state.total + 1 });
      } else if (this.state.total === this.state.photos.length && this.state.complete !== true) {
        this.setState({ complete: true, announced: undefined });
      }
    }, 2000);

    this.timer = setInterval(() => {
      if (this.state.loading && !this.state.complete) {
        this.setState({ timeSinceLastAnnounce: this.state.timeSinceLastAnnounce + 1 });

        if (this.state.timeSinceLastAnnounce === DELAY || this.state.percentComplete === 1) {
          this.setState({
            announced: (
              <Announced
                message={`${this.state.total} of ${this.state.photos.length} photos loaded`}
                id={'announced-' + this.state.total}
              />
            ),
            timeSinceLastAnnounce: 0
          });
        }
      }
    }, 1000);
  }

  public render(): JSX.Element {
    const { percentComplete } = this.state;

    return (
      <>
        <p>
          Turn on Narrator and check the toggle to start loading photos. Announced should announce the number of photos loaded every 10
          seconds, as that is the delay chosen for this example.
        </p>
        <p>
          An exception is if a user focuses on a photo that hasn't loaded yet. When focusing on a photo that hasn't loaded yet, the
          Announced component should announce "Photo loading" and another status message should not be read for another 10 seconds. Once
          this status message triggered by the focus event is sent to the screen reader, the 10 second timer starts again so that the status
          messages are not read over one another.
        </p>
        <Toggle label="Check to start loading photos" onText="Start/Resume" offText="Pause" onChange={this._onToggleChange} />
        <ProgressIndicator label={percentComplete < 1 ? 'Loading photos' : 'Finished loading photos'} percentComplete={percentComplete} />
        {this._renderAnnounced()}
        <FocusZone elementType="ul" className="ms-AnnouncedExamples-photoList">
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
    if (percentComplete !== this.state.percentComplete && this.state.percentComplete < 1) {
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
      this.setState({
        timeSinceLastAnnounce: 0,
        announced: (
          <Announced
            message={`Photo loading`}
            id={
              'announced-photo-' +
              (document.activeElement.getAttribute('aria-posinset')
                ? document.activeElement.getAttribute('aria-posinset')
                : this.state.total)
            }
          />
        )
      });
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
