import createSvgIcon from '../utils/createSvgIcon';

const FilesHtmlColoredIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['files-html-colored'] ? icons['files-html-colored'].icon({ classes }) : null),
  displayName: 'FilesHtmlColoredIcon',
});

export default FilesHtmlColoredIcon;
