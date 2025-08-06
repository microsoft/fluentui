import type { StorybookStoreItem } from '../types';

/**
 * Storybook store items fixture, contains metadata and stories for components and pages.
 */
export const storybookStoreItems: StorybookStoreItem[] = [
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
