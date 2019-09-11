import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px'
});

export const IconBasicExample: React.FunctionComponent = () => {
  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  return (
    <div>
      <FontIcon iconName="CompassNW" className={iconClass} />
      <FontIcon iconName="Dictionary" className={iconClass} />
      <FontIcon iconName="TrainSolid" className={iconClass} />
    </div>
  );
};
