import { danger, fail, warn, markdown, message } from 'danger';

import detectNonApprovedDependencies from './scripts/dangerjs/detectNonApprovedDependencies';
import checkChangelog from './scripts/dangerjs/checkChangelog';

/**
 * This trick (of explicitly passing Danger JS utils as function arg, instead of importing them at places where needed)
 * is necessary due to the magic DangerJS is doing with imports: https://spectrum.chat/danger/javascript/danger-js-actually-runs-your-imports-as-globals~0a005b56-31ec-4919-9a28-ced623949d4d
 */
const dangerJS = { danger, fail, warn, markdown, message };

export default async () => {
  await checkChangelog(dangerJS);
  await detectNonApprovedDependencies(dangerJS);
};
