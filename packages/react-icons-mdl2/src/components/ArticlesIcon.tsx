import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArticlesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 768v128H512V768h1024zm-256-512v128H512V256h768zm-256 1536v-640h512v640h-512zm128-512v384h256v-384h-256zm384-768v128H512V512h1024zM256 0h1536v2048H256V0zm1408 1920V128H384v1792h1280zm-768-256v128H512v-128h384zm0-512v128H512v-128h384zm0 256v128H512v-128h384z" />
    </svg>
  ),
  displayName: 'ArticlesIcon',
});

export default ArticlesIcon;
