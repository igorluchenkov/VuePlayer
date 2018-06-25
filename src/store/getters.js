import store from '@/store';

export const getters = {
	currentVideo(){
		const currentIndex = store.state.userSettings.currentItem;
		return store.state.userPlaylist[currentIndex];
	}
}