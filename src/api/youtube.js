export const YTGetData = function (id){
	return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyDlLL_DAscuOKLMq6XhLp8hKP6TTSTcjhA&part=snippet,contentDetails`)
	.then(r => r.json())
}