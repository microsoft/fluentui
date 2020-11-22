import createSvgIcon from '../utils/createSvgIcon';

const NoPresenterIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['no-presenter'] ? icons['no-presenter'].icon({ classes }) : null),
  displayName: 'NoPresenterIcon',
});

export default NoPresenterIcon;
