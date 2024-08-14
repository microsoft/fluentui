import { mergeClasses, useMergedRefs } from '@fluentui/react-components';
import * as React from 'react';
import { useVideoStyles } from './Video.styles';

export const videoClassName = 'fui-Video';

/**
 * Video component props
 */
export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /**
   * The source URL of the video
   */
  src: string;

  /**
   * Whether the video should start playing automatically
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Whether the video should display controls
   * @default true
   */
  controls?: boolean;

  /**
   * Whether the video should loop
   */
  loop?: boolean;

  /**
   * Whether the video should be muted
   */
  muted?: boolean;

  /**
   * The URL of an image to display while the video is loading
   */
  poster?: string;
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  'use no memo';

  const { className, muted, ...rest } = props;

  const videoRef = React.useRef<HTMLVideoElement>();

  const classes = useVideoStyles();
  React.useEffect(() => {
    // this is a workaround for a potential memory leak in Chromium which retains a Detached HTMLVideoElement when <video autoplay> is unmounted
    // https://bugs.chromium.org/p/chromium/issues/detail?id=969049
    return () => {
      if (videoRef?.current) {
        // we want to perform the cleanup on the latest element rendered
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.src = '';
      }
    };
  }, [videoRef]);

  React.useEffect(() => {
    // React doesn't guarantee that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (videoRef.current) {
      videoRef.current.muted = !!muted;
    }
  }, [muted]);

  return (
    <video
      ref={useMergedRefs(ref, videoRef) as React.Ref<HTMLVideoElement>}
      role="application"
      className={mergeClasses(videoClassName, classes.root, className)}
      controls={true}
      autoPlay={false}
      muted={muted}
      {...rest}
    />
  );
});

Video.displayName = 'Video';
