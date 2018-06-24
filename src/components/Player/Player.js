import store from '@/store';
import { YTParser } from '../../add_functions/YTFunctions';


export default {
  name: 'Player',
  computed: {
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
      player.setVolume(store.state.userSettings.volume);
    },
    onStateChange: function(data) {
      if(data.data === 0){
        if(store.state.userSettings.loop === true) {
          player.playVideo();
          store.commit('CHANGE_CURRENT_TIME', 0);
        } else {
          store.commit('PLAY_NEXT_VIDEO');
        }
      }
    }
  },
}
