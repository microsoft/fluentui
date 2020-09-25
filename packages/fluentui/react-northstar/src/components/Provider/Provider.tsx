import * as _ from 'lodash';
import {
  ComponentWithAs,
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
import { usePortalBox, PortalBoxContext } from './usePortalBox';

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
      const preparedSiteVariables = mergeSiteVariables(siteVariables);
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

  const telemetry = React.useMemo<Telemetry | undefined>(() => {
    if (!telemetryRef) {
      return undefined;
    }

    if (!telemetryRef.current) {
      telemetryRef.current = new Telemetry();
    }

    return telemetryRef.current;
  }, [telemetryRef]);
  const inputContext: ProviderContextInput = {
    disableAnimations: props.disableAnimations,
    performance: props.performance,
    rtl: props.rtl,
    target: props.target,
    telemetry,
    theme: props.theme,
  };

  const consumedContext = useFluentContext();
  const incomingContext: ProviderContextInput | ProviderContextPrepared = overwrite ? {} : consumedContext;
  const createRenderer = React.useContext(RendererContext);

  const outgoingContext = mergeProviderContexts(createRenderer, incomingContext, inputContext);

  const rtlProps: { dir?: 'rtl' | 'ltr' } = {};
  // only add dir attribute for top level provider or when direction changes from parent to child
  if (consumedContext.rtl !== outgoingContext.rtl && _.isBoolean(outgoingContext.rtl)) {
    rtlProps.dir = outgoingContext.rtl ? 'rtl' : 'ltr';
  }

  const { classes } = unstable_getStyles({
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

  const element = usePortalBox({
    className: classes.root,
    target: outgoingContext.target,
    rtl: outgoingContext.rtl,
  });

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

  // do not spread anything - React.Fragment can only have `key` and `children` props
  const elementProps =
    ElementType === React.Fragment
      ? {}
      : {
          className: classes.root,
          ...rtlProps,
          ...unhandledProps,
        };
  const RenderProvider = outgoingContext.renderer.Provider;

  return (
    <RenderProvider>
      <Unstable_FluentContextProvider value={outgoingContext}>
        <PortalBoxContext.Provider value={element}>
          <ElementType {...elementProps}>{children}</ElementType>
        </PortalBoxContext.Provider>
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
    componentStyles: PropTypes.object,
    fontFaces: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        paths: PropTypes.arrayOf(PropTypes.string),
        style: PropTypes.shape({
          fontStretch: PropTypes.string,
          fontStyle: PropTypes.string,
          fontVariant: PropTypes.string,
          fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          localAlias: PropTypes.string,
          unicodeRange: PropTypes.string,
        }),
      }),
    ),
    staticStyles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func])),
    animations: PropTypes.object,
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
