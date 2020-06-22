import createSvgIcon from '../utils/createSvgIcon';

const OcrOnIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['ocr-on'] ? icons['ocr-on'].icon({ classes }) : null),
  displayName: 'OcrOnIcon',
});

export default OcrOnIcon;
