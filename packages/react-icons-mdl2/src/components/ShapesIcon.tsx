import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShapesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1280h-419l370 640H595l267-463q-66 38-138 58t-148 21q-119 0-224-45t-183-124-123-183T0 960q0-119 45-224t124-183 183-123 224-46q85 0 166 24t154 73V128h1152v1152zM576 1408q93 0 174-35t142-97 96-142 36-174q0-92-35-173t-96-143-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175q0 93 35 174t96 142 142 96 175 36zm1201 384q-121-209-240-416t-240-416q-121 209-240 416t-240 416h960zm143-1536h-896v347q61 75 94 165t34 188l145-252 258 448h365V256z" />
    </svg>
  ),
  displayName: 'ShapesIcon',
});

export default ShapesIcon;
