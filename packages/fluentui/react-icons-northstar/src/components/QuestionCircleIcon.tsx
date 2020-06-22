import createSvgIcon from '../utils/createSvgIcon';

const QuestionCircleIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['question-circle'] ? icons['question-circle'].icon({ classes }) : null),
  displayName: 'QuestionCircleIcon',
});

export default QuestionCircleIcon;
