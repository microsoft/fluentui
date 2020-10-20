import * as React from 'react';
import { css, Icon } from '@fluentui/react';
import { IVideoProps } from './Video.types';
import * as styles from './Video.module.scss';

export interface IVideoState {
  isReadyToPlay: boolean;
}

export class Video extends React.Component<IVideoProps, IVideoState> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  public constructor(props: IVideoProps) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      isReadyToPlay: true,
    };
  }

  public play = (): void => {
    if (this.videoRef.current) {
      this.videoRef.current.play();

      this.setState({
        isReadyToPlay: false,
      });
    }
  };

  public rewind = (): void => {
    if (this.videoRef.current) {
      this.videoRef.current.pause();
      this.videoRef.current.currentTime = 0;

      this.setState({
        isReadyToPlay: true,
      });
    }
  };

  public render(): JSX.Element {
    const { source } = this.props;

    return (
      <div className={styles.video} onClick={this._handlePlay}>
        <video width="100%" height="auto" ref={this.videoRef} onEnded={this._handleEnded}>
          <source src={source} type="video/mp4" />
        </video>
        <button
          className={css(styles.playButton, {
            [styles.isHidden]: !this.state.isReadyToPlay,
          })}
        >
          <Icon className={styles.icon} iconName="Play" />
        </button>
      </div>
    );
  }

  private _handlePlay = (): void => {
    this.play();
  };

  private _handleEnded = (): void => {
    this.rewind();
  };
}
