import { useActiveNetworkVersion, useClients } from 'state/application/hooks'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { ArbitrumNetworkInfo, EthereumNetworkInfo } from 'constants/networks'

export const SUBGRAPH_HEALTH = gql`
  query health($id: ID!) {
    subgraphs(where: { id: $id }) {
      synced
      health
      syncedBlock
      headBlock
    }
  }
`

interface HealthResponse {
  subgraphs: {
    syncedBlock: string
    headBlock: string
    synced: boolean
  }
}

/**
 * Fetch top addresses by volume
 */
export function useFetchedSubgraphStatus(): {
  available: boolean | null
  syncedBlock: number | undefined
  headBlock: number | undefined
} {
  const [activeNetwork] = useActiveNetworkVersion()
  const { dataClient } = useClients()

  const { loading, error, data } = useQuery<HealthResponse>(SUBGRAPH_HEALTH, {
    client: dataClient,
    fetchPolicy: 'network-only',
    variables: {
      id: '1',
    },
  })

  const parsed = data?.subgraphs[0]

  if (loading) {
    return {
      available: null,
      syncedBlock: undefined,
      headBlock: undefined,
    }
  }

  if ((!loading && !parsed) || error) {
    return {
      available: false,
      syncedBlock: undefined,
      headBlock: undefined,
    }
  }

  const syncedBlock = parsed?.syncedBlock
  const headBlock = parsed?.headBlock

  return {
    available: true,
    syncedBlock: syncedBlock ? parseFloat(syncedBlock) : undefined,
    headBlock: headBlock ? parseFloat(headBlock) : undefined,
  }
}
