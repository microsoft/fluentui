import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  ProgressBar,
  Skeleton,
  SkeletonItem,
  Spinner,
  Tab,
  TabList,
  useFluent,
} from '@fluentui/react-components';
import { ArrowClockwiseRegular, ErrorCircleRegular, FilterRegular } from '@fluentui/react-icons';
import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';

import { communities } from '../data/forumData';
import { useAppStyles, useHeadlessStyles } from '../styles';
import type { ForumPost, SortMode } from '../types';
import { PostCard } from './PostCard';

type FeedProps = {
  posts: ForumPost[];
  communityId: string;
  sort: SortMode;
  savedOnly: boolean;
  compact: boolean;
  status: 'ready' | 'loading' | 'error';
  onSortChange: (sort: SortMode) => void;
  onSavedOnlyChange: (savedOnly: boolean) => void;
  onStatusChange: (status: 'ready' | 'loading' | 'error') => void;
  onVote: (postId: string, vote: -1 | 0 | 1) => void;
  onToggleSaved: (postId: string) => void;
  onReply: (postId: string, parentId: string, body: string) => void;
};

export function Feed(props: FeedProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();
  const { targetDocument } = useFluent();
  const selectedCommunity = communities.find(community => community.id === props.communityId);

  const refresh = () => {
    props.onStatusChange('loading');
    targetDocument?.defaultView?.setTimeout(() => props.onStatusChange('ready'), 450);
  };

  return (
    <main className={styles.feed} id="main-feed">
      <div className={styles.breadcrumbRow}>
        <Breadcrumb aria-label="Current feed">
          <BreadcrumbItem>
            <BreadcrumbButton current={props.communityId === 'all'}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          {selectedCommunity && (
            <>
              <BreadcrumbDivider />
              <BreadcrumbItem>
                <BreadcrumbButton current>{selectedCommunity.name}</BreadcrumbButton>
              </BreadcrumbItem>
            </>
          )}
        </Breadcrumb>
        <Button appearance="subtle" icon={<ArrowClockwiseRegular />} onClick={refresh}>
          Refresh
        </Button>
      </div>

      <section className={styles.feedToolbar} aria-label="Feed controls">
        <TabList
          aria-label="Sort discussions"
          selectedValue={props.sort}
          onTabSelect={(_, data) => props.onSortChange(data.value as SortMode)}
        >
          <Tab data-testid="sort-hot" value="hot">
            Hot
          </Tab>
          <Tab data-testid="sort-new" value="new">
            New
          </Tab>
          <Tab data-testid="sort-top" value="top">
            Top
          </Tab>
        </TabList>
        <div className={styles.filterRow}>
          <FilterRegular />
          <Checkbox
            checked={props.savedOnly}
            className={headless.checkbox}
            data-testid="saved-only"
            indicator={{ className: headless.checkboxIndicator }}
            input={{ className: headless.checkboxInput }}
            label={{ children: 'Saved only', className: headless.controlLabel }}
            onChange={(_, data) => props.onSavedOnlyChange(data.checked === true)}
          />
        </div>
      </section>

      {props.status === 'loading' && (
        <section className={styles.statePanel} aria-live="polite" data-testid="feed-loading">
          <Spinner label="Refreshing discussions" />
          <ProgressBar />
          <LoadingCards />
        </section>
      )}

      {props.status === 'error' && (
        <MessageBar intent="error" data-testid="feed-error">
          <MessageBarBody>
            <MessageBarTitle>Discussions could not be loaded</MessageBarTitle>
            This fictional outage is safe to retry.
          </MessageBarBody>
          <MessageBarActions
            containerAction={
              <Button
                appearance="transparent"
                aria-label="Retry loading discussions"
                icon={<ArrowClockwiseRegular />}
                onClick={refresh}
              />
            }
          >
            <Button appearance="primary" onClick={refresh}>
              Retry
            </Button>
          </MessageBarActions>
        </MessageBar>
      )}

      {props.status === 'ready' && props.posts.length === 0 && (
        <section className={styles.statePanel} data-testid="feed-empty">
          <ErrorCircleRegular />
          <h2 className={styles.heading}>No discussions match these filters</h2>
          <p className={styles.subheading}>Try another community, clear search, or include posts you have not saved.</p>
        </section>
      )}

      {props.status === 'ready' &&
        props.posts.map(post => (
          <PostCard
            key={post.id}
            compact={props.compact}
            post={post}
            onReply={props.onReply}
            onToggleSaved={props.onToggleSaved}
            onVote={props.onVote}
          />
        ))}
    </main>
  );
}

function LoadingCards(): React.ReactElement {
  const styles = useAppStyles();

  return (
    <Skeleton aria-label="Loading discussion previews">
      <div className={styles.skeletonCard}>
        <SkeletonItem shape="circle" size={32} />
        <div className={styles.skeletonLines}>
          <SkeletonItem size={16} />
          <SkeletonItem size={12} />
          <SkeletonItem size={12} />
        </div>
      </div>
    </Skeleton>
  );
}
