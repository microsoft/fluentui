import type { ElementViewTemplate, FASTElement, ViewTemplate } from '@microsoft/fast-element';
import type { AnnotatedStoryFn, Args, ComponentAnnotations, Renderer, StoryAnnotations } from '@storybook/csf';

/**
 * A helper that returns a function to bind a Storybook story to a ViewTemplate.
 *
 * @param template - The ViewTemplate to render
 * @returns - a function to bind a Storybook story
 */
export function renderComponent<TArgs = Args>(template: ViewTemplate): (args: TArgs) => Element | DocumentFragment {
  return function (args) {
    const storyFragment = new DocumentFragment();
    template.render(args, storyFragment);
    if (storyFragment.childElementCount === 1) {
      return storyFragment.firstElementChild!;
    }
    return storyFragment;
  };
}

export declare interface FASTComponentsRenderer extends Renderer {
  canvasElement: FASTElement;
  component: typeof FASTElement | string;
  storyResult: string | Node | DocumentFragment | ElementViewTemplate;
}

/**
 * Metadata to configure the stories for a component.
 */
export declare type NewMeta<TArgs = Args> = ComponentAnnotations<FASTComponentsRenderer, StoryArgs<TArgs>>;

/**
 * A helper that returns a function to bind a Storybook story to a ViewTemplate.
 */
export type FASTFramework = Renderer & {
  component: typeof FASTElement;
  storyResult: FASTElement | Element | DocumentFragment;
};

/**
 * Metadata to configure the stories for a component.
 */
export type Meta<TArgs = Args> = ComponentAnnotations<FASTFramework, Omit<TArgs, keyof FASTElement>>;

/**
 * Story object that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type StoryObj<TArgs = Args> = StoryAnnotations<FASTComponentsRenderer, StoryArgs<TArgs>>;

/**
 * Story function that represents a CSFv2 component example.
 */
export declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<FASTFramework, TArgs>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * NOTE that in Storybook 7.0, this type will be renamed to `StoryFn` and replaced by the current `StoryObj` type.
 */
export declare type Story<TArgs = Args> = StoryFn<StoryArgs<TArgs>>;

/**
 * Combined Storybook story args.
 */
export type StoryArgs<TArgs = Args> = Partial<Omit<TArgs, keyof FASTElement>> & Args;
