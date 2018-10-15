import * as React from 'react';
import { Announced } from '../Announced';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './Announced.Example.scss';

export interface IAnnouncedAsynchronousExampleState {
  photos: { url: string, width: number, height: number }[];
  num: number;
  renderAnnounced: boolean;
}

export interface IAnnouncedAsynchronousExampleProps { }

export class AnnouncedAsynchronousExample extends React.Component<IAnnouncedAsynchronousExampleProps, IAnnouncedAsynchronousExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      photos: this._createPhotos(),
      num: 0,
      renderAnnounced: false
    };

    this._renderPhotos = this._renderPhotos.bind(this);
    this._increaseNum = this._increaseNum.bind(this);

    this.timer = setInterval(this._increaseNum, 8000);
  }

  private timer: number;

  public render(): JSX.Element {
    return (
      <FocusZone elementType="ul" className="ms-AnnouncedExamples-photoList">
        {this.state.renderAnnounced ? <Announced message="Photo loaded" key={"announced-" + this.state.num} /> : null}
        {this._renderPhotos(this.state.num)}
      </FocusZone>
    );
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public componentWillUpdate(nextProps: IAnnouncedAsynchronousExampleProps, nextState: IAnnouncedAsynchronousExampleState) {
    if (nextState.num !== this.state.num) {
      this.setState({ renderAnnounced: true });
    }
  }

  public _increaseNum(): void {
    if (this.state.num < 20) {
      this.setState({ num: this.state.num + 1 });
    }
  }

  public _createPhotos(): { url: string, width: number, height: number }[] {
    let result = createArray(20, () => {
      return {
        url: `http://placehold.it/100x100`,
        width: 100,
        height: 100
      };
    })
    return result;
  }

  public _renderPhotos(num: number): JSX.Element[] {
    let result =
      this.state.photos.map((photo: { url: string, width: number, height: number }, index: number) => (
        <ul
          key={index}
          className="ms-AnnouncedExamples-photoCell"
          aria-posinset={index + 1}
          aria-setsize={this.state.photos.length}
          aria-label="Photo"
          data-is-focusable={true}
        >
          {num > index ?
            <Image src={photo.url} width={photo.width} height={photo.height} /> :
            <Spinner size={SpinnerSize.small} style={{ width: 100, height: 100 }} />
          }
        </ul>
      ));

    return result;
  }
}
