import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IRMForwardMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-95 0-192-20v-108h192q115 0 221-30t198-84 169-130 130-168 84-199 30-221q0-115-30-221t-84-198-130-169-168-130-199-84-221-30q-115 0-221 30t-198 84-169 130-130 168-84 199-30 221q0 64 9 127t30 125L67 1312q-33-85-48-173T3 960q0-132 34-254t96-230 150-194 193-150 229-97T960 0zm576 1024H384V896h1152v128zM250 1664l163 163-90 90L6 1600l317-317 90 90-163 163h518v128H250z" />
    </svg>
  ),
  displayName: 'IRMForwardMirroredIcon',
});

export default IRMForwardMirroredIcon;
