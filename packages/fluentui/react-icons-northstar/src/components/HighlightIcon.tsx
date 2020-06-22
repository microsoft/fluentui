import createSvgIcon from '../utils/createSvgIcon';

const HighlightIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['highlight'] ? icons['highlight'].icon({ classes }) : null),
  displayName: 'HighlightIcon',
});

export default HighlightIcon;
