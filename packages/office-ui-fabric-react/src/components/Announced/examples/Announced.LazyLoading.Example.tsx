import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { createArray, Async } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack, IStackTokens, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const photoStackTokens: IStackTokens = { childrenGap: '6 6' };
const photoStackStyles: Partial<IStackStyles> = {
  root: {
    border: '1px solid black',
    padding: 10,
    overflowY: 'auto',
  },
  inner: {
    padding: 0,
  },
};

const defaultButtonStyles: Partial<IButtonStyles> = { root: { width: 150 } };

const photoCellClass = mergeStyles({
  display: 'block',
  boxSizing: 'border-box',
  width: 100,
  height: 100,
});

const DELAY = 10;
const PHOTO_COUNT = 30;

interface IPhoto {
  url: string;
  width: number;
  height: number;
}

export interface IAnnouncedLazyLoadingExampleState {
  /** Number of photos loaded so far */
  total: number;
  announced?: JSX.Element;
  loading: boolean;
  timeSinceLastAnnounce: number;
}

export interface IAnnouncedLazyLoadingExampleProps {}

export class AnnouncedLazyLoadingExample extends React.Component<
  IAnnouncedLazyLoadingExampleProps,
  IAnnouncedLazyLoadingExampleState
> {
  private _photos: IPhoto[];
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);
    this._photos = this._createPhotos();

    this.state = {
      total: 0,
      announced: undefined,
      loading: false,
      timeSinceLastAnnounce: 0,
    };
  }

  public componentDidMount() {
    const interval1 = this._async.setInterval(() => {
      const { loading, total } = this.state;
      if (loading && total < PHOTO_COUNT) {
        this.setState({ total: total + 1 });
      } else if (total === PHOTO_COUNT) {
        this.setState({ announced: undefined });
        this._async.clearInterval(interval1);
      }
    }, 2000);

    const interval2 = this._async.setInterval(() => {
      const { loading, total, timeSinceLastAnnounce } = this.state;
      if (loading) {
        this.setState({ timeSinceLastAnnounce: timeSinceLastAnnounce + 1 });

        if (timeSinceLastAnnounce === DELAY || total === PHOTO_COUNT) {
          this.setState({
            announced: <Announced message={`${total} of ${PHOTO_COUNT} photos loaded`} />,
            timeSinceLastAnnounce: 0,
          });

          if (total === PHOTO_COUNT) {
            this._async.clearInterval(interval2);
          }
        }
      }
    }, 1000);
  }

  public render(): JSX.Element {
    const { announced, total, loading } = this.state;
    const stackTokens: IStackTokens = { childrenGap: 10 };
    const percentComplete = total / PHOTO_COUNT;

    return (
      <Stack tokens={stackTokens}>
        <Text>
          Turn on Narrator and press the button to start loading photos. Announced should announce the number of photos
          loaded every 10 seconds, as that is the delay chosen for this example.
        </Text>
        <DefaultButton
          text={loading ? 'Pause loading' : 'Load photos'}
          onClick={loading ? this._pauseLoading : this._startLoading}
          styles={defaultButtonStyles}
        />
        <ProgressIndicator
          label={percentComplete < 1 ? 'Loading photos' : 'Finished loading photos'}
          percentComplete={percentComplete}
        />
        {announced}
        <FocusZone>
          <Stack
            horizontal
            wrap
            // Render the inner content as a ul (there's not currently a less-verbose way to do this)
            // tslint:disable-next-line:jsx-no-lambda
            tokens={photoStackTokens}
            styles={photoStackStyles}
            slots={{ inner: { component: 'ul' } }}
          >
            {this._renderPhotos()}
          </Stack>
        </FocusZone>
      </Stack>
    );
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  private _startLoading = () => {
    this.setState({ loading: true });
  };

  private _pauseLoading = () => {
    this.setState({ loading: false });
  };

  private _createPhotos(): IPhoto[] {
    const width = 100;
    const height = 100;

    const result = createArray(PHOTO_COUNT, () => {
      return {
        url: `http://placehold.it/${width}x${height}`,
        width: width,
        height: height,
      };
    });
    return result;
  }

  private _renderPhotos(): JSX.Element[] {
    const result = this._photos.map((photo: IPhoto, index: number) => (
      <li
        key={index}
        className={photoCellClass}
        aria-posinset={index + 1}
        aria-setsize={PHOTO_COUNT}
        aria-label="Photo"
        data-is-focusable={true}
      >
        {this.state.total > index ? <Image src={photo.url} width={photo.width} height={photo.height} /> : <div />}
      </li>
    ));

    return result;
  }
}
