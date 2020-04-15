import * as React from 'react';
import { AnimationClassNames, mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean } from '@uifabric/react-hooks';

export const LayerBasicExample: React.FunctionComponent = () => {
  const [showLayer, { toggle: toggleShowLayer }] = useBoolean(false);

  const content = <div className={contentClass}>Hello world</div>;

  return (
    <div>
      <Toggle
        label="Wrap the content box below in a Layer"
        inlineLabel
        checked={showLayer}
        onChange={toggleShowLayer}
      />

      {showLayer ? <Layer>{content}</Layer> : content}
    </div>
  );
};

const theme = getTheme();
const contentClass = mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    lineHeight: '50px',
    padding: '0 20px',
  },
  AnimationClassNames.scaleUpIn100,
]);
