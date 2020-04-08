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
  // TODO: add props support
  const color1 = 'red',
    color2 = 'green',
    color3 = 'pink';

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
      <BorderBlindsIcon
        className={mergeStyles(iconClass, {
          width: 50,
          height: 50,
          selectors: {
            '.borderblinds-part1': {
              fill: color1,
            },
            '.borderblinds-part2': {
              fill: color2,
            },
            '.borderblinds-part3': {
              fill: color3,
            },
          },
        })}
      />
    </div>
  );
};
