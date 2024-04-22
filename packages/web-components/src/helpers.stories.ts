import type { FASTElement, ViewTemplate } from '@microsoft/fast-element';
import type { AnnotatedStoryFn, Args, ComponentAnnotations, StoryAnnotations } from '@storybook/csf';

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

/**
 * A helper that returns a function to bind a Storybook story to a ViewTemplate.
 */
export type FASTFramework = {
  component: typeof FASTElement;
  storyResult: FASTElement | Element | DocumentFragment;
};

/**
 * Metadata to configure the stories for a component.
 */
export type Meta<TArgs = Args> = ComponentAnnotations<FASTFramework, Omit<TArgs, keyof FASTElement>>;

/**
 * Story function that represents a CSFv3 component example.
 */
export declare type StoryObj<TArgs = Args> = StoryAnnotations<FASTFramework, TArgs>;

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
