import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FrontCameraIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1258 1198q91 36 166 96t128 138 83 169 29 191h-128q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40t-162 110-110 163-41 199H384q0-99 29-190t82-169 128-138 167-97q-71-54-110-133t-40-169q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 90-39 169t-111 133zM768 896q0 53 20 99t55 82 81 55 100 20q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100zm1280-640v1280h-267q-11-33-25-65t-31-63h195V384H128v1024h195q-17 31-31 63t-25 65H0V256h2048z" />
    </svg>
  ),
  displayName: 'FrontCameraIcon',
});

export default FrontCameraIcon;
