import createSvgIcon from '../utils/createSvgIcon';

const ShareGenericIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['share-generic'] ? icons['share-generic'].icon({ classes }) : null),
  displayName: 'ShareGenericIcon',
});

export default ShareGenericIcon;
