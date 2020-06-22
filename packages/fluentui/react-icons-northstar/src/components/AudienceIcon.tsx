import createSvgIcon from '../utils/createSvgIcon';

const AudienceIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['audience'] ? icons['audience'].icon({ classes }) : null),
  displayName: 'AudienceIcon',
});

export default AudienceIcon;
