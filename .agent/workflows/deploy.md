---
description: commit to GitHub then deploy to Netlify
---

Deploy the NIC Ventures site by first committing all changes to GitHub, then deploying to Netlify.

1. Stage all changes
// turbo
```
cd /Users/hungnguyen/Downloads/NIC && git add -A
```

2. Generate a concise, descriptive commit message based on the actual changes (e.g. `feat: add startup detail page`, `fix: auth modal redirect`, `chore: update styles`). Then commit:
```
cd /Users/hungnguyen/Downloads/NIC && git commit -m "<generated commit message>"
```
Skip this step if `git status` shows nothing to commit.

3. Push to GitHub
// turbo
```
cd /Users/hungnguyen/Downloads/NIC && git push origin main
```

4. Deploy to Netlify
// turbo
```
cd /Users/hungnguyen/Downloads/NIC && netlify deploy --prod
```
