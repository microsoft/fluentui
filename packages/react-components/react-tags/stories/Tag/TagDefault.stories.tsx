import * as React from 'react';
import { Tag, TagContent, TagProps } from '@fluentui/react-tags';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-components';

// TODO I added many examples here for easier implementation. This story will be simplified to keep only the default example
export const Default = (props: Partial<TagProps>) => (
  <div style={{ display: 'flex', columnGap: 28 }}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <Tag dismissable {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
          secondaryText="Secondary text"
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag dismissable {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag dismissable {...props}>
        <TagContent icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
          Primary text
        </TagContent>
      </Tag>

      <Tag dismissable {...props}>
        <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>
      </Tag>

      <Tag {...props}>
        <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>
      </Tag>

      <Tag {...props}>
        <TagContent>Primary text</TagContent>
      </Tag>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <Tag shape="circular" dismissable {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
          secondaryText="Secondary text"
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag shape="circular" dismissable {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag shape="circular" {...props}>
        <TagContent
          media={
            <Avatar
              {...{
                name: 'Katri Athokas',
                badge: { status: 'busy' },
                image: {
                  src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              }}
            />
          }
        >
          Primary text
        </TagContent>
      </Tag>

      <Tag shape="circular" dismissable {...props}>
        <TagContent icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
          Primary text
        </TagContent>
      </Tag>

      <Tag shape="circular" dismissable {...props}>
        <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>
      </Tag>

      <Tag shape="circular" {...props}>
        <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>
      </Tag>

      <Tag shape="circular" {...props}>
        <TagContent>Primary text</TagContent>
      </Tag>
    </div>
  </div>
);
