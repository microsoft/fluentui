import * as React from 'react';

const APP_TITLE = 'Accessible TreeGrids';
const APP_TITLE_SEPARATOR = ' | ';

interface FullscreenLinkProps {
  parent: string;
  story: string;
  content: string;
}

// https://storybook.js.org/addons/@storybook/addon-links does not allow opening a story in new tab
// so this is a naive attempt for opening a story in full screen
export const FullscreenLink = (props: FullscreenLinkProps) => (
  <a className="sbdocs sbdocs-a" href={`iframe.html?id=${props.parent}--${props.story}`} target="_blank">
    {props.content}
  </a>
);

export const TreeGridsListLink: React.FC = props => (
  <a
    className="sbdocs sbdocs-a"
    href={`iframe.html?id=concepts-developer-accessibility-treegrids-list-of-treegrids--page`}
  >
    {props.children}
  </a>
);

export const BackLink = () => <TreeGridsListLink>Go back to main menu</TreeGridsListLink>;

export const Prototype: React.FC<{ pageTitle: string }> = ({ pageTitle, children }) => {
  React.useEffect(() => {
    document.title = pageTitle + APP_TITLE_SEPARATOR + APP_TITLE;
  }, [pageTitle]);

  return (
    <>
      <BackLink />
      <br />
      {children}
    </>
  );
};
