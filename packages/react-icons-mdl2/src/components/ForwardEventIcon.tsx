import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ForwardEventIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 128h384v1297l-128-128V640H128v1152h1291l128 128H0V128h384V0h128v128h1024V0h128v128zM128 512h1792V256h-256v128h-128V256H512v128H384V256H128v256zm1507 861l90-90 317 317-317 317-90-90 163-163h-518v-128h518l-163-163z" />
    </svg>
  ),
  displayName: 'ForwardEventIcon',
});

export default ForwardEventIcon;
