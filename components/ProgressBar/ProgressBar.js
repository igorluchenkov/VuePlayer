import store from '@/store'

export default {
	name: 'ProgressBar',
	computed: {
		isPaused(){
			return store.state.isPlaying;
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
		showVolume(){
			
		}
	}
}