import { useSelectKnob } from '@fluentui/docs-components';
import * as FluentUI from '@fluentui/react-northstar';

import componentInfoContext from '../../utils/componentInfoContext';
import useComponentProps from './useComponentProps';

const useAccessibilityKnob = (componentName: string): FluentUI.Accessibility => {
  const componentProps = useComponentProps(componentName);
  const accessibilityProp = componentProps.find(propDef => propDef.name === 'accessibility');

  if (!accessibilityProp) {
    throw new Error(`The "accessibility" prop for "${componentName}" is not defined!`);
  }

  const { defaultValue } = accessibilityProp;
  const availableBehaviors = componentInfoContext.byDisplayName[componentName].behaviors || [];
  const behaviorNames = [defaultValue, ...availableBehaviors.map(behavior => behavior.name)];

  const [behaviorName] = useSelectKnob({
    name: 'accessibility',
    initialValue: defaultValue,
    values: behaviorNames,
  });

  return FluentUI[behaviorName];
};

export default useAccessibilityKnob;
