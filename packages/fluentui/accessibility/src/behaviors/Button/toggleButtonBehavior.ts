import { Accessibility } from '../../types';
import { buttonBehavior, ButtonBehaviorProps } from './buttonBehavior';

export const toggleButtonBehavior: Accessibility<ToggleButtonBehaviorProps> = props => {
  const behaviorData = buttonBehavior(props);
  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'aria-pressed': !!props['active'],
  };

  return behaviorData;
};

type ToggleButtonBehaviorProps = ButtonBehaviorProps & {
  /** Indicates if a button is in pressed state. */
  active: boolean;
};
