import { github, repoDetails } from './init';
import { IRelease } from './types';

/**
 * Gets all releases from github.
 * @param tags - If provided, only get the releases for these tags (it's okay if a tag
 * doesn't have a release yet). Otherwise get all the releases.
 */
export async function getReleases(tags?: string[]): Promise<Map<string, IRelease>> {
  const releases = new Map<string, IRelease>();

  if (tags) {
    // Only get a subset of releases
    console.log('Getting releases for tags:');
    console.log(tags.map(tag => `  ${tag}\n`).join(''));

    for (const tag of tags) {
      try {
        const release = (await github.repos.getReleaseByTag({ ...repoDetails, tag })).data;
        releases.set(release.tag_name, { id: release.id, tagName: release.tag_name });
      } catch (err) {
        if (isGithubRestApiError(err) && err.status === 404) {
          // This tag probably isn't released yet, which is fine in this context
          console.warn('Tag not yet released: ' + tag);
        } else {
          throw new Error(`Could not get release for tag ${tag} from github.\n${err}`);
        }
      }
    }
  } else {
    // Get all the releases
    console.log('Getting all releases...');
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const res = await github.paginate<{ tag_name: string; id: number }>(
        github.repos.listReleases.endpoint.merge(repoDetails),
      );

      res.forEach(release => {
        releases.set(release.tag_name, { id: release.id, tagName: release.tag_name });
      });
    } catch (err) {
      throw new Error('Could not get releases from github.\n' + err);
    }
  }

  console.log(`Found ${releases.size}${tags ? ' recent' : ''} releases on github.\n`);

  return releases;
}

function isGithubRestApiError(err: unknown): err is Error & { status: number } {
  if (typeof err === 'object' && Object.prototype.hasOwnProperty.call(err, 'status')) {
    return true;
  }
  return false;
}
