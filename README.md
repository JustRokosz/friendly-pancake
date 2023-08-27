## Getting Started

To run project run first:
```bash
npm install
```

then create in main project folder file `.env.local`, pase following code and save it:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

and finally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tests

There are 2 provided user flows written in Cypress.
To run tests:
1. Make sure you have backend ready on your machine
2. Start webpack server for FE app
3. Run
```bash
npm run cypress:open
```

## Possible `larvis` improvements

1. There seems to be issue with CORS - I used a browser plugin to bypass it.
2. Using `HttpOnlyCookie` would be more secure authentication solution than JWT.

## Other notes

Created design is quite simplistic/generic and definitely could be nicer.
