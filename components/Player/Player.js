import store from '@/store';
import YTParser from '../../add_functions/YTParser.js';


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
    
          player.loadVideoById(YTParser(currentVideo));
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
        playerVars: { 
          controls:0,
          rel:0,
          fs:0,
          showinfo:0,
          disablekb:1,
        },
        events: {
          'onReady': context.onPlayerReady,
          'onStateChange': context.onStateChange,
        }
      });
    }
  }, 
  methods: {
    onPlayerReady: function() {
      const currentIndex = store.state.userSettings.currentItem;
      const currentVideo = store.state.userPlaylist[currentIndex].url;

      player.loadVideoById(YTParser(currentVideo));
      player.playVideo();
      player.setVolume(50);

      this.isPlayerReady = true;
    },
    onStateChange: function(data) {
      if(data.data === 0){
        store.commit('PLAY_NEXT_VIDEO');
      }
    }
  },
}
