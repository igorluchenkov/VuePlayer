import store from '@/store'

export default {
	name: 'ProgressBar',
	computed: {
		isPaused(){
			return store.state.isPlaying;
		},
		isLoop(){
			return store.state.userSettings.loop
		},
		currentTitle() {
			return store.getters.currentVideo.name === '' ? store.getters.currentVideo.url : store.getters.currentVideo.name;
		},
		currentDuration() {
			return store.getters.currentVideo.duration;
		},
		formattedCurrentDuration(){
			return parseInt(this.currentDuration, 10);
		},
		currentTime() {
			return parseInt(store.state.currentTime, 10);
		},
		formattedCurrentTime(){
			return parseInt(store.state.currentTime, 10);
		},
	},
	methods: {
		togglePlaying(){
			store.commit('PLAYER_TOGGLE_PLAYING');
			if(store.state.isPlaying === true){
				player.playVideo();
			} else{
				player.pauseVideo();
			}
		},
		changeVideo(direction){
			let current = store.state.userSettings.currentItem;
			if(direction === 'prev') {
				current = current === 0 ? store.state.userPlaylist.length - 1 : current - 1;
			} else {
				current = current + 1 === store.state.userPlaylist.length ? 0 : current + 1;
			}
			store.commit('CHANGE_VIDEO', current)
		},
		toggleLoop(){
			store.commit('TOGGLE_LOOP');
		},
		toggleVolumePanel(e){
			const cList = e.target.classList;

			if(cList.contains('ProgressBar-btn')){
				cList.toggle('ProgressBar-btn__volume-active');
				if(cList.contains('ProgressBar-btn__volume-active')){
					document.addEventListener('click', function closeVolumeOnClick(e){
						if(e.target.classList.contains('ProgressBar-btn__volume-active')){
							document.removeEventListener('click', closeVolumeOnClick);
						} else {
							cList.remove('ProgressBar-btn__volume-active');
							document.removeEventListener('click', closeVolumeOnClick);
						}
					})
				}
			}
		},
		changeVolume(e){
			store.commit('CHANGE_VOLUME', e.target.value);
			player.setVolume(store.state.userSettings.volume);
		},
		changeCurrentTime(e){
			store.commit('CHANGE_CURRENT_TIME', e.target.value)
			player.seekTo(store.state.currentTime);
		}
	},
	data(){
		return {
			currentVolume: Math.abs(100 - store.state.userSettings.volume),
			interval: setInterval(function(){
				store.commit('INC_CURRENT_TIME');
			}, 500)
		}
	}
}