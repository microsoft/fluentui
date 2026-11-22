import assert from 'node:assert/strict';
import path from 'node:path';
import type { Page } from 'playwright';

export function outputDirectory(variable: string): string {
  const output = process.env[variable];
  assert(output && path.isAbsolute(output), `Set an absolute ${variable} directory`);
  return output;
}

export async function settled(page: Page, waitForAnimations = false): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  });
  if (waitForAnimations) {
    await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
  }
}

export function errorDetails(error: unknown): string {
  return error instanceof Error ? error.stack ?? error.message : String(error);
}
