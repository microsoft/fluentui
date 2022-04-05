import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UserEventIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1190 1026l-58 115q-80-57-172-87t-192-30q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-120 35-231t101-205 156-167 204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-76 104-101 83q40 16 78 35t73 44zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1395 640h269l-672 896h-264l256-512h-256l387-768h518l-238 384zm-444 738l457-610h-243l238-384h-209l-258 512h256l-241 482z" />
    </svg>
  ),
  displayName: 'UserEventIcon',
});

export default UserEventIcon;
