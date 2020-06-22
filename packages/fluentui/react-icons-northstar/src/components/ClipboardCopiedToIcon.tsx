import createSvgIcon from '../utils/createSvgIcon';

const ClipboardCopiedToIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['clipboard-copied-to'] ? icons['clipboard-copied-to'].icon({ classes }) : null),
  displayName: 'ClipboardCopiedToIcon',
});

export default ClipboardCopiedToIcon;
