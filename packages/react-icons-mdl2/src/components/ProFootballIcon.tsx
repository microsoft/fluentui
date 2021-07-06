import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProFootballIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0q106 0 199 40t163 109 110 163 40 200q0 212-55 408t-155 367-240 311-311 240-367 155-408 55q-106 0-199-40t-163-109-110-163-40-200q0-212 55-408t155-367 240-311 311-240 367-155 408-55zM512 1920q194 0 373-50t336-142 286-221 220-285 142-336 51-374q0-79-30-149t-82-122-123-83-149-30q-194 0-373 50T827 320 541 541 321 826t-142 336-51 374q0 80 30 149t82 122 122 83 150 30zm749-1325l192 192-90 90-51-50-101 101 50 51-90 90-51-51-102 102 51 51-90 90-51-50-101 101 50 51-90 90-192-192 90-90 51 50 101-101-50-51 90-90 51 51 102-102-51-51 90-90 51 50 101-101-50-51 90-90z" />
    </svg>
  ),
  displayName: 'ProFootballIcon',
});

export default ProFootballIcon;
