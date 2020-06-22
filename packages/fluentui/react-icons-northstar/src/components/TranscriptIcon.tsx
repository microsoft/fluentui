import createSvgIcon from '../utils/createSvgIcon';

const TranscriptIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['transcript'] ? icons['transcript'].icon({ classes }) : null),
  displayName: 'TranscriptIcon',
});

export default TranscriptIcon;
