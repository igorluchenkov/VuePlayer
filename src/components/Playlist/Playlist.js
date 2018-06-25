import Player from '../Player/Player.vue';
import store from '@/store'

export default {
	name: 'Playlist',
	computed: {
		userPlaylist() {
			return (store.state.userPlaylist ? store.state.userPlaylist : false);
		},
		inputValue: {
			get() {
				return store.state.inputValue
			},
			set(value) {
				store.commit('UPDATE_INPUT', value)
			}
		},
		currentItem(){
			return store.state.userSettings.currentItem;
		},
	},
	methods: {
		addItem: function(){
			store.commit('ADD_ITEM', store.state.inputValue);
			store.commit('GET_VIDEOS_INFO');
		},
		removeItem: function(key){
			store.commit('REMOVE_ITEM', key);
		},
		changeVideo: function(key){
			store.commit('CHANGE_VIDEO', key);
		}
	},
	mounted: function(){
		store.commit('GET_VIDEOS_INFO');
	},
}