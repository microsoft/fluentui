import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const FSharpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 128v1792H128V128h1792zm-119 119H247v1554h1554V247zM798 1664H671V896h414v108H798v231h265v108H798v321zm486-309h-112l14-68h113l27-135h-119l14-68h119l39-188h79l-39 188h118l40-188h78l-40 188h112l-15 68h-111l-28 135h121l-18 68h-118l-40 181h-77l39-181h-118l-39 181h-77l38-181zm91-68h120l29-135h-119l-30 135z" />
    </svg>
  ),
  displayName: 'FSharpIcon',
});

export default FSharpIcon;
