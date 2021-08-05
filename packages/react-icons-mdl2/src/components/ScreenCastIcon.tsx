import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ScreenCastIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1408 1792q0-27-10-50t-27-40-41-28-50-10v-128q53 0 99 20t82 55 55 81 20 100h-128zM128 384v896h1024v128h-128v128h128v128H640v-128h256v-128H0V256h1920v866q-59-56-128-102V384H128zm1536 1408q0-79-30-149t-82-122-123-83-149-30v-128q106 0 199 40t163 109 110 163 40 200h-128zm256 0q0-132-50-248t-138-204-203-137-249-51v-128q106 0 204 27t183 78 156 120 120 155 77 184 28 204h-128z" />
    </svg>
  ),
  displayName: 'ScreenCastIcon',
});

export default ScreenCastIcon;
