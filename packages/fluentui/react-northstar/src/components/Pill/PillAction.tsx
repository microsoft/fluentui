import * as React from 'react';
import { Accessibility, pillActionBehavior, PillActionBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useFluentContext,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  SizeValue,
} from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { CloseIcon } from '@fluentui/react-icons-northstar';

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

const DEFAULT_CONTENT = <CloseIcon />;

/**
 * A PillAction allows user to execute an action.
 */
export const PillAction = React.forwardRef<HTMLDivElement, PillActionProps>((props, ref) => {
  const context = useFluentContext();

  const {
    accessibility = pillActionBehavior,
    children,
    className,
    content = DEFAULT_CONTENT,
    design,
    styles,
    variables,
    size,
  } = props;

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
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
      {...useAccessibilitySlotProps(a11yBehavior, 'root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, PillActionProps> & FluentComponentStaticProps<PillActionProps>;

PillAction.displayName = 'PillAction';

PillAction.propTypes = {
  ...commonPropTypes.createCommon(),
};

PillAction.handledProps = Object.keys(PillAction.propTypes) as any;

PillAction.shorthandConfig = {
  mappedProp: 'content',
};
