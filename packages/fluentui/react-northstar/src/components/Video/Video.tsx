import { Ref } from '@fluentui/react-component-ref';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Accessibility } from '@fluentui/accessibility';
import { createShorthandFactory, UIComponentProps, commonPropTypes } from '../../utils';
import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps } from '../../types';
import { getElementType, useStyles, useUnhandledProps, useTelemetry, useAccessibility } from '@fluentui/react-bindings';
import { ProviderContextPrepared, ComponentVariablesInput } from '@fluentui/react-northstar';
// @ts-ignore
import { ThemeContext } from 'react-fela';

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

  accessibility?: Accessibility;

  variables?: ComponentVariablesInput;
}

export const videoClassName = 'ui-video';

export const Video: React.FC<WithAsProp<VideoProps>> & FluentComponentStaticProps<VideoProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Video.displayName, context.telemetry);
  setStart();
  const { controls, autoPlay, loop, poster, src, muted, variables, className } = props;
  const ElementType = getElementType(props);
  const videoRef = React.createRef<HTMLVideoElement>();
  const unhandledProps = useUnhandledProps(Video.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Video.displayName,
  });

  const setVideoAttributes = () => {
    // React doesn't guaranty that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (videoRef.current) {
      videoRef.current.muted = !!muted;
    }
  };

  React.useEffect(() => {
    setVideoAttributes();
  });

  const { classes, styles: ResolvedStyles } = useStyles(Video.displayName, {
    className: videoClassName,
    mapPropsToStyles: () => ({
      variables,
    }),
    mapPropsToInlineStyles: () => ({ className }),
  });

  const element = (
    <Ref innerRef={videoRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ...unhandledProps,
          styles: ResolvedStyles,
        })}
        autoPlay={autoPlay}
        className={classes.root}
        controls={controls}
        loop={loop}
        poster={poster}
        src={src}
        {...unhandledProps}
      />
    </Ref>
  );
  setEnd();
  return element;
};

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
  as: 'video',
  controls: true,
  autoPlay: false,
  muted: false,
};

Video.handledProps = Object.keys(Video.propTypes) as any;

/**
 * A Video provides ability to embed video content.
 */
export default withSafeTypeForAs<typeof Video, VideoProps, 'video'>(Video);
