import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WorkFlowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 512V215q-132 63-236 164T232 609l-119-49q70-137 176-247t241-185H256V0h512v512H640zm1176 97q-63-121-159-217t-218-160l49-118q144 74 258 188t189 258l-119 49zM128 1024q0 68 10 135t31 132l-118 49Q0 1187 0 1024t51-316l119 49q-20 65-31 132t-11 135zm103 415q63 121 160 218t218 160l-49 119q-144-75-258-189t-190-259l119-49zm1708-76l90 90-557 558-269-270 90-90 179 178 467-466zm-19-339q0-68-11-135t-31-132l119-49q51 153 51 316h-128zM757 1879q65 21 132 31t135 10v128q-164 0-317-51l50-118z" />
    </svg>
  ),
  displayName: 'WorkFlowIcon',
});

export default WorkFlowIcon;
