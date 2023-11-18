import { Ref } from '@fluentui/react-component-ref';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Accessibility, VideoBehaviorProps, videoBehavior } from '@fluentui/accessibility';
import { createShorthandFactory, UIComponentProps, commonPropTypes } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import {
  getElementType,
  useStyles,
  useFluentContext,
  useUnhandledProps,
  useTelemetry,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface VideoProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<VideoBehaviorProps>;

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

export const videoClassName = 'ui-video';

export type VideoStylesProps = Required<Pick<VideoProps, 'variables'>>;

/**
 * A Video provides ability to embed video content.
 */
export const Video = React.forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Video.displayName, context.telemetry);
  setStart();

  const { controls, autoPlay, loop, poster, src, muted, variables, className, design, styles } = props;
  const videoRef = React.useRef<HTMLVideoElement>();

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Video.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Video.displayName,
  });

  React.useEffect(() => {
    // this is a workaround for a potential memory leak in Chromium which retains a Detached HTMLVideoElement when <video autoplay> is unmounted
    // https://bugs.chromium.org/p/chromium/issues/detail?id=969049
    return () => {
      if (videoRef.current) {
        // we want to perform the cleanup on the latest element rendered
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.src = '';
      }
    };
  }, []);

  React.useEffect(() => {
    // React doesn't guaranty that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (videoRef.current) {
      videoRef.current.muted = !!muted;
    }
  }, [muted]);

  const { classes } = useStyles<VideoStylesProps>(Video.displayName, {
    className: videoClassName,
    mapPropsToInlineStyles: () => ({ className, variables, design, styles }),
  });

  const element = (
    <Ref innerRef={videoRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          autoPlay,
          controls,
          ref,
          loop,
          poster,
          src,
          ...unhandledProps,
        })}
      />
    </Ref>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'video', HTMLVideoElement, VideoProps> & FluentComponentStaticProps<VideoProps>;

Video.create = createShorthandFactory({ Component: Video, mappedProp: 'src' });

Video.displayName = 'Video';

Video.propTypes = {
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

Video.defaultProps = {
  as: 'video' as const,
  accessibility: videoBehavior,
  controls: true,
  autoPlay: false,
  muted: false,
};

Video.handledProps = Object.keys(Video.propTypes) as any;
