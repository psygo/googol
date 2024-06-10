# Googol

A completely manual search engine.

## Dev

### Services and Tech Used

- [Vercel](https://vercel.com) for handling deployment, and cron jobs.
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) for handling the DB.
- [Drizzle](https://orm.drizzle.team) for ORM.
- [Clerk](https://clerk.com) for authentication.

### Environment Variables

This is the shape of the project's environment variables:

```env
#-----------------------------------------------------------
# 1. Drizzle

POSTGRES_URL=
NODE_ENV=

#-----------------------------------------------------------
# 2. Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CLERK_WEBHOOKS_USER_EVENTS=

#-----------------------------------------------------------
```

### Using Ngrok for Local Development

Expose your local host to the web:

```sh
ngrok http http://localhost:3000
```
