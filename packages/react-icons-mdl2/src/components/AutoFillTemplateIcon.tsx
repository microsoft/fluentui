import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AutoFillTemplateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v640H0V256h2048zm-128 128H128v384h1792V384zM0 1024h2048v640H0v-640zm128 512h1792v-384H128v384zm1408-896H256V512h1280v128zM256 1280h640v128H256v-128z" />
    </svg>
  ),
  displayName: 'AutoFillTemplateIcon',
});

export default AutoFillTemplateIcon;
