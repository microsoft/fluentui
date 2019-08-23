import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px'
});
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
  greenYellow: [{ color: 'greenyellow' }, iconClass],
  salmon: [{ color: 'salmon' }, iconClass]
});

export const IconColorExample: React.FunctionComponent = () => {
  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  return (
    <div>
      <FontIcon iconName="CompassNW" className={classNames.deepSkyBlue} />
      <FontIcon iconName="Dictionary" className={classNames.greenYellow} />
      <FontIcon iconName="TrainSolid" className={classNames.salmon} />
    </div>
  );
};
