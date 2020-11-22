import createSvgIcon from '../utils/createSvgIcon';

const CodeSnippetIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['code-snippet'] ? icons['code-snippet'].icon({ classes }) : null),
  displayName: 'CodeSnippetIcon',
});

export default CodeSnippetIcon;
