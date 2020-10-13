import { Ref } from '@fluentui/react-component-ref';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { createShorthandFactory, UIComponent, UIComponentProps, commonPropTypes, ShorthandFactory } from '../../utils';

import { WithAsProp, withSafeTypeForAs } from '../../types';

export interface VideoProps extends UIComponentProps {
  /** Whether the video should start playing when rendered. Autoplay videos must be muted or they will not play immediately in certain browers like Chrome. */
  autoPlay?: boolean;

  /** Whether to display the native video controls. */
  controls?: boolean;

  /** Whether the video should automatically restart after it ends. */
  loop?: boolean;

  /** Whether the video should be allowed to play audio. */
  muted?: boolean;

  /** Image source URL for when video isn't playing. */
  poster?: string;

  /** Video source URL. */
  src?: string;
}

class Video extends UIComponent<WithAsProp<VideoProps>> {
  static create: ShorthandFactory<VideoProps>;

  static className = 'ui-video';

  static displayName = 'Video';

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    poster: PropTypes.string,
    src: PropTypes.string,
  };

  static defaultProps = {
    as: 'video',
    controls: true,
    autoPlay: false,
    muted: false,
  };

  videoRef = React.createRef<HTMLVideoElement>();

  componentDidMount() {
    this.setVideoAttributes();
  }

  componentDidUpdate() {
    this.setVideoAttributes();
  }

  componentWillUnmount() {
    // this is a workaround for a potential memory leak in Chromium which retains a Detached HTMLVideoElement when <video autoplay> is unmounted
    // https://bugs.chromium.org/p/chromium/issues/detail?id=969049
    if (this.videoRef.current) {
      this.videoRef.current.src = '';
    }
  }

  setVideoAttributes = () => {
    // React doesn't guaranty that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (this.videoRef.current) {
      this.videoRef.current.muted = !!this.props.muted;
    }
  };

  renderComponent({ accessibility, ElementType, classes, unhandledProps }) {
    const { controls, autoPlay, loop, poster, src } = this.props;

    return (
      <Ref innerRef={this.videoRef}>
        <ElementType
          autoPlay={autoPlay}
          className={classes.root}
          controls={controls}
          loop={loop}
          poster={poster}
          src={src}
          {...accessibility.attributes.root}
          {...unhandledProps}
        />
      </Ref>
    );
  }
}

Video.create = createShorthandFactory({ Component: Video, mappedProp: 'src' });

/**
 * A Video provides ability to embed video content.
 */
export default withSafeTypeForAs<typeof Video, VideoProps, 'video'>(Video);
