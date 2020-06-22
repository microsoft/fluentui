import cx from 'classnames';
import * as React from 'react';
import { iconClassNames } from '../utils/iconClassNames';
import createSvgIcon from '../utils/createSvgIcon';

const PlayIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['play'] ? icons['play'].icon({ classes }) : null),
  displayName: 'PlayIcon',
});

export default PlayIcon;
