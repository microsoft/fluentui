export function dedupeQueue(issues) {
  const unique = new Map();
  for (const { repo, number, queue } of issues) {
    const key = `${repo}#${number}`;
    if (!unique.has(key)) {
      unique.set(key, { repo, number, queues: [] });
    }
    const entry = unique.get(key);
    if (!entry.queues.includes(queue)) {
      entry.queues.push(queue);
    }
  }
  return [...unique.values()];
}

function matches(value, pattern) {
  const escaped = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*');
  return new RegExp(`^${escaped}$`).test(value);
}

function specificity(pattern, value) {
  if (!matches(value, pattern)) {
    return -1;
  }
  return pattern === value ? 1000 + pattern.length : pattern.indexOf('*');
}

export function detectArea(profile, issue) {
  const counts = new Map();
  for (const file of issue.files.filter(file => !file.startsWith('change/'))) {
    const candidates = Object.entries(profile.areas).flatMap(([area, rule]) =>
      rule.paths.map(pattern => ({ area, score: specificity(pattern, file) })),
    );
    candidates.sort((left, right) => right.score - left.score || left.area.localeCompare(right.area));
    if (candidates[0]?.score >= 0) {
      const { area, score } = candidates[0];
      const entry = counts.get(area) ?? { count: 0, score: 0 };
      counts.set(area, { count: entry.count + 1, score: Math.max(score, entry.score) });
    }
  }
  if (counts.size) {
    return [...counts].sort((left, right) => right[1].count - left[1].count || right[1].score - left[1].score)[0][0];
  }
  const scope = issue.title.match(/^[^(]+\(([^)]+)\):/)?.[1];
  if (!scope) {
    return null;
  }
  const candidates = Object.entries(profile.areas).flatMap(([area, rule]) =>
    rule.scopes.map(pattern => ({ area, score: specificity(pattern, scope) })),
  );
  candidates.sort((left, right) => right.score - left.score || left.area.localeCompare(right.area));
  return candidates[0]?.score >= 0 ? candidates[0].area : null;
}

export function validateProfiles(profiles) {
  const repos = new Set();
  for (const profile of profiles) {
    if (!/^[-\w]+\/[-\w.]+$/.test(profile.repo) || repos.has(profile.repo)) {
      throw new Error(`Invalid or duplicate repository: ${profile.repo}`);
    }
    repos.add(profile.repo);
    if (
      !profile.queues?.length ||
      new Set(profile.queues).size !== profile.queues.length ||
      profile.queues.some(queue => !/^[-\w]+\/[-\w]+$/.test(queue))
    ) {
      throw new Error(`Invalid review queues for ${profile.repo}`);
    }
    const logins = new Set();
    for (const reviewer of profile.reviewers) {
      const login = reviewer.login.toLowerCase();
      if (logins.has(login) || [...reviewer.primary, ...reviewer.secondary].some(area => !profile.areas[area])) {
        throw new Error(`Duplicate reviewer or undeclared area for ${profile.repo}: ${reviewer.login}`);
      }
      logins.add(login);
    }
  }
}

export function planAssignments(profiles, issues, rosters, { now = new Date(), staleDays = 90, reviewers } = {}) {
  validateProfiles(profiles);
  const byRepo = new Map(profiles.map(profile => [profile.repo, profile]));
  const load = new Map();
  for (const issue of issues) {
    for (const login of new Set(issue.requestedReviewers.map(login => login.toLowerCase()))) {
      load.set(login, (load.get(login) ?? 0) + 1);
    }
  }
  return issues.map(issue => {
    const profile = byRepo.get(issue.repo);
    if (!profile) {
      throw new Error(`No profile for ${issue.repo}`);
    }
    const area = detectArea(profile, issue);
    const age = (new Date(now) - new Date(issue.updatedAt)) / 86400000;
    const bucket = ['dependabot[bot]', 'app/dependabot'].includes(issue.author.toLowerCase())
      ? 'dependabot'
      : age > staleDays
      ? 'stale'
      : 'assignable';
    const live = new Set((rosters[`${profile.team.org}/${profile.team.slug}`] ?? []).map(login => login.toLowerCase()));
    const eligible = profile.reviewers.filter(reviewer => reviewer.eligible && live.has(reviewer.login.toLowerCase()));
    const owners = eligible.filter(reviewer => reviewer.primary.includes(area) || reviewer.secondary.includes(area));
    const fallback = eligible.filter(reviewer => reviewer.fallbackEligible !== false);
    const serving = owners.length ? owners : profile.settings.areaMatch === 'preference' ? fallback : [];
    const requested = new Set(issue.requestedReviewers.map(login => login.toLowerCase()));
    const reviewed = new Set(issue.reviewedBy.map(login => login.toLowerCase()));
    const existing = serving.filter(
      reviewer =>
        reviewer.login.toLowerCase() !== issue.author.toLowerCase() &&
        (requested.has(reviewer.login.toLowerCase()) || reviewed.has(reviewer.login.toLowerCase())),
    ).length;
    const target = reviewers ?? profile.settings.reviewers;
    const selected = [];
    while (bucket === 'assignable' && existing + selected.length < target) {
      const pool = eligible.filter(
        reviewer =>
          reviewer.login.toLowerCase() !== issue.author.toLowerCase() &&
          !requested.has(reviewer.login.toLowerCase()) &&
          !reviewed.has(reviewer.login.toLowerCase()) &&
          !selected.some(choice => choice.login.toLowerCase() === reviewer.login.toLowerCase()),
      );
      const primary = pool.filter(reviewer => reviewer.primary.includes(area));
      const secondary = pool.filter(reviewer => reviewer.secondary.includes(area));
      const tier = primary.length
        ? primary
        : secondary.length
        ? secondary
        : !owners.length && profile.settings.areaMatch === 'preference'
        ? pool.filter(reviewer => reviewer.fallbackEligible !== false)
        : [];
      if (!tier.length) {
        break;
      }
      tier.sort(
        (left, right) =>
          (load.get(left.login.toLowerCase()) ?? 0) - (load.get(right.login.toLowerCase()) ?? 0) ||
          left.login.toLowerCase().localeCompare(right.login.toLowerCase()),
      );
      const choice = tier[0];
      selected.push({
        login: choice.login,
        match: primary.length ? 'primary' : secondary.length ? 'secondary' : 'fallback',
      });
      load.set(choice.login.toLowerCase(), (load.get(choice.login.toLowerCase()) ?? 0) + 1);
    }
    return {
      repo: issue.repo,
      number: issue.number,
      queues: issue.queues,
      area,
      bucket,
      existing,
      selected,
      coverage: existing + selected.length,
      target,
    };
  });
}
