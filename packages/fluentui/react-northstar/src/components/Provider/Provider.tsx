import * as _ from 'lodash';
import {
  ComponentWithAs,
  defaultContextValue,
  getElementType,
  useUnhandledProps,
  StylesContextPerformanceInput,
  RendererContext,
  ProviderContextInput,
  ProviderContextPrepared,
  Telemetry,
  useFluentContext,
  unstable_getStyles,
  useIsomorphicLayoutEffect,
  Unstable_FluentContextProvider,
} from '@fluentui/react-bindings';
import { Renderer } from '@fluentui/react-northstar-styles-renderer';
import {
  mergeSiteVariables,
  StaticStyleObject,
  StaticStyle,
  StaticStyleFunction,
  FontFace,
  ThemeInput,
  SiteVariablesPrepared,
} from '@fluentui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ChildrenComponentProps, setUpWhatInput, tryCleanupWhatInput, UIComponentProps } from '../../utils';

import { mergeProviderContexts } from '../../utils/mergeProviderContexts';
import { ProviderConsumer } from './ProviderConsumer';
import { PortalContext, PortalContextValue } from './portalContext';

export interface ProviderProps extends ChildrenComponentProps, UIComponentProps {
  rtl?: boolean;
  disableAnimations?: boolean;
  performance?: StylesContextPerformanceInput;
  overwrite?: boolean;
  target?: Document;
  theme?: ThemeInput;
  telemetryRef?: React.MutableRefObject<Telemetry>;
}

const renderFontFaces = (renderer: Renderer, theme: ThemeInput) => {
  if (!theme.fontFaces) {
    return;
  }

  const renderFontObject = (font: FontFace) => {
    if (!_.isPlainObject(font)) {
      throw new Error(`fontFaces must be objects, got: ${typeof font}`);
    }

    renderer.renderFont(font);
  };

  theme.fontFaces.forEach((font: FontFace) => {
    renderFontObject(font);
  });
};

const renderStaticStyles = (renderer: Renderer, theme: ThemeInput, siteVariables: SiteVariablesPrepared) => {
  if (!theme.staticStyles) {
    return;
  }

  const renderObject = (object: StaticStyleObject) => {
    _.forEach(object, (style, selector) => {
      renderer.renderGlobal(style, selector);
    });
  };

  theme.staticStyles.forEach((staticStyle: StaticStyle) => {
    if (typeof staticStyle === 'string') {
      renderer.renderGlobal(staticStyle);
    } else if (_.isPlainObject(staticStyle)) {
      renderObject(staticStyle as StaticStyleObject);
    } else if (_.isFunction(staticStyle)) {
      const preparedSiteVariables = mergeSiteVariables(undefined, siteVariables);
      renderObject((staticStyle as StaticStyleFunction)(preparedSiteVariables));
    } else {
      throw new Error(
        `staticStyles array must contain CSS strings, style objects, or style functions, got: ${typeof staticStyle}`,
      );
    }
  });
};

export const providerClassName = 'ui-provider';

/**
 * The Provider passes the CSS-in-JS renderer, theme styles and other settings to Fluent UI components.
 */
export const Provider: ComponentWithAs<'div', ProviderProps> & {
  Consumer: typeof ProviderConsumer;
  handledProps: (keyof ProviderProps)[];
} = props => {
  const { children, className, design, overwrite, styles, variables, telemetryRef } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Provider.handledProps, props);

  const rendersReactFragment = ElementType === React.Fragment;

  const telemetry = React.useMemo<Telemetry | undefined>(() => {
    if (!telemetryRef) {
      return undefined;
    }

    if (!telemetryRef.current) {
      telemetryRef.current = new Telemetry();
    }

    return telemetryRef.current;
  }, [telemetryRef]);

  const consumedContext = useFluentContext();
  const incomingContext: ProviderContextInput | ProviderContextPrepared = overwrite
    ? defaultContextValue
    : consumedContext;
  const createRenderer = React.useContext(RendererContext);

  // Memoization of `inputContext` & `outgoingContext` is required to avoid useless notifications of components that
  // consume `useFluentContext()` on each render
  // @see https://reactjs.org/docs/context.html#caveats
  const inputContext = React.useMemo<ProviderContextInput>(
    () => ({
      disableAnimations: props.disableAnimations,
      performance: props.performance,
      rtl: props.rtl,
      target: props.target,
      telemetry,
      theme: props.theme,
    }),
    [props.disableAnimations, props.performance, props.rtl, props.target, telemetry, props.theme],
  );
  const outgoingContext = React.useMemo(() => mergeProviderContexts(createRenderer, incomingContext, inputContext), [
    createRenderer,
    incomingContext,
    inputContext,
  ]);

  const rtlProps: { dir?: 'rtl' | 'ltr' } = {};
  // only add dir attribute for top level provider or when direction changes from parent to child
  if (consumedContext.rtl !== outgoingContext.rtl && _.isBoolean(outgoingContext.rtl)) {
    rtlProps.dir = outgoingContext.rtl ? 'rtl' : 'ltr';
  }

  // Perf optimisation
  // Do not invoke styling layer is there is no need
  const { classes } = rendersReactFragment
    ? { classes: { root: '' } }
    : unstable_getStyles({
        allDisplayNames: [Provider.displayName],
        className: providerClassName,
        primaryDisplayName: Provider.displayName,
        componentProps: {},
        inlineStylesProps: {
          className,
          design,
          styles,
          variables,
        },

        disableAnimations: outgoingContext.disableAnimations,
        performance: outgoingContext.performance,
        renderer: outgoingContext.renderer,
        rtl: outgoingContext.rtl,
        theme: outgoingContext.theme,
        saveDebug: _.noop,
        telemetry: undefined,
      });

  const portalContextValue = React.useMemo<PortalContextValue>(() => ({ className: classes.root }), [classes.root]);
  const RenderProvider = outgoingContext.renderer.Provider;

  useIsomorphicLayoutEffect(() => {
    renderFontFaces(outgoingContext.renderer, props.theme);
    renderStaticStyles(outgoingContext.renderer, props.theme, outgoingContext.theme.siteVariables);

    if (props.target) {
      setUpWhatInput(props.target);
    }

    outgoingContext.renderer.registerUsage();

    return () => {
      if (props.target) {
        tryCleanupWhatInput(props.target);
      }

      outgoingContext.renderer.unregisterUsage();
    };
  }, []);

  // If a Fragment is rendered:
  // - do not spread anything to an element - React.Fragment can only have `key` and `children` props
  // - as we don't apply styles "PortalContext.Provider" should not be rendered
  if (rendersReactFragment) {
    return (
      <RenderProvider target={outgoingContext.target}>
        <Unstable_FluentContextProvider value={outgoingContext}>
          <>{children}</>
        </Unstable_FluentContextProvider>
      </RenderProvider>
    );
  }

  return (
    <RenderProvider target={outgoingContext.target}>
      <Unstable_FluentContextProvider value={outgoingContext}>
        <PortalContext.Provider value={portalContextValue}>
          <ElementType className={classes.root} {...rtlProps} {...unhandledProps}>
            {children}
          </ElementType>
        </PortalContext.Provider>
      </Unstable_FluentContextProvider>
    </RenderProvider>
  );
};

Provider.displayName = 'Provider';

Provider.defaultProps = {
  theme: {},
};
Provider.propTypes = {
  as: PropTypes.elementType,
  design: PropTypes.object,
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  theme: PropTypes.shape({
    siteVariables: PropTypes.object,
    componentVariables: PropTypes.object,
    componentStyles: PropTypes.objectOf(PropTypes.any),
    fontFaces: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        paths: PropTypes.arrayOf(PropTypes.string),
        props: PropTypes.shape({
          fontStretch: PropTypes.string,
          fontStyle: PropTypes.string,
          fontVariant: PropTypes.string,
          fontWeight: PropTypes.number,
          localAlias: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
          unicodeRange: PropTypes.string,
        }),
      }),
    ),
    staticStyles: PropTypes.array,
    animations: PropTypes.objectOf(PropTypes.any),
  }),
  rtl: PropTypes.bool,
  disableAnimations: PropTypes.bool,
  // Heads Up!
  // Keep in sync with packages/react-bindings/src/styles/types.ts
  performance: PropTypes.shape({
    enableSanitizeCssPlugin: PropTypes.bool,
    enableStylesCaching: PropTypes.bool,
    enableVariablesCaching: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
  overwrite: PropTypes.bool,
  target: PropTypes.object as PropTypes.Validator<Document>,
  telemetryRef: PropTypes.object as PropTypes.Validator<React.MutableRefObject<Telemetry>>,
};
Provider.handledProps = Object.keys(Provider.propTypes) as any;

Provider.Consumer = ProviderConsumer;
