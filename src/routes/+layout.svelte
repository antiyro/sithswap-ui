<script>
  import mediaMatcher from '../utils/stores/mediaMatcher';
  import Header from '../components/Header/Header.svelte';
  import Home from './Home/+page.svelte'
  import SearchSmall from '../components/Search/search.svelte'

  const BLOCK_DIFFERENCE_THRESHOLD = 30

  // const isMobile = useMediaQuery({ maxWidth: 1024 })
  // const isTinyMobile = useMediaQuery({ maxWidth: 500 })
  // const [visible, setVisible] = useState(false)
  // const [isOpen, setOpen] = useState(false)

  // // pretend load buffer
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1300)
  // }, [])

  // // update network based on route
  // // TEMP - find better way to do this
  // const location = useLocation()
  // const [activeNetwork, setActiveNetwork] = useActiveNetworkVersion()
  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setActiveNetwork(EthereumNetworkInfo)
  //   } else {
  //     SUPPORTED_NETWORK_VERSIONS.map((n) => {
  //       if (location.pathname.includes(n.route.toLocaleLowerCase())) {
  //         setActiveNetwork(n)
  //       }
  //     })
  //   }
  // }, [location.pathname, setActiveNetwork])

  // // subgraph health
  // const [subgraphStatus] = useSubgraphStatus()

  // const showNotSyncedWarning =
  //   subgraphStatus.headBlock && subgraphStatus.syncedBlock && activeNetwork === OptimismNetworkInfo
  //     ? subgraphStatus.headBlock - subgraphStatus.syncedBlock > BLOCK_DIFFERENCE_THRESHOLD
  //     : false

  const visible = true
  const showNotSyncedWarning = false

  const isMobile = mediaMatcher('(max-width: 1024px)');
</script>

  <!-- <Suspense fallback={null}>
    <Route component={GoogleAnalyticsReporter} />
    <Route component={DarkModeQueryParamReader} /> -->
    <!-- {loading ? (
      <LocalLoader fill={true} />
    ) : ( -->
    <div class="App">
      <div class="AppWrapper">
        {#if !$isMobile || visible}
          <div class="HeaderWrapper">
            {#if showNotSyncedWarning}
              <div class="WarningWrapper">
                <div class="WarningBanner">
                  <!-- {`Warning: 
                  Data has only synced to block ${subgraphStatus.syncedBlock} (out of ${subgraphStatus.headBlock}). Please check back soon.`} -->
                </div>
              </div>
            {/if}
            <div class="Hide1080">
              <!-- <TopBar /> -->
            </div>
            <Header />
          </div>
        {/if}
        {#if isMobile}
          <div class="MobileHeaderWrapper">
            <!-- <MobileLogo src={LogoDark} alt="logo" /> -->
            <!-- {<div style={{ marginTop: '50px', zIndex: '9999' }} onClick={() => setVisible(visible)}>
              <CloseButton />
            </div>} -->
          </div>
        {/if}
        <div class="HeaderControls">
          <SearchSmall />
          <!-- <StyledExternalLink href={`https://app.sithswap.com/`}>
            <ButtonDex className="cards" data-augmented-ui="border bl-clip br-clip tl-clip tr-clip">
              <SwapLogo width={'80px'} src={LogoSwap} alt="logo" />
            </ButtonDex>
          </StyledExternalLink> -->
          {#if isMobile}
            <div class="NavIcon">
              <!-- <Hamburger size={isTinyMobile ? 25 : 30} toggled={isOpen} toggle={setOpen} /> -->
            </div>
          {/if}
        </div>
        {#if !isMobile}
          <div class="BodyWrapper">
            {#if !isMobile}
            <div class="Margin"></div>
            {/if}
            <!-- // <DarkGreyCard style={{ maxWidth: '340px' }}>
            //   <TYPE.label>
            //     We are temporarily experiencing unexpected issues. Please check the current status{' '}
            //     <ExternalLink href="http://api.sithswap.com:3000">here.</ExternalLink>
            //   </TYPE.label>
            // </DarkGreyCard> -->
            error test
          </div>
        {:else}
          <div class="BodyWrapper">
            {#if !isMobile} <div class="Margin"></div>
            {/if}
            <Home />
            <div class="Marginer"></div>
          </div>
        {/if}
      </div>
    </div>
    <!-- )} -->
  <!-- </Suspense> -->

<style>
  .AppWrapper {
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
  }

  .MobileHeaderWrapper {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 10px 20px;
    align-items: center;
    width: 100%;
  }

  .HeaderWrapper {
    /* ${({ theme }) => theme.flexColumnNoWrap} */
    position: fixed;
    justify-content: space-between;
    z-index: 2;
    width: 375px;
    top: 0;
    left: 0;
  }

  @media (max-width: 1024px) {
    .HeaderWrapper {
      width: 100%;
    }
  }

  .BodyWrapper {
    display: flex;
    flex-direction: row;
    padding-top: 40px;
    margin-top: '120px';
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    margin-bottom: 100px;
    width: 85%;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    .BodyWrapper {
      width: 95%
    }
  }

  @media (max-width: 1024px) {
    .BodyWrapper {
      width: 95%;
      margin-top: 50px;
      margin-left: 10%;
      margin-right: 10%;
    }
  }

  .BodyWrapper > * {
    max-width: 100%;
  }

  .Marginer {
    margin-top: 5rem;
  }

  
  @media (max-width: 1024px) {
    .Hide1080 {
      display: none;
    }
  }

  .WarningWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .WarningBanner {
    background-color: '#40444F';
    padding: 1rem;
    color: white;
    font-size: 14px;
    width: 100%;
    text-align: center;
    font-weight: 500;
  }

  .MobileLogo {
    margin-top: 50px;
    width: 250px;
    z-index: 10000000;
  }

  @media (max-width: 500px) {
    .MobileLogo {
      width: 225px;
    }
  }
  

  .NavIcon {
    z-index: 9999;
    font-weight: 6;
    top: 0;
    right: 0;
  }

  @media (max-width: 720px) {
    .NavIcon {
      margin-top: 7px;
    }
  }

  .Margin {
    height: 100vh;
    width: 325px;
  }

  @media (max-width: 1024px) {
    .Margin {
      width: 325px;
      grid-template-columns: 1fr;
      padding: 0.5rem 1rem;
      transition: width 2s;
      position: relative;
    }
  }

  @media (max-width: 500px) {
    .Margin {
      width: 100%;
    }
  }

  .Margin.theme.mediaWidth.upToExtraSmall {
    padding: 0.5rem 1rem;
  }

</style>