import * as React from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});

export const IconBasicExample: React.FunctionComponent = () => {
  // FontIcon is an optimized variant of standard Icon.
  // You could also use the standard Icon here.
  return (
    <div>
      <FontIcon aria-label="Compass icon" role="img" iconName="CompassNW" className={iconClass} />
      <FontIcon aria-label="Dictionary icon" role="img" iconName="Dictionary" className={iconClass} />
      <FontIcon aria-label="Train icon" role="img" iconName="TrainSolid" className={iconClass} />
    </div>
  );
};
