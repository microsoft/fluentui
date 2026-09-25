export type SortMode = 'hot' | 'new' | 'top';

export type Community = {
  id: string;
  name: string;
  description: string;
  members: string;
  unread: number;
  accent: string;
};

export type ForumComment = {
  id: string;
  author: string;
  body: string;
  score: number;
  minutesAgo: number;
  replies: ForumComment[];
};

export type ForumPost = {
  id: string;
  communityId: string;
  author: string;
  title: string;
  body: string;
  flair: string;
  score: number;
  minutesAgo: number;
  saved: boolean;
  vote: -1 | 0 | 1;
  comments: ForumComment[];
};

export type Preferences = {
  compactFeed: boolean;
  reduceMotion: boolean;
  emailDigest: boolean;
  matureContent: boolean;
  language: string;
  commentDensity: 'cozy' | 'compact';
  postsPerPage: number;
};

export type NewPost = Pick<ForumPost, 'communityId' | 'title' | 'body' | 'flair'>;
