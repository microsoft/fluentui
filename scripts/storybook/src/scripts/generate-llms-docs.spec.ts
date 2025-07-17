import { convertHtmlToMarkdown, generateFullFileContentFromStory, generateSummaryContent } from './generate-llms-docs';
import type { Args, StorybookData, StorybookStoreItem } from './generate-llms-docs';

const mockArgs = {
  summaryTitle: 'Fluent UI React v9',
  summaryDescription:
    "Fluent UI React is a library of React components that implement Microsoft's Fluent Design System.",
  baseUrl: 'https://react.fluentui.dev',
  distPath: 'dist/storybook',
  refs: [
    {
      title: 'Charts v9',
      url: 'https://charts.fluentui.dev',
    },
  ],
} satisfies Args;

const mockStoreItems: StorybookStoreItem[] = [
  // MDX story
  {
    meta: {
      id: 'concepts-introduction',
      title: 'Concepts/Introduction',
      parameters: {
        fileName: 'concepts-introduction.mdx',
        docs: {},
      },
    },
    stories: {
      'concepts-introduction--page': {
        id: 'concepts-introduction--page',
        name: 'Page',
        parameters: {
          docs: {},
          docsOnly: true,
          fullSource:
            "# Fluent UI React Componentsv9.66.6\n\n# What's new\n\nLightweight components for smaller bundle size and faster performance.\n\nNew tokens system for frictionless cohesion across OS themes.\n\nNew assets to level up Teams add-ins and M365 experiences.\n\n# Overview\n\nFluent UI React Components is a set of UI components and utilities resulting from an effort to converge the set of React based component libraries in production today: `@fluentui/react` and `@fluentui/react-northstar`.\n\nEach component is designed to adhere to the following standards:\n\n-   **Customizable**: Fluent-styled components by default, but easy to integrate your own brand and theme\n-   **Performance**: Optimized for render performance\n-   **Bundle size**: Refactored and slimmed down components that allow you to include the packages and dependencies you need\n-   **Accessibility**: WCAG 2.1 compliant and tested by trusted testers\n-   **Design to Code**: Stay up to date with Fluent Design Language changes via Design Tokens\n\n# Questions?\n\nReach out to the Fluent UI React team on [GitHub][1]\n\n[1]: https://github.com/microsoft/fluentui",
        },
      },
    },
  },

  // MDX story
  {
    meta: {
      id: 'concepts-developer-quick-start',
      title: 'Concepts/Developer/Quick Start',
      parameters: {
        fileName: 'concepts-developer-quick-start.mdx',
        docs: {},
      },
    },
    stories: {
      'concepts-developer-quick-start--page': {
        id: 'concepts-developer-quick-start--page',
        name: 'Page',
        parameters: {
          docs: {},
          docsOnly: true,
          fullSource:
            "## Install\n\nFluent UI should be installed as a `dependency` of your app.\n\n```sh\nyarn add @fluentui/react-components\n```\n\n# Setup\n\nFluent UI components are styled using CSS in JS. This technique requires a style renderer which inserts CSS into DOM when needed. React context is used to provide the style renderer.\n\nPlace a `<FluentProvider />` at the root of your app and pass theme as a prop.\n\n# React 18\n\n```jsx\nimport React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport { FluentProvider, webLightTheme } from '@fluentui/react-components';\nimport App from './App';\nconst root = createRoot(document.getElementById('root'));\nroot.render(\n  <FluentProvider theme={webLightTheme}>\n    <App />\n  </FluentProvider>,\n);\n```\n\n# React 17\n\n```jsx\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { FluentProvider, webLightTheme } from '@fluentui/react-components';\nimport App from './App';\nReactDOM.render(\n  <FluentProvider theme={webLightTheme}>\n    <App />\n  </FluentProvider>,\n  document.getElementById('root'),\n);\n```\n\n# Usage\n\nThat's it. You can now use Fluent UI components in your app.\n\n```jsx\nimport React from 'react';\nimport { Button } from '@fluentui/react-components';\nexport default () => <Button appearance=\"primary\">Get started</Button>;\n```\n\n# Strict mode\n\nWe are aware of some strict mode bugs when using Fluent UI v9 in React 18. These bugs only show up in strict mode, and they will not stop the rest of your app from running. You can [track the bugs on Github][1] and learn how they will affect your application.\n\n# SSR with Next.js\n\nTo avoid strict mode hydration issues, you can disable strict mode in your Next.js app by adding the following configuration to your `next.config.js` file:\n\n```js\nmodule.exports = {\n  reactStrictMode: false,\n};\n```\n\n[1]: https://github.com/microsoft/fluentui/issues?q=is%3Aopen+is%3Aissue+label%3A%22Area%3A+Strict+Mode%22+label%3A%22React+18%22",
        },
      },
    },
  },

  // Component story
  {
    meta: {
      id: 'components-accordion',
      title: 'Components/Accordion',
      parameters: {
        fileName: 'components-accordion.tsx',
        docs: {
          description: {
            component:
              'An accordion allows users to toggle the display of content by expanding or collapsing sections.\n',
          },
        },
      },
      component: {
        displayName: 'Accordion',
        __docgenInfo: {
          props: {
            as: {
              defaultValue: null,
              description: '',
              name: 'as',
              required: false,
              type: {
                name: 'enum',
                value: [
                  {
                    value: '"div"',
                  },
                ],
              },
            },
            defaultOpenItems: {
              defaultValue: null,
              description: 'Default value for the uncontrolled state of the panel.',
              name: 'defaultOpenItems',
              required: false,
              type: {
                name: 'unknown',
              },
            },
            collapsible: {
              defaultValue: null,
              description: 'Indicates if Accordion support multiple Panels closed at the same time.',
              name: 'collapsible',
              required: false,
              type: {
                name: 'boolean',
              },
            },
            multiple: {
              defaultValue: null,
              description: 'Indicates if Accordion support multiple Panels opened at the same time.',
              name: 'multiple',
              required: false,
              type: {
                name: 'boolean',
              },
            },
            navigation: {
              defaultValue: null,
              description:
                '@deprecated Arrow keyboard navigation is not recommended for accordions. Consider using Tree if arrow navigation is a hard requirement.\nIndicates if keyboard navigation is available and gives two options, linear or circular navigation.',
              name: 'navigation',
              required: false,
              type: {
                name: 'enum',
                value: [
                  {
                    value: '"linear"',
                  },
                  {
                    value: '"circular"',
                  },
                ],
              },
            },
            onToggle: {
              defaultValue: null,
              description: 'Callback to be called when the opened items change.',
              name: 'onToggle',
              required: false,
              type: {
                name: 'AccordionToggleEventHandler<unknown>',
              },
            },
            openItems: {
              defaultValue: null,
              description: 'Controls the state of the panel.',
              name: 'openItems',
              required: false,
              type: {
                name: 'unknown',
              },
            },
            ref: {
              defaultValue: null,
              description: '',
              name: 'ref',
              required: false,
              type: {
                name: 'Ref<HTMLDivElement>',
              },
            },
          },
        },
      },
      subcomponents: {
        AccordionItem: {
          displayName: 'AccordionItem',
          __docgenInfo: {
            description:
              'Define a styled AccordionItem, using the `useAccordionItem_unstable` and `useAccordionItemStyles_unstable` hooks.',
            displayName: 'AccordionItem',
            props: {
              as: {
                defaultValue: null,
                description: '',
                name: 'as',
                required: false,
                type: {
                  name: 'enum',
                  value: [
                    {
                      value: '"div"',
                    },
                  ],
                },
              },
              disabled: {
                defaultValue: null,
                description: 'Disables opening/closing of panel.',
                name: 'disabled',
                required: false,
                type: {
                  name: 'boolean',
                },
              },
              value: {
                defaultValue: null,
                description: 'Required value that identifies this item inside an Accordion component.',
                name: 'value',
                required: true,
                type: {
                  name: 'unknown',
                },
              },
              ref: {
                defaultValue: null,
                description: '',
                name: 'ref',
                required: false,
                type: {
                  name: 'Ref<HTMLDivElement>',
                },
              },
            },
          },
        },
        AccordionHeader: {
          displayName: 'AccordionHeader',
          __docgenInfo: {
            description:
              'Define a styled AccordionHeader, using the `useAccordionHeader_unstable` and `useAccordionHeaderStyles_unstable`\nhooks.',
            displayName: 'AccordionHeader',
            props: {
              button: {
                defaultValue: null,
                description: 'The component to be used as button in heading',
                name: 'button',
                required: false,
                type: {
                  name: 'NonNullable<WithSlotShorthandValue<ARIAButtonSlotProps<"a">> | null>',
                },
              },
              expandIcon: {
                defaultValue: null,
                description: 'Expand icon slot rendered before (or after) children content in heading.',
                name: 'expandIcon',
                required: false,
                type: {
                  name: 'WithSlotShorthandValue<{ as?: "span"; } & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & { ...; }, "children"> & { ...; }> | null',
                },
              },
              icon: {
                defaultValue: null,
                description: 'Expand icon slot rendered before (or after) children content in heading.',
                name: 'icon',
                required: false,
                type: {
                  name: 'WithSlotShorthandValue<{ as?: "div"; } & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & { ...; }, "children"> & { ...; }> | null',
                },
              },
              as: {
                defaultValue: null,
                description: '',
                name: 'as',
                required: false,
                type: {
                  name: 'enum',
                  value: [
                    {
                      value: '"div"',
                    },
                    {
                      value: '"h1"',
                    },
                    {
                      value: '"h2"',
                    },
                    {
                      value: '"h3"',
                    },
                    {
                      value: '"h4"',
                    },
                    {
                      value: '"h5"',
                    },
                    {
                      value: '"h6"',
                    },
                  ],
                },
              },
              expandIconPosition: {
                defaultValue: null,
                description: 'The position of the expand  icon slot in heading.',
                name: 'expandIconPosition',
                required: false,
                type: {
                  name: 'enum',
                  value: [
                    {
                      value: '"start"',
                    },
                    {
                      value: '"end"',
                    },
                  ],
                },
              },
              inline: {
                defaultValue: null,
                description: 'Indicates if the AccordionHeader should be rendered inline.',
                name: 'inline',
                required: false,
                type: {
                  name: 'boolean',
                },
              },
              size: {
                defaultValue: null,
                description: 'Size of spacing in the heading.',
                name: 'size',
                required: false,
                type: {
                  name: 'enum',
                  value: [
                    {
                      value: '"small"',
                    },
                    {
                      value: '"medium"',
                    },
                    {
                      value: '"large"',
                    },
                    {
                      value: '"extra-large"',
                    },
                  ],
                },
              },
              ref: {
                defaultValue: null,
                description: '',
                name: 'ref',
                required: false,
                type: {
                  name: 'Ref<HTMLDivElement>',
                },
              },
            },
          },
        },
        AccordionPanel: {
          displayName: 'AccordionPanel',
          __docgenInfo: {
            description:
              'Define a styled AccordionPanel, using the `useAccordionPanel_unstable` and `useAccordionPanelStyles_unstable` hooks.',
            displayName: 'AccordionPanel',
            props: {
              collapseMotion: {
                defaultValue: null,
                description: '',
                name: 'collapseMotion',
                required: false,
                type: {
                  name: 'PresenceMotionSlotProps | null',
                },
              },
              as: {
                defaultValue: null,
                description: '',
                name: 'as',
                required: false,
                type: {
                  name: 'enum',
                  value: [
                    {
                      value: '"div"',
                    },
                  ],
                },
              },
              ref: {
                defaultValue: null,
                description: '',
                name: 'ref',
                required: false,
                type: {
                  name: 'Ref<HTMLDivElement>',
                },
              },
            },
          },
        },
      },
    },
    stories: {
      'components-accordion--collapsible': {
        id: 'components-accordion--collapsible',
        name: 'Collapsible',
        parameters: {
          docs: {
            description: {
              story: 'An accordion can have multiple panels collapsed at the same time.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Collapsible = () => (\n  <Accordion collapsible>\n    <AccordionItem value="1">\n      <AccordionHeader>Accordion Header 1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--controlled': {
        id: 'components-accordion--controlled',
        name: 'Controlled',
        parameters: {
          docs: {
            description: {
              story:
                'An accordion can be controlled, to ensure `multiple` and `collapsible` you should use `openItems` provided through `onToggle` callback.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n  AccordionToggleEventHandler,\n} from "@fluentui/react-components";\n\nexport const Controlled = () => {\n  const [openItems, setOpenItems] = React.useState(["1"]);\n  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {\n    setOpenItems(data.openItems);\n  };\n  return (\n    <Accordion\n      openItems={openItems}\n      onToggle={handleToggle}\n      multiple\n      collapsible\n    >\n      <AccordionItem value="1">\n        <AccordionHeader>Accordion Header 1</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 1</div>\n        </AccordionPanel>\n      </AccordionItem>\n      <AccordionItem value="2">\n        <AccordionHeader>Accordion Header 2</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 2</div>\n        </AccordionPanel>\n      </AccordionItem>\n      <AccordionItem value="3">\n        <AccordionHeader>Accordion Header 3</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 3</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n  );\n};\n',
        },
      },
      'components-accordion--default': {
        id: 'components-accordion--default',
        name: 'Default',
        parameters: {
          docs: {},
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Default = () => (\n  <Accordion>\n    <AccordionItem value="1">\n      <AccordionHeader>\n        {" "}\n        This is a very very very long heading. This is a very very very long\n        heading. This is a very very very long heading. This is a very very very\n        long heading.\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>\n          {" "}\n          This is a very very very long heading. This is a very very very long\n          heading. This is a very very very long heading. This is a very very\n          very long heading.\n        </div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--disabled': {
        id: 'components-accordion--disabled',
        name: 'Disabled',
        parameters: {
          docs: {
            description: {
              story: 'An accordion item can be `disabled`',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Disabled = () => (\n  <Accordion>\n    <AccordionItem disabled value="1">\n      <AccordionHeader>Accordion Header 1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem disabled value="2">\n      <AccordionHeader>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem disabled value="3">\n      <AccordionHeader>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--expand-icon': {
        id: 'components-accordion--expand-icon',
        name: 'Expand Icon',
        parameters: {
          docs: {
            description: {
              story: 'An accordion item can have a custom expand icon.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport { Add20Filled, Subtract20Filled } from "@fluentui/react-icons";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n  AccordionToggleEventHandler,\n} from "@fluentui/react-components";\n\nexport const ExpandIcon = () => {\n  const [openItem, setOpenItems] = React.useState(0);\n  const handleToggle = React.useCallback<AccordionToggleEventHandler>(\n    (_, data) => {\n      setOpenItems(data.value as number);\n    },\n    []\n  );\n  return (\n    <Accordion onToggle={handleToggle} openItems={openItem}>\n      <AccordionItem value={1}>\n        <AccordionHeader\n          expandIcon={openItem === 1 ? <Subtract20Filled /> : <Add20Filled />}\n        >\n          Accordion Header 1\n        </AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 1</div>\n        </AccordionPanel>\n      </AccordionItem>\n      <AccordionItem value={2}>\n        <AccordionHeader\n          expandIcon={openItem === 2 ? <Subtract20Filled /> : <Add20Filled />}\n        >\n          Accordion Header 2\n        </AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 2</div>\n        </AccordionPanel>\n      </AccordionItem>\n      <AccordionItem value={3}>\n        <AccordionHeader\n          expandIcon={openItem === 3 ? <Subtract20Filled /> : <Add20Filled />}\n        >\n          Accordion Header 3\n        </AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel 3</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n  );\n};\n',
        },
      },
      'components-accordion--expand-icon-position': {
        id: 'components-accordion--expand-icon-position',
        name: 'Expand Icon Position',
        parameters: {
          docs: {
            description: {
              story: 'The expand icon can be placed at the `start` or `end` of the accordian header.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const ExpandIconPosition = () => (\n  <Accordion>\n    <AccordionItem value="1">\n      <AccordionHeader expandIconPosition="end">\n        Accordion Header 1\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader expandIconPosition="start">\n        Accordion Header 2\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--heading-levels': {
        id: 'components-accordion--heading-levels',
        name: 'Heading Levels',
        parameters: {
          docs: {
            description: {
              story:
                'An accordion header is a `<div>` by default, but according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties), we recommend using a proper heading of any level in markup.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const HeadingLevels = () => (\n  <Accordion>\n    <AccordionItem value="1">\n      <AccordionHeader as="h1">Accordion Header as h1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader as="h2">Accordion Header as h2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader as="h3">Accordion Header as h3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="4">\n      <AccordionHeader as="h4">Accordion Header as h4</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 4</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--inline': {
        id: 'components-accordion--inline',
        name: 'Inline',
        parameters: {
          docs: {
            description: {
              story: 'An accordion header can be set to `inline`',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Inline = () => (\n  <Accordion>\n    <AccordionItem value="1">\n      <AccordionHeader inline>Accordion Header 1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader inline>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader inline>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--multiple': {
        id: 'components-accordion--multiple',
        name: 'Multiple',
        parameters: {
          docs: {
            description: {
              story:
                "An accordion supports multiple panels expanded simultaneously. Since it's not simple to determine which panel will be opened by default, `multiple` will also be collapsed by default on the first render",
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Multiple = () => (\n  <Accordion multiple>\n    <AccordionItem value="1">\n      <AccordionHeader>Accordion Header 1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--open-items': {
        id: 'components-accordion--open-items',
        name: 'Open Items',
        parameters: {
          docs: {
            description: {
              story:
                'An accordion can have defined open items. If no open item is present, all panels will be closed by default',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const OpenItems = () => (\n  <Accordion defaultOpenItems="1">\n    <AccordionItem value="1">\n      <AccordionHeader>Accordion Header 1</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader>Accordion Header 2</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader>Accordion Header 3</AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
      'components-accordion--sizes': {
        id: 'components-accordion--sizes',
        name: 'Sizes',
        parameters: {
          docs: {
            description: {
              story: 'AccordionHeader supports `small`, `medium`, `large` and `extra-large` sizes.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const Sizes = () => (\n  <>\n    <Accordion collapsible>\n      <AccordionItem value="1">\n        <AccordionHeader size="small">Small Header</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n    <Accordion collapsible>\n      <AccordionItem value="1">\n        <AccordionHeader size="medium">Medium Header</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n    <Accordion collapsible>\n      <AccordionItem value="1">\n        <AccordionHeader size="large">Large Header</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n    <Accordion collapsible>\n      <AccordionItem value="1">\n        <AccordionHeader size="extra-large">Extra-Large Header</AccordionHeader>\n        <AccordionPanel>\n          <div>Accordion Panel</div>\n        </AccordionPanel>\n      </AccordionItem>\n    </Accordion>\n  </>\n);\n',
        },
      },
      'components-accordion--with-icon': {
        id: 'components-accordion--with-icon',
        name: 'With Icon',
        parameters: {
          docs: {
            description: {
              story: 'An accordion header can contain an icon.',
            },
          },
          fullSource:
            'import * as React from "react";\nimport { RocketRegular } from "@fluentui/react-icons";\n\nimport {\n  Accordion,\n  AccordionHeader,\n  AccordionItem,\n  AccordionPanel,\n} from "@fluentui/react-components";\n\nexport const WithIcon = () => (\n  <Accordion>\n    <AccordionItem value="1">\n      <AccordionHeader icon={<RocketRegular />}>\n        Accordion Header 1\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 1</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="2">\n      <AccordionHeader icon={<RocketRegular />}>\n        Accordion Header 2\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 2</div>\n      </AccordionPanel>\n    </AccordionItem>\n    <AccordionItem value="3">\n      <AccordionHeader icon={<RocketRegular />}>\n        Accordion Header 3\n      </AccordionHeader>\n      <AccordionPanel>\n        <div>Accordion Panel 3</div>\n      </AccordionPanel>\n    </AccordionItem>\n  </Accordion>\n);\n',
        },
      },
    },
  },
];

const mockStorybookData: StorybookData = {
  refs: [],
  storyStoreItems: mockStoreItems,
};

describe('generate-llms-docs', () => {
  describe('convertHtmlToMarkdown', () => {
    it('should convert html to markdown', async () => {
      const html = `
<div class="sbdocs sbdocs-content css-qa4clq">
  <h2 id="install" class="css-wzniqs">
    <a aria-hidden="true" href="#install" tabindex="-1" target="_self" class="css-1ofkq6d">
      <svg viewBox="0 0 14 14" width="14px" height="14px" class="css-149xqrd">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    Install
  </h2>
  <p>Fluent UI should be installed as a <code class="css-1kwwth4">dependency</code> of your app.</p>
  <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl"><div class="language-sh css-1lwmlsb" style="white-space: pre;"><span class="">yarn add @fluentui/react-components</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
  <h2 id="setup" class="css-wzniqs">
    <a aria-hidden="true" href="#setup" tabindex="-1" target="_self" class="css-1ofkq6d">
      <svg viewBox="0 0 14 14" width="14px" height="14px" class="css-149xqrd">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    Setup
  </h2>
  <p>Fluent UI components are styled using CSS in JS. This technique requires a style renderer which inserts CSS into DOM when needed. React context is used to provide the style renderer.</p>
  <p>Place a <code class="css-1kwwth4">&lt;FluentProvider /&gt;</code> at the root of your app and pass theme as a prop.</p>
  <h3 id="react-18" class="css-wzniqs">
    <a aria-hidden="true" href="#react-18" tabindex="-1" target="_self" class="css-1ofkq6d">
      <svg viewBox="0 0 14 14" width="14px" height="14px" class="css-149xqrd">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    React 18
  </h3>
  <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl"><div class="language-jsx css-1lwmlsb" style="white-space: pre;"><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">React</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'react'</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports punctuation">{</span><span class="token imports"> createRoot </span><span class="token imports punctuation">}</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'react-dom/client'</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports punctuation">{</span><span class="token imports"> </span><span class="token imports maybe-class-name">FluentProvider</span><span class="token imports punctuation">,</span><span class="token imports"> webLightTheme </span><span class="token imports punctuation">}</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'@fluentui/react-components'</span><span class="token punctuation">;</span><span class="">
</span>
<span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">App</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'./App'</span><span class="token punctuation">;</span><span class="">
</span>
<span class=""></span><span class="token keyword">const</span><span class=""> root </span><span class="token operator">=</span><span class=""> </span><span class="token function">createRoot</span><span class="token punctuation">(</span><span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="">
</span>
<span class="">root</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentProvider</span><span class="token tag"> </span><span class="token tag attr-name">theme</span><span class="token tag script language-javascript script-punctuation punctuation">=</span><span class="token tag script language-javascript punctuation">{</span><span class="token tag script language-javascript">webLightTheme</span><span class="token tag script language-javascript punctuation">}</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">    </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">App</span><span class="token tag"> </span><span class="token tag punctuation">/&gt;</span><span class="token plain-text">
</span><span class="token plain-text">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentProvider</span><span class="token tag punctuation">&gt;</span><span class="token punctuation">,</span><span class="">
</span><span class=""></span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
  <h3 id="react-17" class="css-wzniqs">
    <a aria-hidden="true" href="#react-17" tabindex="-1" target="_self" class="css-1ofkq6d">
      <svg viewBox="0 0 14 14" width="14px" height="14px" class="css-149xqrd">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    React 17
  </h3>
  <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl"><div class="language-jsx css-1lwmlsb" style="white-space: pre;"><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">React</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'react'</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">ReactDOM</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'react-dom'</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports punctuation">{</span><span class="token imports"> </span><span class="token imports maybe-class-name">FluentProvider</span><span class="token imports punctuation">,</span><span class="token imports"> webLightTheme </span><span class="token imports punctuation">}</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'@fluentui/react-components'</span><span class="token punctuation">;</span><span class="">
</span>
<span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">App</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'./App'</span><span class="token punctuation">;</span><span class="">
</span>
<span class=""></span><span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentProvider</span><span class="token tag"> </span><span class="token tag attr-name">theme</span><span class="token tag script language-javascript script-punctuation punctuation">=</span><span class="token tag script language-javascript punctuation">{</span><span class="token tag script language-javascript">webLightTheme</span><span class="token tag script language-javascript punctuation">}</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">    </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">App</span><span class="token tag"> </span><span class="token tag punctuation">/&gt;</span><span class="token plain-text">
</span><span class="token plain-text">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentProvider</span><span class="token tag punctuation">&gt;</span><span class="token punctuation">,</span><span class="">
</span><span class="">  </span><span class="token dom variable">document</span><span class="token punctuation">.</span><span class="token method function property-access">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="">
</span><span class=""></span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
  <h2 id="usage" class="css-wzniqs">
    <a aria-hidden="true" href="#usage" tabindex="-1" target="_self" class="css-1ofkq6d">
      <svg viewBox="0 0 14 14" width="14px" height="14px" class="css-149xqrd">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    Usage
  </h2>
  <p>That's it. You can now use Fluent UI components in your app.</p>
  <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl"><div class="language-jsx css-1lwmlsb" style="white-space: pre;"><span class="token keyword module">import</span><span class=""> </span><span class="token imports maybe-class-name">React</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'react'</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token keyword module">import</span><span class=""> </span><span class="token imports punctuation">{</span><span class="token imports"> </span><span class="token imports maybe-class-name">Button</span><span class="token imports"> </span><span class="token imports punctuation">}</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'@fluentui/react-components'</span><span class="token punctuation">;</span><span class="">
</span>
<span></span><span class="token keyword module">export</span><span> </span><span class="token keyword module">default</span><span> </span><span class="token punctuation">(</span><span class="token punctuation">)</span><span> </span><span class="token arrow operator">=&gt;</span><span> </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">Button</span><span class="token tag"> </span><span class="token tag attr-name">appearance</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">primary</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">Get started</span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">Button</span><span class="token tag punctuation">&gt;</span><span class="token punctuation">;</span></div></pre></div></div></div><div><button>Copy</button></div></div></pre>
  <h3 id="strict-mode">
    <a aria-hidden="true" href="#strict-mode" tabindex="-1" target="_self">
      <svg viewBox="0 0 14 14" width="14px" height="14px">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    Strict mode
  </h3>
  <p>We are aware of some strict mode bugs when using Fluent UI v9 in React 18. These bugs only show up in strict mode, and they will not stop the rest of your app from running.
    You can <a href="https://github.com/microsoft/fluentui/issues?q=is%3Aopen+is%3Aissue+label%3A%22Area%3A+Strict+Mode%22+label%3A%22React+18%22" target="_blank" rel="nofollow noopener noreferrer">track the bugs on Github</a> and learn how they will affect your application.
  </p>
  <h4 id="ssr-with-nextjs">
    <a aria-hidden="true" href="#ssr-with-nextjs" tabindex="-1" target="_self">
      <svg viewBox="0 0 14 14" width="14px" height="14px">
        <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path>
        <path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
      </svg>
    </a>
    SSR with Next.js
  </h4>
  <p>To avoid strict mode hydration issues, you can disable strict mode in your Next.js app by adding the following configuration to your <code>next.config.js</code> file:</p>
  <pre><div class="docblock-source sb-unstyled"><div dir="ltr" scrollbarsize="6" offset="2" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs"><div class="language-js" style="white-space: pre;"><span>module</span><span class="token punctuation">.</span><span class="token property-access">exports</span><span> </span><span class="token operator">=</span><span> </span><span class="token punctuation">{</span><span>
</span><span>  </span><span class="token literal-property property">reactStrictMode</span><span class="token operator">:</span><span> </span><span class="token boolean">false</span><span class="token punctuation">,</span><span>
</span><span></span><span class="token punctuation">}</span><span class="token punctuation">;</span></div></pre></div></div></div><div><button>Copy</button></div></div></pre>
</div>
      `;
      const markdown = await convertHtmlToMarkdown(html);
      expect(markdown).toMatchInlineSnapshot(`
        "## Install

        Fluent UI should be installed as a \`dependency\` of your app.

        \`\`\`sh
        yarn add @fluentui/react-components
        \`\`\`

        ## Setup

        Fluent UI components are styled using CSS in JS. This technique requires a style renderer which inserts CSS into DOM when needed. React context is used to provide the style renderer.

        Place a \`<FluentProvider />\` at the root of your app and pass theme as a prop.

        ### React 18

        \`\`\`jsx
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import { FluentProvider, webLightTheme } from '@fluentui/react-components';
        import App from './App';
        const root = createRoot(document.getElementById('root');
        root.render(
          <FluentProvider theme={webLightTheme}>
            <App />
          </FluentProvider>,
        );
        \`\`\`

        ### React 17

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

        ## Usage

        That's it. You can now use Fluent UI components in your app.

        \`\`\`jsx
        import React from 'react';
        import { Button } from '@fluentui/react-components';
        export default () => <Button appearance=\\"primary\\">Get started</Button>;
        \`\`\`

        ### Strict mode

        We are aware of some strict mode bugs when using Fluent UI v9 in React 18. These bugs only show up in strict mode, and they will not stop the rest of your app from running. You can [track the bugs on Github](https://github.com/microsoft/fluentui/issues?q=is%3Aopen+is%3Aissue+label%3A%22Area%3A+Strict+Mode%22+label%3A%22React+18%22) and learn how they will affect your application.

        #### SSR with Next.js

        To avoid strict mode hydration issues, you can disable strict mode in your Next.js app by adding the following configuration to your \`next.config.js\` file:

        \`\`\`js
        module.exports = {
          reactStrictMode: false,
        };
        \`\`\`"
      `);
    });
  });

  describe('generateFullFileContentFromStory', () => {
    it('should generate full file content from MDX story', () => {
      const content = generateFullFileContentFromStory(mockStoreItems[0]);
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
      const content = generateFullFileContentFromStory(mockStoreItems[1]);
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
      const content = generateFullFileContentFromStory(mockStoreItems[2]);
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
      const summaryContent = generateSummaryContent(mockArgs, mockStorybookData);

      expect(summaryContent.join('\n')).toMatchInlineSnapshot(`
        "# Fluent UI React v9

        > **Note:** This is a summary overview using the LLMs.txt format (https://llmstxt.org/). Each section links to its full documentation file in plain text (.txt) format. Click any link below to view the detailed documentation for that section.

        Fluent UI React is a library of React components that implement Microsoft's Fluent Design System.

        - [Concepts/Introduction](https://react.fluentui.dev/llms/concepts-introduction.txt)
        - [Concepts/Developer/Quick Start](https://react.fluentui.dev/llms/concepts-developer-quick-start.txt)
        - [Components/Accordion](https://react.fluentui.dev/llms/components-accordion.txt): An accordion allows users to toggle the display of content by expanding or collapsing sections."
      `);
    });
  });
});
