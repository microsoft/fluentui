import createSvgIcon from '../utils/createSvgIcon';

const QuoteIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['quote'] ? icons['quote'].icon({ classes }) : null),
  displayName: 'QuoteIcon',
});

export default QuoteIcon;
