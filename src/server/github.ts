import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function generateTimelapseData(repoUrl: string) {
  const urlParts = new URL(repoUrl).pathname.split("/").filter(Boolean);
  const [owner, repo] = urlParts;

  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 100,
  });

  const timelapseData = await Promise.all(
    commits.map(async (commit) => {
      const { data: commitData } = await octokit.repos.getCommit({
        owner,
        repo,
        ref: commit.sha,
      });

      return {
        sha: commit.sha,
        message: commit.commit.message,
        date: commit.commit.author?.date,
        changes: commitData.files,
      };
    })
  );

  return timelapseData;
}
