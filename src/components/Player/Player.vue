<template>
  <div class="Player">
      <div id="player"></div>
      <router-link :to="arrowLink">
        <div class="Player-arrow">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
          <g>
            <g>
              <circle class="st0" fill="#fff" cx="32" cy="32" r="32"/>
            </g>
            <g>
              <path class="st3" fill="#ff5733" d="M24,16c0-2.2,1.8-4,4-4h8c2.2,0,4,1.8,4,4v24c0,2.2-1.8,4-4,4h-8c-2.2,0-4-1.8-4-4V16z"/>
            </g>
            <g>
              <path class="st3" fill="#ff5733" d="M47.8,28c2.7,0,3.5,1.9,1.7,4.1L35.3,50.3c-1.8,2.3-4.7,2.3-6.5,0L14.5,32.1c-1.8-2.3-1-4.1,1.7-4.1H47.8z"/>
            </g>
          </g>
          <g>
          </g>
          </svg>
        </div>
      </router-link>
  </div>
</template>

<script src='./Player.js'></script>
<style src='./Player.styl' lang="stylus"></style>