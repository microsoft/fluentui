import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Image as FluentImage } from './image.js';
import {} from './image.options.js';
import './define.js';

type ImageStoryArgs = Args & FluentImage;
type ImageStoryMeta = Meta<ImageStoryArgs>;

const imageTemplate = html<ImageStoryArgs>`
  <div style="border: 30px solid #ccc; height: 9em; display: flex; flex-direction: column; justify-content: center;">
    <fluent-image
      align-content=${x => x.alignContent}
      appearance=${x => x.appearance}
      role=${x => x.role}
      ?inset=${x => x.inset}
      orientation=${x => x.orientation}
    >
      ${x => (x.content ? html`<h3>${x.content}</h3>` : '')}
    </fluent-image>
  </div>
`;

export default {
  title: 'Components/Image',
  args: {
    content: 'Section One',
    alignContent: 'center',
    role: 'separator',
    inset: false,
    orientation: 'horizontal',
  },
  argTypes: {
    content: {
      description: 'HTML element wrapping text  (e.g. `<h3>Section One</h3>`), Image or SVG',
      table: {
        defaultValue: {
          summary: 'empty',
        },
      },
    },
    alignContent: {
      description: 'Align content',
      table: {
        type: {
          summary: 'Fluent v9. Determines the alignment of the content within the image.',
        },
        defaultValue: {
          summary: 'center',
        },
      },
      options: Object.values(ImageAlignContent),
      control: {
        type: 'select',
      },
    },
    appearance: {
      description: 'Image and text colors',
      table: {
        type: {
          summary: 'Fluent v9. A image can have one of the preset appearances.',
        },
        defaultValue: {
          summary: 'default',
        },
      },
      options: Object.values(ImageAppearance),
      control: {
        type: 'select',
      },
    },
    role: {
      description: 'Set role attribute',
      table: {
        type: {
          summary: 'Inherited from FASTImage. Aria role for the image.',
        },
        defaultValue: {
          summary: 'separator',
        },
      },
      options: Object.values(ImageRole),
      control: {
        type: 'select',
      },
    },
    inset: {
      description: 'Pad the ends of image',
      table: {
        type: {
          summary:
            'Type: boolean. Fluent v9. Image layout is block for strict distinctions between items, or inset for closer relationships with neighboring content.',
        },
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
    orientation: {
      description: 'Image layout',
      table: {
        type: {
          summary:
            'Inherited from FASTImage. Layout can be horizontal or vertical. Adds aria-orientation to component.',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
      options: Object.values(ImageOrientation),
      control: {
        type: 'select',
      },
    },
  },
} as ImageStoryMeta;

export const Image = renderComponent(imageTemplate).bind({});
