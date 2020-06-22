import createSvgIcon from '../utils/createSvgIcon';

const HorizontalRuleIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['horizontal-rule'] ? icons['horizontal-rule'].icon({ classes }) : null),
  displayName: 'HorizontalRuleIcon',
});

export default HorizontalRuleIcon;
