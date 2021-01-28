import * as React from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
  greenYellow: [{ color: 'greenyellow' }, iconClass],
  salmon: [{ color: 'salmon' }, iconClass],
});

export const IconColorExample: React.FunctionComponent = () => {
  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  // Provide an `aria-label` (and set `role="img"`) for screen reader users if the icon is not accompanied by text
  // that conveys the same meaning.
  return (
    <div>
      <FontIcon aria-label="Compass icon" role="img" iconName="CompassNW" className={classNames.deepSkyBlue} />
      <FontIcon aria-label="Dictionary icon" role="img" iconName="Dictionary" className={classNames.greenYellow} />
      <FontIcon aria-label="Train icon" role="img" iconName="TrainSolid" className={classNames.salmon} />
    </div>
  );
};
