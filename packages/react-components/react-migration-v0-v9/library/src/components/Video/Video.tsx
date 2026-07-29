'use client';

import { useMergedRefs } from '@fluentui/react-components';
import { clsx } from 'clsx';
import * as React from 'react';
import { useVideoStyles } from './Video.styles';

/**
 * Public identity class for Video.
 *
 * @deprecated for styling — see `attachmentClassName` in ../Attachment/Attachment.tsx for the
 * full rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-Video` it used to hold was removed with
 * every other static (D16.1). Use `fuiSelector(videoClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const videoClassName = 'group/fui-video';

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
  const { className, muted, ...rest } = props;

  const videoRef = React.useRef<HTMLVideoElement>(null);

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

  // Unconditional module class FIRST, marker second, consumer className last (DECISIONS.md
  // D16.2). The marker must never be `classList[0]` — nwsapi's `:scope` polyfill throws on
  // it under jsdom (D15.1).
  const videoClasses = clsx(classes.root, 'group/fui-video', className);

  return (
    <video
      ref={useMergedRefs(ref, videoRef) as React.Ref<HTMLVideoElement>}
      role="application"
      className={videoClasses}
      controls={true}
      autoPlay={false}
      muted={muted}
      {...rest}
    />
  );
});

Video.displayName = 'Video';
