import * as React from 'react';
import { useFluent } from '@fluentui/react-components';

const APP_TITLE = 'Content editable tags';
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

export const TagsListLink: React.FC = props => (
  <a
    className="sbdocs sbdocs-a"
    href={`iframe.html?id=concepts-developer-accessibility-contenteditabletags-list-of-tags--page`}
  >
    {props.children}
  </a>
);

export const BackLink = () => <TagsListLink>Go back to main menu</TagsListLink>;

export const Prototype: React.FC<{ pageTitle: string }> = ({ pageTitle, children }) => {
  const { targetDocument } = useFluent();

  React.useEffect(() => {
    if (targetDocument) {
      targetDocument.title = pageTitle + APP_TITLE_SEPARATOR + APP_TITLE;
    }
  }, [targetDocument, pageTitle]);

  return (
    <>
      <BackLink />
      <br />
      {children}
    </>
  );
};
