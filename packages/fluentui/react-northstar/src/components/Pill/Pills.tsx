import * as React from 'react';
import { Accessibility, pillsBehavior, PillsBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';
import { PillsContextProvider, PillsContextValue } from './pillContext';

export interface PillsProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillsBehaviorProps>;
}

export type PillsStylesProps = never;
export const PillsClassName = 'ui-pills';

/**
 * A Pills can be used as container for Pill.
 */
export const Pills: ComponentWithAs<'div', PillsProps> & FluentComponentStaticProps<PillsProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Pills.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, design, styles, variables } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Pills.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillsStylesProps>(Pills.displayName, {
    className: PillsClassName,
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Pills.handledProps, props);
  const pillBehavior = getA11Props.unstable_behaviorDefinition().childBehaviors.pill;

  const childProps: PillsContextValue = React.useMemo(
    () => ({
      pillBehavior,
    }),
    [pillBehavior],
  );

  const element = getA11Props.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <PillsContextProvider value={childProps}>{children}</PillsContextProvider>
    </ElementType>,
  );

  setEnd();

  return element;
};

Pills.displayName = 'Pills';

Pills.propTypes = commonPropTypes.createCommon();

Pills.defaultProps = {
  accessibility: pillsBehavior,
};

Pills.handledProps = Object.keys(Pills.propTypes) as any;

Pills.shorthandConfig = {
  mappedProp: 'content',
};
