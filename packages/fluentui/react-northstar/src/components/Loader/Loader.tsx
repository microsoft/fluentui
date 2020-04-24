import { Accessibility, loaderBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
  ShorthandFactory,
  getOrGenerateIdFromShorthand,
} from '../../utils';
import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import Box, { BoxProps } from '../Box/Box';
import Text, { TextProps } from '../Text/Text';

export interface LoaderSlotClassNames {
  indicator: string;
  label: string;
  svg: string;
}

export interface LoaderProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Time in milliseconds after component mount before spinner is visible. */
  delay?: number;

  /** A loader can contain an indicator. */
  indicator?: ShorthandValue<BoxProps>;

  /** Loaders can appear inline with content. */
  inline?: boolean;

  /** A loader can contain a label. */
  label?: ShorthandValue<TextProps>;

  /** A label in the loader can have different positions. */
  labelPosition?: 'above' | 'below' | 'start' | 'end';

  /** A size of the loader. */
  size?: SizeValue;

  /** A loader can contain a custom svg element. */
  svg?: ShorthandValue<BoxProps>;
}

export interface LoaderState {
  visible: boolean;
  labelId: string;
}

export const loaderClassName = 'ui-loader';
export const loaderSlotClassNames: LoaderSlotClassNames = {
  indicator: `${loaderClassName}__indicator`,
  label: `${loaderClassName}__label`,
  svg: `${loaderClassName}__svg`,
};

/**
 * A loader alerts a user that content is being loaded or processed and they should wait for the activity to complete.
 */
class Loader extends UIComponent<WithAsProp<LoaderProps>, LoaderState> {
  static create: ShorthandFactory<LoaderProps>;
  static displayName = 'Loader';
  static deprecated_className = loaderClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    delay: PropTypes.number,
    indicator: customPropTypes.itemShorthand,
    inline: PropTypes.bool,
    label: customPropTypes.itemShorthand,
    labelPosition: PropTypes.oneOf(['above', 'below', 'start', 'end']),
    size: customPropTypes.size,
    svg: customPropTypes.itemShorthand,
  };

  static defaultProps = {
    accessibility: loaderBehavior,
    delay: 0,
    indicator: {},
    labelPosition: 'below',
    svg: '',
    size: 'medium',
  };

  delayTimer: number;

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: this.props.delay === 0,
      labelId: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      labelId: getOrGenerateIdFromShorthand('loader-label-', props.label, state.labelId),
    };
  }

  componentDidMount() {
    const { delay } = this.props;

    if (delay > 0) {
      // @ts-ignore We have a collision between types from DOM and @types/node
      this.delayTimer = setTimeout(() => {
        this.setState({ visible: true });
      }, delay);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
  }

  renderComponent({ ElementType, classes, accessibility, variables, styles, unhandledProps }) {
    const { indicator, label, svg } = this.props;
    const { visible, labelId } = this.state;

    const svgElement = Box.create(svg, {
      defaultProps: () => ({ className: loaderSlotClassNames.svg, styles: styles.svg }),
    });

    return (
      visible && (
        <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
          {Box.create(indicator, {
            defaultProps: () => ({
              children: svgElement,
              className: loaderSlotClassNames.indicator,
              styles: styles.indicator,
            }),
          })}
          {Text.create(label, {
            defaultProps: () => ({
              className: loaderSlotClassNames.label,
              styles: styles.label,
              id: labelId,
            }),
          })}
        </ElementType>
      )
    );
  }
}

Loader.create = createShorthandFactory({ Component: Loader, mappedProp: 'label' });

/**
 * A Loader alerts a user to wait for an activity to complete.
 *
 * @accessibility
 * Implements [ARIA progressbar](https://www.w3.org/TR/wai-aria-1.1/#progressbar) role.
 */
export default withSafeTypeForAs<typeof Loader, LoaderProps>(Loader);
