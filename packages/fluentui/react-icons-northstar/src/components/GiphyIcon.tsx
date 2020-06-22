import createSvgIcon from '../utils/createSvgIcon';

const GiphyIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['giphy'] ? icons['giphy'].icon({ classes }) : null),
  displayName: 'GiphyIcon',
});

export default GiphyIcon;
