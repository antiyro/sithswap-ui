import React, { useMemo } from 'react'
import styled from 'styled-components'
import { isAddress } from 'utils'
import Logo from '../Logo'
import { useCombinedActiveList } from 'state/lists/hooks'
import useHttpLocations from 'hooks/useHttpLocations'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { OptimismNetworkInfo } from 'constants/networks'
import EthereumLogo from '../../assets/images/ethereum-logo.png'

export const getTokenLogoURL = (address: string) => {
  if (address == '0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9')
    address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  else if (address == '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7')
    address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  else if (address == '0x5a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426')
    address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  else if (address == '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56')
    address = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text4};
`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

export default function CurrencyLogo({
  address,
  size = '24px',
  style,
  ...rest
}: {
  address?: string
  size?: string
  style?: React.CSSProperties
}) {
  // useOptimismList()
  const optimismList = useCombinedActiveList()?.[10]
  const arbitrumList = useCombinedActiveList()?.[42161]
  const polygon = useCombinedActiveList()?.[137]
  const celo = useCombinedActiveList()?.[42220]

  const [activeNetwork] = useActiveNetworkVersion()

  const checkSummed = isAddress(address)

  const optimismURI = useMemo(() => {
    if (checkSummed && optimismList?.[checkSummed]) {
      return optimismList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, optimismList])
  const uriLocationsOptimism = useHttpLocations(optimismURI)

  const arbitrumURI = useMemo(() => {
    if (checkSummed && arbitrumList?.[checkSummed]) {
      return arbitrumList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, arbitrumList])
  const uriLocationsArbitrum = useHttpLocations(arbitrumURI)

  const polygonURI = useMemo(() => {
    if (checkSummed && polygon?.[checkSummed]) {
      return polygon?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, polygon])
  const uriLocationsPolygon = useHttpLocations(polygonURI)

  const celoURI = useMemo(() => {
    if (checkSummed && celo?.[checkSummed]) {
      return celo?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, celo])
  const uriLocationsCelo = useHttpLocations(celoURI)

  //temp until token logo issue merged
  const tempSources: { [address: string]: string } = useMemo(() => {
    return {
      ['0x4dd28568d05f09b02220b09c2cb307bfd837cb95']:
        'https://assets.coingecko.com/coins/images/18143/thumb/wCPb0b88_400x400.png?1630667954',
    }
  }, [])

  const srcs: string[] = useMemo(() => {
    const checkSummed = address

    if (checkSummed && address) {
      const override = tempSources[address]
      return [
        getTokenLogoURL(checkSummed),
        ...uriLocationsOptimism,
        ...uriLocationsArbitrum,
        ...uriLocationsPolygon,
        ...uriLocationsCelo,
        override,
      ]
    }
    return []
  }, [address, tempSources, uriLocationsArbitrum, uriLocationsOptimism, uriLocationsPolygon, uriLocationsCelo])

  if (activeNetwork === OptimismNetworkInfo && address === '0x4200000000000000000000000000000000000006') {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={'token logo'} style={style} {...rest} />
}
