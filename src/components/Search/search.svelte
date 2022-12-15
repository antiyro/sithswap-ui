   
  <div class="Container">
    <div class="Wrapper" data-augmented-ui="border bl-clip br-clip tl-clip tr-clip">
      <input class="StyledInput"
        type="text"
        value={'test'}
      />
      <!-- {#if !focused}
        <TYPE.gray pl="2px">
          <SearchIcon />
        </TYPE.gray>
      {/if} -->
      </div>
    <!-- <Menu hide={!showMenu} ref={menuRef}>
      <AutoColumn gap="lg">
        <AutoColumn gap="sm">
          <RowFixed>
            <OptionButton enabled={!showWatchlist} onClick={() => setShowWatchlist(false)}>
              Search
            </OptionButton>
            <OptionButton enabled={showWatchlist} onClick={() => setShowWatchlist(true)}>
              Watchlist
            </OptionButton>
          </RowFixed>
        </AutoColumn>
        <ResponsiveGrid>
          <TYPE.main>Tokens</TYPE.main>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              Volume 24H
            </TYPE.main>
          </HideSmall>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              TVL
            </TYPE.main>
          </HideSmall>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              Price
            </TYPE.main>
          </HideSmall>
        </ResponsiveGrid>
        {tokensForList
          .filter((t) => !TOKEN_HIDE.includes(t.address))
          .slice(0, tokensShown)
          .map((t, i) => {
            return (
              <HoverRowLink onClick={() => handleNav(networkPrefix(activeNetwork) + 'tokens/' + t.address)} key={i}>
                <ResponsiveGrid>
                  <RowFixed>
                    <CurrencyLogo address={t.address} />
                    <TYPE.label ml="10px">
                      <HoverInlineText text={`${t.name} (${t.symbol})`} />{' '}
                    </TYPE.label>
                    <SavedIcon
                      id="watchlist-icon"
                      size={'16px'}
                      style={{ marginLeft: '8px' }}
                      fill={savedTokens.includes(t.address)}
                      onClick={(e) => {
                        e.stopPropagation()
                        addSavedToken(t.address)
                      }}
                    />
                  </RowFixed>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(t.volumeUSD)}</TYPE.label>
                  </HideSmall>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(t.tvlUSD)}</TYPE.label>
                  </HideSmall>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(t.priceUSD)}</TYPE.label>
                  </HideSmall>
                </ResponsiveGrid>
              </HoverRowLink>
            )
          })}
        {tokensForList.length === 0 ? (
          <TYPE.main>{showWatchlist ? 'Saved tokens will appear here' : 'No results'}</TYPE.main>
        ) : null}
        <HoverText
          onClick={() => {
            setTokensShown(tokensShown + 5)
          }}
          hide={!(tokensForList.length > 3 && tokensForList.length >= tokensShown)}
          ref={textRef}
        >
          See more...
        </HoverText>
        <Break />
        <ResponsiveGrid>
          <TYPE.main>Pools</TYPE.main>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              Volume 24H
            </TYPE.main>
          </HideSmall>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              TVL
            </TYPE.main>
          </HideSmall>
          <HideSmall>
            <TYPE.main textAlign="end" fontSize="12px">
              Price
            </TYPE.main>
          </HideSmall>
        </ResponsiveGrid>
        {poolForList
          .filter((p) => !POOL_HIDE.includes(p.address))
          .slice(0, poolsShown)
          .map((p, i) => {
            return (
              <HoverRowLink onClick={() => handleNav(networkPrefix(activeNetwork) + 'pools/' + p.address)} key={i}>
                <ResponsiveGrid key={i}>
                  <RowFixed>
                    <DoubleCurrencyLogo address0={p.token0.address} address1={p.token1.address} />
                    <TYPE.label ml="10px" style={{ whiteSpace: 'nowrap' }}>
                      <HoverInlineText maxCharacters={12} text={`${p.token0.symbol} / ${p.token1.symbol}`} />
                    </TYPE.label>
                    <GreyBadge ml="10px">{feeTierPercent(p.feeTier)}</GreyBadge>
                    <SavedIcon
                      id="watchlist-icon"
                      size={'16px'}
                      style={{ marginLeft: '10px' }}
                      fill={savedPools.includes(p.address)}
                      onClick={(e) => {
                        e.stopPropagation()
                        addSavedPool(p.address)
                      }}
                    />
                  </RowFixed>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(p.volumeUSD)}</TYPE.label>
                  </HideSmall>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(p.tvlUSD)}</TYPE.label>
                  </HideSmall>
                  <HideSmall>
                    <TYPE.label textAlign="end">{formatDollarAmount(p.token0Price)}</TYPE.label>
                  </HideSmall>
                </ResponsiveGrid>
              </HoverRowLink>
            )
          })}
        {poolForList.length === 0 ? (
          <TYPE.main>{showWatchlist ? 'Saved pools will appear here' : 'No results'}</TYPE.main>
        ) : null}
        <HoverText
          onClick={() => {
            setPoolsShown(poolsShown + 5)
          }}
          hide={!(poolForList.length > 3 && poolForList.length >= poolsShown)}
          ref={textRef}
        >
          See more...
        </HoverText>
      </AutoColumn>
    </Menu> -->
  </div>


  <style>
    .Container {
      width: 100%;
      margin-right: 10px;
      z-index: 9999;
    }
    
    @media (max-width: 720px) {
      .Container {
        display: none;
      }
    }
    
    .Wrapper {
      background-color:#000;
      padding: 10px 16px;
      width: 300px;
      height: 60px;
      border-radius: 15px;
      position: relative;
      z-index: 9999;
      background-image: linear-gradient(rgba(255, 0, 0, 0) 0%, rgba(26, 11, 38, 1) 50%, rgba(75, 55, 113, 1) 100%);
      --aug-border-all: 2px;
      --aug-border-bg: linear-gradient(rgba(255, 0, 0, 0) 0%, rgba(140,112,211,1) 75%, rgba(186,178,207,1) 100%);
    }
    
    @media (max-width: 1200px) {
      .Wrapper {
        width: 120px;
        height: 55px;
        transition: width 0.3s ease;
      }
    
      .Wrapper:hover,
      .Wrapper:focus {
        width: 350px;
      }
    }
    
    .StyledInput {
      position: relative;
      display: flex;
      align-items: center;
      white-space: nowrap;
      background: none;
      border: none;
      width: 100%;
      font-size: 16px;
      outline: none;
      color: #fff;
    }
    
    .StyledInput::placeholder {
      color: #fff;
      font-size: 16px;
    }
    
    @media screen and (max-width: 640px) {
      .StyledInput::placeholder {
        font-size: 1rem;
      }
    }
    
    .Menu {
      display: flex;
      flex-direction: column;
      z-index: 9999;
      width: 800px;
      top: 80px;
      max-height: 600px;
      overflow: auto;
      right: 0;
      margin-right: 25px;
      padding: 1.5rem;
      padding-bottom: 1.5rem;
      position: absolute;
      background: #000;
      border-radius: 8px;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
        0px 24px 32px rgba(0, 0, 0, 0.04);
      display: 'none';
      border: 1px solid pink;
    }
    
    /* ${({ theme }) => theme.mediaWidth.upToMedium`
      .Menu {
        position: absolute;
        margin-top: 4px;
        z-index: 9999;
        width: 100%;
        max-height: 400px;
      }
    `}; */
    
    .Blackout {
      min-height: 100vh;
      width: 100vw;
      z-index: -40;
      background-color: black;
      opacity: 0.3;
    }
    
    .ResponsiveGrid {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1.5fr repeat(3, 1fr);
    align-items: center;
    }
    
    .ResponsiveGrid.theme.mediaWidth.upToSmall {
    grid-template-columns: 1fr;
    }
    
    /* .Break {
    height: 1px;
    background-color: theme.bg1;
    width: 100%;
    } */
    
    .HoverText {
    /* color: theme.blue1; */
    /* display: hide ? 'none' : ''; */
    }
    
    .HoverText:hover {
    cursor: pointer;
    opacity: 0.6;
    }
    
    .HoverRowLink:hover {
    cursor: pointer;
    opacity: 0.6;
    }
    
    .OptionButton {
    width: fit-content;
    padding: 4px 8px;
    border-radius: 8px;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
    justify-content: center;
    align-items: center;
    /* color: enabled ? theme.pink1 : theme.white; */
    }
    
    .OptionButton.enabled {
    background-image: 'linear-gradient(rgba(255, 0, 0, 0) 0%, rgba(140, 112, 211, 1) 85%, rgba(186, 178, 207, 1) 100%)';
    }
    
    .OptionButton:hover {
    opacity: 0.6;
    cursor: pointer;
    }
    
    </style>