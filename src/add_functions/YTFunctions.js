import store from '@/store';

export const YTParser = function(url){
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	const match = url.match(regExp);
	return (match&&match[7].length==11)? match[7] : false;
}

export const YTPlayVideo = function(){
	const currentIndex = store.state.userSettings.currentItem;
	const currentVideo = store.state.userPlaylist[currentIndex].url;

	player.loadVideoById(YTParser(currentVideo));
	player.playVideo();
}