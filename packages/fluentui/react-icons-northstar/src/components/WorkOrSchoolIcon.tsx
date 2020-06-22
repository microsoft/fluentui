import createSvgIcon from '../utils/createSvgIcon';

// TODO: should we reconsider name
const WorkOrSchoolIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['work-or-school'] ? icons['work-or-school'].icon({ classes }) : null),
  displayName: 'WorkOrSchoolIcon',
});

export default WorkOrSchoolIcon;
