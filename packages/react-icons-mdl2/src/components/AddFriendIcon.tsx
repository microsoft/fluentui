import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddFriendIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1536h-13q-23-112-81-206t-141-162-187-106-218-38q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H128q0-120 35-231t101-205 156-167 204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T696 40 896 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-75 103-101 83q112 43 206 118t162 176v296zM512 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1280 1152h256v128h-256v256h-128v-256h-256v-128h256v-256h128v256z" />
    </svg>
  ),
  displayName: 'AddFriendIcon',
});

export default AddFriendIcon;
