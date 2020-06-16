<template>
  <div class="about">
    <h1>loading...</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { ITrack } from "./interface";

@Component
export default class About extends Vue {
  @State("trackData") trackData!: ITrack[];
  @Action("getTrackList") getTrackList!: Function;

  async created() {
    await this.getTrackList();
    this.$router.push(
      `/track/${this.trackData[0].id}/song/${this.trackData[0].songs[0].id}`
    );
  }
}
</script>
<style scoped lang="scss">
.about {
  padding-top: 16px;
  width: 1280px;
  height: 840px;
  background: #ff8c6e;
  margin: auto;
  h1 {
    margin: 0;
  }
}
</style>