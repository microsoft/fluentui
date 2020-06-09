import { buttonBehavior, useAccessibility } from '@fluentui/react-northstar';
import { useRtl } from '../../rtlContext';
import useButtonActionHandlers, { ButtonActionHandlers } from './useButtonActionHandlers';
import { Accessibility, ButtonBehaviorProps } from '@fluentui/accessibility';
import { UseAccessibilityResult } from '@fluentui/react-bindings';

type UseButtonAriaInput<P> = {
  props: P;
  debugName?: string;
  overrides?: {
    props?: P;
    actionHandlers: ButtonActionHandlers<P>;
    accessibility: Accessibility<P>;
  };
};

const useButtonAria = <P extends ButtonBehaviorProps = ButtonBehaviorProps>({
  props,
  debugName = 'Button',
  overrides,
}: UseButtonAriaInput<P>): UseAccessibilityResult => {
  const actionHandlers = useButtonActionHandlers(props);
  const rtl = useRtl();

  const { props: overrideProps = {}, actionHandlers: overrideActionHandlers = {}, accessibility = buttonBehavior } =
    overrides || {};

  // @ts-ignore active is not included in props (bug in the Button component?)
  const { as = 'button', active, disabled, loading } = props;
  const getA11yProps = useAccessibility(accessibility, {
    debugName,
    mapPropsToBehavior: () => ({
      as,
      active,
      disabled,
      loading,
      ...overrideProps,
    }),
    actionHandlers: {
      performClick: event => {
        event.preventDefault();
        actionHandlers.performClick(event);
        overrideActionHandlers.performClick && overrideActionHandlers.performClick(event);
      },
    },
    rtl,
  });

  return getA11yProps;
};

export default useButtonAria;
