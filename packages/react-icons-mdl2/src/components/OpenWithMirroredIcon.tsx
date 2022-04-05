import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenWithMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1219l317-317 317 317-90 90-162-163v583H253v-583L90 1309l-90-90zm253-834h1153V256H253v129zm256 1280h897v-129H509v129zM1661 512h384V128h-384v384zm256-128h-128V256h128v128zm-256 768h384V768h-384v384zm256-128h-128V896h128v128zm-256 768h384v-384h-384v384zm256-128h-128v-128h128v128zM637 1024h768V896H509l128 128z" />
    </svg>
  ),
  displayName: 'OpenWithMirroredIcon',
});

export default OpenWithMirroredIcon;
