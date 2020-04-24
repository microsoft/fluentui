import { Accessibility, embedBehavior } from '@fluentui/accessibility';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';

import {
  createShorthandFactory,
  UIComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
  AutoControlledComponent,
  ShorthandFactory,
} from '../../utils';
import Image from '../Image/Image';
import Video, { VideoProps } from '../Video/Video';
import Box, { BoxProps } from '../Box/Box';
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import { Ref } from '@fluentui/react-component-ref';

export interface EmbedSlotClassNames {
  control: string;
}

export interface EmbedProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

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

export interface EmbedState {
  active: boolean;
  iframeLoaded: boolean;
}

export const embedClassName = 'ui-embed';
export const embedSlotClassNames: EmbedSlotClassNames = {
  control: `${embedClassName}__control`,
};

class Embed extends AutoControlledComponent<WithAsProp<EmbedProps>, EmbedState> {
  static create: ShorthandFactory<EmbedProps>;

  static deprecated_className = embedClassName;

  static displayName = 'Embed';

  static propTypes = {
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

  static defaultProps = {
    as: 'span',
    accessibility: embedBehavior as Accessibility,
    control: {},
  };

  static autoControlledProps = ['active'];

  actionHandlers = {
    performClick: event => this.handleClick(event),
  };

  frameRef = React.createRef<HTMLFrameElement>();

  getInitialAutoControlledState(): EmbedState {
    return { active: false, iframeLoaded: false };
  }

  handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    const iframeNil = _.isNil(this.props.iframe);
    const newActive = !this.state.active;

    if (iframeNil || (!iframeNil && newActive)) {
      this.setState({ active: newActive });
      _.invoke(this.props, 'onActiveChange', e, { ...this.props, active: newActive });
    }

    _.invoke(this.props, 'onClick', e, { ...this.props, active: newActive });
  };

  handleFrameOverrides = predefinedProps => ({
    onLoad: (e: React.SyntheticEvent) => {
      _.invoke(predefinedProps, 'onLoad', e);

      this.setState({ iframeLoaded: true });
      this.frameRef.current.contentWindow.focus();
    },
  });

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { control, iframe, placeholder, video } = this.props;
    const { active, iframeLoaded } = this.state;

    const placeholderElement = placeholder ? (
      <Image src={placeholder} styles={styles.image} variables={{ width: variables.width, height: variables.height }} />
    ) : null;

    const hasIframe = !_.isNil(iframe);
    const hasVideo = !_.isNil(video);
    const controlVisible = !active || hasVideo;
    const placeholderVisible = !active || (hasIframe && active && !iframeLoaded);

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {active && (
          <>
            {Video.create(video, {
              defaultProps: () => ({
                autoPlay: true,
                controls: false,
                loop: true,
                muted: true,
                poster: placeholder,
                styles: styles.video,
                variables: {
                  width: variables.width,
                  height: variables.height,
                },
              }),
            })}
            {iframe && (
              <Ref innerRef={this.frameRef}>
                {Box.create(iframe, {
                  defaultProps: () => ({
                    as: 'iframe',
                    styles: styles.iframe,
                  }),
                  overrideProps: this.handleFrameOverrides,
                })}
              </Ref>
            )}
          </>
        )}

        {placeholderVisible && placeholderElement}
        {controlVisible &&
          Box.create(control, {
            defaultProps: () => ({
              className: embedSlotClassNames.control,
              styles: styles.control,
            }),
          })}
      </ElementType>
    );
  }
}

Embed.create = createShorthandFactory({ Component: Embed });

/**
 * An Embed displays content from external websites, like a post from external social network.
 *
 * @accessibility
 * A `placeholder` slot represents an [`Image`](/components/image/definition) component, please follow recommendations from its
 * accessibility section.
 */
export default withSafeTypeForAs<typeof Embed, EmbedProps, 'span'>(Embed);
