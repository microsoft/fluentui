import { danger, fail, warn, markdown, message } from 'danger';
import checkChangelog from '../fluent/build/dangerjs/checkChangelog';
import detectChangedDependencies from '../fluent/build/dangerjs/detectChangedDependencies';
import detectNonApprovedDependencies from '../fluent/build/dangerjs/detectNonApprovedDependencies';
import checkPerfRegressions from '../fluent/build/dangerjs/checkPerfRegressions';

/**
 * This trick (of explicitly passing Danger JS utils as function arg, instead of importing them at places where needed)
 * is necessary due to the magic DangerJS is doing with imports: https://spectrum.chat/danger/javascript/danger-js-actually-runs-your-imports-as-globals~0a005b56-31ec-4919-9a28-ced623949d4d
 */
const dangerJS = { danger, fail, warn, markdown, message };

export default async () => {
  await checkChangelog(dangerJS);
  await detectChangedDependencies(dangerJS);
  await detectNonApprovedDependencies(dangerJS);
  await checkPerfRegressions(dangerJS);
};
