/**
 * CLI arguments
 */
export type Args = {
  /**
   * Relative path to the Storybook distribution folder
   * @example `--distPath "storybook-static"`
   */
  distPath: string;
  /**
   * Storybook deployed URL for the summary docs
   * @example `--summaryBaseUrl "https://storybook.fluentui.dev/"`
   */
  summaryBaseUrl: string;
  /**
   * Title for the llms.txt file
   * @example `--summaryTitle "Fluent UI Components and Pages"`
   */
  summaryTitle?: string;
  /**
   * Description for the llms.txt file
   * @example `--summaryDescription "This file contains the LLMs documentation for all components and pages."`
   */
  summaryDescription?: string;
  /**
   * Array of composed Storybook refs.
   * Used to reference external Storybook docs.
   * @example `--refs "{title:'foo', url:'www'}"`
   */
  refs?: StorybookRef[];
};

/**
 * Storybook store item, contains component/page metadata and stories.
 */
export type StorybookStoreItem = {
  meta: StorybookStoreItemMeta;
  stories: Record<string, StorybookStoreItemStory>;
};

/**
 * Storybook store item metadata
 */
export type StorybookStoreItemMeta = {
  id: string;
  title: string;
  parameters: {
    fileName: string;
    docs?: {
      description?: {
        component?: string;
        story?: string;
      };
    };
  };
  component?: StorybookComponent;
  subcomponents?: Record<string, StorybookComponent>;
};

/**
 * Storybook store item story, contains story metadata like name, parameters, etc.
 */
export type StorybookStoreItemStory = {
  id: string;
  name: string;
  parameters: {
    docs: {
      description?: {
        component?: string;
        story?: string;
      };
      source?: {
        originalSource?: string;
      };
    };
    /**
     * This field is specific to FluentUI, and provided by the `@fluentui/storybook-addon` package.
     */
    fullSource?: string;
    docsOnly?: boolean;
  };
};

/**
 * Storybook component metadata, contains component name, description, props, etc.
 */
export type StorybookComponent = {
  displayName: string;
  __docgenInfo?: {
    description?: string;
    displayName?: string;
    props?: Record<string, StorybookComponentProp> | null;
  };
};

/**
 * Storybook component prop metadata, contains prop name, description, type, etc.
 */
export type StorybookComponentProp = {
  defaultValue?: { value: string } | string | null;
  description?: string;
  name: string;
  required?: boolean;
  type?: {
    name?: string;
    value?: { value: string }[];
  };
};

/**
 * Composed Storybook ref, used to link to other Storybook docs.
 * see: https://storybook.js.org/docs/sharing/storybook-composition
 *
 * @example
 * ```ts
 * { id: 'charts-v9', title: 'Fluent UI Charts v9', url: 'https://charts.fluentui.dev' }
 * ```
 */
export type StorybookRef = { title: string; url: string; sourceUrl?: string };
