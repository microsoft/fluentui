import createSvgIcon from '../utils/createSvgIcon';

const QnaIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['qna'] ? icons['qna'].icon({ classes }) : null),
  displayName: 'QnaIcon',
});

export default QnaIcon;
