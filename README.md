## Getting Started

To run the project, install dependencies first:
```bash
npm install
```

then, configure Larvis backend API url by setting NEXT_PUBLIC_API_URL environment variable.

You can either set it up in your system or use builtin nextjs `.env.*` mechanism.
The easiest way is to create a `.env.local` file and put following content in it:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```
If the application is going to be deployed in a remote environement, it will require  `.env.production` to be supplied with production API url in it.


To run on local environment, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the UI.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tests

There are 2 provided user flows written in the Cypress framework.

To run the tests:
1. Make sure you have backend running on your machine
2. Start webpack server for the FE app
3. Run
```bash
npm run cypress:open
```

## Possible `larvis` improvements

1. There seems to be an issue with CORS - I used a browser plugin to bypass it.
2. Using `HttpOnlyCookie` could be more secure authentication solution than JWT.

## Other notes

Created design is quite simplistic/generic and definitely could be nicer.
