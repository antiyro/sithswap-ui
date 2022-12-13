<script>
  import React, { useRef } from 'react'
  import { BookOpen, Code, Info, MessageCircle } from 'react-feather'
  import styled from 'styled-components'
  import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
  import { useOnClickOutside } from '../../hooks/useOnClickOutside'
  import { ApplicationModal } from '../../state/application/actions'
  import { useModalOpen, useToggleModal } from '../../state/application/hooks'

  import { ExternalLink } from '../../theme'
  import { onMount } from 'svelte';
  let node;

  onMount(() => {
    node = document.querySelector('#my-node');
  });

  let open = function openModal(name) {
    return 0
  }

  let toggle = function toggleModal(name) {
    // implement logic to toggle modal with given name
  }

  const CODE_LINK = 'https://github.com/Uniswap/uniswap-v3-info'
</script>

<div class="cards" data-augmented-ui="border bl-clip br-clip tl-clip tr-clip">
  <button on:click={toggle}>
    <span class="menu-icon" />
  </button>

  {#if open}
    <span class="menu-flyout">
      <a class="menu-item" href="https://uniswap.org/">
        <Info size={14} />
        About
      </a>
      <a class="menu-item" href="https://docs.uniswap.org/">
        <BookOpen size={14} />
        Docs
      </a>
      <a class="menu-item" href={CODE_LINK}>
        <Code size={14} />
        Github
      </a>
      <a class="menu-item" href="https://discord.gg/FCfyBSbCU5">
        <MessageCircle size={14} />
        Discord
      </a>
    </span>
  {/if}
</div>

<style>
  .StyledMenuIcon path {
    stroke: ${({ theme }) => theme.text1};
  }

  .StyledMenuButton {
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    height: 50px;
    width: 50px;
    padding: 0.15rem 0.5rem;
    border-radius: 0.5rem;
  }

  .StyledMenuButton:hover,
  .StyledMenuButton:focus {
    cursor: pointer;
    outline: none;
  }

  .StyledMenuButton svg {
    margin-top: 2px;
  }

  .StyledMenu {
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: none;
    text-align: left;
  }

  .MenuFlyout {
    min-width: 8.125rem;
    background-color: white;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
      0px 24px 32px rgba(0, 0, 0, 0.01);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    position: absolute;
    top: 2.6rem;
    right: 0rem;
    z-index: 9999;
  }

  .menu-item {
    flex: 1;
    padding: 0.5rem 0.5rem;
    color: var(--text2);
  }

  .menu-item:hover {
    color: var(--text1);
    cursor: pointer;
    text-decoration: none;
    opacity: 0.6;
  }

  .menu-item > svg {
    margin-right: 8px;
  }
</style>