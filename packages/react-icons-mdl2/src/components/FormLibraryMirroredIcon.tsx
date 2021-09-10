import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FormLibraryMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M608 128q45 0 77 9t58 24 46 31 40 31 44 23 55 10h992q27 0 50 10t40 27 28 41 10 50v451l-128-128V384H928q-31 0-54 9t-44 24-41 31-45 31-58 23-78 10H128v1152h640v128H0V256q0-27 10-50t27-40 41-28 50-10h480zm0 256q24 0 42-4t33-13 29-20 32-27q-17-15-31-26t-30-20-33-13-42-5H128v128h480zm1019 256l421 421v987H896V640h731zm37 384h165l-165-165v165zm256 896v-768h-384V768h-512v1152h896zm-640-256h512v128h-512v-128zm256-256h256v128h-256v-128z" />
    </svg>
  ),
  displayName: 'FormLibraryMirroredIcon',
});

export default FormLibraryMirroredIcon;
