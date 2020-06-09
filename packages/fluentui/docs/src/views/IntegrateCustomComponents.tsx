import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Header,
  Provider,
  createComponent,
  ComponentSlotStyle,
  ComponentVariablesInput,
  ReactChildren,
} from '@fluentui/react-northstar';

import DocPage from '../components/DocPage/DocPage';
import ExampleSnippet from '../components/ExampleSnippet/ExampleSnippet';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';

interface StyledButtonProps {
  className?: string;
  styles?: ComponentSlotStyle;
  variables?: ComponentVariablesInput;
  children?: ReactChildren;
}

const StyledButton = createComponent<StyledButtonProps>({
  displayName: 'StyledButton',
  render({ config, children }) {
    const { classes } = config;
    return <button className={classes.root}>{children}</button>;
  },
});

export default () => (
  <DocPage title="Integrate Custom Components">
    <Header as="h2" content="Overview" />
    <p>
      You can use your own components as part of the Fluent UI's styling and theming mechanisms. In order for all
      theming aspects to be available to your custom components, you should use the <code>createComponent</code>{' '}
      function, provided by the Fluent UI library.
    </p>
    <Header as="h2" content="Create custom component" />
    <p>
      Let's take a look into one simple example of using the <code>createComponent</code> function for adapting your
      custom component to the Fluent UI's styling and theming mechanisms.
    </p>
    <ExampleSnippet
      value={`
        import { createComponent } from '@fluentui/react-northstar'

        const StyledButton = createComponent({
          displayName: 'StyledButton',
          render: ({ config, children }) => {
            const { classes } = config
            return <button className={classes.root}>{children}</button>
          }
        })
      `}
    />
    <p>
      Let's go step by step throughout all bits of the <code>createComponent</code> method.
    </p>
    <p>
      The first argument to the <code>createComponent</code> config's param is the is the <code>displayName</code>,
      which value might be used as key to define component's styles and variables in theme, exactly the same way how it
      might be done for any first-class Fluent UI component.
    </p>
    <ExampleSnippet
      value={`
        <Provider
          theme={{
            componentVariables: {
              StyledButton: {
                color: '#F2F2F2',
              },
            },
            componentStyles: {
              StyledButton: {
                root: ({ variables, theme: { siteVariables } }) => ({
                  backgroundColor: siteVariables.colors.brand[600],
                  color: variables.color,
                }),
              },
            },
          }}
        >
          <StyledButton>Provider styled button</StyledButton>
        </Provider>
      `}
    />
    <p>
      The second argument of the <code>createComponent</code> config param is the <code>render</code> method. This is
      the place where where you might link Fluent UI bits with your custom component - e.g. by simply passing them as
      props. This <code>render</code> method will be invoked with the following parameters:
    </p>
    <ul>
      <li>
        <code>config</code> - the object containing the evaluated theming props (<code>classes/styles</code>,
        <code>accessibility</code>
        and <code>rtl</code>).
      </li>
      <li>
        <code>...props</code> - all user-defined <code>props</code>.
      </li>
    </ul>
    <Header as="h2" content="Using the custom components" />
    <p>
      We already saw how the <code>Provider</code> can define some stylings and variables for the custom components.
      Next, we will take a look into several examples of how the user can further customize styles and variables of
      these components, the same way they would do with the Fluent UI components.
    </p>
    <Header
      as="h3"
      content={
        <>
          Example 1. Using <code>styles</code> property
        </>
      }
    />
    <ExampleSnippet
      render={() => (
        <StyledButton styles={{ ':hover': { backgroundColor: 'yellow' } }}>Inline styled button</StyledButton>
      )}
    />
    <p>
      The same can be achieved with adding styles in the <code>componentStyles</code> part of the <code>theme</code> in
      the <code>Provider</code>.
    </p>
    <ExampleSnippet
      render={() => (
        <Provider
          theme={{
            // component's displayName arg is used as a selector
            componentStyles: {
              StyledButton: {
                root: {
                  ':hover': { backgroundColor: 'yellow' },
                },
              },
            },
          }}
        >
          <StyledButton>Inline styled button</StyledButton>
        </Provider>
      )}
    />
    <p>
      For more advanced theming scenarios, please take a look in the <b>Styles</b> section on the{' '}
      <NavLink to="theming">Theming guide</NavLink>.
    </p>
    <Header
      as="h3"
      content={
        <>
          Example 2. Using <code>variables</code> property
        </>
      }
    />
    <p>
      Let's consider that the following <code>theme</code> was passed to the <code>Provider</code>.
    </p>
    <ExampleSnippet
      value={`
        <Provider
          theme={{
            // other theme parts
            componentStyles: {
              StyledButton: {
                root: ({ variables }) => ({
                  color: variables.color
                }),
              },
            },
          }}
        >
          ...
        </Provider>
      `}
    />
    <p>
      Then we can use the <code>variables</code> prop for changing the color inside the <code>StyledButton</code>.
    </p>
    <ExampleSnippet
      value={`
        <StyledButton variables={{color: "red" }}>
          Inline styled button
        </StyledButton>
      `}
      render={() => (
        <Provider
          theme={{
            componentStyles: {
              StyledButton: {
                root: ({ variables }) => ({
                  color: (variables as any).color,
                }),
              },
            },
          }}
        >
          <StyledButton variables={{ color: 'red' }}>Inline styled button</StyledButton>
        </Provider>
      )}
    />
    <p>
      The alternative approach with defining <code>componentVariables</code> inside the <code>theme</code> would like
      like this:
    </p>
    <ExampleSnippet
      value={`
        <Provider
          theme={{
            // component's displayName arg is used as a selector
            componentVariables: {
              StyledButton: {
                color: "red"
              },
            },
            componentStyles: {
              StyledButton: {
                root: ({ variables }) => ({
                  color: variables.color
                }),
              },
            },
          }}
        >
          ...
        </Provider>
      `}
    />
    <p>
      For more advanced theming scenarios, please take a look in the <b>Variables</b> section on the{' '}
      <NavLink to="theming">Theming guide</NavLink>.
    </p>

    <Header
      as="h3"
      content={
        <>
          Example 3. Using <code>accessibility</code> property
        </>
      }
    />
    <p>
      It is possible to define accessibility behavior of the created component - in order to do that the{' '}
      <code>accessibility</code> prop should be defined as part of <code>defaultProps</code>.
    </p>
    <p>
      In the following example <code>buttonBehavior</code> is provided to <code>StyledButton</code> that results in
      accessibility attributes being evaluated for the component - and those, subsequently, are consumed in the{' '}
      <code>render</code> function:
    </p>
    <ExampleSnippet
      value={`
        import { createComponent, buttonBehavior } from '@fluentui/react-northstar'

        const StyledButton = createComponent({
          displayName: 'StyledButton',
          defaultProps: {
            accessibility: buttonBehavior
          },
          render: ({ config, children }) => {
            const { classes, accessibility } = config
            return <button {...accessibility.attributes.root} className={classes.root}>{children}</button>
          }
        })
      `}
    />
    <p>
      To get more details on <b>Accessibility</b> support in Fluent UI refer to the{' '}
      <NavLink to="accessibility">Accessibility guide</NavLink> section.
    </p>

    <GuidesNavigationFooter
      previous={{ name: 'Layout', url: 'layout' }}
      next={{ name: 'Performance', url: 'performance' }}
    />
  </DocPage>
);
