# Publish on GitHub Pages

The repository is https://github.com/shahzad-zad/shahzad-learning-hub and the live site is https://shahzad-zad.github.io/shahzad-learning-hub/. This project has a static `site` folder and an Actions workflow. It uses relative URLs so it also works with a custom domain. First publication was completed on 15 October 2026; the first-publication instructions below are retained for a new account or a separate copy.

## First publication

Run `scripts/publish.ps1` in PowerShell. It requires a signed-in GitHub CLI (`gh auth login`) and will create a new public repository, push the reviewed website and enable GitHub Pages with GitHub Actions. It refuses to overwrite an existing repository or publish from an unrelated local Git repository. Repository creation and publication need your GitHub account access; the original portfolio and teaching folders are not pushed.

If publishing manually:

1. Create a public GitHub repository named `shahzad-learning-hub` without a generated README.
2. Upload this project's tracked files and folders, including `.github/workflows/pages.yml`, `site` and `scripts`. Exclude the ignored files listed in `.gitignore`.
3. In repository Settings → Pages, choose GitHub Actions as the build source.
4. Run the Publish student website workflow from Actions, then use its deployment URL.

The workflow checks paths, uploads only `site` and deploys with the official GitHub Pages actions. See [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Future updates

Commit and push changes to main. Actions automatically validates and republishes. The local reference copy of your portfolio is ignored. Repositories are public so students can access the website without an account. Public downloads include the explanations and keys already described in the library.
