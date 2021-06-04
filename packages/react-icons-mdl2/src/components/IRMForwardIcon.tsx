import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IRMForwardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 960q0 115 30 221t84 198 130 169 168 130 199 84 221 30h320v71q-78 27-158 42t-162 15q-133 0-255-34t-228-97-194-150-149-195-97-229T3 960q0-132 34-254t96-230 150-194 193-150 229-97T960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 130-35 256l-107-107q14-76 14-149 0-115-30-221t-84-198-130-169-168-130-199-84-221-30q-115 0-221 30t-198 84-169 130-130 168-84 199-30 221zm256-64h1152v128H384V896zm1658 704l-317 317-90-90 163-163h-518v-128h518l-163-163 90-90 317 317z" />
    </svg>
  ),
  displayName: 'IRMForwardIcon',
});

export default IRMForwardIcon;
