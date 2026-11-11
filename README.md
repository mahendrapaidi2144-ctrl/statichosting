# Image Hospitals

A responsive hospital website built with Node.js. The build copies the static site into `dist/`, which is the deployable website artifact.

## Build locally

Requires Node.js 22 or newer.

```sh
npm run build
```

The generated site is in `dist/`. Open `dist/index.html` in a browser to preview it. The care directory supports text search and filters; the mobile navigation and phone links are also interactive.

## GitHub Actions

- **CI** runs on pushes to `main` and pull requests. It checks out the source, sets up Node.js, builds the site, and uploads the `image-hospitals-site` artifact for successful pushes to `main`.
- **CD** runs after a successful CI workflow on `main`, downloads that artifact, and syncs it to `s3://qvargoproject2026/`.

Add these values in the repository’s **Settings → Secrets and variables → Actions** before deployment:

- Secret `AWS_ACCESS_KEY_ID`
- Secret `AWS_SECRET_ACCESS_KEY`
- Variable `AWS_REGION` set to the region containing the bucket

Use an IAM access key whose policy is limited to listing `qvargoproject2026` and putting objects in that bucket. The bucket must already exist. The workflow uploads or updates files without deleting other bucket objects; configure S3 website hosting, public access, or CloudFront separately according to your hosting and access requirements.
