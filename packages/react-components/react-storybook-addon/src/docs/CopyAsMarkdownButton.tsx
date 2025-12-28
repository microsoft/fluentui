import * as React from 'react';
import { SplitButton, type MenuButtonProps } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { Spinner } from '@fluentui/react-spinner';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';
import { bundleIcon, MarkdownFilled, MarkdownRegular } from '@fluentui/react-icons';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const MarkdownIcon = bundleIcon(MarkdownFilled, MarkdownRegular);

const useStyles = makeStyles({
  button: {
    marginInlineStart: 'auto',
  },
});

export interface CopyAsMarkdownProps {
  /** The Storybook story ID used to generate the markdown URL */
  storyId?: string;
}

/**
 * A button that allows users to copy the current page as markdown to their clipboard or view it in a new tab.
 * The markdown content is fetched from the Storybook API and cached for subsequent requests.
 */
export const CopyAsMarkdownButton: React.FC<CopyAsMarkdownProps> = ({ storyId = '' }) => {
  const { targetDocument } = useFluent();
  const targetWindow = targetDocument?.defaultView;
  const styles = useStyles();
  const toastId = useId('copy-toast');
  const toasterId = useId('toaster');
  const { dispatchToast, updateToast } = useToastController(toasterId);

  // Cache for the fetched markdown content to avoid redundant network requests
  const markdownContentCache = React.useRef<string | null>(null);

  // AbortController to track and cancel fetch requests
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Full URL to the markdown endpoint for this story
  const markdownUrl = React.useMemo(() => {
    return targetWindow ? convertStoryIdToMarkdownUrl(targetWindow, storyId) : '';
  }, [storyId, targetWindow]);

  // Cleanup: abort pending requests on unmount
  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /**
   * Fetches the markdown content (with caching) and copies it to the clipboard.
   * Shows a toast notification with loading, success, or error states.
   * Skips the request if one is already in progress.
   */
  const copyPageContentToClipboard = React.useCallback(async () => {
    // Skip if a request is already in progress (abort controller exists and not aborted)
    if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
      return;
    }

    // Ensure we have a window context to use for clipboard and fetch
    if (!targetWindow) {
      return;
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Show loading toast that persists until updated
    dispatchToast(
      <Toast>
        <ToastTitle media={<Spinner />}>Copying page content...</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'info',
        timeout: -1, // Never auto-dismiss
      },
    );

    try {
      // Use cached content if available, otherwise fetch from API
      if (!markdownContentCache.current) {
        markdownContentCache.current = await fetchMarkdownContent(targetWindow, markdownUrl, abortController.signal);
      }

      // Copy to clipboard
      await targetWindow?.navigator.clipboard.writeText(markdownContentCache.current);

      // Update toast to success
      updateToast({
        content: (
          <Toast>
            <ToastTitle>Page content copied to clipboard!</ToastTitle>
          </Toast>
        ),
        intent: 'success',
        toastId,
        timeout: 3000,
      });
    } catch (error) {
      // Don't show error if request was aborted
      if (abortController.signal.aborted) {
        return;
      }

      const errorMessage = error instanceof Error ? error.message : String(error);

      // Update toast to error
      updateToast({
        content: (
          <Toast>
            <ToastTitle>Failed to copy page content: {errorMessage}</ToastTitle>
          </Toast>
        ),
        intent: 'error',
        toastId,
        timeout: 3000,
      });
    } finally {
      // Clear the abort controller ref to allow new requests
      abortControllerRef.current = null;
    }
  }, [dispatchToast, updateToast, toastId, markdownUrl, targetWindow]);

  /** Opens the markdown content in a new browser tab */
  const openInNewTab = React.useCallback(() => {
    targetWindow?.open(markdownUrl, '_blank');
  }, [markdownUrl, targetWindow]);

  if (!storyId) {
    return null;
  }

  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton
              className={styles.button}
              menuButton={triggerProps}
              primaryActionButton={{
                appearance: 'secondary',
                icon: <MarkdownIcon />,
                onClick: copyPageContentToClipboard,
                'aria-label': 'Copy page content as markdown to clipboard',
              }}
              aria-label="Copy page as markdown"
            >
              Copy Page
            </SplitButton>
          )}
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<MarkdownIcon />} onClick={openInNewTab}>
              View as Markdown
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Toaster toasterId={toasterId} />
    </>
  );
};

/**
 * Regex pattern to remove the story variant suffix from Storybook story IDs.
 * @example "button--primary" -> "button"
 */
const STORYBOOK_VARIANT_SUFFIX_PATTERN = /--\w+$/g;

/**
 * Gets the base URL for fetching markdown content from the Storybook LLM endpoint.
 * Each story's markdown is available at: {BASE_URL}/{storyId}.txt
 * @param targetWindow - The window object to use for location access
 * @returns The base URL constructed from current location origin and pathname
 */
function getStorybookMarkdownApiBaseUrl(targetWindow: Window): string {
  // Remove the [page].html file from pathname and append /llms/
  const basePath = targetWindow.location.pathname.replace(/\/[^/]*\.html$/, '');
  return `${targetWindow.location.origin}${basePath}/llms/`;
}

/**
 * Converts a Storybook story ID to a markdown URL.
 * @param targetWindow - The window object to use for location access
 * @param storyId - The Storybook story ID
 * @returns The full URL to the markdown endpoint for the story
 * @example "button--primary" -> "https://storybooks.fluentui.dev/llms/button.txt"
 */
function convertStoryIdToMarkdownUrl(targetWindow: Window, storyId: string): string {
  return `${getStorybookMarkdownApiBaseUrl(targetWindow)}${storyId.replace(STORYBOOK_VARIANT_SUFFIX_PATTERN, '.txt')}`;
}

/**
 * Fetches markdown content from the Storybook API.
 * @param targetWindow - The window object to use for fetch access
 * @param url - The URL to fetch markdown content from
 * @param signal - Optional AbortSignal to cancel the request
 * @returns Promise resolving to the markdown text content
 * @throws Error if the fetch request fails or is aborted
 */
async function fetchMarkdownContent(
  targetWindow: Window,
  url: string,
  signal: AbortSignal | undefined,
): Promise<string> {
  const response = await targetWindow.fetch(url, {
    headers: {
      'Content-Type': 'text/plain',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
  }

  return response.text();
}
