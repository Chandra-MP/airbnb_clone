
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## MongoDB and Prisma - 
Here, I've used MongoDB as the Cloud Database and Prisma as the Query Builder and connector to the Database.

but why prisma, and not commonley used Mongoose?

We are using Prisma as it provides a high level abstraction with type-safe queries which are compatible with TypeScript, so instead of Manually type-checking if Mongoose was used, we are using Prisma.











## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
