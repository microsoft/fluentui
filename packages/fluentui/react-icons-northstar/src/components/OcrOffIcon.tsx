import createSvgIcon from '../utils/createSvgIcon';

const OcrOffIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['ocr-off'] ? icons['ocr-off'].icon({ classes }) : null),
  displayName: 'OcrOffIcon',
});

export default OcrOffIcon;
