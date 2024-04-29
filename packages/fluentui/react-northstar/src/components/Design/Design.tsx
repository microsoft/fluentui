import { ComponentDesignProp, useFluentContext } from '@fluentui/react-bindings';
import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
import * as customPropTypes from '@fluentui/react-proptypes';
import { ICSSInJSStyle } from '@fluentui/styles';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ReactChildren } from '../../types';

export type DesignProps = {
  /** A render function that receives the generated className as its only argument */
  children: (args: { className: string }) => ReactChildren;

  /** Design config takes a limited set of layout and position CSS properties. */
  config: ComponentDesignProp;
};

/**
 * The Design component provides a theme safe subset of CSS for designing layouts.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Design<DesignProps>({ config, children }) {
  const context = useFluentContext();
  const getConfig = React.useCallback(() => config, [config]);

  // Heads Up! Keep in sync with renderComponent.tsx
  const styleParam: RendererParam = {
    displayName: Design.displayName,
    disableAnimations: context.disableAnimations,
    direction: context.rtl ? 'rtl' : 'ltr',
    sanitizeCss: context.performance.enableSanitizeCssPlugin,
  };

  const className = context.renderer.renderRule(getConfig as ICSSInJSStyle, styleParam);

  return children({ className });
}

Design.displayName = 'Design';

Design.propTypes = {
  children: PropTypes.func.isRequired,

  config: customPropTypes.design.isRequired,
};
