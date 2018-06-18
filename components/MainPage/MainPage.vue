<template>
  <div id="app" :class="isPlaylist === '/playlist' ? 'isPlaylist':'isPlayer'">
    <Player />
    <div class="MainPage-transformer">
      <Playlist />
    </div>
    <ProgressBar />
  </div>
</template>

<script src='./MainPage.js'></script>
<style src='./MainPage.styl' lang="stylus"></style>