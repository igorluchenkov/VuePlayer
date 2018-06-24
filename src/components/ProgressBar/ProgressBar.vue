<template>
  <div class="ProgressBar">

		<div @click="changeVideo('prev')" class="ProgressBar-btn ProgressBar-prev">
			<img src="@/assets/ProgressBar/next.svg">
		</div>

		<div class="ProgressBar-btn" @click="togglePlaying">
			<img v-if="!isPaused" src="@/assets/ProgressBar/play.svg">
			<img v-else src="@/assets/ProgressBar/pause.svg">
		</div>

		<div @click="changeVideo('next')" class="ProgressBar-btn ProgressBar-next">
			<img src="@/assets/ProgressBar/next.svg">
		</div>
		
		<div class="ProgressBar-info">

			<div class="ProgressBar-info__title">
				{{ currentTitle }}
			</div>
			
			<div class="ProgressBar-info__duration">
				{{ formattedCurrentTime }} / {{ formattedCurrentDuration }}
			</div>

			<input 
				@input="changeCurrentTime"
				:value="currentTime"
				type="range" 
				min="0" 
				:max="currentDuration" 
				class="ProgressBar-info__progress">
		</div>

		<div @click="toggleLoop" 
			:class="'ProgressBar-btn ' + ( isLoop ? 'ProgressBar-btn-looped' : '')">
			<img src="@/assets/ProgressBar/loop.svg">
		</div>

		<div 
			@click.stop="toggleVolumePanel($event)" 
			class="ProgressBar-btn">
			<img src="@/assets/ProgressBar/volume.svg">
			<div class="ProgressBar-btn__volume">
				<input 
					@input="changeVolume" 
					v-model="currentVolume" 
					type="range">
			</div>
		</div>

  </div>
</template>

<script src='./ProgressBar.js'></script>
<style src='./ProgressBar.styl' lang="stylus"></style>