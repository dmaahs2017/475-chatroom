## Developer Setup

### Set up environment variables

Create a file called `.env.local` with these keys

```
NEXTAUTH_URL=http:localhost:3000
# Generate with `openssl rand -base64 32`
NEXTAUTH_SECRET=

# Used for github O-Auth
GITHUB_ID=
GITHUB_SECRET=
```

### Start the development server

`npm run dev`
