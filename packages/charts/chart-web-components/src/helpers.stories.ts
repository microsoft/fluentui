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
 * A helper that returns a function to bind a Storybook story to a ViewTemplate.
 */
export type FASTFramework = Renderer & {
  component: typeof FASTElement;
  storyResult: FASTElement | Element | DocumentFragment;
};

/**
 * Metadata to configure the stories for a component.
 */
export declare type Meta<TArgs = Args> = ComponentAnnotations<FASTComponentsRenderer, StoryArgs<TArgs>>;

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

export function generateImage({
  width,
  height = width,
  backgroundColor = 'rgb(204, 204, 204)',
  color = 'rgb(150, 150, 150)',
  text = `${width} x ${height}`,
}: {
  width: number;
  height?: number;
  backgroundColor?: string;
  color?: string;
  text?: string;
}): string {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = width;
  canvas.height = height;

  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // get the font size to fit the text
  context.font = '1px sans-serif';
  const maxFontSize = Math.max(width / context.measureText(text).width / 2, 7);

  // Draw the background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = `${maxFontSize}px Helvetica, Arial, sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
}
