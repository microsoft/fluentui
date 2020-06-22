import createSvgIcon from '../utils/createSvgIcon';

const PresenterIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['presenter'] ? icons['presenter'].icon({ classes }) : null),
  displayName: 'PresenterIcon',
});

export default PresenterIcon;
