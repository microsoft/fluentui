import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CameraIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1536H0V256h549l128-128h694l128 128h549zm-128 128h-475l-128-128H731L603 384H128v1280h1792V384zm-896 128q106 0 199 40t163 109 110 163 40 200q0 106-40 199t-109 163-163 110-200 40q-106 0-199-40t-163-109-110-163-40-200q0-106 40-199t109-163 163-110 200-40zm0 896q79 0 149-30t122-83 82-122 31-149q0-79-30-149t-83-122-122-82-149-31q-79 0-149 30t-122 83-82 122-31 149q0 79 30 149t83 122 122 82 149 31zM320 512q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'CameraIcon',
});

export default CameraIcon;
