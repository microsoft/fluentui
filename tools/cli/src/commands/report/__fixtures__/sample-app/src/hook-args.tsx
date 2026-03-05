import React from 'react';
import { useArrowNavigationGroup, useId } from '@fluentui/react-components';

const circular = true;

export const NavGroup = () => {
  const id = useId('nav');

  // Explicit property assignments — values should be captured as literals
  const attrs = useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
    unstable_hasDefault: true,
  });

  // Mix of explicit and shorthand — `circular` is shorthand (value = variable ref)
  const attrs2 = useArrowNavigationGroup({
    axis: 'horizontal',
    circular,
  });

  return (
    <div id={id} {...attrs} {...attrs2}>
      <span>Navigation group</span>
    </div>
  );
};
