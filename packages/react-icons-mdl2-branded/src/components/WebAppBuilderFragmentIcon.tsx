import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WebAppBuilderFragmentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M768 896H256L0 448 256 0h512l256 448-256 448zM330 128L147 448l183 320h364l183-320-183-320H330zm-74 896h512l256 448-256 448H256L0 1472l256-448zm438 768l183-320-183-320H330l-183 320 183 320h364zm970-1280l256 448-256 448h-512L896 960l256-448h512zm-74 768l183-320-183-320h-364l-183 320 183 320h364z" />
    </svg>
  ),
  displayName: 'WebAppBuilderFragmentIcon',
});

export default WebAppBuilderFragmentIcon;
