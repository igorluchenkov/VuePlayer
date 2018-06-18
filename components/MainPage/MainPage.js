import Player from '@/components/Player/Player.vue';
import Playlist from '@/components/Playlist/Playlist.vue';
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import axios from 'axios';

export default {
  name: 'MainPage',
  components: { Player, Playlist, ProgressBar },
  computed: {
    isPlaylist (){
      return this.$route.path;
    }
  },
  // mounted: function(){
  //   axios.get('http://vueplayerrestapi.loc/?user=1')
  //   .then(r => console.log(r))
  //   .catch(r => console.log(r));
  // }
}