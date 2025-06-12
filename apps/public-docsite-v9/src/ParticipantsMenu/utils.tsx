import * as React from 'react';

const APP_TITLE = 'Participants menu prototypes';
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

export const PrototypesListLink: React.FC = props => (
  <a
    className="sbdocs sbdocs-a"
    href={`iframe.html?id=concepts-developer-accessibility-stories-participants-menu-prototypes--docs`}
  >
    {props.children}
  </a>
);

export const BackLink = () => <PrototypesListLink>Go back to prototypes list</PrototypesListLink>;

export const Prototype: React.FunctionComponent<{ pageTitle: string }> = ({ pageTitle, children }) => {
  React.useEffect(() => {
    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    document.title = pageTitle + APP_TITLE_SEPARATOR + APP_TITLE;
  }, [pageTitle]);

  return (
    <div role="main">
      <BackLink />
      <br />
      {children}
    </div>
  );
};
