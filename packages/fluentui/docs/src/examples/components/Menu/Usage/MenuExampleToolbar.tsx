import * as React from 'react';
import { Menu, menuAsToolbarBehavior } from '@fluentui/react-northstar';
import {
  FormatIcon,
  PaperclipIcon,
  EmojiIcon,
  GiphyIcon,
  StickerIcon,
  VideoCameraEmphasisIcon,
  SettingsIcon,
  MoreIcon,
  BookmarkIcon,
  TranslationIcon,
  TrashCanIcon,
  MarkAsUnreadIcon,
} from '@fluentui/react-icons-northstar';

const MenuExampleToolbarShorthand = () => (
  <Menu defaultActiveIndex={0} iconOnly accessibility={menuAsToolbarBehavior} aria-label="Compose Editor">
    <Menu.Item index={0} aria-label="Format Tool" icon={<FormatIcon outline={true} />} />
    <Menu.Item index={1} aria-label="Paperclip Tool" icon={<PaperclipIcon outline={true} />} />
    <Menu.Item index={2} aria-label="Emoji Tool" disabled icon={<EmojiIcon outline={true} />} />
    <Menu.Item index={3} aria-label="Giphy tool" icon={<GiphyIcon outline={true} />} />
    <Menu.Item index={4} aria-label="Giphy tool" icon={<StickerIcon outline={true} />} />
    <Menu.Item index={5} aria-label="Meetup Tool" icon={<VideoCameraEmphasisIcon outline={true} />} />
    <Menu.Item index={6} aria-label="Settings" icon={<SettingsIcon outline={true} />} />
    <Menu.Item
      index={7}
      aria-label="More options"
      indicator={false}
      icon={<MoreIcon outline={true} />}
      menu={
        <>
          <Menu.Item index={7} aria-label="item 1" content="item 1" icon={<BookmarkIcon outline />} />
          <Menu.Divider />
          <Menu.Item index={9} aria-label="item 2" content="item 2" icon={<MarkAsUnreadIcon outline />} />
          <Menu.Item index={10} aria-label="item 3" content="item 3" icon={<TranslationIcon outline />} />
          <Menu.Divider />
          <Menu.Item index={10} aria-label="item 4" content="item 4" icon={<TrashCanIcon outline />} />
        </>
      }
    />
  </Menu>
);

export default MenuExampleToolbarShorthand;
