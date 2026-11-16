import type { Page } from '@playwright/test';

export { expect, test } from '@microsoft/fast-test-harness';

export async function pauseHydration(page: Page): Promise<() => void> {
  let resumeHydration!: () => void;
  const paused = new Promise<void>(resolve => {
    resumeHydration = resolve;
  });

  await page.route('**/*', async route => {
    if (route.request().resourceType() === 'script') {
      await paused;
    }
    await route.continue();
  });

  return resumeHydration;
}
