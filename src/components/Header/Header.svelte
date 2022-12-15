<script context="module">
  import mediaMatcher from '../../utils/stores/mediaMatcher';
  import { Router, Link, Route } from "svelte-routing";
  import LogoDark from '../../assets/svg/logo_white.png'
  import Switch from '../Switch/Switch.svelte';
  import FaDiscord from 'svelte-icons/fa/FaDiscord.svelte';
  import FaTwitterSquare from 'svelte-icons/fa/FaTwitterSquare.svelte';
  import FaGithubSquare from 'svelte-icons/fa/FaGithubSquare.svelte';
  import FaBook from 'svelte-icons/fa/FaBook.svelte';
  import IoMdDisc from 'svelte-icons/io/IoMdDisc.svelte';
  import IoMdTrendingUp from 'svelte-icons/io/IoMdTrendingUp.svelte';
  import IoIosPulse from 'svelte-icons/io/IoIosPulse.svelte'

  const label = { inputProps: { 'aria-label': 'Mainnet/Testnet' } }
  const prefersReducedMotion = mediaMatcher('(prefers-reduced-motion: reduce)');
  const prefersDarkColorScheme = mediaMatcher('(prefers-color-scheme: dark)');
  const isMobile = mediaMatcher('(max-width: 1024px)');
</script>

  <header>
    <div class="HeaderFrame">
    <Router>
      <Link to={'/'}>
        <div class="UniIcon">
          {#if !$isMobile}
            <img width={'220px'} src={LogoDark} alt="logo" />
          {/if}
        </div>
      </Link>
    </Router>
      <div title="Comming soon" class="Network">
        <Switch />
        <div class="NetworkLabel">Testnet</div>
      </div>
      <div class="HeaderRow">
        <div class="HeaderLinks">
        <Router>
          <Link id={`pool-nav-link`} to={'/'}>
            <div class="StyledNavLink">
              <div class="Icon"><IoMdTrendingUp /></div>           
              Overview
            </div>
          </Link>
          <Link id={`pool-nav-link`} to={'/Pool'}>
            <div class="StyledNavLink">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 Icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
                Pools
              </div>
          </Link>
          <Link id={`pool-nav-link`} to={'/Token'}>
            <div class="StyledNavLink">
              <div class="Icon"><IoMdDisc /></div>
              Tokens
            </div>
          </Link>
        </Router>
          <div class="Disabled" title="Comming soon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 Icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>            
            Users
          </div>
          <div class="Disabled" title="Comming soon">
            <div class="Icon"><IoIosPulse /></div>
            Activity
          </div>
        </div>
      </div>
      <div class="HeaderSubLinks">
        <div class="HeaderText">
          <a class="Link" href="https://github.com/sithswap" target="_blank" rel="noreferrer">
            <FaBook />
          </a>
        </div>
        <div class="HeaderText">
          <a class="Link" href="https://github.com/sithswap" target="_blank" rel="noreferrer">
            <FaTwitterSquare />
          </a>
        </div>
        <div class="HeaderText">
          <a class="Link" href="https://github.com/sithswap" target="_blank" rel="noreferrer">
            <FaDiscord />
          </a>
        </div>
        <div class="HeaderText">
          <a class="Link" href="https://github.com/sithswap" target="_blank" rel="noreferrer">
            <FaGithubSquare />
          </a>
        </div>
      </div>
    </div>
  </header>

<style>
  .HeaderFrame {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: -webkit-fill-available;
    background: repeating-linear-gradient(transparent, transparent 3px, #1b0d27 4px, #4b3771 4px), linear-gradient(#0f0017 30%, #4b3771 100%);
  }
  
  @media (max-width: 1024px) {
    .HeaderFrame {
      width: 325px;
      grid-template-columns: 1fr;
      padding: 0.5rem 1rem;
      transition: width 2s;
      position: relative;
    }
  }
  
  @media (max-width: 500px) {
    .HeaderFrame {
      width: 100%;
    }
  }
  
  /* .HeaderControls {
    display: flex;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
    padding: 1em;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 1024px) {
    .HeaderControls {
      position: absolute;
    }
  } */
  
  .HeaderRow {
    position: relative;
    padding: 0.5em;
  }
  
  @media (max-width: 1024px) {
    .HeaderRow {
      width: 100%;
      margin-top: 20px;
    }
  }
  
  /* HeaderLinks */
  .HeaderLinks {
    font-weight: 600;
    margin: 0 auto !important;
    text-align: left !important;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 1024px) {
    .HeaderLinks {
      padding: 0.5rem;
      justify-content: flex-end;
    }
  }
  
  /* Link */
  .Link {
    cursor: pointer;
    text-decoration: none;
  }
  
  /* HeaderSubLinks */
  .HeaderSubLinks {
    position: absolute;
    bottom: 75px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  
  /* HeaderText */
  .HeaderText {
    height: 30px;
    margin-right: 20px;
    font-size: 0.825rem;
    font-weight: 500;
    opacity: 0.8;
  }
  .HeaderText:hover {
    opacity: 1;
  }
  .HeaderText a {
    color: #fff /* theme.white */;
  }
  
  /* .ButtonDex {
    height: 60px;
    width: 120px;
    align-items: center;
    background: repeating-linear-gradient(transparent, transparent 3px, #1b0d27 4px, #4b3771 4px),
      linear-gradient(#0f0017 30%, #4b3771 100%);
    border: transparent;
    color: #fff9;
    background-color: #000 black theme;
    font-size: 17px;
    font-weight: bold;
    transition: width 0.3s ease;
    cursor: pointer;
  }
  .ButtonDex:hover,
  .ButtonDex:focus {
    width: 140px;
  }
  
  @media (max-width: 1200px) {
    .ButtonDex {
      height: 55px;
    }
  }
  
  @media (max-width: 720px) {
    .ButtonDex {
      display: none;
    }
  }
  
  .SwapLogo {
    margin-top: 4px;
  }
  
  */

  /*

  @media (max-width: ${({ theme }) => theme.mediaWidth.upToSmall}) {
    .Title {
      justify-self: center;
    }
  }
  
  @media (max-width: 1024px) {
    .Title {
      margin-bottom: 10px;
    }
  } */
  
  .UniIcon {
    margin-left: 1em;
    margin-top: 2.5rem;
    margin-right: 15px;
    pointer-events: auto;
  }

  .UniIcon:hover {
    cursor: pointer;
  }
  
  .StyledNavLink {
    display: flex;
    /* ${({ theme }) => theme.flexRowNoWrap} */
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.3rem;
    padding: 5px 20px;
    min-width: 100%;
    align-items: center;
  }
  
  .StyledNavLink.ACTIVE {
    color: #fff;
    text-shadow: 0 0 5px #977fff, 0 0 10px #977fff, 0 0 20px #977fff, 0 0 40px #0ff;
  }
  
  @media (max-width: 1024px) {
    .StyledNavLink {
      font-size: 1.3rem;
    }
  }
  
  .StyledNavLink:hover,
  .StyledNavLink:focus {
    text-decoration: none;
    color: #fff;
    text-shadow: 0 0 5px #977fff, 0 0 10px #977fff, 0 0 20px #977fff, 0 0 40px #0ff;
  }
  
  .Disabled {
    display: flex;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.35rem;
    padding: 8px 20px;
    min-width: 100%;
    opacity: 60%;
    pointer-events: none;
    align-items: center;
  }
  
  @media (max-width: 1024px) {
    .Disabled {
      font-size: 1.3rem;
    }
  }
  
  /* .StyledMenuButton {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    height: 35px;
    margin-left: 8px;
    padding: 0.15rem 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--bg3);
  }
  
  .StyledMenuButton:hover,
  .StyledMenuButton:focus {
    cursor: pointer;
    outline: none;
    background-color: var(--bg4);
  }
  
  .StyledMenuButton svg {
    margin-top: 2px;
  }
  
  .StyledMenuButton > * {
    stroke: var(--text1);
  } */
  
  
  .NetworkLabel {
    margin-left: 20px;
    margin-top: 5px;
    font-weight: 600;
    color: #fff;
  }
  @media (max-width: 1024px) {
    .NetworkLabel {
      left: 0px;
    }
  }

  .Network {
    position: relative;
    display: flex;
    flex-direction: row;
    left: 20px;
    margin-bottom: 2rem;
  }
  
  /* .SmallContentGrouping {
    width: 100%;
    display: none;
  }
  @media (max-width: 1024px) {
    .SmallContentGrouping {
      display: initial;
    }
  } */

  .Icon {
    width: 30px;
    margin-right: 10px;
  }


  </style>