import * as React from 'react';

const APP_TITLE = 'Accessibility Scenarios';
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

export const ScenariosListLink: React.FC = props => (
  <a className="sbdocs sbdocs-a" href={`iframe.html?id=accessibility-scenarios-list-of-scenarios--page`}>
    {props.children}
  </a>
);

export const BackLink = () => <ScenariosListLink>Go back to main menu</ScenariosListLink>;

export const Scenario: React.FunctionComponent<{ pageTitle: string }> = ({ pageTitle, children }) => {
  React.useEffect(() => {
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
