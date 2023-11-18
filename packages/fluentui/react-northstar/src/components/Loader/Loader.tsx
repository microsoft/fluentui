import { Accessibility, loaderBehavior, LoaderBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import {
  ShorthandConfig,
  useTelemetry,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useStyles,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
  getOrGenerateIdFromShorthand,
} from '../../utils';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { Text, TextProps } from '../Text/Text';

export interface LoaderSlotClassNames {
  indicator: string;
  label: string;
}

export interface LoaderProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<LoaderBehaviorProps>;

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

  /** A loader can be secondary */
  secondary?: boolean;
}

export interface LoaderState {
  visible: boolean;
  labelId: string;
}

export const loaderClassName = 'ui-loader';
export const loaderSlotClassNames: LoaderSlotClassNames = {
  indicator: `${loaderClassName}__indicator`,
  label: `${loaderClassName}__label`,
};

export type LoaderStylesProps = Pick<LoaderProps, 'inline' | 'labelPosition' | 'size' | 'secondary'>;

/**
 * A loader alerts a user that content is being loaded or processed and they should wait for the activity to complete.
 *
 * @accessibility
 * Implements [ARIA progressbar](https://www.w3.org/TR/wai-aria-1.1/#progressbar) role.
 */
export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Loader.displayName, context.telemetry);
  setStart();
  const { delay, secondary, label, indicator, inline, labelPosition, className, design, styles, variables, size } =
    props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Loader.handledProps, props);

  const delayTimer = React.useRef<number>();
  const [visible, setVisible] = React.useState(props.delay === 0);

  const labelId = React.useRef<string>();
  labelId.current = getOrGenerateIdFromShorthand('loader-label-', label, labelId.current);

  const { classes, styles: resolvedStyles } = useStyles<LoaderStylesProps>(Loader.displayName, {
    className: loaderClassName,
    mapPropsToStyles: () => ({
      inline,
      labelPosition,
      size,
      secondary,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getA11yProps = useAccessibility<LoaderBehaviorProps>(props.accessibility, {
    debugName: Loader.displayName,
    mapPropsToBehavior: () => ({
      labelId: labelId.current,
    }),
    rtl: context.rtl,
  });

  React.useEffect(() => {
    if (delay > 0) {
      // @ts-ignore We have a collision between types from DOM and @types/node
      delayTimer.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    }

    return () => clearTimeout(delayTimer.current);
  }, [delay]);

  const svgElement = (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={classes.svg}>
      <circle className={classes.svgTrack} />
      <circle className={classes.svgTail} />
    </svg>
  );

  const element = visible && (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
    >
      {Box.create(indicator, {
        defaultProps: () =>
          getA11yProps('indicator', {
            children: svgElement,
            className: loaderSlotClassNames.indicator,
            styles: resolvedStyles.indicator,
          }),
      })}
      {Text.create(label, {
        defaultProps: () =>
          getA11yProps('label', {
            className: loaderSlotClassNames.label,
            styles: resolvedStyles.label,
            id: labelId.current,
          }),
      })}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, LoaderProps> &
  FluentComponentStaticProps<LoaderProps> & {
    shorthandConfig: ShorthandConfig<LoaderProps>;
  };

Loader.displayName = 'Loader';

Loader.propTypes = {
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
  secondary: PropTypes.bool,
};

Loader.defaultProps = {
  accessibility: loaderBehavior,
  delay: 0,
  indicator: {},
  labelPosition: 'below',
  svg: '',
  size: 'medium',
};

Loader.handledProps = Object.keys(Loader.propTypes) as any;

Loader.create = createShorthandFactory({ Component: Loader, mappedProp: 'label' });

Loader.shorthandConfig = { mappedProp: 'label' };
