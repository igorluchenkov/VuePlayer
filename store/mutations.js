import Vue from 'vue';
import YTParser from '../add_functions/YTParser.js'

export const UPDATE_INPUT = (state, value) => {
	Vue.set(state, 'inputValue', value);
}

export const ADD_ITEM = (state, value) => {
	state.userPlaylist.push({ url:value, name: '' });
	Vue.set(state, 'inputValue', '');
}

export const REMOVE_ITEM = (state, key) => {
	if(state.userSettings.currentItem >= key && state.userSettings.currentItem !== 0){
		state.userSettings.currentItem--;
	}
	Vue.delete(state.userPlaylist, key);
}

export const CHANGE_VIDEO = (state, key) => {
	Vue.set(state.userSettings, 'currentItem', key);
	Vue.set(state, 'isPlaying', true);
}

export const PLAY_NEXT_VIDEO = (state) => {
	const newValue = (state.userSettings.currentItem === state.userPlaylist.length-1) ? 0 : state.userSettings.currentItem + 1;
	Vue.set(state.userSettings, 'currentItem', newValue);
	Vue.set(state, 'isPlaying', true);
}

export const GET_VIDEOS_INFO = (state) => {
	const namelessItems = state.userPlaylist.filter(el => el.name === '');
	namelessItems.map(el => {
		// Getting the id
		const id = YTParser(el.url);

		// Getting video name and duration
		fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyDlLL_DAscuOKLMq6XhLp8hKP6TTSTcjhA&part=snippet,contentDetails`)
		.then(r => r.json())
		.then(r => {
			el.name = r.items[0].snippet.title;

			// Get duration
			function YTDurationToSeconds(duration) {
				let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
			
				match = match.slice(1).map(x => (x != null) ? x.replace(/\D/, '') : '');
			
				const hours = (parseInt(match[0]) || 0);
				const minutes = (parseInt(match[1]) || 0);
				const seconds = (parseInt(match[2]) || 0);

				return `${hours !== 0 ? (minutes > 9 ? hours + ':' : hours + ':0') : ''}${minutes}:${seconds !== 0 ? (seconds > 9 ? seconds : '0' + seconds) : ''}`;
			}
			el.duration = YTDurationToSeconds(r.items[0].contentDetails.duration);
		});
	})
}

export const PLAYER_TOGGLE_PLAYING = (state) => {
	Vue.set(state, 'isPlaying', !state.isPlaying);
}

export const TOGGLE_LOOP = (state) => {
	Vue.set(state.userSettings, 'loop', !state.userSettings.loop);
}