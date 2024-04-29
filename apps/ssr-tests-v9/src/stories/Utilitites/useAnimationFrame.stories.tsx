import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';

export const Default = () => {
  const [setAnimationFrame, clearAnimationFrame] = useAnimationFrame();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setAnimationFrame(() => setVisible(true));

    return () => clearAnimationFrame();
  }, [setAnimationFrame]);

  return visible ? <div>Test the renderization</div> : null;
};
