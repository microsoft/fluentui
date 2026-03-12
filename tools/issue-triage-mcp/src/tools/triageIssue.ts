import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { detectCategories, type IssueCategory } from '../matchers/issuePatterns.js';
import { detectComponents, type ComponentEntry } from '../matchers/componentMap.js';

// ─────────────────────────────────────────────────────────────────────────────
// Types for the structured triage result
// ─────────────────────────────────────────────────────────────────────────────

interface TriageFile {
  path: string;
  reason: string;
}

interface TriageFolder {
  path: string;
  reason: string;
}

interface TriageResult {
  summary: string;
  issueCategories: string[];
  detectedComponents: string[];
  primaryFiles: TriageFile[];
  primaryFolders: TriageFolder[];
  relatedFolders: TriageFolder[];
  investigationSteps: string[];
  confidenceNote: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Deduplicate an array of objects by a key extractor, preserving first-seen order. */
function dedupeBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Given the component name and a file glob pattern like "Button.tsx",
 * produce a concrete path guess, e.g. "packages/.../react-button/src/Button.tsx".
 */
function resolveKeyFile(packageDir: string, file: string): string {
  return `${packageDir}/${file}`;
}

/**
 * Build a human-readable triage result from matched categories + components.
 */
function buildTriageResult(
  description: string,
  matchedCategories: Array<{ category: IssueCategory; score: number }>,
  matchedComponents: ComponentEntry[],
): TriageResult {
  const issueCategories = matchedCategories.map(m => m.category.label);
  const detectedComponents = matchedComponents.map(c => c.name);

  const primaryFiles: TriageFile[] = [];
  const primaryFolders: TriageFolder[] = [];
  const relatedFolders: TriageFolder[] = [];
  const investigationSteps: string[] = [];

  // ── Component-specific files (highest priority) ───────────────────────────
  for (const comp of matchedComponents) {
    // Add the component's package directory as a primary folder
    primaryFolders.push({
      path: comp.packageDir,
      reason: `Primary source for ${comp.name} component`,
    });

    // Add key files
    for (const file of comp.keyFiles) {
      primaryFiles.push({
        path: resolveKeyFile(comp.packageDir, file),
        reason: `Core file for ${comp.name}`,
      });
    }

    // Related directories for this component
    for (const dir of comp.relatedDirs) {
      relatedFolders.push({
        path: dir,
        reason: `Related package used by ${comp.name}`,
      });
    }

    // Cross-cut: add category-specific files within the component package
    for (const { category } of matchedCategories) {
      for (const glob of category.fileGlobs) {
        // Only add plausible file guesses — skip globs with wildcards
        if (!glob.includes('*')) {
          primaryFiles.push({
            path: resolveKeyFile(comp.packageDir, glob),
            reason: `${category.label} file in ${comp.name} package`,
          });
        }
      }
    }
  }

  // ── Category-based folders (general signal) ───────────────────────────────
  for (const { category } of matchedCategories) {
    for (const folder of category.folders) {
      const reason = `Relevant to ${category.label} issues`;
      // If a component was detected, these become supporting context (related)
      if (matchedComponents.length > 0) {
        relatedFolders.push({ path: folder, reason });
      } else {
        primaryFolders.push({ path: folder, reason });
      }
    }

    // Collect investigation notes
    for (const note of category.notes) {
      investigationSteps.push(note);
    }
  }

  // ── Always-useful cross-cutting locations ─────────────────────────────────
  if (matchedCategories.length > 0 || matchedComponents.length > 0) {
    relatedFolders.push(
      {
        path: 'packages/react-components/react-utilities/src',
        reason: 'Shared hooks and utilities used by most components',
      },
      {
        path: 'packages/react-components/react-theme/src',
        reason: 'Design tokens and theming foundation',
      },
    );
  }

  // ── Specific keyword overrides ─────────────────────────────────────────────
  applyKeywordOverrides(description, primaryFiles, primaryFolders, relatedFolders, investigationSteps);

  // ── Dedup ─────────────────────────────────────────────────────────────────
  const deduped = {
    primaryFiles: dedupeBy(primaryFiles, f => f.path),
    primaryFolders: dedupeBy(primaryFolders, f => f.path),
    relatedFolders: dedupeBy(relatedFolders, f => f.path),
    investigationSteps: [...new Set(investigationSteps)],
  };

  // Remove items that are already in primaryFolders from relatedFolders
  const primaryFolderPaths = new Set(deduped.primaryFolders.map(f => f.path));
  deduped.relatedFolders = deduped.relatedFolders.filter(f => !primaryFolderPaths.has(f.path));

  // ── Summary ───────────────────────────────────────────────────────────────
  const summary = buildSummary(description, issueCategories, detectedComponents);
  const confidenceNote = buildConfidenceNote(matchedCategories, matchedComponents);

  return {
    summary,
    issueCategories,
    detectedComponents,
    ...deduped,
    confidenceNote,
  };
}

/**
 * Specific overrides for keywords that carry strong localized signal beyond
 * what the general category matching already provides.
 */
function applyKeywordOverrides(
  description: string,
  primaryFiles: TriageFile[],
  primaryFolders: TriageFolder[],
  relatedFolders: TriageFolder[],
  investigationSteps: string[],
): void {
  const lower = description.toLowerCase();

  // ── useControllableState ─────────────────────────────────────────────────
  if (/controlled|uncontrolled|default value|defaultvalue/.test(lower)) {
    primaryFiles.push({
      path: 'packages/react-components/react-utilities/src/utils/useControllableState.ts',
      reason: 'Controlled/uncontrolled state management utility',
    });
    investigationSteps.push(
      'Verify that value + onChange (controlled) OR defaultValue (uncontrolled) are set correctly, not both.',
    );
  }

  // ── Positioning (floating-ui) ─────────────────────────────────────────────
  if (/position|placement|flip|overflow|collision|anchor|float/.test(lower)) {
    primaryFolders.push({
      path: 'packages/react-components/react-positioning/src',
      reason: 'Positioning engine (wraps @floating-ui)',
    });
    primaryFiles.push({
      path: 'packages/react-components/react-positioning/src/usePositioning.ts',
      reason: 'Main positioning hook',
    });
  }

  // ── Portal / mounting ─────────────────────────────────────────────────────
  if (/portal|mount|document body|teleport|append to body/.test(lower)) {
    primaryFolders.push({
      path: 'packages/react-components/react-portal/src',
      reason: 'Portal rendering (DOM insertion outside component tree)',
    });
  }

  // ── Griffel / makeStyles ──────────────────────────────────────────────────
  if (/griffel|makestyle|usestyles|class name|classname|css-in-js/.test(lower)) {
    investigationSteps.push(
      'Griffel (CSS-in-JS): check that makeStyles is called at module level, not inside a component.',
      'Verify that mergeClasses() is used (not string concatenation) when combining class names.',
      'Check for rule ordering issues — later rules in the same makeStyles call have lower specificity.',
    );
  }

  // ── FluentProvider / theme ────────────────────────────────────────────────
  if (/fluent ?provider|theme provider|no theme|missing theme|tokens not/.test(lower)) {
    primaryFolders.push({
      path: 'packages/react-components/react-components/src',
      reason: 'FluentProvider component source',
    });
    primaryFiles.push({
      path: 'packages/react-components/react-shared-contexts/src/ThemeContext.ts',
      reason: 'Theme context consumed by all components',
    });
    investigationSteps.push(
      'Ensure your app is wrapped in a <FluentProvider theme={...}> — components will not render tokens without it.',
    );
  }

  // ── SSR / hydration ───────────────────────────────────────────────────────
  if (/ssr|server.?side render|hydrat|next\.?js|remix|server component/.test(lower)) {
    relatedFolders.push({
      path: 'apps/ssr-tests-v9',
      reason: 'SSR smoke tests for v9 components',
    });
    primaryFiles.push({
      path: 'packages/react-components/react-utilities/src/utils/useIsSSR.ts',
      reason: 'SSR detection utility',
    });
    investigationSteps.push(
      'For SSR, wrap the app with <RendererProvider renderer={createDOMRenderer()}> in addition to FluentProvider.',
      'Check that no browser-only APIs (window, document) are accessed at render time.',
    );
  }

  // ── Focus visible / focus ring ─────────────────────────────────────────────
  if (/focus.?ring|focus.?visible|outline|keyboard.?focus/.test(lower)) {
    primaryFiles.push({
      path: 'packages/react-components/react-tabster/src/focus/useFocusVisibleClassName.ts',
      reason: 'Focus-visible ring CSS class injection',
    });
    investigationSteps.push(
      "Focus rings are applied via the .fui-FluentProvider__focusVisible CSS class — verify it is present on the root <body> or provider element.",
    );
  }

  // ── High contrast mode ────────────────────────────────────────────────────
  if (/high contrast|forced colors|windows hc|hcm|contrast mode/.test(lower)) {
    investigationSteps.push(
      'High contrast styles use the CSS forced-colors media query inside makeStyles.',
      'Tokens: colorTransparent, Highlight, ButtonText etc. are the forced-colors keywords.',
      'Check that borders use outline: instead of border: in forced-colors — borders are often hidden.',
    );
  }

  // ── RTL ───────────────────────────────────────────────────────────────────
  if (/\brtl\b|right.?to.?left|bidi|arabic|hebrew|dir="rtl"/.test(lower)) {
    investigationSteps.push(
      'Set dir="rtl" on the <FluentProvider> or a parent element.',
      'Griffel automatically flips logical CSS properties (start/end) for RTL.',
      'Icons that need mirroring should use the shouldMirrorRtl prop.',
    );
    primaryFiles.push({
      path: 'packages/react-components/react-utilities/src/utils/getRTLSafeKey.ts',
      reason: 'RTL key helper utility',
    });
  }

  // ── Memory leak ────────────────────────────────────────────────────────────
  if (/memory.?leak|leak|not.?clean|cleanup|unmount/.test(lower)) {
    investigationSteps.push(
      "Return a cleanup function from every useEffect that adds event listeners or starts timers.",
      "Check for missing AbortController teardown in async effects.",
      "Zustand/Context stores: ensure subscriptions are removed on component unmount.",
    );
  }

  // ── Bundle size / tree shaking ────────────────────────────────────────────
  if (/bundle.?size|tree.?shak|side.?effect|import cost|chunk/.test(lower)) {
    relatedFolders.push({
      path: 'packages/react-components/react-components/src',
      reason: 'Root package — any re-export here pulls the whole package into the bundle',
    });
    investigationSteps.push(
      'Prefer named per-component imports: import { Button } from "@fluentui/react-components" is fine but import * is not.',
      'Check that sideEffects: false is set in the package.json for tree-shaking to work.',
      'Use bundlemon or bundle-buddy to visualise what is being included.',
    );
  }

  // ── Storybook / stories ────────────────────────────────────────────────────
  if (/storybook|\.stories\.|story/.test(lower)) {
    relatedFolders.push({
      path: 'packages/charts/react-charts/stories',
      reason: 'Chart Storybook stories',
    });
    investigationSteps.push(
      'Each component has its stories under {package}/stories/ — run yarn storybook to view them.',
      'Storybook config is in .storybook/ at the repo root.',
    );
  }
}

function buildSummary(description: string, categories: string[], components: string[]): string {
  const parts: string[] = [];

  if (components.length > 0) {
    parts.push(`Detected component(s): **${components.join(', ')}**.`);
  }
  if (categories.length > 0) {
    parts.push(`Issue classified as: **${categories.join(', ')}**.`);
  }
  if (parts.length === 0) {
    parts.push('Could not classify the issue into a known category.');
  }

  return parts.join(' ');
}

function buildConfidenceNote(
  matchedCategories: Array<{ category: IssueCategory; score: number }>,
  matchedComponents: ComponentEntry[],
): string {
  const totalScore = matchedCategories.reduce((s, m) => s + m.score, 0);

  if (matchedComponents.length > 0 && totalScore >= 4) {
    return 'High confidence — component and issue type both identified. Start with primary files.';
  }
  if (matchedComponents.length > 0) {
    return 'Medium confidence — component identified; issue type is inferred. Verify category matches.';
  }
  if (totalScore >= 4) {
    return 'Medium confidence — issue type identified but no specific component detected. Explore primary folders.';
  }
  if (totalScore > 0) {
    return 'Low confidence — weak keyword match. Use investigation steps as a guide and broaden the search.';
  }
  return 'No match — try rephrasing with more specific terms (component name, symptom, or category).';
}

// ─────────────────────────────────────────────────────────────────────────────
// Format the result as a markdown string for display in an MCP client
// ─────────────────────────────────────────────────────────────────────────────

function formatResult(result: TriageResult, repoRoot: string): string {
  const lines: string[] = [];

  lines.push(`## Issue Triage Result\n`);
  lines.push(`### Summary\n${result.summary}\n`);
  lines.push(`> ${result.confidenceNote}\n`);

  if (result.issueCategories.length > 0) {
    lines.push(`**Issue Categories:** ${result.issueCategories.join(' · ')}`);
  }
  if (result.detectedComponents.length > 0) {
    lines.push(`**Components Detected:** ${result.detectedComponents.join(' · ')}\n`);
  }

  // Primary files
  if (result.primaryFiles.length > 0) {
    lines.push(`---\n### Primary Files to Investigate\n`);
    lines.push(`These files are the most likely source of the issue:\n`);
    for (const f of result.primaryFiles) {
      lines.push(`- \`${repoRoot}/${f.path}\``);
      lines.push(`  _${f.reason}_`);
    }
  }

  // Primary folders
  if (result.primaryFolders.length > 0) {
    lines.push(`\n---\n### Primary Folders\n`);
    for (const f of result.primaryFolders) {
      lines.push(`- \`${repoRoot}/${f.path}\``);
      lines.push(`  _${f.reason}_`);
    }
  }

  // Related folders
  if (result.relatedFolders.length > 0) {
    lines.push(`\n---\n### Related / Supporting Folders\n`);
    lines.push(`Explore these if the primary areas do not surface the issue:\n`);
    for (const f of result.relatedFolders) {
      lines.push(`- \`${repoRoot}/${f.path}\``);
      lines.push(`  _${f.reason}_`);
    }
  }

  // Investigation steps
  if (result.investigationSteps.length > 0) {
    lines.push(`\n---\n### Investigation Steps & Tips\n`);
    for (const step of result.investigationSteps) {
      lines.push(`- ${step}`);
    }
  }

  if (
    result.primaryFiles.length === 0 &&
    result.primaryFolders.length === 0
  ) {
    lines.push(`\n---\n_No specific files or folders could be identified. Try including the component name or a more specific description of the symptom._`);
  }

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Tool registration
// ─────────────────────────────────────────────────────────────────────────────

const inputSchema = {
  description: z.string().describe(
    'Free-text description of the issue. Include component names, symptoms, and reproduction steps.',
  ),
  repoRoot: z.string().optional().describe(
    'Path to the repository root (default: ".")',
  ),
};

export function registerTriageIssueTool(server: McpServer): void {
  // @ts-ignore — TS2589: MCP SDK generics exceed TypeScript 5.4's instantiation depth limit
  server.registerTool(
    'triage_issue',
    {
      description:
        'Given a description of a bug, performance problem, UI issue, or any other problem in the FluentUI repository, returns a structured list of files, folders, and investigation steps that are most likely relevant to diagnosing and fixing the issue.',
      inputSchema,
    },
    (args) => {
      const description = args.description ?? '';
      const repoRoot = args.repoRoot ?? '.';

      if (description.length < 5) {
        return {
          content: [{
            type: 'text' as const,
            text: 'Error: `description` is required and must be at least 5 characters.',
          }],
        };
      }

      const matchedCategories = detectCategories(description);
      const matchedComponents = detectComponents(description);

      const result = buildTriageResult(description, matchedCategories, matchedComponents);
      const text = formatResult(result, repoRoot);

      return {
        content: [{ type: 'text' as const, text }],
      };
    },
  );
}
