import * as React from 'react';
import { OneDriveIcon, YammerIcon, BorderBlindsIcon } from '@fluentui/react-icons';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const rootClass = mergeStyles({
  display: 'flex',
  selectors: {
    '> *': {
      height: 50,
      width: 50,
      marginRight: 25,
    },
  },
});

export const IconSvgFactoryExample: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <OneDriveIcon />
      <YammerIcon />
      <BorderBlindsIcon color3="pink" />
    </div>
  );
};
