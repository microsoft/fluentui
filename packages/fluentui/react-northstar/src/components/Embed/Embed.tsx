import { Accessibility, embedBehavior, EmbedBehaviorProps } from '@fluentui/accessibility';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';

import { createShorthandFactory, UIComponentProps, commonPropTypes } from '../../utils';
import { Image } from '../Image/Image';
import { Video, VideoProps } from '../Video/Video';
import { Box, BoxProps } from '../Box/Box';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Ref } from '@fluentui/react-component-ref';
import {
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAutoControlled,
  useAccessibility,
  useTelemetry,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface EmbedSlotClassNames {
  control: string;
}

export interface EmbedProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<EmbedBehaviorProps>;

  /** Alternative text. */
  alt?: string;

  /** Corresponds to HTML title attribute. */
  title?: string;

  /** Whether the embedded object should be active. */
  active?: boolean;

  /** Whether the embedded object should start active. */
  defaultActive?: boolean;

  /** Shorthand for an control. */
  control?: ShorthandValue<BoxProps>;

  /** Shorthand for an embedded iframe. */
  iframe?: ShorthandValue<BoxProps>;

  /**
   * Event for request to change 'active' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onActiveChange?: ComponentEventHandler<EmbedProps>;

  /**
   * Called when is clicked.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onClick?: ComponentEventHandler<EmbedProps>;

  /** Image source URL for when video isn't playing. */
  placeholder?: string;

  /** Shorthand for an embedded video. */
  video?: ShorthandValue<VideoProps>;
}

export const embedClassName = 'ui-embed';
export const embedSlotClassNames: EmbedSlotClassNames = {
  control: `${embedClassName}__control`,
};

export type EmbedStylesProps = Required<Pick<EmbedProps, 'active'>> & { iframeLoaded: boolean };

/**
 * An Embed displays content from external websites, like a post from external social network.
 *
 * @accessibility
 * A `placeholder` slot represents an [`Image`](/components/image/definition) component, please follow recommendations from its
 * accessibility section.
 */
export const Embed = React.forwardRef<HTMLSpanElement, EmbedProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Embed.displayName, context.telemetry);
  setStart();
  const { alt, title, control, iframe, placeholder, video, variables, styles, className, design } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Embed.handledProps, props);

  const getA11yProps = useAccessibility<EmbedBehaviorProps>(props.accessibility, {
    debugName: Embed.displayName,
    actionHandlers: {
      performClick: event => handleClick(event),
    },
    mapPropsToBehavior: () => ({
      alt,
      title,
    }),
    rtl: context.rtl,
  });

  const [active, setACtive] = useAutoControlled({
    defaultValue: props.defaultActive,
    value: props.active,
    initialValue: false,
  });

  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const frameRef = React.useRef<HTMLFrameElement>();

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    const iframeNil = _.isNil(props.iframe);
    const newActive = !active;

    if (iframeNil || (!iframeNil && newActive)) {
      setACtive(newActive);
      _.invoke(props, 'onActiveChange', e, { ...props, active: newActive });
    }

    _.invoke(props, 'onClick', e, { ...props, active: newActive });
  };

  const handleFrameOverrides = predefinedProps => ({
    onLoad: (e: React.SyntheticEvent) => {
      _.invoke(predefinedProps, 'onLoad', e);
      setIframeLoaded(true);
      frameRef.current.contentWindow.focus();
    },
  });

  const { classes, styles: resolvedStyles } = useStyles<EmbedStylesProps>(Embed.displayName, {
    className: embedClassName,
    mapPropsToStyles: () => ({
      iframeLoaded,
      active,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const placeholderElement = placeholder ? (
    <Image
      src={placeholder}
      styles={resolvedStyles.image}
      variables={{ width: variables.width, height: variables.height }}
    />
  ) : null;

  const hasIframe = !_.isNil(iframe);
  const hasVideo = !_.isNil(video);
  const controlVisible = !active || hasVideo;
  const placeholderVisible = !active || (hasIframe && active && !iframeLoaded);

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onClick: handleClick,
        ref,
        ...unhandledProps,
      })}
    >
      {active && (
        <>
          {Video.create(video, {
            defaultProps: () =>
              getA11yProps('video', {
                autoPlay: true,
                controls: false,
                loop: true,
                muted: true,
                poster: placeholder,
                styles: resolvedStyles.video,
                variables: {
                  width: variables.width,
                  height: variables.height,
                },
              }),
          })}
          {iframe && (
            <Ref innerRef={frameRef}>
              {Box.create(iframe, {
                defaultProps: () =>
                  getA11yProps('iframe', {
                    as: 'iframe',
                    styles: resolvedStyles.iframe,
                  }),
                overrideProps: handleFrameOverrides,
              })}
            </Ref>
          )}
        </>
      )}

      {placeholderVisible && placeholderElement}
      {controlVisible &&
        Box.create(control, {
          defaultProps: () =>
            getA11yProps('control', {
              className: embedSlotClassNames.control,
              styles: resolvedStyles.control,
            }),
        })}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, EmbedProps> & FluentComponentStaticProps<EmbedProps>;

Embed.displayName = 'Embed';

Embed.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  active: PropTypes.bool,
  defaultActive: PropTypes.bool,
  control: customPropTypes.itemShorthand,
  iframe: customPropTypes.every([customPropTypes.disallow(['video']), customPropTypes.itemShorthand]),
  onActiveChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  video: customPropTypes.every([customPropTypes.disallow(['iframe']), customPropTypes.itemShorthand]),
};

Embed.defaultProps = {
  as: 'span' as const,
  accessibility: embedBehavior,
  control: {},
  variables: {},
};

Embed.handledProps = Object.keys(Embed.propTypes) as any;

Embed.create = createShorthandFactory({ Component: Embed });
