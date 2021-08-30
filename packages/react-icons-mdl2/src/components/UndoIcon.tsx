import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UndoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1088 4q96 0 185 25t167 71 142 110 110 142 71 167 25 185q0 137-52 264t-150 225l-837 836-90-90 836-837q79-79 122-182t43-216q0-117-45-221t-124-182-182-123-221-46q-108 0-190 32t-153 86-134 122-136 140h421v128H256V0h128v421q55-56 105-108t101-99 103-85 112-66 129-43 154-16z" />
    </svg>
  ),
  displayName: 'UndoIcon',
});

export default UndoIcon;
