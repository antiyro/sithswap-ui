<script>
  import React, { Suspense, useState, useEffect } from 'react'
  import { Route, Switch, useLocation } from 'react-router-dom'
  import { useMediaQuery } from 'react-responsive'
  import styled from 'styled-components'
  import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
  import { HeaderControls, ButtonDex, SwapLogo, UniIcon, Header } from '../components/Header'
  import URLWarning from '../components/Header/URLWarning'
  import Popups from '../components/Popups'
  import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
  import Home from './Home'
  import PoolsOverview from './Pool/PoolsOverview'
  import TokensOverview from './Token/TokensOverview'
  import TopBar from 'components/Header/TopBar'
  import { RedirectInvalidToken } from './Token/redirects'
  import { LocalLoader } from 'components/Loader'
  import PoolPage from './Pool/PoolPage'
  import CommingSoon from './Utils/CommingSoon'
  import { CloseIcon, ExternalLink, TYPE } from 'theme'
  import { useActiveNetworkVersion, useSubgraphStatus } from 'state/application/hooks'
  import { DarkGreyCard } from 'components/Card'
  import { SUPPORTED_NETWORK_VERSIONS, EthereumNetworkInfo, OptimismNetworkInfo } from 'constants/networks'
  import SearchSmall from 'components/Search'
  import { ExternalLink as StyledExternalLink } from 'theme'
  import LogoSwap from '../assets/svg/swap_white.png'
  import LogoDark from '../assets/svg/logo_white.png'
  import 'components/Search/style.css'
  import Hamburger from 'hamburger-react'

  const BLOCK_DIFFERENCE_THRESHOLD = 30
</script>

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 1024 })
  const isTinyMobile = useMediaQuery({ maxWidth: 500 })
  const [visible, setVisible] = useState(false)
  const [isOpen, setOpen] = useState(false)

  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])

  // update network based on route
  // TEMP - find better way to do this
  const location = useLocation()
  const [activeNetwork, setActiveNetwork] = useActiveNetworkVersion()
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveNetwork(EthereumNetworkInfo)
    } else {
      SUPPORTED_NETWORK_VERSIONS.map((n) => {
        if (location.pathname.includes(n.route.toLocaleLowerCase())) {
          setActiveNetwork(n)
        }
      })
    }
  }, [location.pathname, setActiveNetwork])

  // subgraph health
  const [subgraphStatus] = useSubgraphStatus()

  const showNotSyncedWarning =
    subgraphStatus.headBlock && subgraphStatus.syncedBlock && activeNetwork === OptimismNetworkInfo
      ? subgraphStatus.headBlock - subgraphStatus.syncedBlock > BLOCK_DIFFERENCE_THRESHOLD
      : false

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      {loading ? (
        <LocalLoader fill={true} />
      ) : (
        <AppWrapper>
          {/* <URLWarning /> */}
          {(!isMobile || visible) && (
            <HeaderWrapper>
              {showNotSyncedWarning && (
                <WarningWrapper>
                  <WarningBanner>
                    {`Warning: 
                    Data has only synced to block ${subgraphStatus.syncedBlock} (out of ${subgraphStatus.headBlock}). Please check back soon.`}
                  </WarningBanner>
                </WarningWrapper>
              )}
              <Hide1080>
                <TopBar />
              </Hide1080>
              <Header setVisible={setVisible} setOpen={setOpen} />
            </HeaderWrapper>
          )}
          {isMobile && (
            <MobileHeaderWrapper>
              <MobileLogo src={LogoDark} alt="logo" />
              {/* <div style={{ marginTop: '50px', zIndex: '9999' }} onClick={() => setVisible(visible)}>
                <CloseButton />
              </div> */}
            </MobileHeaderWrapper>
          )}
          <HeaderControls>
            <SearchSmall />
            <StyledExternalLink href={`https://app.sithswap.com/`}>
              <ButtonDex className="cards" data-augmented-ui="border bl-clip br-clip tl-clip tr-clip">
                <SwapLogo width={'80px'} src={LogoSwap} alt="logo" />
              </ButtonDex>
            </StyledExternalLink>
            {isMobile && (
              <NavIcon onClick={() => setVisible(!visible)}>
                <Hamburger size={isTinyMobile ? 25 : 30} toggled={isOpen} toggle={setOpen} />
              </NavIcon>
            )}
          </HeaderControls>
          {subgraphStatus.available === false ? (
            <BodyWrapper>
              {!isMobile && <Margin />}
              <DarkGreyCard style={{ maxWidth: '340px' }}>
                <TYPE.label>
                  We are temporarily experiencing unexpected issues. Please check the current status{' '}
                  <ExternalLink href="http://api.sithswap.com:3000">here.</ExternalLink>
                </TYPE.label>
              </DarkGreyCard>
            </BodyWrapper>
          ) : (
            <BodyWrapper warningActive={showNotSyncedWarning}>
              {!isMobile && <Margin />}
              <Popups />
              <Switch>
                <Route exact strict path="/:networkID?/pools/:address" component={PoolPage} />
                <Route exact strict path="/:networkID?/pools" component={PoolsOverview} />
                <Route exact strict path="/:networkID?/tokens/:address" component={RedirectInvalidToken} />
                <Route exact strict path="/:networkID?/tokens" component={TokensOverview} />
                <Route exact strict path="/:networkID?activity" component={CommingSoon} />
                <Route exact path="/:networkID?" component={Home} />
              </Switch>
              <Marginer />
            </BodyWrapper>
          )}
        </AppWrapper>
      )}
    </Suspense>
  )
}

<style>
  const AppWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    justify-content: center;
    overflow-x: hidden;
    min-height: 100vh;
  `

  const MobileHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 10px 20px;
    align-items: center;
    width: 100%;
  `
  const HeaderWrapper = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap}
    position: fixed;
    justify-content: space-between;
    z-index: 2;
    width: 375px;
    top: 0;
    left: 0;
    @media (max-width: 1024px) {
      width: 100%;
    }
  `

  const BodyWrapper = styled.div<{ warningActive?: boolean }>`
    display: flex;
    flex-direction: row;
    padding-top: 40px;
    margin-top: ${({ warningActive }) => (warningActive ? '140px' : '120px')};
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    margin-bottom: 100px;
    width: 85%;
    justify-content: center;

    @media (max-width: 1200px) {
      width: 95%
    }

    @media (max-width: 1024px) {
      width: 95%
      margin-top: 50px;
      margin-left: 10%;
      margin-right: 10%;
      > * {
        max-width: 100%;
      }
    }
  `

  const Marginer = styled.div`
    margin-top: 5rem;
  `

  const Hide1080 = styled.div`
    @media (max-width: 1024px) {
      display: none;
    }
  `

  const WarningWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `

  const WarningBanner = styled.div`
    background-color: ${({ theme }) => theme.bg3};
    padding: 1rem;
    color: white;
    font-size: 14px;
    width: 100%;
    text-align: center;
    font-weight: 500;
  `

  const MobileLogo = styled.img`
    margin-top: 50px;
    width: 250px;
    z-index: 10000000;

    @media (max-width: 500px) {
      width: 225px;
    }
  `

  const NavIcon = styled.div`
    z-index: 9999;
    font-weight: 6;
    top: 0;
    right: 0;

    @media (max-width: 720px) {
      margin-top: 7px;
    }
  `

  const Margin = styled.div`
    height: 100vh;
    width: 325px;
    @media (max-width: 1024px) {
      width: 325px;
      grid-template-columns: 1fr;
      padding: 0.5rem 1rem;
      transition: width 2s;
      position: relative;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0.5rem 1rem;
    `}
  `
</style>