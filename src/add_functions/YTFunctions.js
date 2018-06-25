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

export const YTDurationToSeconds = function(duration) {
	let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

	match = match.slice(1).map(x => (x != null) ? x.replace(/\D/, '') : '');

	const hours = (parseInt(match[0]) || 0);
	const minutes = (parseInt(match[1]) || 0);
	const seconds = (parseInt(match[2]) || 0);

	return hours*60*60 + minutes * 60 + seconds;
	// return `${hours !== 0 ? (minutes > 9 ? hours + ':' : hours + ':0') : ''}${minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}