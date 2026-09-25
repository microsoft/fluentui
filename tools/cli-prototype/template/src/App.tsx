import * as React from 'react';
import {
  FluentProvider,
  Toast,
  ToastBody,
  ToastTitle,
  Toaster,
  useToastController,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';

import { initialPreferences } from './data/forumData';
import { useForumState } from './hooks/useForumState';
import { useAppStyles, useGlobalStyles } from './styles';
import type { Preferences } from './types';
import { CommunityNavigation } from './components/CommunityNavigation';
import { Feed } from './components/Feed';
import { ForumSidebar } from './components/ForumSidebar';
import { Header } from './components/Header';
import { PostComposer } from './components/PostComposer';
import { PreferencesDrawer } from './components/PreferencesDrawer';

const toasterId = 'fluent-forum-toaster';

export function App(): React.ReactElement {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <FluentProvider theme={darkMode ? webDarkTheme : webLightTheme}>
      <ForumApp darkMode={darkMode} onDarkModeChange={setDarkMode} />
    </FluentProvider>
  );
}

type ForumAppProps = {
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
};

function ForumApp(props: ForumAppProps): React.ReactElement {
  useGlobalStyles();
  const styles = useAppStyles();
  const forum = useForumState();
  const { dispatchToast } = useToastController(toasterId);
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [navigationOpen, setNavigationOpen] = React.useState(false);
  const [preferencesOpen, setPreferencesOpen] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(3);
  const [preferences, setPreferences] = React.useState<Preferences>(initialPreferences);

  const announce = React.useCallback(
    (title: string, body: string) => {
      dispatchToast(
        <Toast>
          <ToastTitle>{title}</ToastTitle>
          <ToastBody>{body}</ToastBody>
        </Toast>,
        { intent: 'success' },
      );
    },
    [dispatchToast],
  );

  return (
    <div className={styles.app} data-theme={props.darkMode ? 'dark' : 'light'} data-testid="fluent-forum">
      <Header
        darkMode={props.darkMode}
        notificationCount={notificationCount}
        query={forum.query}
        onClearNotifications={() => {
          setNotificationCount(0);
          announce('Notifications cleared', 'You are all caught up.');
        }}
        onCreatePost={() => setComposerOpen(true)}
        onOpenNavigation={() => setNavigationOpen(true)}
        onOpenPreferences={() => setPreferencesOpen(true)}
        onQueryChange={forum.setQuery}
        onToggleTheme={() => props.onDarkModeChange(!props.darkMode)}
      />

      <div className={styles.mainGrid}>
        <CommunityNavigation
          mobileOpen={navigationOpen}
          selectedId={forum.communityId}
          onMobileOpenChange={setNavigationOpen}
          onSelect={forum.setCommunityId}
        />
        <Feed
          compact={preferences.compactFeed}
          communityId={forum.communityId}
          posts={forum.visiblePosts.slice(0, preferences.postsPerPage)}
          savedOnly={forum.savedOnly}
          sort={forum.sort}
          status={forum.status}
          onReply={(postId, parentId, body) => {
            forum.addReply(postId, parentId, body);
            announce('Reply added', 'Your reply is now part of the discussion.');
          }}
          onSavedOnlyChange={forum.setSavedOnly}
          onSortChange={forum.setSort}
          onStatusChange={forum.setStatus}
          onToggleSaved={postId => {
            const post = forum.posts.find(item => item.id === postId);
            forum.toggleSaved(postId);
            announce(
              post?.saved ? 'Removed from saved' : 'Discussion saved',
              'Your saved filter is ready when you need it.',
            );
          }}
          onVote={forum.vote}
        />
        <ForumSidebar
          onOpenPreferences={() => setPreferencesOpen(true)}
          onSimulateError={() => forum.setStatus('error')}
        />
      </div>

      <PostComposer
        defaultCommunityId={forum.communityId}
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onSubmit={post => {
          forum.createPost(post);
          announce('Discussion published', 'Your post is live in its community.');
        }}
      />

      <PreferencesDrawer
        darkMode={props.darkMode}
        open={preferencesOpen}
        preferences={preferences}
        onOpenChange={setPreferencesOpen}
        onPreferencesChange={setPreferences}
        onThemeChange={props.onDarkModeChange}
      />

      <Toaster className={styles.toastViewport} data-testid="forum-toaster" toasterId={toasterId} />
    </div>
  );
}
