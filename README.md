# Google Docs clone with Next.js, Tailwind CSS, Prisma, and tRPC

## Getting Started

First, Clone the repo:

```bash
git clone https://github.com/DkDeepak001/docsClone.git
```

Install the dependencies:

```bash
yarn install
```

create a `.env` file and add the following:

```bash
DATABASE_URL="mongodb://localhost:27017/docsClone"
```

Create a database schema

```bash
yarn prisma db push
yarn prisma generate
```

Start the Nwxtjs development server:

```bash
yarn run dev
```

Start the webSocket server:

```bash
cd socket
yarn install
node index.js
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
````
