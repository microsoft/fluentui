// tslint:disable:jsx-wrap-multiline max-line-length
import * as React from 'react';
import { OneDriveIcon, YammerIcon, BorderBlindsIcon } from '@fluentui/react-icons';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});

export const IconSvgFactoryExample: React.FunctionComponent = () => {
  return (
    <div>
      <OneDriveIcon className={iconClass} />
      <YammerIcon
        className={mergeStyles(iconClass, {
          fill: 'red',
          selectors: {
            '.thing': {
              fill: 'green',
            },
          },
        })}
      />
      <BorderBlindsIcon className={iconClass} color3="pink" />
    </div>
  );
};
