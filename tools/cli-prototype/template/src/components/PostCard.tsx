import * as React from 'react';
import { Card, Link, MessageBar, MessageBarBody, MessageBarTitle, Tag, mergeClasses } from '@fluentui/react-components';
import {
  ArrowDownRegular,
  ArrowUpRegular,
  BookmarkFilled,
  BookmarkRegular,
  CommentRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import { Button as HeadlessButton } from '@fluentui/react-headless-components-preview/button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';

import { communities } from '../data/forumData';
import { useAppStyles, useHeadlessStyles } from '../styles';
import type { ForumPost } from '../types';
import { CommentThread } from './CommentThread';

type PostCardProps = {
  post: ForumPost;
  compact: boolean;
  onVote: (postId: string, vote: -1 | 0 | 1) => void;
  onToggleSaved: (postId: string) => void;
  onReply: (postId: string, parentId: string, body: string) => void;
};

export function PostCard(props: PostCardProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [moderationMessage, setModerationMessage] = React.useState('');
  const community = communities.find(item => item.id === props.post.communityId);
  const commentCount = countComments(props.post);

  return (
    <Card
      className={mergeClasses(styles.postCard, props.compact && styles.postCardCompact)}
      data-testid={`post-${props.post.id}`}
    >
      <aside className={styles.voteColumn} aria-label={`Vote on ${props.post.title}`}>
        <HeadlessButton
          aria-label="Upvote"
          aria-pressed={props.post.vote === 1}
          className={mergeClasses(
            headless.button,
            headless.iconButton,
            props.post.vote === 1 && headless.selectedButton,
          )}
          data-testid={`upvote-${props.post.id}`}
          onClick={() => props.onVote(props.post.id, props.post.vote === 1 ? 0 : 1)}
        >
          <ArrowUpRegular />
        </HeadlessButton>
        <span className={styles.voteScore} data-testid={`score-${props.post.id}`}>
          {props.post.score}
        </span>
        <HeadlessButton
          aria-label="Downvote"
          aria-pressed={props.post.vote === -1}
          className={mergeClasses(
            headless.button,
            headless.iconButton,
            props.post.vote === -1 && headless.selectedButton,
          )}
          data-testid={`downvote-${props.post.id}`}
          onClick={() => props.onVote(props.post.id, props.post.vote === -1 ? 0 : -1)}
        >
          <ArrowDownRegular />
        </HeadlessButton>
      </aside>

      <section className={styles.postContent}>
        <div className={styles.postMeta}>
          <Tag appearance="brand">{props.post.flair}</Tag>
          <Link href={`#community-${props.post.communityId}`}>{community?.name ?? 'Community'}</Link>
          <span>Posted by {props.post.author}</span>
          <span>{props.post.minutesAgo} min ago</span>
        </div>
        <h2 className={styles.postTitle}>{props.post.title}</h2>
        <p className={styles.postBody}>{props.post.body}</p>

        {moderationMessage && (
          <MessageBar intent="success">
            <MessageBarBody>
              <MessageBarTitle>Thanks for the signal</MessageBarTitle>
              {moderationMessage}
            </MessageBarBody>
          </MessageBar>
        )}

        <div className={styles.postActions}>
          <HeadlessButton
            aria-expanded={commentsOpen}
            className={headless.button}
            data-testid={`comments-toggle-${props.post.id}`}
            onClick={() => setCommentsOpen(value => !value)}
          >
            <CommentRegular />
            {commentCount} {commentCount === 1 ? 'reply' : 'replies'}
          </HeadlessButton>
          <HeadlessButton
            aria-pressed={props.post.saved}
            className={mergeClasses(headless.button, props.post.saved && headless.selectedButton)}
            data-testid={`save-${props.post.id}`}
            onClick={() => props.onToggleSaved(props.post.id)}
          >
            {props.post.saved ? <BookmarkFilled /> : <BookmarkRegular />}
            {props.post.saved ? 'Saved' : 'Save'}
          </HeadlessButton>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <HeadlessButton
                aria-label="More post actions"
                className={mergeClasses(headless.button, headless.iconButton)}
              >
                <MoreHorizontalRegular />
              </HeadlessButton>
            </MenuTrigger>
            <MenuPopover className={headless.menuPopover}>
              <MenuList className={headless.menuList}>
                <MenuItem
                  className={headless.menuItem}
                  onClick={() => setModerationMessage(`You will see fewer posts like “${props.post.title}”.`)}
                >
                  Show fewer posts like this
                </MenuItem>
                <MenuItem
                  className={headless.menuItem}
                  onClick={() => setModerationMessage('The moderation team received your report.')}
                >
                  Report discussion
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>

        {commentsOpen && (
          <CommentThread
            comments={props.post.comments}
            compact={props.compact}
            postId={props.post.id}
            onReply={props.onReply}
          />
        )}
      </section>
    </Card>
  );
}

function countComments(post: ForumPost): number {
  const count = (comments: ForumPost['comments']): number =>
    comments.reduce((total, comment) => total + 1 + count(comment.replies), 0);
  return count(post.comments);
}
