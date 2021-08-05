import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const WebAppBuilderFragmentCreateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M768 896H256L0 448 256 0h512l256 448-256 448zM330 128L147 448l183 320h364l183-320-183-320H330zm1462 1536h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256zm-256-384v128h-384L896 960l256-448h512l256 448-183 320h-147l183-320-183-320h-364l-183 320 183 320h310zM256 1024h512l256 448-256 448H256L0 1472l256-448zm438 768l183-320-183-320H330l-183 320 183 320h364z" />
    </svg>
  ),
  displayName: 'WebAppBuilderFragmentCreateIcon',
});

export default WebAppBuilderFragmentCreateIcon;
