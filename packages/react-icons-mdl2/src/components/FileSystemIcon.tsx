import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FileSystemIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1378 384l64 128H606l64-128h708zm256 512l64 128H350l64-128h1220zm-128-256l64 128H478l64-128h964zm30-512l512 1024v640H0v-640L512 128h1024zM591 256l-448 896h1762l-448-896H591zm1329 1408v-384H128v384h1792zM512 1408v128H256v-128h256z" />
    </svg>
  ),
  displayName: 'FileSystemIcon',
});

export default FileSystemIcon;
