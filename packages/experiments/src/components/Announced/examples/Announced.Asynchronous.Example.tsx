import * as React from 'react';
import { Announced } from '../Announced';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './Announced.Example.scss';

export interface IAnnouncedAsynchronousExampleState {
  photos: { url: string; width: number; height: number }[];
  total: number;
  seconds: number;
}

export interface IAnnouncedAsynchronousExampleProps {}

/**
 * TODO: announce when focusing on a section that hasn't loaded yet
 */
export class AnnouncedAsynchronousExample extends React.Component<IAnnouncedAsynchronousExampleProps, IAnnouncedAsynchronousExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      photos: this.createPhotos(),
      total: 0,
      seconds: 0
    };

    this.renderPhotos = this.renderPhotos.bind(this);
    this.renderAnnounced = this.renderAnnounced.bind(this);

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

  private timer: number;
  private increaseTotal: number;
  private delay: number;

  public render(): JSX.Element {
    const { total } = this.state;

    return (
      <FocusZone elementType="ul" className="ms-AnnouncedExamples-photoList">
        {this.renderAnnounced(total)}
        {this.renderPhotos(total)}
      </FocusZone>
    );
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.increaseTotal);
  }

  public renderAnnounced(num: number): JSX.Element | undefined {
    if (this.state.seconds % this.delay === 0) {
      // update after an amount of time specified by delay
      const result = <Announced message={`${num}/${this.state.photos.length} photos loaded`} key={'announced-' + num} />;
      return result;
    }
    return;
  }

  public createPhotos(): { url: string; width: number; height: number }[] {
    const result = createArray(20, () => {
      return {
        url: `http://placehold.it/100x100`,
        width: 100,
        height: 100
      };
    });
    return result;
  }

  public renderPhotos(total: number): JSX.Element[] {
    const result = this.state.photos.map((photo: { url: string; width: number; height: number }, index: number) => (
      <ul
        key={index}
        className="ms-AnnouncedExamples-photoCell"
        aria-posinset={index + 1}
        aria-setsize={this.state.photos.length}
        aria-label="Photo"
        data-is-focusable={true}
      >
        {total > index ? (
          <Image src={photo.url} width={photo.width} height={photo.height} />
        ) : (
          <Spinner size={SpinnerSize.small} style={{ width: 100, height: 100 }} />
        )}
      </ul>
    ));

    return result;
  }
}
