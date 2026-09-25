import type { Community, ForumPost, Preferences } from '../types';

export const communities: Community[] = [
  {
    id: 'design-systems',
    name: 'Design Systems',
    description: 'Patterns, tokens, governance, and the craft behind coherent products.',
    members: '18.4k',
    unread: 4,
    accent: 'DS',
  },
  {
    id: 'frontend-craft',
    name: 'Frontend Craft',
    description: 'Practical engineering conversations for thoughtful user interfaces.',
    members: '12.7k',
    unread: 2,
    accent: 'FC',
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Inclusive product design, testing techniques, and lived experience.',
    members: '9.1k',
    unread: 7,
    accent: 'A11Y',
  },
  {
    id: 'makers',
    name: 'Makers',
    description: 'Share experiments, prototypes, and what you learned while building.',
    members: '6.8k',
    unread: 0,
    accent: 'MK',
  },
];

export const initialPosts: ForumPost[] = [
  {
    id: 'post-tokens',
    communityId: 'design-systems',
    author: 'Mina Chen',
    title: 'What changed when our product team started naming intent instead of color',
    body: 'We replaced a long list of palette references with a smaller vocabulary based on product intent. The most useful outcome was not visual consistency—it was faster conversations between design and engineering.',
    flair: 'Case study',
    score: 184,
    minutesAgo: 24,
    saved: false,
    vote: 0,
    comments: [
      {
        id: 'comment-tokens-1',
        author: 'Jon Bell',
        body: 'The conversation-speed point resonates. Did you migrate feature by feature or create a compatibility layer?',
        score: 21,
        minutesAgo: 18,
        replies: [
          {
            id: 'comment-tokens-1-1',
            author: 'Mina Chen',
            body: 'We used a compatibility map for one release, then removed entries as each product area adopted semantic names.',
            score: 14,
            minutesAgo: 12,
            replies: [],
          },
        ],
      },
      {
        id: 'comment-tokens-2',
        author: 'Sasha Reed',
        body: 'Documenting the “why not” examples helped our team more than a raw token table.',
        score: 9,
        minutesAgo: 8,
        replies: [],
      },
    ],
  },
  {
    id: 'post-focus',
    communityId: 'accessibility',
    author: 'Priya Shah',
    title: 'A keyboard review checklist that designers can run before handoff',
    body: 'I turned our most common focus-order and overlay issues into a ten-minute prototype review. Here is the sequence our designers now use before engineering receives a flow.',
    flair: 'Guide',
    score: 231,
    minutesAgo: 63,
    saved: true,
    vote: 1,
    comments: [
      {
        id: 'comment-focus-1',
        author: 'Diego Morales',
        body: 'Adding focus return to the checklist caught three modal regressions for us last week.',
        score: 32,
        minutesAgo: 41,
        replies: [],
      },
    ],
  },
  {
    id: 'post-perf',
    communityId: 'frontend-craft',
    author: 'Elliot Park',
    title: 'We measured perceived speed across four loading patterns',
    body: 'Skeletons were not always the winner. For short operations, preserving the previous result set with a subtle progress indicator tested better than replacing the whole feed.',
    flair: 'Research',
    score: 146,
    minutesAgo: 105,
    saved: false,
    vote: 0,
    comments: [],
  },
  {
    id: 'post-prototype',
    communityId: 'makers',
    author: 'Noor Williams',
    title: 'Weekend build: a calm notification triage concept',
    body: 'The prototype groups alerts by the decision they require rather than the product that sent them. It is local-only, but the interaction model already changed how I think about notification centers.',
    flair: 'Showcase',
    score: 88,
    minutesAgo: 17,
    saved: false,
    vote: 0,
    comments: [
      {
        id: 'comment-prototype-1',
        author: 'Avery Kim',
        body: 'The decision-first grouping is clever. I would love to see how snoozed items return.',
        score: 11,
        minutesAgo: 5,
        replies: [],
      },
    ],
  },
];

export const initialPreferences: Preferences = {
  compactFeed: false,
  reduceMotion: false,
  emailDigest: true,
  matureContent: false,
  language: 'English',
  commentDensity: 'cozy',
  postsPerPage: 12,
};

export const flairOptions = ['Discussion', 'Guide', 'Research', 'Showcase', 'Case study'];
