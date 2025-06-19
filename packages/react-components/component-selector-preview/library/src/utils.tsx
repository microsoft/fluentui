import * as React from 'react';

import { NamedComponent, ComponentDefinition, ComponentGroup, GroupQuestion } from './ComponentSelector';

const APP_TITLE = 'Component Selector';
const APP_TITLE_SEPARATOR = ' | ';
const formatComponentStoryUrl = (component: string, story: string) =>
  `https://react.fluentui.dev/?path=/docs/components-${component}--docs#${story}`;

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
  <a
    className="sbdocs sbdocs-a"
    href={`iframe.html?id=concepts-developer-accessibility-stories-list-of-scenarios--page`}
  >
    {props.children}
  </a>
);

export const BackLink = () => <ScenariosListLink>Go back to main menu</ScenariosListLink>;

export const Scenario: React.FC<{ pageTitle: string }> = ({ pageTitle, children }) => {
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

export const removeFromArray = (array: any[], item: any) => {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
};

const camelToDashed = (camel: string) => {
  const dashed = camel.toLowerCase().replace(/\ |\:/g, '-');
  return dashed;
};

export const getComponentStoryUrl = (component: ComponentDefinition) => {
  const camelComponent = component.folder ? component.folder + ' ' + component.component : component.component;
  const dashedComponent = camelToDashed(camelComponent);
  const dashedStory = component.story ? camelToDashed(component.story) : 'default';
  const url = formatComponentStoryUrl(dashedComponent, dashedStory);
  return url;
};

const getQuestionsIDs = (name: string, groups: ComponentGroup[]) => {
  const questionsIds: string[] = [];
  groups.forEach(group => {
    group.tags.includes(name) ? questionsIds.push(...group.questions) : null;
  });
  return questionsIds;
};

export const getAllQuestions = (
  selectedComponents: NamedComponent[],
  groups: ComponentGroup[],
  questions: GroupQuestion[],
) => {
  let allQuestionsIDs: string[] = [];
  selectedComponents.forEach(component => {
    getQuestionsIDs(component.name, groups).forEach(id => {
      allQuestionsIDs.includes(id) ? null : allQuestionsIDs.push(id);
    });
  });

  const allQuestions = allQuestionsIDs
    .map(questionId => questions.find(question => question.id === questionId))
    .filter(foundQuestion => foundQuestion !== undefined);
  return allQuestions;
};

export const hasQuestions = (componentName: string, groups: ComponentGroup[], questions: GroupQuestion[]) => {
  const components = [{ name: componentName }];
  const componentQuestions = getAllQuestions(components, groups, questions);
  return componentQuestions.length > 0;
};
