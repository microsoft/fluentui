import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MergeDuplicateIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 640q0 95 27 185t77 167 120 138 158 101q15 7 37 15t46 15 47 13 39 6q18 1 36 1t36 0h72q36 0 73-1v768h-768v-768h216q-92-62-163-147T960 946q-45 102-116 187t-164 147h216v768H128v-768h72q36 0 73 1h36q18 0 36-1 16 0 39-5t47-13 46-16 37-15q87-39 157-100t121-139 77-167 27-185V347L605 637l-90-90 445-445 445 445-90 90-291-290v293zm-768 768v512h512v-512H256zm1408 0h-512v512h512v-512z" />
    </svg>
  ),
  displayName: 'MergeDuplicateIcon',
});

export default MergeDuplicateIcon;
