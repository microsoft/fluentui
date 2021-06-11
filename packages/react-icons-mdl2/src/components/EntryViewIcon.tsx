import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EntryViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M777 1920q15 35 36 67t48 61H0V0h1536v911q-32-9-64-17t-64-13V128H128v1792h649zm503-1408H256V384h1024v128zM256 768h1024v128H256V768zm960 640q66 0 124 25t101 69 69 102 26 124q0 66-25 124t-69 102-102 69-124 25q-66 0-124-25t-102-68-69-102-25-125q0-66 25-124t68-101 102-69 125-26zm0 512q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15zm0-896q100 0 200 21t193 64 173 103 139 139 93 173 34 204h-128q0-91-29-169t-81-142-119-113-147-83-162-51-166-18q-82 0-166 17t-162 51-146 83-120 114-80 142-30 169H384q0-109 34-204t93-173 139-139 172-103 193-63 201-22z" />
    </svg>
  ),
  displayName: 'EntryViewIcon',
});

export default EntryViewIcon;
