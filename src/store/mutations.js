import Vue from 'vue';
import { YTParser, YTPlayVideo, YTDurationToSeconds } from '../add_functions/YTFunctions.js';
import { YTGetData } from '../api/youtube.js';

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
	state.currentTime = 0;
	YTPlayVideo();
}

export const PLAY_NEXT_VIDEO = (state) => {
	const newValue = (state.userSettings.currentItem === state.userPlaylist.length-1) ? 0 : state.userSettings.currentItem + 1;
	Vue.set(state.userSettings, 'currentItem', newValue);
	Vue.set(state, 'isPlaying', true);
	state.currentTime = 0;
	YTPlayVideo();
}

export const GET_VIDEOS_INFO = (state) => {
	const namelessItems = state.userPlaylist.filter(el => el.name === '');
	namelessItems.map(el => {
		const id = YTParser(el.url);

		YTGetData(id)
		.then(r => {
			el.name = r.items[0].snippet.title;
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

export const CHANGE_VOLUME = (state, value) => {
	Vue.set(state.userSettings, 'volume', Math.abs(100 - value));
}

export const CHANGE_CURRENT_TIME = (state, value) => {
	Vue.set(state, 'currentTime', value);
}

export const INC_CURRENT_TIME = (state) => {
	if(state.isPlaying === true){
		Vue.set(state, 'currentTime', parseFloat(state.currentTime) + 0.5);
	}
}