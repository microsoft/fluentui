import { ICSSInJSStyle } from '@fluentui/styles';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import { UIComponentProps, commonPropTypes, rtlTextContainer, createShorthandFactory } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import {
  ComponentWithAs,
  useStyles,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useAccessibility,
  useTelemetry,
} from '@fluentui/react-bindings';

export interface LayoutSlotClassNames {
  start: string;
  main: string;
  end: string;
  gap: string;
  reducedStart: string;
  reducedMain: string;
  reducedEnd: string;
}

export interface LayoutProps extends UIComponentProps {
  debug?: boolean;
  renderStartArea?: (params: LayoutProps & { classes: Record<string, string> }) => React.ReactNode;
  renderMainArea?: (params: LayoutProps & { classes: Record<string, string> }) => React.ReactNode;
  renderEndArea?: (params: LayoutProps & { classes: Record<string, string> }) => React.ReactNode;
  renderGap?: (params: LayoutProps & { classes: Record<string, string> }) => React.ReactNode;
  /** Styled applied to the root element of the rendered component. */
  rootCSS?: ICSSInJSStyle;
  start?: any;
  startCSS?: ICSSInJSStyle;
  startSize?: string;
  main?: any;
  mainCSS?: ICSSInJSStyle;
  mainSize?: string;
  end?: any;
  endCSS?: ICSSInJSStyle;
  endSize?: string;
  /** How to align items on-axis within the layout (i.e. vertical or not). */
  justifyItems?: React.CSSProperties['justifyItems'];
  /** How to align cross-axis items within the layout (i.e. vertical or not). */
  alignItems?: React.CSSProperties['alignItems'];
  /** A layout can have gaps of whitespace between areas. */
  gap?: string;
  /** A layout can reduce to the minimum required areas. */
  reducing?: boolean;
  /** A layout can render its content directly if only one piece of content exists. */
  disappearing?: boolean;
  vertical?: boolean;
}

export const layoutClassName = 'ui-layout';
export const layoutSlotClassNames: LayoutSlotClassNames = {
  start: `${layoutClassName}__start`,
  main: `${layoutClassName}__main`,
  end: `${layoutClassName}__end`,
  gap: `${layoutClassName}__gap`,
  reducedStart: `${layoutClassName}--reduced__start`,
  reducedMain: `${layoutClassName}--reduced__main`,
  reducedEnd: `${layoutClassName}--reduced__end`,
};

export type LayoutStylesProps = Required<
  Pick<LayoutProps, 'alignItems' | 'debug' | 'gap' | 'justifyItems' | 'mainSize' | 'endSize' | 'startSize' | 'vertical'>
> & { hasStart: boolean; hasMain: boolean; hasEnd: boolean };

/**
 * (DEPRECATED) A layout is a utility for arranging the content of a component.
 */
export const Layout: ComponentWithAs<'div', LayoutProps> & FluentComponentStaticProps<LayoutProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Layout.displayName, context.telemetry);
  setStart();
  const {
    reducing,
    disappearing,
    renderStartArea,
    renderMainArea,
    renderEndArea,
    renderGap,
    alignItems,
    debug,
    gap,
    justifyItems,
    main,
    mainSize,
    end,
    endSize,
    start,
    startSize,
    vertical,
    className,
    design,
    styles,
    variables,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Layout.handledProps, props);

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: Layout.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<LayoutStylesProps>(Layout.displayName, {
    className: layoutClassName,
    mapPropsToStyles: () => ({
      alignItems,
      debug,
      gap,
      justifyItems,
      hasMain: !!main,
      mainSize,
      hasEnd: !!end,
      endSize,
      hasStart: !!start,
      startSize,
      vertical,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const startArea = renderStartArea({ ...props, classes });
  const mainArea = renderMainArea({ ...props, classes });
  const endArea = renderEndArea({ ...props, classes });

  if (!startArea && !mainArea && !endArea) {
    setEnd();
    return (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ...unhandledProps,
        })}
      />
    );
  }

  const activeAreas = [startArea, mainArea, endArea].filter(Boolean);
  const isSingleArea = activeAreas.length === 1;

  // disappear: render the content directly without wrapping layout or area elements
  if (disappearing && isSingleArea) {
    setEnd();
    return start || main || end;
  }

  if (reducing && isSingleArea) {
    const composedClasses = cx(
      classes.root,
      startArea && layoutSlotClassNames.reducedStart,
      mainArea && layoutSlotClassNames.reducedMain,
      endArea && layoutSlotClassNames.reducedEnd,
    );
    setEnd();
    return (
      <ElementType
        {...getA11yProps('root', {
          className: composedClasses,
          ...unhandledProps,
        })}
      >
        {start || main || end}
      </ElementType>
    );
  }
  setEnd();
  return (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {startArea}
      {startArea && mainArea && renderGap({ ...props, classes })}
      {mainArea}
      {(startArea || mainArea) && endArea && renderGap({ ...props, classes })}
      {endArea}
    </ElementType>
  );
};

Layout.displayName = 'Layout';

Layout.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    children: false,
    content: false,
  }),
  debug: PropTypes.bool,

  renderStartArea: PropTypes.func,
  renderMainArea: PropTypes.func,
  renderEndArea: PropTypes.func,
  renderGap: PropTypes.func,

  rootCSS: PropTypes.object,

  start: PropTypes.any,
  startCSS: PropTypes.object,
  startSize: PropTypes.string,

  main: PropTypes.any,
  mainCSS: PropTypes.object,
  mainSize: PropTypes.string,

  end: PropTypes.any,
  endCSS: PropTypes.object,
  endSize: PropTypes.string,

  justifyItems: PropTypes.any,

  alignItems: PropTypes.any,

  gap: PropTypes.string,
  reducing: PropTypes.bool,
  disappearing: PropTypes.bool,

  vertical: PropTypes.bool,
};

Layout.defaultProps = {
  startSize: 'auto',
  mainSize: '1fr',
  endSize: 'auto',

  // TODO: when an area is another Layout, do not wrap them in an extra div
  // TODO: option 1) higher value layouts could use start={Layout.create(start)} to ensure Areas are layout root
  renderStartArea({ start, classes }) {
    return (
      start && (
        <div
          className={cx(layoutSlotClassNames.start, classes.start)}
          {...rtlTextContainer.getAttributes({ forElements: [start] })}
        >
          {start}
        </div>
      )
    );
  },

  renderMainArea({ main, classes }) {
    return (
      main && (
        <div
          className={cx(layoutSlotClassNames.main, classes.main)}
          {...rtlTextContainer.getAttributes({ forElements: [main] })}
        >
          {main}
        </div>
      )
    );
  },

  renderEndArea({ end, classes }) {
    return (
      end && (
        <div
          className={cx(layoutSlotClassNames.end, classes.end)}
          {...rtlTextContainer.getAttributes({ forElements: [end] })}
        >
          {end}
        </div>
      )
    );
  },

  // Heads up!
  // IE11 Doesn't support grid-gap, insert virtual columns instead
  renderGap({ gap, classes }) {
    return gap && <span className={cx(layoutSlotClassNames.gap, classes.gap)} />;
  },
};

Layout.handledProps = Object.keys(Layout.propTypes) as any;

Layout.create = createShorthandFactory({
  Component: Layout,
});
