import * as React from 'react';
import { Tag, TagGroup, TagProps } from '@fluentui/react-tags';
import { Calendar3DayRegular } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-components';

// TODO I added many examples here for easier implementation. This story will be simplified to keep only the default example
export const Default = (props: Partial<TagProps>) => (
  <>
    <div>Medium:</div>
    <TagGroup size="medium">
      <div style={{ display: 'flex', columnGap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} secondaryText="Secondary text" dismissible {...props}>
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag {...props}>Primary text</Tag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
            shape="circular"
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
            shape="circular"
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
            shape="circular"
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} secondaryText="Secondary text" dismissible {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" {...props}>
            Primary text
          </Tag>
        </div>
      </div>
    </TagGroup>
    <br />
    <br />
    <div>Small:</div>
    <TagGroup size="small">
      <div style={{ display: 'flex', columnGap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag {...props}>Primary text</Tag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
            shape="circular"
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
            shape="circular"
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" {...props}>
            Primary text
          </Tag>
        </div>
      </div>
    </TagGroup>
    <br />
    <br />
    <div>Extra small:</div>
    <TagGroup size="extra-small">
      <div style={{ display: 'flex', columnGap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag {...props}>Primary text</Tag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
          <Tag
            shape="circular"
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
            dismissible
            {...props}
          >
            Primary text
          </Tag>
          <Tag
            shape="circular"
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
            {...props}
          >
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} dismissible {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" icon={<Calendar3DayRegular />} {...props}>
            Primary text
          </Tag>
          <Tag shape="circular" {...props}>
            Primary text
          </Tag>
        </div>
      </div>
    </TagGroup>
  </>
);
