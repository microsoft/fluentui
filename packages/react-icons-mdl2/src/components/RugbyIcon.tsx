import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RugbyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0q106 0 199 40t163 109 110 163 40 200q0 212-55 408t-155 367-240 311-311 240-367 155-408 55q-106 0-199-40t-163-109-110-163-40-200q0-212 55-408t155-367 240-311 311-240 367-155 408-55zm0 128q-194 0-373 50T827 320 541 541 321 826t-142 336-51 374q0 60 18 117t53 105L1758 199q-48-35-105-53t-117-18zM512 1920q194 0 373-50t336-142 286-221 220-285 142-336 51-374q0-60-18-117t-53-105L290 1849q48 35 105 53t117 18z" />
    </svg>
  ),
  displayName: 'RugbyIcon',
});

export default RugbyIcon;
