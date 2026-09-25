import * as React from 'react';
import { initialPosts } from '../data/forumData';
import type { ForumComment, ForumPost, NewPost, SortMode } from '../types';

type FeedStatus = 'ready' | 'loading' | 'error';

export function useForumState() {
  const replySequence = React.useRef(0);
  const [posts, setPosts] = React.useState<ForumPost[]>(initialPosts);
  const [query, setQuery] = React.useState('');
  const [communityId, setCommunityId] = React.useState('all');
  const [sort, setSort] = React.useState<SortMode>('hot');
  const [savedOnly, setSavedOnly] = React.useState(false);
  const [status, setStatus] = React.useState<FeedStatus>('ready');

  const visiblePosts = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filtered = posts.filter(post => {
      const matchesCommunity = communityId === 'all' || post.communityId === communityId;
      const matchesSaved = !savedOnly || post.saved;
      const searchable = `${post.title} ${post.body} ${post.author} ${post.flair}`.toLocaleLowerCase();
      return matchesCommunity && matchesSaved && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    return [...filtered].sort((left, right) => {
      if (sort === 'new') {
        return left.minutesAgo - right.minutesAgo;
      }
      if (sort === 'top') {
        return right.score - left.score;
      }
      return right.score / Math.max(right.minutesAgo, 10) - left.score / Math.max(left.minutesAgo, 10);
    });
  }, [communityId, posts, query, savedOnly, sort]);

  const vote = React.useCallback((postId: string, nextVote: -1 | 0 | 1) => {
    setPosts(current =>
      current.map(post => {
        if (post.id !== postId) {
          return post;
        }
        return {
          ...post,
          score: post.score - post.vote + nextVote,
          vote: nextVote,
        };
      }),
    );
  }, []);

  const toggleSaved = React.useCallback((postId: string) => {
    setPosts(current => current.map(post => (post.id === postId ? { ...post, saved: !post.saved } : post)));
  }, []);

  const createPost = React.useCallback((post: NewPost) => {
    setPosts(current => [
      {
        ...post,
        id: `post-created-${current.length + 1}`,
        author: 'Alex Morgan',
        score: 1,
        minutesAgo: 0,
        saved: false,
        vote: 1,
        comments: [],
      },
      ...current,
    ]);
    setStatus('ready');
    setCommunityId(post.communityId);
    setSort('new');
    setQuery('');
    setSavedOnly(false);
  }, []);

  const addReply = React.useCallback((postId: string, parentId: string, body: string) => {
    replySequence.current += 1;
    const reply: ForumComment = {
      id: `reply-${postId}-${parentId}-${replySequence.current}`,
      author: 'Alex Morgan',
      body,
      score: 1,
      minutesAgo: 0,
      replies: [],
    };
    setPosts(current =>
      current.map(post =>
        post.id === postId ? { ...post, comments: appendReply(post.comments, parentId, reply) } : post,
      ),
    );
  }, []);

  return {
    posts,
    visiblePosts,
    query,
    communityId,
    sort,
    savedOnly,
    status,
    setQuery,
    setCommunityId,
    setSort,
    setSavedOnly,
    setStatus,
    vote,
    toggleSaved,
    createPost,
    addReply,
  };
}

function appendReply(comments: ForumComment[], parentId: string, reply: ForumComment): ForumComment[] {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, reply] };
    }
    return { ...comment, replies: appendReply(comment.replies, parentId, reply) };
  });
}
