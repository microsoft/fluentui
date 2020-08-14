import { KnobProvider } from '@fluentui/docs-components';
import * as _ from 'lodash';
import * as React from 'react';

import { examplePlaygroundContext } from '../../utils';
import ComponentPlaygroundTemplate from './ComponentPlaygroundTemplate';
import usePlaygroundComponent from './usePlaygroundComponent';

type ComponentPlaygroundProps = {
  componentName: string;
};

const unsupportedComponents = [
  'Accordion',
  'Animation',
  'Box',
  'Carousel',
  'Chat',
  'Dropdown',
  'Flex',
  'Form',
  'Grid',
  'ItemLayout',
  'Layout',
  'List',
  'MenuButton',
  'Portal',
  'Provider',
  'RadioGroup',
  'SplitButton',
  'Table',
  'Toolbar',
  'Ref',
];

const ComponentPlayground: React.FunctionComponent<ComponentPlaygroundProps> = props => {
  if (unsupportedComponents.indexOf(props.componentName) !== -1) {
    return null;
  }

  const playgroundPaths = examplePlaygroundContext.keys();
  const playgroundPath = _.find(playgroundPaths, playgroundPath =>
    _.includes(playgroundPath, `/${props.componentName}/`),
  );

  if (playgroundPath) {
    const component: React.FC = examplePlaygroundContext(playgroundPath).default;

    return <ComponentPlaygroundTemplate component={component} />;
  }

  // This is intentional, `playgroundPath` will not change during execution
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [element, unsupportedProps] = usePlaygroundComponent(props.componentName);

  return (
    /* TODO: remove "fluid" prop after Divider's refactor */
    <ComponentPlaygroundTemplate element={element} fluid={props.componentName === 'Divider'}>
      {process.env.NODE_ENV === 'production' ? null : (
        <div
          style={{
            fontSize: 10,
            border: '2px dotted pink',
            margin: 5,
            padding: 5,
            maxWidth: '200px',
          }}
        >
          <b>Props not supported in playground</b> {unsupportedProps.join(' | ')}
        </div>
      )}
    </ComponentPlaygroundTemplate>
  );
};

export default props => (
  /* KnobProvider should be defined outside otherwise hooks will not properly register */
  <KnobProvider>
    <ComponentPlayground {...props} />
  </KnobProvider>
);
