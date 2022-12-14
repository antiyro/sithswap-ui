import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import gql from 'graphql-tag'
import { Transaction, TransactionType } from 'types'

const POOL_TRANSACTIONS = gql`
  query transactions($address: ID!) {
    mints(first: 100, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      timestamp
      transaction {
        id
      }
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
    swaps(first: 100, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      timestamp
      transaction {
        id
      }
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0In
      amount1Out
      amount1In
      amount0Out
      amountUSD
    }
    burns(first: 100, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      timestamp
      transaction {
        id
      }
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
  }
`

interface TransactionResults {
  mints: {
    timestamp: string
    transaction: {
      id: string
    }
    pair: {
      token0: {
        id: string
        symbol: string
      }
      token1: {
        id: string
        symbol: string
      }
    }
    sender: string
    amount0: string
    amount1: string
    amountUSD: string
  }[]
  swaps: {
    timestamp: string
    transaction: {
      id: string
    }
    pair: {
      token0: {
        id: string
        symbol: string
      }
      token1: {
        id: string
        symbol: string
      }
    }
    sender: string
    amount0In: string
    amount1In: string
    amount0Out: string
    amount1Out: string
    amountUSD: string
  }[]
  burns: {
    timestamp: string
    transaction: {
      id: string
    }
    pair: {
      token0: {
        id: string
        symbol: string
      }
      token1: {
        id: string
        symbol: string
      }
    }
    sender: string
    amount0: string
    amount1: string
    amountUSD: string
  }[]
}

export async function fetchPoolTransactions(
  address: string,
  client: ApolloClient<NormalizedCacheObject>
): Promise<{ data: Transaction[] | undefined; error: boolean; loading: boolean }> {
  const { data, error, loading } = await client.query<TransactionResults>({
    query: POOL_TRANSACTIONS,
    variables: {
      address: address,
    },
    fetchPolicy: 'cache-first',
  })

  if (error) {
    return {
      data: undefined,
      error: true,
      loading: false,
    }
  }

  if (loading && !data) {
    return {
      data: undefined,
      error: false,
      loading: true,
    }
  }

  const mints = data.mints.map((m) => {
    return {
      type: TransactionType.MINT,
      hash: m.transaction.id,
      timestamp: m.timestamp,
      sender: m.sender,
      token0Symbol: m.pair.token0.symbol,
      token1Symbol: m.pair.token1.symbol,
      token0Address: m.pair.token0.id,
      token1Address: m.pair.token1.id,
      amountUSD: parseFloat(m.amountUSD),
      amountToken0: parseFloat(m.amount0),
      amountToken1: parseFloat(m.amount1),
    }
  })
  const burns = data.burns.map((m) => {
    return {
      type: TransactionType.BURN,
      hash: m.transaction.id,
      timestamp: m.timestamp,
      sender: m.sender,
      token0Symbol: m.pair.token0.symbol,
      token1Symbol: m.pair.token1.symbol,
      token0Address: m.pair.token0.id,
      token1Address: m.pair.token1.id,
      amountUSD: parseFloat(m.amountUSD),
      amountToken0: parseFloat(m.amount0),
      amountToken1: parseFloat(m.amount1),
    }
  })

  const swaps = data.swaps.map((m) => {
    return {
      type: TransactionType.SWAP,
      hash: m.transaction.id,
      timestamp: m.timestamp,
      sender: m.sender,
      token0Symbol: m.pair.token0.symbol,
      token1Symbol: m.pair.token1.symbol,
      token0Address: m.pair.token0.id,
      token1Address: m.pair.token1.id,
      amountUSD: parseFloat(m.amountUSD),
      amountToken0: m.amount0In ? parseFloat(m.amount0In) : parseFloat(m.amount1In),
      amountToken1: m.amount0Out ? parseFloat(m.amount0Out) : parseFloat(m.amount1Out),
    }
  })

  return { data: [...mints, ...burns, ...swaps], error: false, loading: false }
}
