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
			const currentIndex = store.state.userSettings.currentItem;
			const currentVideo = store.state.userPlaylist[currentIndex];
			return currentVideo.name === '' ? currentVideo.url : currentVideo.name;
		},
		currentDuration() {
			const currentIndex = store.state.userSettings.currentItem;
			const currentVideo = store.state.userPlaylist[currentIndex];
			return currentVideo.duration === '' ? '' : currentVideo.duration;
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
				current = current - 1 === -1 ? store.state.userPlaylist.length - 1 : current - 1;
			} else {
				current = current + 1 === store.state.userPlaylist.length ? 0 : current + 1;
			}
			store.commit('CHANGE_VIDEO', current)
		},
		toggleLoop(){
			store.commit('TOGGLE_LOOP');
		},
		toggleVolumePanel(e){
			if(e.target.classList.contains('ProgressBar-btn')){
				e.target.classList.toggle('ProgressBar-btn__volume-active');
			}
		},
		changeVolume(e){
			store.commit('CHANGE_VOLUME', e.target.value);
			player.setVolume(store.state.userSettings.volume);
		},
	},
	data(){
		return {
			currentVolume: Math.abs(100 - store.state.userSettings.volume)
		}
	}
}