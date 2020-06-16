<template>
  <div class="main">
    <div class="upper-container">
      <div class="cover-container">
        <img :class="paused?'album-cover':'album-cover rotate'" :src="image" />
        <div class="white-circle"></div>
        <img v-show="!paused" class="left-line" src="../assets/line.svg" />
        <img v-show="!paused" class="middle-line" src="../assets/line2.svg" />
        <img v-show="!paused" class="right-line" src="../assets/line3.svg" />
      </div>
      <div class="button-container">
        <div class="control-button" @click="onNextClick">
          <img class="next" src="../assets/next.svg" alt />
        </div>
        <div class="control-button" @click="onLastClick">
          <img class="last" src="../assets/next.svg" alt />
        </div>
        <div
          :class="`control-button ${localMode==0?'':'control-button-reverse'}`"
          @click="onCycleClick"
        >
          <img class="cycle" src="../assets/cycle.svg" alt />
          <div class="cycle-dot" v-show="localMode==2"></div>
        </div>
      </div>
    </div>
    <div class="lower-container">
      <div class="text-container">
        <h3>{{title}}</h3>
        <p>{{singer}}</p>
      </div>
      <div class="player-container">
        <div class="player-shadow"></div>
        <img :class="paused?'player-rotate':'player'" src="../assets/player.svg" alt />

        <img v-show="!paused" class="button" src="../assets/stop2.svg" @click="pauseMusic" />
        <img v-show="paused" class="button" src="../assets/play2.svg" @click="playMusic" />
      </div>
      <div class="sound-container">
        <div class="sound-bar">
          <vue-slider ref="sound-slider" v-model="soundValue" v-bind="options">
            <template v-slot:dot>
              <div class="trace"></div>
            </template>
          </vue-slider>
        </div>
        <img class="sound" src="../assets/sound.svg" alt />
      </div>
      <div class="time-container">
        <p class="now">{{timeNow}}</p>
        <div class="time-bar">
          <vue-slider ref="time-slider" v-model="timeValue" v-bind="options">
            <template v-slot:dot>
              <div class="trace"></div>
            </template>
          </vue-slider>
        </div>
        <p class="total">{{timeTotal}}</p>
        <audio ref="player" controls v-show="false"></audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import VueSlider from "vue-slider-component";

@Component({
  components: {
    "vue-slider": VueSlider
  }
})
export default class Album extends Vue {
  @Prop({ default: "Title" }) private title!: string;
  @Prop({ default: "Singer" }) private singer!: string;
  @Prop() private image!: string;
  @Prop() private song!: string;
  private localMode = 0;
  private currentTime = 0;
  private duration = 0;
  private paused = true;
  private audio!: HTMLAudioElement;
  private soundValue = 50;
  private options = {
    railStyle: {
      backgroundColor: "#fff",
      border: "3px solid",
      borderRadius: "75px"
    },
    processStyle: { backgroundColor: "#C5C5C5" },
    tooltip: "none",
    duration: 0.3
  };

  mounted() {
    this.audio = new Audio(this.song);
    this.audio.addEventListener("loadeddata", () => {
      this.duration = this.audio.duration;
    });
    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
    });
  }

  @Watch("song")
  private updateAudio() {
    this.audio.pause();
    this.audio = new Audio(this.song);
    this.audio.currentTime = 0;
    this.currentTime = 0;
    if (!this.paused) {
      this.audio.play();
    }
    this.audio.addEventListener("loadeddata", () => {
      this.duration = this.audio.duration;
    });
    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
    });
  }

  private formatTime(sec: number) {
    const totalSeconds = Math.floor(sec);
    let mins = Math.floor(totalSeconds / 60).toString();
    let seconds = (totalSeconds % 60).toString();
    if (mins.length < 2) {
      mins = `0${mins}`;
    }
    if (seconds.length < 2) {
      seconds = `0${seconds}`;
    }
    return `${mins}:${seconds}`;
  }

  private pauseMusic() {
    this.audio.pause();
    this.paused = true;
  }

  private playMusic() {
    this.audio.play();
    this.paused = false;
  }

  get timeNow() {
    return this.formatTime(this.currentTime);
  }
  get timeTotal() {
    return this.formatTime(this.duration);
  }

  get timeValue(): number {
    return (this.currentTime / this.duration) * 100;
  }
  set timeValue(value) {
    const nowSeconds = (value / 100) * this.audio.duration;
    this.audio.currentTime = nowSeconds;
  }

  @Watch("currentTime")
  private playEnd() {
    if (this.currentTime === this.audio.duration && this.localMode === 2) {
      this.paused = true;
    } else if(this.currentTime === this.audio.duration && this.localMode === 0){
      this.onNextClick();
    }
  }

  @Watch("soundValue")
  private changeVolume() {
    this.audio.volume = this.soundValue / 100;
  }

  @Emit("nextClick")
  private onNextClick() {
    return;
  }

  @Emit("lastClick")
  private onLastClick() {
    return;
  }

  private onCycleClick() {
    if (this.localMode == 0 || this.localMode == 1) {
      this.localMode += 1;
    } else {
      this.localMode = 0;
    }

    if (this.localMode == 1) {
      this.audio.loop = true;
    } else {
      this.audio.loop = false;
    }
    return this.localMode;
  }
}
</script>

<style scoped lang="scss">
.main {
  border: 3px solid;
  width: 732px;
  height: 732px;
  padding: 34px;
  background: #fff;
}

.cover-container {
  display: inline-block;
  position: relative;
  width: 600px;
  height: 600px;
  margin-left: 30px;

  .album-cover {
    display: block;
    border-radius: 100%;
    border: 3px solid;
    width: 600px;
    height: 600px;
    box-shadow: 1px 3px 3px 3px #cccccc;
    animation: spin 5s linear infinite;
    animation-play-state: paused;
  }
  .rotate {
    animation-play-state: running;
  }

  .white-circle {
    position: absolute;
    left: 250px;
    top: 250px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 3px solid;
    background: #fff;
  }
  .left-line {
    position: absolute;
    top: 125px;
    left: 0;
  }
  .middle-line {
    position: absolute;
    right: -40px;
    top: 260px;
  }
  .right-line {
    position: absolute;
    right: -30px;
    top: 260px;
  }
}
.control-button {
  border: 3px solid;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  box-shadow: 6px 6px 0px 0px #c5c5c5;
  cursor: pointer;
}
.control-button-reverse {
  background: #dfdfdf;
  box-shadow: inset 2px 2px 0px 0px black;
}
.button-container {
  display: inline-block;
  margin-left: 20px;
  .control-button:nth-of-type(1) {
    margin-bottom: 20px;
  }
  .control-button:nth-of-type(2) {
    margin-bottom: 360px;
  }
  .next {
    margin: 17px;
    transform: rotate(180deg);
  }
  .last {
    margin: 17px;
  }
  .cycle {
    margin: 18px 13px;
  }
  .cycle-dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: black;
    margin: 5px auto;
  }
}
.lower-container {
  position: relative;
  .text-container {
    // margin-bottom: 10px;
    display: inline-block;
    h3 {
      font-size: 24px;
      margin-bottom: 0px;
    }
    p {
      margin: 0;
    }
  }
  .player-container {
    position: absolute;
    left: 97px;
    bottom: -8px;

    .player {
      transform: rotate(0deg);
      transform-origin: 81% 81%;
      transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .player-rotate {
      transform: rotate(-20deg);
      transform-origin: 81% 81%;
      transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .player-shadow {
      position: absolute;
      background: #fff;
      width: 88px;
      height: 88px;
      border-radius: 100%;
      right: 12px;
      bottom: 42px;
      box-shadow: 6px 6px 0px 0px #c5c5c5;
    }
    .button {
      position: absolute;
      bottom: 54px;
      left: 206px;
      width: 30px;
      padding: 20px;
      cursor: pointer;
    }
  }
  .sound-container {
    display: inline-block;
    float: right;
    margin-top: 50px;

    .sound-bar {
      width: 165px;
      margin-right: 10px;
      display: inline-block;
    }
    .sound {
      width: 26px;
      vertical-align: bottom;
    }
  }
  .time-container {
    margin-top: 20px;

    p {
      display: inline-block;
      margin-bottom: 0px;
      vertical-align: bottom;
      width: 43px;
    }
    .time-bar {
      position: relative;
      display: inline-block;
      width: 600px;
      height: 25px;
      margin: 0 20px;
      vertical-align: bottom;
    }
  }
  .trace {
    width: 10px;
    height: 25px;
    border: 3px solid;
    position: absolute;
    top: -8px;
    left: -5px;
    background: #fff;
    cursor: pointer;
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>