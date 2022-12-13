<div id="top"></div>

<br />

<div align="center">
    <a href="https://sithswap.com">
      <img src="/src/assets/svg/logo.png" alt="Logo" width="auto" height="auto">
    </a>
    <br>
    <a href="https://starkware.co/">
      <img src="https://img.shields.io/badge/powered_by-StarkWare-navy" alt="">
    </a>
</div>

# Analytics-ui

This repository contains the files necessary to analytics ui of [SithSwap](https://sithswap.com) AMM.
This data displayed is indexed using the [Checkpoint](https://docs.checkpoint.fyi) StarkNet data indexing middleware.
The data displayed is called from the graphql endpoint set at [api.sithswap.com](http://api.sithswap.com:3000).


**Requirements**

- Node.js (>= 16.x.x)
- Yarn

> You can also use npm, just make sure to replace the subsequent 'yarn' commands with their npm equivalent.

## Setup

1. Run the following command to install dependencies:
   ```bash
   yarn # or 'npm install'
    ```

2. You can now start the server locally by running:
   ```bash
   yarn start # or 'npm start'
    ```

3. Head up to [localhost](http://localhost:3000) to see the interface.

> 💡 tip : if you are working with the indexer, you can change set the client endpoint you deployed in `src/apollo/client.ts` under `const client.uri`.

## License

[GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later.html)
