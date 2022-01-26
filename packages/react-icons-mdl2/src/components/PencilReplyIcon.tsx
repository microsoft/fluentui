import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PencilReplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 336q0 66-25 127t-73 110L633 1890 0 2048l158-633L1475 98q48-48 109-73t128-25q70 0 131 26t106 72 72 107 27 131zm-128 0q0-43-16-81t-45-66-66-44-81-17q-38 0-66 10t-53 29-47 41-47 48l293 293q25-25 48-47t41-46 28-53 11-67zM326 1428q107 35 183 111t111 183L1701 640l-293-293L326 1428zm-150 444l329-82q-10-46-32-87t-55-73-73-54-87-33l-82 329zm1616-336q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20v-128q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-293l162 163-90 90-318-317 318-317 90 90-162 163h293z" />
    </svg>
  ),
  displayName: 'PencilReplyIcon',
});

export default PencilReplyIcon;
