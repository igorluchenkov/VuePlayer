<template>
  <div class="Playlist">

		<div class="Playlist-title">Paste a video link below</div>
		<router-link :to="'playlist'">
			<input 
				class="Playlist-input" 
				v-model="inputValue" 
				placeholder="Right here..." 
				type="text" 
				@keyup.enter.prevent="addItem">
		</router-link>

		<ul>
			<li v-for="(item, key) in userPlaylist" :key="key">
				<div 
					:class="'Playlist-item__value ' + ( (key === currentItem) ? 'Playlist-item__value-active' : '')" 
					@click="changeVideo(key)">
					{{ item.name === '' ? item.url : item.name }}
				</div>
				<div 
					class="Playlist-item__cross" 
					@click="removeItem(key)">
					<svg enable-background="new 0 0 24 24" height="15px" version="1.1" viewBox="0 0 24 24" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>
				</div>
			</li>
		</ul>


  </div>
</template>

<script src='./Playlist.js'></script>
<style src='./Playlist.styl' lang="stylus"></style>