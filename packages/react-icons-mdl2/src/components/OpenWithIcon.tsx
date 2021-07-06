import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenWithIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2045 1219l-317-317-317 317 90 90 162-163v583h129v-583l163 163 90-90zm-253-834H639V256h1153v129zm-256 1280H639v-129h897v129zM384 512H0V128h384v384zM128 384h128V256H128v128zm256 768H0V768h384v384zm-256-128h128V896H128v128zm256 768H0v-384h384v384zm-256-128h128v-128H128v128zm1280-640H640V896h896l-128 128z" />
    </svg>
  ),
  displayName: 'OpenWithIcon',
});

export default OpenWithIcon;
