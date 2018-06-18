import store from '@/store'

export default {
  name: 'Player',
  data(){
    return {
      isPlayerReady: false,
    }
  },
  computed: {
    WatchCurrentVideo(){
      if(store.state.userPlaylist.length){
        if(store.state.userSettings.currentItem !== undefined && this.isPlayerReady === true){
          const currentIndex = store.state.userSettings.currentItem;
          const currentVideo = store.state.userPlaylist[currentIndex].url;
    
          player.loadVideoById(this.YTParser(currentVideo));
          player.playVideo();
        }
      }
    },
    arrowLink(){
      return this.$route.path === '/playlist' ? 'player' : 'playlist';
    },
  },
  mounted: function(){
    const context = this;
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.querySelector('#player');
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    window.player = player;
    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        width: '1228',
        height: '693',
        controls: 0,
        disablekb: 1,
        events: {
          'onReady': context.onPlayerReady,
          'onStateChange': context.onStateChange,
        }
      });
    }
  }, 
  methods: {
    YTParser: function(url){
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match&&match[7].length==11)? match[7] : false;
    },
    onPlayerReady: function() {
      const currentIndex = store.state.userSettings.currentItem;
      const currentVideo = store.state.userPlaylist[currentIndex].url;

      player.loadVideoById(this.YTParser(currentVideo));
      player.playVideo();

      this.isPlayerReady = true;
    },
    onStateChange: function(data) {
      if(data.data === 0){
        store.commit('PLAY_NEXT_VIDEO');
      }
    }
  },
}
