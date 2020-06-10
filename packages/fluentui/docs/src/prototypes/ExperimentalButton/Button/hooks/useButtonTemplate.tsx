import * as React from 'react';
import { getElementType, rtlTextContainer, childrenExist, ButtonProps } from '@fluentui/react-northstar';
import useButtonActionHandlers, { ButtonActionHandlers } from './useButtonActionHandlers';
import useButtonSlots, { ButtonSlotProps, ButtonSlotsOptional } from './useButtonSlots';
import { getNativeElementProps } from '@uifabric/utilities';
import { UseAccessibilityResult, UseStylesResult } from '@fluentui/react-bindings';

type UseButtonTemplate<P> = {
  props: P;
  slots?: ButtonSlotsOptional;
  slotProps?: ButtonSlotProps;
  getA11yProps: UseAccessibilityResult;
  classes: UseStylesResult['classes'];
  ref: any;
  actionHandlers?: ButtonActionHandlers<P>;
};

const useButtonTemplate = <P extends ButtonProps = ButtonProps>({
  props,
  slots,
  slotProps,
  getA11yProps,
  ref,
  classes = {},
  actionHandlers: inputActionHandlers,
}: UseButtonTemplate<P>): React.ReactElement => {
  const resolvedSlots = useButtonSlots<P>({
    props,
    getA11yProps,
    classes,
    overrides: {
      ...(slots && { slots }),
      ...(slotProps && { slotProps }),
    },
  });

  const actionHandlers = useButtonActionHandlers(props, inputActionHandlers || {});

  const ElementType = getElementType(props);
  const hasChildren = childrenExist(props.children);

  const handleFocus = e => {
    props.onFocus && props.onFocus(e, props);
  };

  const unhandledProps = getNativeElementProps((props as any).as || 'button', props); // TODO: try to replace it with different utility

  const rest = {
    ...unhandledProps,

    className: classes.root,
    // mappings of action handlers
    onClick: actionHandlers.performClick,
  };

  return (
    <ElementType
      {...rtlTextContainer.getAttributes({ forElements: [props.children] })}
      {...getA11yProps('root', {
        onClick: props.onClick,
        disabled: props.disabled,
        className: props.className,
        onFocus: handleFocus,
        ref,
        ...rest,
      })}
    >
      {hasChildren ? (
        props.children
      ) : (
        <>
          {props.loading && resolvedSlots.loader}
          {props.iconPosition !== 'after' && resolvedSlots.icon}
          {resolvedSlots.content}
          {props.iconPosition === 'after' && resolvedSlots.icon}
        </>
      )}
    </ElementType>
  );
};

export default useButtonTemplate;
