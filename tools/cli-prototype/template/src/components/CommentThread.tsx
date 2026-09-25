import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { ArrowReplyRegular, ChevronDownRegular, ChevronRightRegular, SendRegular } from '@fluentui/react-icons';
import { Button as HeadlessButton } from '@fluentui/react-headless-components-preview/button';
import { Textarea } from '@fluentui/react-headless-components-preview/textarea';

import { useAppStyles, useHeadlessStyles } from '../styles';
import type { ForumComment } from '../types';

type CommentThreadProps = {
  postId: string;
  comments: ForumComment[];
  compact: boolean;
  onReply: (postId: string, parentId: string, body: string) => void;
};

export function CommentThread(props: CommentThreadProps): React.ReactElement {
  const styles = useAppStyles();

  return (
    <div className={styles.commentArea} data-testid={`comments-${props.postId}`}>
      {props.comments.length === 0 ? (
        <p className={styles.subheading}>No replies yet. Start the conversation.</p>
      ) : (
        props.comments.map(comment => (
          <CommentNode
            key={comment.id}
            comment={comment}
            compact={props.compact}
            postId={props.postId}
            onReply={props.onReply}
          />
        ))
      )}
    </div>
  );
}

type CommentNodeProps = {
  comment: ForumComment;
  compact: boolean;
  postId: string;
  onReply: (postId: string, parentId: string, body: string) => void;
};

function CommentNode(props: CommentNodeProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();
  const [collapsed, setCollapsed] = React.useState(false);
  const [replying, setReplying] = React.useState(false);
  const [reply, setReply] = React.useState('');

  const submitReply = () => {
    const body = reply.trim();
    if (!body) {
      return;
    }
    props.onReply(props.postId, props.comment.id, body);
    setReply('');
    setReplying(false);
    setCollapsed(false);
  };

  return (
    <article
      className={mergeClasses(styles.comment, props.compact && styles.commentCompact)}
      data-testid={`comment-${props.comment.id}`}
    >
      <div className={styles.commentHeader}>
        <HeadlessButton
          aria-label={
            collapsed ? `Expand reply by ${props.comment.author}` : `Collapse reply by ${props.comment.author}`
          }
          className={mergeClasses(headless.button, headless.iconButton, headless.subtleButton)}
          data-testid={`collapse-${props.comment.id}`}
          onClick={() => setCollapsed(value => !value)}
        >
          {collapsed ? <ChevronRightRegular /> : <ChevronDownRegular />}
        </HeadlessButton>
        <strong>{props.comment.author}</strong>
        <span>{props.comment.minutesAgo} min ago</span>
        <span>· {props.comment.score} points</span>
      </div>

      {!collapsed && (
        <>
          <p className={styles.commentBody}>{props.comment.body}</p>
          <div className={styles.inlineActions}>
            <HeadlessButton
              className={mergeClasses(headless.button, headless.subtleButton)}
              data-testid={`reply-${props.comment.id}`}
              onClick={() => setReplying(value => !value)}
            >
              <ArrowReplyRegular />
              Reply
            </HeadlessButton>
          </div>

          {replying && (
            <div className={styles.replyEditor}>
              <Textarea
                aria-label={`Reply to ${props.comment.author}`}
                className={headless.textarea}
                data-testid={`reply-input-${props.comment.id}`}
                resize="vertical"
                textarea={{ className: headless.textareaElement }}
                value={reply}
                onChange={event => setReply(event.currentTarget.value)}
              />
              <div className={styles.inlineActions}>
                <HeadlessButton
                  className={mergeClasses(headless.button, headless.primaryButton)}
                  data-testid={`submit-reply-${props.comment.id}`}
                  disabled={!reply.trim()}
                  onClick={submitReply}
                >
                  <SendRegular />
                  Add reply
                </HeadlessButton>
                <HeadlessButton
                  className={headless.button}
                  onClick={() => {
                    setReply('');
                    setReplying(false);
                  }}
                >
                  Cancel
                </HeadlessButton>
              </div>
            </div>
          )}

          {props.comment.replies.map(replyComment => (
            <CommentNode
              key={replyComment.id}
              comment={replyComment}
              compact={props.compact}
              postId={props.postId}
              onReply={props.onReply}
            />
          ))}
        </>
      )}
    </article>
  );
}
