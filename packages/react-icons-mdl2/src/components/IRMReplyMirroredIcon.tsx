import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IRMReplyMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-116 0-230-29l109-109q30 5 60 7t61 3q115 0 221-30t198-84 169-130 130-168 84-199 30-221q0-115-30-221t-84-198-130-169-168-130-199-84-221-30q-115 0-221 30t-198 84-169 130-130 168-84 199-30 221q0 94 21 185t63 177l-96 96q-57-106-86-222T0 960q0-132 34-255t97-229 150-194 194-150 229-97T960 0zm576 1024H384V896h1152v128zm-742 576l-317 317-90-90 162-163H256q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10v128q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20h293l-162-163 90-90 317 317z" />
    </svg>
  ),
  displayName: 'IRMReplyMirroredIcon',
});

export default IRMReplyMirroredIcon;
