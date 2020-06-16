<template>
  <div class="track">
    <div class="left-container">
      <div class="track-list-container">
        <h6>播放列表</h6>
        <router-link
          :to="{params:{track_id:trackIds[index], song_id:firstSongs[index]}}"
          v-for="(d, index) in trackList"
          :key="d"
        ><img src="../assets/tra.svg" v-show="$route.params.track_id===trackIds[index]">{{d}}</router-link>
      </div>
    </div>
    <div class="right-container">
      <div class="song-list">
        <h1>{{track}}</h1>
        <div class="list-container" @click="listClick">
          <p>List</p>
          <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        </div>
        <div class="song-list-container">
          <song
            v-for="d in data"
            :key="d.id"
            :id="d.id"
            :title="d.title"
            :singer="d.singer"
            :albumName="d.albumName"
            :time="d.time"
          ></song>
        </div>
      </div>
      <div class="image-container">
        <img :src="trackImage" alt />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import Song from "./Song.vue";
import { State, Action } from "vuex-class";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

@Component({
  components: {
    song: Song,
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class SongList extends Vue {
  @Prop() trackList!: object;
  @Prop() data!: object;
  @Prop() track!: string;
  @Prop() trackImage!: string;
  @Prop() trackIds!: string[];
  @Prop() firstSongs!: string[];

  async created() {
    library.add(faBars);
  }

  @Emit("showList")
  private listClick() {
    return;
  }
}
</script>
<style lang="scss" scoped>
.track {
  position: relative;
  width: 450px;
  background: #fff;
}
.left-container {
  border: solid 3px;
  height: 810px;
  padding-left: 20px;

  h6 {
    font-size: 10px;
    border-bottom: 1px solid;
    margin-bottom: 8px;
  }
  a {
    display: block;
    color: black;
    text-decoration: none;
    margin: 4px 0;
    font-size: 14px;
  }
  .track-list-container {
    width: 86px;
    img{
      width: 10px;
      transform: rotate(90deg);
    }
  }
}
.right-container {
  border: 3px solid;
  width: 340px;
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: -10px;
  background: #fff;
}
.song-list {
  padding: 14px 30px;
  h1 {
    display: inline-block;
    font-size: 30px;
    font-weight: 400;
    margin: 0px 0px 18px;
  }
  .list-container {
    display: inline-block;
    float: right;
    cursor: pointer;
    p {
      margin: 0;
      font-size: 12px;
    }
    .icon {
      font-size: 20px;
    }
  }
  .song-list-container {
    overflow: scroll;
    height: 500px;
    margin-bottom: 20px;
  }
}
.image-container {
  margin-bottom: 40px;
  overflow: hidden;
  height: 157px;

  img {
    width: 100%;
  }
}
</style>