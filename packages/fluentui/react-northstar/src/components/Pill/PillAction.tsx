import * as React from 'react';
import { pillActionBehavior } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import { childrenExist, commonPropTypes, rtlTextContainer } from '../../utils';
import { CloseIcon } from '@fluentui/react-icons-northstar';
import type { Accessibility, PillActionBehaviorProps } from '@fluentui/accessibility';
import type { ComponentWithAs } from '@fluentui/react-bindings';
import type { UIComponentProps, ChildrenComponentProps, ContentComponentProps, SizeValue } from '../../utils';
import type { FluentComponentStaticProps } from '../../types';

export interface PillActionProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillActionBehaviorProps>;

  /**
   * A Pill can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;
}

export type PillActionStylesProps = Required<Pick<PillActionProps, 'size'>>;
export const pillActionClassName = 'ui-pill__action';

/**
 * A PillAction allows user to execute an action.
 */
export const PillAction: ComponentWithAs<'div', PillActionProps> &
  FluentComponentStaticProps<PillActionProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(PillAction.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, styles, variables, size } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: PillAction.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillActionStylesProps>(PillAction.displayName, {
    className: pillActionClassName,
    mapPropsToStyles: () => ({ size }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(PillAction.handledProps, props);

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return element;
};

PillAction.displayName = 'PillAction';

PillAction.propTypes = {
  ...commonPropTypes.createCommon(),
};

PillAction.handledProps = Object.keys(PillAction.propTypes) as any;

PillAction.defaultProps = {
  accessibility: pillActionBehavior,
  content: <CloseIcon />,
};

PillAction.shorthandConfig = {
  mappedProp: 'content',
};
