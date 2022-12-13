<script>
	import React, { useState } from 'react'
	import { NavLink } from 'react-router-dom'
	import { darken } from 'polished'
	import styled from 'styled-components'
	import LogoDark from '../../assets/svg/logo_white.png'
	import Menu from '../Menu'
	import Row, { RowFixed, RowBetween, AutoRow } from '../Row'
	import { useActiveNetworkVersion } from 'state/application/hooks'
	import { networkPrefix } from 'utils/networkPrefix'
	import { AutoColumn } from 'components/Column'
	import { TrendingUp, PieChart, Disc, Activity, User, GitHub, Twitter, Book } from 'react-feather'
	import './style.css'
	import { ButtonPrimary } from 'components/Button'
	import { CloseIcon } from 'theme'
	import { isMobile } from 'react-device-detect'
	import { useMediaQuery } from 'react-responsive'
	import { RxDiscordLogo } from 'react-icons/rx'


const HeaderFrame = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  min-height: 100vh
  height: -webkit-fill-available;
  background: repeating-linear-gradient(transparent, transparent 3px, #1b0d27 4px, #4b3771 4px),
    linear-gradient(#0f0017 30%, #4b3771 100%);
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

export const HeaderControls = styled.div`
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  padding: 1em;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    position: absolute;
  }
`

const HeaderRow = styled(RowFixed)`
  position: relative;
  padding: 0.5em;
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 20px;
  }
`

const HeaderLinks = styled(Row)`
  font-weight: 600;
  margin: 0 auto !important;
  text-align: left !important;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    padding: 0.5rem;
    justify-content: flex-end;
  }
`
const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
`

const HeaderSubLinks = styled.div`
  position: absolute;
  bottom: 75px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  justify-content: center;
  display: flex;
  flex-direction: row;
`

const HeaderText = styled.div`
  height: 25px;
  margin-right: 20px;
  font-size: 0.825rem;
  font-weight: 500;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.white};
  }
`

export const ButtonDex = styled.button`
  height: 60px;
  width: 120px;
  align-item: center;
  background: repeating-linear-gradient(transparent, transparent 3px, #1b0d27 4px, #4b3771 4px),
    linear-gradient(#0f0017 30%, #4b3771 100%);
  border: transparent;
  color: #fff9;
  background-color: ${({ theme }) => theme.black};
  font-size: 17px;
  font-weight: bold;
  transition: width 0.3s ease;
  :hover,
  :focus {
    width: 140px;
  }
  cursor: pointer;

  @media (max-width: 1200px) {
    height: 55px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`

export const SwapLogo = styled.img`
  margin-top: 4px;
`

const Title = styled(NavLink)`
  margin-top: 1.5rem;
  margin-right: 15px;
  pointer-events: auto;
  :hover {
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  @media (max-width: 1024px) {
    margin-bottom: 10px;
  }
`

export const UniIcon = styled.div`
  margin-top: 1em;
  margin-left: 1em;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  display: flex;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.3rem;
  padding: 8px 20px;
  min-width: 100%;
  &.${activeClassName} {
    color: #fff;
    text-shadow: 0 0 5px #977fff, 0 0 10px #977fff, 0 0 20px #977fff, 0 0 40px #0ff;
  }

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }

  transition: text-shadow 0.3s ease;
  :hover,
  :focus {
    color: #fff;
    text-shadow: 0 0 5px #977fff, 0 0 10px #977fff, 0 0 20px #977fff, 0 0 40px #0ff;
  }
`

const Disabled = styled.div`
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

  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    margin-bottom: 0.5rem;
    margin-top: 10px;
  }
`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 42px;
  height: 23px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin-left: 3px;
    margin-top: 2px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }

  @media (max-width: 1024px) {
    left: 1px;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  // &:checked + ${CheckBoxLabel} {
  //   background: #4fbe79;
  //   &::after {
  //     content: '';
  //     display: block;
  //     border-radius: 50%;
  //     width: 18px;
  //     height: 18px;
  //     margin-left: 21px;
  //     transition: 0.2s;
  //   }
  // }
`

const NetworkLabel = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 600;
  @media (max-width: 1024px) {
    left: 0px;
  }
`
const SmallContentGrouping = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 1024px) {
    display: initial;
  }
`

const label = { inputProps: { 'aria-label': 'Mainnet/Testnet' } }

</script>

export function Header({ setVisible, setOpen }) {
  const [activeNewtork] = useActiveNetworkVersion()
  const [network, setNetwork] = useState('Testnet')
  const isMobile = useMediaQuery({ maxWidth: 1024 })
  return (
    <>
      <HeaderFrame>
        <Title
          to={networkPrefix(activeNewtork)}
          onClick={() => {
            setVisible(false)
            setOpen(false)
          }}
        >
          <UniIcon> {!isMobile && <img width={'220px'} src={LogoDark} alt="logo" />}</UniIcon>
        </Title>
        <div title="Comming soon" className="switch">
          <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
            <NetworkLabel>{network}</NetworkLabel>
          </CheckBoxWrapper>
        </div>
        <HeaderRow className="row">
          <HeaderLinks>
            <StyledNavLink
              id={`pool-nav-link`}
              to={networkPrefix(activeNewtork)}
              isActive={(match, { pathname }) => pathname === '/'}
              onClick={() => {
                setVisible(false)
                setOpen(false)
              }}
            >
              <TrendingUp size={27} style={{ marginRight: '.75rem' }} />
              Overview
            </StyledNavLink>
            <StyledNavLink
              id={`stake-nav-link`}
              to={networkPrefix(activeNewtork) + 'pools'}
              onClick={() => {
                setVisible(false)
                setOpen(false)
              }}
            >
              <PieChart size={27} style={{ marginRight: '.75rem' }} />
              Pools
            </StyledNavLink>
            <StyledNavLink
              id={`stake-nav-link`}
              to={networkPrefix(activeNewtork) + 'tokens'}
              onClick={() => {
                setVisible(false)
                setOpen(false)
              }}
            >
              <Disc size={27} style={{ marginRight: '.75rem' }} />
              Tokens
            </StyledNavLink>
            <Disabled title="Comming soon">
              <User size={27} style={{ marginRight: '.75rem' }} />
              Users
            </Disabled>
            <Disabled title="Comming soon">
              <Activity size={27} style={{ marginRight: '.75rem' }} />
              Activity
            </Disabled>
          </HeaderLinks>
        </HeaderRow>
        <HeaderSubLinks>
          <HeaderText>
            <Link href="https://github.com/sithswap" target="_blank">
              <GitHub size={30} />
            </Link>
          </HeaderText>
          <HeaderText>
            <Link href="https://docs.sithswap.com" target="_blank">
              <Book size={30} />
            </Link>
          </HeaderText>
          <HeaderText>
            <Link href="https://discord.gg/KksNjQUz" target="_blank">
              <RxDiscordLogo size={30} />
            </Link>
          </HeaderText>
          <HeaderText>
            <Link href="https://twitter.com/SithSwap" target="_blank">
              <Twitter size={30} />
            </Link>
          </HeaderText>
        </HeaderSubLinks>
      </HeaderFrame>
    </>
  )
}
