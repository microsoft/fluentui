import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Trophy2SolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 1536q0-62 29-109t76-80 103-50 112-17q55 0 111 17t103 49 76 80 30 110H640zm864 128q13 0 22 9t10 23v224H384v-224q0-13 9-22t23-10h1088zm288-1408q27 0 50 10t40 27 28 41 10 50v192q0 98-36 180t-98 141-147 93-180 34q-41 62-96 110t-121 80-137 49-145 17q-74 0-145-16t-137-49-120-81-97-110q-96 0-180-33t-146-93-99-142T0 576V384q0-27 10-50t27-40 41-28 50-10h256V128h1152v128h256zM384 384H128v192q0 57 19 109t53 93 81 71 103 41V384zm1408 0h-256v506q56-12 103-41t81-70 53-94 19-109V384z" />
    </svg>
  ),
  displayName: 'Trophy2SolidIcon',
});

export default Trophy2SolidIcon;
