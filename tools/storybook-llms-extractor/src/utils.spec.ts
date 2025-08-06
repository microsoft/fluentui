import { argsWithRefs } from './__fixtures__/args';
import { storybookStoreItems } from './__fixtures__/storybook-store-items';

import { convertHtmlToMarkdown, generateSummaryContent, generateFullFileContentFromStory } from './utils';

describe('generate-llms-docs', () => {
  describe('convertHtmlToMarkdown', () => {
    it('should convert html code blocks to markdown', async () => {
      const html = `
        <pre class="prismjs">
          <div class="language-sh">
            <span >yarn add @fluentui/react-components</span>
          </div>
        </pre>
      `;
      const markdown = await convertHtmlToMarkdown(html);
      expect(markdown).toMatchInlineSnapshot(`
        "\`\`\`sh
        yarn add @fluentui/react-components
        \`\`\`"
      `);
    });

    it('should convert html subheadings to markdown', async () => {
      const html = `
        <h2 id="setup">
          <a aria-hidden="true" href="#setup" tabindex="-1" target="_self"></a>
          Setup
        </h2>
        <h3 id="react-18">
          <a aria-hidden="true" href="#react-18" tabindex="-1" target="_self"></a>
          React 18
        </h3>
        <h4 id="ssr-with-nextjs">
          <a aria-hidden="true" href="#ssr-with-nextjs" tabindex="-1" target="_self"></a>
          SSR with Next.js
        </h4>
      `;
      const markdown = await convertHtmlToMarkdown(html);
      expect(markdown).toMatchInlineSnapshot(`
        "## Setup

        ### React 18

        #### SSR with Next.js"
      `);
    });

    it('should remove copy buttons and other irrelevant elements', async () => {
      const html = `
        <pre>
          Content with a copy button
          <div>
            <button>Copy</button>
          </div>
        </pre>
      `;
      const markdown = await convertHtmlToMarkdown(html);
      expect(markdown).not.toContain('Copy');
      expect(markdown).not.toContain('<button');
    });
  });

  describe('generateFullFileContentFromStory', () => {
    it('should generate full file content from MDX story', () => {
      const content = generateFullFileContentFromStory(storybookStoreItems[0]);
      expect(content.join('\n')).toMatchInlineSnapshot(`
        "# Fluent UI React Componentsv9.66.6

        # What's new

        Lightweight components for smaller bundle size and faster performance.

        New tokens system for frictionless cohesion across OS themes.

        New assets to level up Teams add-ins and M365 experiences.

        # Overview

        Fluent UI React Components is a set of UI components and utilities resulting from an effort to converge the set of React based component libraries in production today: \`@fluentui/react\` and \`@fluentui/react-northstar\`.

        Each component is designed to adhere to the following standards:

        -   **Customizable**: Fluent-styled components by default, but easy to integrate your own brand and theme
        -   **Performance**: Optimized for render performance
        -   **Bundle size**: Refactored and slimmed down components that allow you to include the packages and dependencies you need
        -   **Accessibility**: WCAG 2.1 compliant and tested by trusted testers
        -   **Design to Code**: Stay up to date with Fluent Design Language changes via Design Tokens

        # Questions?

        Reach out to the Fluent UI React team on [GitHub][1]

        [1]: https://github.com/microsoft/fluentui"
      `);
    });

    it('should generate full file content from MDX story with code blocks', async () => {
      const content = generateFullFileContentFromStory(storybookStoreItems[1]);
      expect(content.join('\n')).toMatchInlineSnapshot(`
        "## Install

        Fluent UI should be installed as a \`dependency\` of your app.

        \`\`\`sh
        yarn add @fluentui/react-components
        \`\`\`

        # Setup

        Fluent UI components are styled using CSS in JS. This technique requires a style renderer which inserts CSS into DOM when needed. React context is used to provide the style renderer.

        Place a \`<FluentProvider />\` at the root of your app and pass theme as a prop.

        # React 18

        \`\`\`jsx
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import App from './App';
        const root = createRoot(document.getElementById('root'));
        root.render(
          <FluentProvider theme={webLightTheme}>
            <App />
          </FluentProvider>,
        );
        \`\`\`

        # React 17

        \`\`\`jsx
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import App from './App';
        ReactDOM.render(
          <FluentProvider theme={webLightTheme}>
            <App />
          </FluentProvider>,
          document.getElementById('root'),
        );
        \`\`\`

        # Usage

        That's it. You can now use Fluent UI components in your app.

        \`\`\`jsx
        import React from 'react';
        import { Button } from '@fluentui/react-components';
        export default () => <Button appearance=\\"primary\\">Get started</Button>;
        \`\`\`

        # Strict mode

        We are aware of some strict mode bugs when using Fluent UI v9 in React 18. These bugs only show up in strict mode, and they will not stop the rest of your app from running. You can [track the bugs on Github][1] and learn how they will affect your application.

        # SSR with Next.js

        To avoid strict mode hydration issues, you can disable strict mode in your Next.js app by adding the following configuration to your \`next.config.js\` file:

        \`\`\`js
        module.exports = {
          reactStrictMode: false,
        };
        \`\`\`

        [1]: https://github.com/microsoft/fluentui/issues?q=is%3Aopen+is%3Aissue+label%3A%22Area%3A+Strict+Mode%22+label%3A%22React+18%22"
      `);
    });

    it('should generate full file content from component story', () => {
      const content = generateFullFileContentFromStory(storybookStoreItems[2]);
      expect(content.join('\n')).toMatchInlineSnapshot(`
        "# Components/Accordion

        An accordion allows users to toggle the display of content by expanding or collapsing sections.


        ## Props


        | Name | Type | Required | Default | Description |
        |------|------|----------|---------|-------------|
        | \`as\` | \`\\"div\\"\` | No |  |  |
        | \`defaultOpenItems\` | \`unknown\` | No |  | Default value for the uncontrolled state of the panel. |
        | \`collapsible\` | \`boolean\` | No |  | Indicates if Accordion support multiple Panels closed at the same time. |
        | \`multiple\` | \`boolean\` | No |  | Indicates if Accordion support multiple Panels opened at the same time. |
        | \`navigation\` | \`\\"linear\\" \\"circular\\"\` | No |  | @deprecated Arrow keyboard navigation is not recommended for accordions. Consider using Tree if arrow navigation is a hard requirement. Indicates if keyboard navigation is available and gives two options, linear or circular navigation. |
        | \`onToggle\` | \`AccordionToggleEventHandler<unknown>\` | No |  | Callback to be called when the opened items change. |
        | \`openItems\` | \`unknown\` | No |  | Controls the state of the panel. |
        | \`ref\` | \`Ref<HTMLDivElement>\` | No |  |  |


        ## Subcomponents


        ### AccordionItem

        Define a styled AccordionItem, using the \`useAccordionItem_unstable\` and \`useAccordionItemStyles_unstable\` hooks.

        #### Props


        | Name | Type | Required | Default | Description |
        |------|------|----------|---------|-------------|
        | \`as\` | \`\\"div\\"\` | No |  |  |
        | \`disabled\` | \`boolean\` | No |  | Disables opening/closing of panel. |
        | \`value\` | \`unknown\` | Yes |  | Required value that identifies this item inside an Accordion component. |
        | \`ref\` | \`Ref<HTMLDivElement>\` | No |  |  |



        ### AccordionHeader

        Define a styled AccordionHeader, using the \`useAccordionHeader_unstable\` and \`useAccordionHeaderStyles_unstable\`
        hooks.

        #### Props


        | Name | Type | Required | Default | Description |
        |------|------|----------|---------|-------------|
        | \`button\` | \`NonNullable<WithSlotShorthandValue<ARIAButtonSlotProps<\\"a\\">> | null>\` | No |  | The component to be used as button in heading |
        | \`expandIcon\` | \`WithSlotShorthandValue<{ as?: \\"span\\"; } & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, \\"ref\\"> & { ...; }, \\"children\\"> & { ...; }> | null\` | No |  | Expand icon slot rendered before (or after) children content in heading. |
        | \`icon\` | \`WithSlotShorthandValue<{ as?: \\"div\\"; } & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, \\"ref\\"> & { ...; }, \\"children\\"> & { ...; }> | null\` | No |  | Expand icon slot rendered before (or after) children content in heading. |
        | \`as\` | \`\\"div\\" \\"h1\\" \\"h2\\" \\"h3\\" \\"h4\\" \\"h5\\" \\"h6\\"\` | No |  |  |
        | \`expandIconPosition\` | \`\\"start\\" \\"end\\"\` | No |  | The position of the expand  icon slot in heading. |
        | \`inline\` | \`boolean\` | No |  | Indicates if the AccordionHeader should be rendered inline. |
        | \`size\` | \`\\"small\\" \\"medium\\" \\"large\\" \\"extra-large\\"\` | No |  | Size of spacing in the heading. |
        | \`ref\` | \`Ref<HTMLDivElement>\` | No |  |  |



        ### AccordionPanel

        Define a styled AccordionPanel, using the \`useAccordionPanel_unstable\` and \`useAccordionPanelStyles_unstable\` hooks.

        #### Props


        | Name | Type | Required | Default | Description |
        |------|------|----------|---------|-------------|
        | \`collapseMotion\` | \`PresenceMotionSlotProps | null\` | No |  |  |
        | \`as\` | \`\\"div\\"\` | No |  |  |
        | \`ref\` | \`Ref<HTMLDivElement>\` | No |  |  |


        ## Examples


        ### Collapsible

        An accordion can have multiple panels collapsed at the same time.

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Collapsible = () => (
          <Accordion collapsible>
            <AccordionItem value=\\"1\\">
              <AccordionHeader>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Controlled

        An accordion can be controlled, to ensure \`multiple\` and \`collapsible\` you should use \`openItems\` provided through \`onToggle\` callback.

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
          AccordionToggleEventHandler,
        } from \\"@fluentui/react-components\\";

        export const Controlled = () => {
          const [openItems, setOpenItems] = React.useState([\\"1\\"]);
          const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
            setOpenItems(data.openItems);
          };
          return (
            <Accordion
              openItems={openItems}
              onToggle={handleToggle}
              multiple
              collapsible
            >
              <AccordionItem value=\\"1\\">
                <AccordionHeader>Accordion Header 1</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 1</div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value=\\"2\\">
                <AccordionHeader>Accordion Header 2</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 2</div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value=\\"3\\">
                <AccordionHeader>Accordion Header 3</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 3</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        };
        \`\`\`

        ### Default

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Default = () => (
          <Accordion>
            <AccordionItem value=\\"1\\">
              <AccordionHeader>
                {\\" \\"}
                This is a very very very long heading. This is a very very very long
                heading. This is a very very very long heading. This is a very very very
                long heading.
              </AccordionHeader>
              <AccordionPanel>
                <div>
                  {\\" \\"}
                  This is a very very very long heading. This is a very very very long
                  heading. This is a very very very long heading. This is a very very
                  very long heading.
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Disabled

        An accordion item can be \`disabled\`

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Disabled = () => (
          <Accordion>
            <AccordionItem disabled value=\\"1\\">
              <AccordionHeader>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem disabled value=\\"2\\">
              <AccordionHeader>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem disabled value=\\"3\\">
              <AccordionHeader>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Expand Icon

        An accordion item can have a custom expand icon.

        \`\`\`tsx
        import * as React from \\"react\\";
        import { Add20Filled, Subtract20Filled } from \\"@fluentui/react-icons\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
          AccordionToggleEventHandler,
        } from \\"@fluentui/react-components\\";

        export const ExpandIcon = () => {
          const [openItem, setOpenItems] = React.useState(0);
          const handleToggle = React.useCallback<AccordionToggleEventHandler>(
            (_, data) => {
              setOpenItems(data.value as number);
            },
            []
          );
          return (
            <Accordion onToggle={handleToggle} openItems={openItem}>
              <AccordionItem value={1}>
                <AccordionHeader
                  expandIcon={openItem === 1 ? <Subtract20Filled /> : <Add20Filled />}
                >
                  Accordion Header 1
                </AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 1</div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value={2}>
                <AccordionHeader
                  expandIcon={openItem === 2 ? <Subtract20Filled /> : <Add20Filled />}
                >
                  Accordion Header 2
                </AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 2</div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value={3}>
                <AccordionHeader
                  expandIcon={openItem === 3 ? <Subtract20Filled /> : <Add20Filled />}
                >
                  Accordion Header 3
                </AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel 3</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        };
        \`\`\`

        ### Expand Icon Position

        The expand icon can be placed at the \`start\` or \`end\` of the accordian header.

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const ExpandIconPosition = () => (
          <Accordion>
            <AccordionItem value=\\"1\\">
              <AccordionHeader expandIconPosition=\\"end\\">
                Accordion Header 1
              </AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader expandIconPosition=\\"start\\">
                Accordion Header 2
              </AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Heading Levels

        An accordion header is a \`<div>\` by default, but according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties), we recommend using a proper heading of any level in markup.

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const HeadingLevels = () => (
          <Accordion>
            <AccordionItem value=\\"1\\">
              <AccordionHeader as=\\"h1\\">Accordion Header as h1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader as=\\"h2\\">Accordion Header as h2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader as=\\"h3\\">Accordion Header as h3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"4\\">
              <AccordionHeader as=\\"h4\\">Accordion Header as h4</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 4</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Inline

        An accordion header can be set to \`inline\`

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Inline = () => (
          <Accordion>
            <AccordionItem value=\\"1\\">
              <AccordionHeader inline>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader inline>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader inline>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Multiple

        An accordion supports multiple panels expanded simultaneously. Since it's not simple to determine which panel will be opened by default, \`multiple\` will also be collapsed by default on the first render

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Multiple = () => (
          <Accordion multiple>
            <AccordionItem value=\\"1\\">
              <AccordionHeader>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Open Items

        An accordion can have defined open items. If no open item is present, all panels will be closed by default

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const OpenItems = () => (
          <Accordion defaultOpenItems=\\"1\\">
            <AccordionItem value=\\"1\\">
              <AccordionHeader>Accordion Header 1</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader>Accordion Header 2</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader>Accordion Header 3</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`

        ### Sizes

        AccordionHeader supports \`small\`, \`medium\`, \`large\` and \`extra-large\` sizes.

        \`\`\`tsx
        import * as React from \\"react\\";
        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const Sizes = () => (
          <>
            <Accordion collapsible>
              <AccordionItem value=\\"1\\">
                <AccordionHeader size=\\"small\\">Small Header</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion collapsible>
              <AccordionItem value=\\"1\\">
                <AccordionHeader size=\\"medium\\">Medium Header</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion collapsible>
              <AccordionItem value=\\"1\\">
                <AccordionHeader size=\\"large\\">Large Header</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion collapsible>
              <AccordionItem value=\\"1\\">
                <AccordionHeader size=\\"extra-large\\">Extra-Large Header</AccordionHeader>
                <AccordionPanel>
                  <div>Accordion Panel</div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        );
        \`\`\`

        ### With Icon

        An accordion header can contain an icon.

        \`\`\`tsx
        import * as React from \\"react\\";
        import { RocketRegular } from \\"@fluentui/react-icons\\";

        import {
          Accordion,
          AccordionHeader,
          AccordionItem,
          AccordionPanel,
        } from \\"@fluentui/react-components\\";

        export const WithIcon = () => (
          <Accordion>
            <AccordionItem value=\\"1\\">
              <AccordionHeader icon={<RocketRegular />}>
                Accordion Header 1
              </AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"2\\">
              <AccordionHeader icon={<RocketRegular />}>
                Accordion Header 2
              </AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 2</div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value=\\"3\\">
              <AccordionHeader icon={<RocketRegular />}>
                Accordion Header 3
              </AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 3</div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
        \`\`\`"
      `);
    });
  });

  describe('generateSummaryContent', () => {
    it('should generate summary content', () => {
      const summaryContent = generateSummaryContent(argsWithRefs, storybookStoreItems);

      expect(summaryContent.join('\n')).toMatchInlineSnapshot(`
        "# Fluent UI React v9

        > **Note:** This is a summary overview using the LLMs.txt format (https://llmstxt.org/). Each section links to its full documentation file in plain text (.txt) format. Click any link below to view the detailed documentation for that section.

        Fluent UI React is a library of React components that implement Microsoft's Fluent Design System.

        - [Concepts/Introduction](https://react.fluentui.dev/llms/concepts-introduction.txt)
        - [Concepts/Developer/Quick Start](https://react.fluentui.dev/llms/concepts-developer-quick-start.txt)
        - [Components/Accordion](https://react.fluentui.dev/llms/components-accordion.txt): An accordion allows users to toggle the display of content by expanding or collapsing sections.

        ## Optional

        - [Charts v9](https://charts.fluentui.dev/llms.txt)
        "
      `);
    });
  });
});
