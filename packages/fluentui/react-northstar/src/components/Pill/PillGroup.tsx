import * as React from 'react';
import { Accessibility, PillGroupBehavior, PillGroupBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
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

export interface PillGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillGroupBehaviorProps>;
}

export type PillGroupStylesProps = never;
export const pillGroupClassName = 'ui-pills';

/**
 * A PillGroup can be used as container for Pill.
 */
export const PillGroup = React.forwardRef<HTMLDivElement, PillGroupProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(PillGroup.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, design, styles, variables } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: PillGroup.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillGroupStylesProps>(PillGroup.displayName, {
    className: pillGroupClassName,
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(PillGroup.handledProps, props);
  const pillBehavior = getA11Props.unstable_behaviorDefinition().childBehaviors?.pill;

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
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <PillsContextProvider value={childProps}>{children}</PillsContextProvider>
    </ElementType>,
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, PillGroupProps> & FluentComponentStaticProps<PillGroupProps>;

PillGroup.displayName = 'PillGroup';

PillGroup.propTypes = commonPropTypes.createCommon();

PillGroup.defaultProps = {
  accessibility: PillGroupBehavior,
};

PillGroup.handledProps = Object.keys(PillGroup.propTypes) as any;

PillGroup.shorthandConfig = {
  mappedProp: 'content',
};
