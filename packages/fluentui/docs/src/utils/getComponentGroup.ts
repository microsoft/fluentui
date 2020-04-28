import componentInfoContext from './componentInfoContext';
import { FluentComponentInfo } from '@fluentui/react-docgen';

/**
 * Returns a component's info.json file and subcomponent info.json files grouped by displayName.
 */
const getComponentGroup = (displayName: string): { [key: string]: FluentComponentInfo } => {
  const info = componentInfoContext.byDisplayName[displayName];

  const group = {
    [info.displayName]: info,
  };

  if (!info.subcomponents) return group;

  // add subcomponents
  info.subcomponents.forEach(subcomponent => {
    const subInfo = componentInfoContext.byDisplayName[subcomponent];

    group[subInfo.displayName] = subInfo;
  });

  return group;
};

export default getComponentGroup;
