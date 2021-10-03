import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MoveToFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1120q0 31 9 54t24 44 31 41 31 45 23 58 10 78v480q0 27-10 50t-27 40-41 28-50 10H256V0h1408q27 0 50 10t40 27 28 41 10 50v384h-128V128H384v1792h1152v-480q0-45 9-77t24-58 31-46 31-40 23-44 10-55V896h128v224zm0 320q0-24-4-42t-13-33-20-29-27-32q-15 17-26 31t-20 30-13 33-5 42v480h128v-480zm256-800v128h-677l162 163-90 90-317-317 317-317 90 90-162 163h677z" />
    </svg>
  ),
  displayName: 'MoveToFolderIcon',
});

export default MoveToFolderIcon;
