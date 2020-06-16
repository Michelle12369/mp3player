<template>
  <div class="home">
    <div v-show="loading">
      <h1>loading...</h1>
    </div>
    <div v-show="!loading">
      <div class="left" :class="showList?'':'left-rotate'">
        <song-list
          :trackList="trackList"
          :data="currentTrack.songs"
          :track="currentTrack.name"
          :trackImage="currentTrack.image"
          :trackIds="trackIds"
          :firstSongs="firstSongs"
          @showList="changeListMode"
        ></song-list>
      </div>
      <div class="right" :class="showList?'':'right-rotate'">
        <album
          @nextClick="getNextSong"
          @lastClick="getLastSong"
          :title="currentSong.title"
          :singer="currentSong.singer"
          :image="currentSong.image"
          :song="currentSong.url"
        ></album>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import SongList from "../components/SongList.vue";
import Album from "../components/Album.vue";
import { ITrack, ISong } from "./interface";

@Component({
  components: {
    "song-list": SongList,
    album: Album
  }
})
export default class Home extends Vue {
  @State("trackData") trackData!: ITrack[];
  @State("loading") loading!: boolean;
  @Action("getTrackList") getTrackList!: Function;

  private showList = true;
  private trackIds: string[] = [];
  private firstSongs: string[] = [];
  private trackList: string[] = [];
  private currentTrack: ITrack = {
    id: "",
    name: "",
    image: "",
    songs: [
      {
        albumName: "",
        id: "",
        image: "",
        singer: "",
        time: "",
        title: "",
        url: ""
      }
    ]
  };
  private currentSong: ISong = {
    albumName: "",
    id: "",
    image: "",
    singer: "",
    time: "",
    title: "",
    url: ""
  };

  async created() {
    await this.getTrackList();
    this.trackList = this.trackData.map(t => t.name);
    const ct = this.trackData.find(t => t.id === this.$route.params.track_id);
    this.currentTrack =
      ct != undefined
        ? ct
        : {
            id: "",
            name: "",
            image: "",
            songs: [
              {
                albumName: "",
                id: "",
                image: "",
                singer: "",
                time: "",
                title: "",
                url: ""
              }
            ]
          };
    this.trackIds = this.trackData.map(t => t.id);
    this.firstSongs = this.trackData.map(t => t.songs[0]["id"]);
    this.currentSong = this.currentTrack.songs.filter(
      s => s.id === this.$route.params.song_id
    )[0];
  }

  @Watch("$route")
  private onUrlChange() {
    const ct = this.trackData.find(t => t.id === this.$route.params.track_id);
    this.currentTrack =
      ct != undefined
        ? ct
        : {
            id: "",
            name: "",
            image: "",
            songs: [
              {
                albumName: "",
                id: "",
                image: "",
                singer: "",
                time: "",
                title: "",
                url: ""
              }
            ]
          };
    this.currentSong = this.trackData
      .filter(t => t.id === this.$route.params.track_id)[0]
      .songs.filter(s => s.id === this.$route.params.song_id)[0];
  }

  get currentSongId() {
    return this.currentTrack.songs.findIndex(x => x.id === this.currentSong.id);
  }

  private changeListMode() {
    this.showList = !this.showList;
  }
  private getNextSong() {
    const next =
      this.currentSongId === this.currentTrack.songs.length - 1
        ? 0
        : this.currentSongId + 1;
    this.$router.push(this.currentTrack.songs[next].id);
  }
  private getLastSong() {
    const last =
      this.currentSongId === 0
        ? this.currentTrack.songs.length - 1
        : this.currentSongId - 1;
    this.$router.push(this.currentTrack.songs[last].id);
  }
}
</script>
<style lang="scss" scoped>
.home {
  margin: auto;
  width: 1280px;
  height: 840px;
  background: #ff8c6e;
  position: relative;
  overflow: hidden;
}

.left {
  position: absolute;
  top: 0;
  margin-right: 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.left-rotate {
  transform: rotate(30deg);
  transform-origin: right top;
  left: -370px;
  top: 50px;
}
.right {
  position: absolute;
  right: -20px;
  top: 14px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.right-rotate {
  right: 250px;
}
</style>