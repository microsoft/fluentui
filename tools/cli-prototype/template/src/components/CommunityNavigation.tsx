import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Card,
  Divider,
  Persona,
  Tooltip,
  mergeClasses,
} from '@fluentui/react-components';
import { DismissRegular, HomeRegular } from '@fluentui/react-icons';
import { Button as HeadlessButton } from '@fluentui/react-headless-components-preview/button';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
} from '@fluentui/react-headless-components-preview/drawer';

import { communities } from '../data/forumData';
import { useAppStyles, useHeadlessStyles } from '../styles';

type CommunityNavigationProps = {
  selectedId: string;
  mobileOpen: boolean;
  onSelect: (communityId: string) => void;
  onMobileOpenChange: (open: boolean) => void;
};

export function CommunityNavigation(props: CommunityNavigationProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();

  return (
    <>
      <aside className={styles.communityRail} aria-label="Community navigation">
        <CommunityList selectedId={props.selectedId} onSelect={props.onSelect} />
      </aside>
      <OverlayDrawer
        className={headless.drawerSurface}
        data-testid="community-drawer"
        open={props.mobileOpen}
        position="start"
        onOpenChange={(_, data) => props.onMobileOpenChange(data.open)}
      >
        <DrawerHeader className={styles.drawerHeader}>
          <DrawerHeaderTitle
            action={
              <HeadlessButton
                aria-label="Close community navigation"
                className={mergeClasses(headless.button, headless.iconButton)}
                onClick={() => props.onMobileOpenChange(false)}
              >
                <DismissRegular />
              </HeadlessButton>
            }
          >
            Communities
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className={styles.drawerBody}>
          <CommunityList
            selectedId={props.selectedId}
            onSelect={communityId => {
              props.onSelect(communityId);
              props.onMobileOpenChange(false);
            }}
          />
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
}

type CommunityListProps = {
  selectedId: string;
  onSelect: (communityId: string) => void;
};

function CommunityList(props: CommunityListProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();

  return (
    <Card className={styles.sideCard}>
      <HeadlessButton
        className={mergeClasses(
          headless.button,
          headless.fullWidthButton,
          props.selectedId === 'all' && headless.selectedButton,
        )}
        data-testid="community-all"
        onClick={() => props.onSelect('all')}
      >
        <span className={styles.communityButtonContent}>
          <HomeRegular />
          <span className={styles.communityName}>Home feed</span>
          <span />
        </span>
      </HeadlessButton>
      <Divider />
      <Accordion collapsible defaultOpenItems={['joined']}>
        <AccordionItem value="joined">
          <AccordionHeader>Joined communities</AccordionHeader>
          <AccordionPanel>
            <div className={styles.communityList}>
              {communities.map(community => (
                <Tooltip
                  key={community.id}
                  content={`${community.members} members · ${community.description}`}
                  relationship="description"
                >
                  <HeadlessButton
                    className={mergeClasses(
                      headless.button,
                      headless.fullWidthButton,
                      props.selectedId === community.id && headless.selectedButton,
                    )}
                    data-testid={`community-${community.id}`}
                    onClick={() => props.onSelect(community.id)}
                  >
                    <span className={styles.communityButtonContent}>
                      <Persona
                        avatar={{ color: 'colorful', name: community.name }}
                        presence={{ status: community.unread > 0 ? 'available' : 'offline' }}
                        size="extra-small"
                      />
                      <span className={styles.communityName}>{community.name}</span>
                      {community.unread > 0 ? (
                        <Badge appearance="filled" color="brand" size="small">
                          {community.unread}
                        </Badge>
                      ) : (
                        <span />
                      )}
                    </span>
                  </HeadlessButton>
                </Tooltip>
              ))}
            </div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="discover">
          <AccordionHeader>Discover</AccordionHeader>
          <AccordionPanel>
            <div className={styles.communitySummary}>
              <strong>Fresh conversations every day</strong>
              <span>Browse Home to see posts from every community.</span>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
