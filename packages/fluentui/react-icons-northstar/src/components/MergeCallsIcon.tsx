import createSvgIcon from '../utils/createSvgIcon';

const MergeCallsIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['merge-calls'] ? icons['merge-calls'].icon({ classes }) : null),
  displayName: 'MergeCallsIcon',
});

export default MergeCallsIcon;
