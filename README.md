# Mintai

Mintbase template with to generate Stability.ai images and mint them to Near instantly.

## Getting Started

First, add necessary environment variables.

Next, create a contract on testnet.mintbase.xya

Deploy a proxy minter contract using this repo:
[mintbase/minsta-contract](https://github.com/Mintbase/minsta-contract)

Finally, add the proxy contract as a minter on your Mintbase dashboard.

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- make sure to add your ```OPENAI_API_KEY``` environment variable

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
