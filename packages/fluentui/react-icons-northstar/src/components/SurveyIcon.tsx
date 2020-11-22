import createSvgIcon from '../utils/createSvgIcon';

const SurveyIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['survey'] ? icons['survey'].icon({ classes }) : null),
  displayName: 'SurveyIcon',
});

export default SurveyIcon;
