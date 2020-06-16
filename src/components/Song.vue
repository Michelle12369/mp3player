<template>
  <router-link :to="{params:{song_id: id}}" active-class="active">
  <div class="song-container" >
    <div class="song-name">
      <h3>{{title}}</h3>
      <p>{{singer}}</p>
    </div>
    <div class="song-detail">
      <p>{{albumName}}</p>
      <p>{{time}}</p>
    </div>
  </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class Song extends Vue {
  @Prop() id!: number;
  @Prop() title!: string;
  @Prop() singer!: string;
  @Prop() albumName!: string;
  @Prop() time!: string;
}
</script>

<style lang="scss" scoped>
.active{
  background: #c5c5c5;
  display: block;
}
.song-container {
  width: 262px;
  border-bottom: 1px solid;
  cursor: pointer;
  padding: 6px 4px 2px;

  .song-name {
    display: inline-block;

    h3{
        font-size: 18px;
        margin: 0;
    }
  }

  .song-detail {
    display: inline-block;
    float: right;
    text-align: right;

    p{
        color: #646464;
    }
  }
  p{
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 4px;
  }
}
</style>