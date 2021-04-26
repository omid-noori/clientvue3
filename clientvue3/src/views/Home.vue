<template>
  <div v-if="loading" class="loading"></div>
  <div v-if="!loading" class="home">
    <div class="container">
      <div v-if="Posts" class="info">
        <div class="center">
          <h1>{{ currentIndex.name }}</h1>
          <h2>{{ currentIndex.singer }}</h2>
          <ul>
            <li>Album: {{ currentIndex.album }}</li>
            <li>Cover: {{ currentIndex.coverDesigner }}</li>
            <li>Composer: {{ currentIndex.composer }}</li>
            <li>Audio Duration: {{ currentIndex.duration }}</li>
            <li>Uploaded: {{ currentIndex.fromNow }}</li>
          </ul>
        </div>
      </div>
      <Slider
        v-if="images"
        :imageKeys="images"
        @play="onPlay"
        @next="next"
        @previous="previous"
      />
      <div class="ads">
        <h1>Ads</h1>
      </div>
    </div>
  </div>
  <div v-if="close" class="close">
    <div>
      <p>{{ currentIndex.uploaded }} * {{ currentIndex.fromNow }}</p>
      <span @click="close = false"></span>
    </div>
  </div>
  <Player v-if="currentMusic && close" :musicData="currentMusic" />
</template>

<script>
import Slider from '../components/slider';
import Player from '../components/Player';
import {reactive, ref} from 'vue';
import dayJs from 'dayjs';
import relatveTime from 'dayjs/plugin/relativeTime';
export default {
  components: {
    Slider,
    Player,
  },
  setup() {
    const loading = ref(false);
    const close = ref(false);

    let Posts = ref(null);
    let images = ref(null);
    let currentMusic = ref(null);
    let currentIndex = reactive({
      name: null,
      singer: null,
      album: null,
      coverDesigner: null,
      composer: null,
      duration: null,
      fromNow: null,
      uploaded: null,
    });

    // Fetching Data
    const URL = 'http://localhost:3000/uploads';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        Posts.value = data;
        images.value = data.map((post) => {
          return {
            Key: post.cover.Key,
            _id: post._id,
          };
        });
        setData(Posts.value[0]);
        console.log(Posts.value);
      })
      .catch((error) => {
        console.log(error);
      });
    // Functions

    const onPlay = (file) => {
      currentMusic.value = Posts.value.filter((post) => post._id === file._id);
      close.value = true;
    };
    const next = (id) => {
      const file = Posts.value.filter((post) => post._id === id);
      setData(file[0]);
    };
    const previous = (id) => {
      const file = Posts.value.filter((post) => post._id === id);
      setData(file[0]);
    };
    const setData = (data) => {
      currentIndex.name = data.name;
      currentIndex.singer = data.singer;
      currentIndex.album = data.album;
      currentIndex.duration = duration(data.duration);
      currentIndex.coverDesigner = data.coverDesigner;
      currentIndex.composer = data.composer;
      const date = dayJs(data.created);
      dayJs.extend(relatveTime);
      currentIndex.fromNow = dayJs().to(date);
      currentIndex.uploaded = date.format('DD MMMM YYYY');
    };

    const duration = (dur) => {
      let currentIndexDuration = parseFloat(dur);
      let mins = Math.floor(currentIndexDuration / 60);
      if (mins < 10) {
        mins = '0' + String(mins);
      }
      let secs = Math.floor(currentIndexDuration % 60);
      if (secs < 10) {
        secs = '0' + String(secs);
      }
      return mins + ':' + secs;
    };
    return {
      loading,
      images,
      Posts,
      onPlay,
      currentMusic,
      close,
      next,
      previous,
      currentIndex,
    };
  },
};
</script>
<style lang="scss">
.home {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  min-height: calc(100vh - 60px);
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    .info {
      background: rgba(0, 0, 0, 0.15);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .center {
        width: 100%;
        padding: 10px;
        justify-content: center;
        align-items: center;
        h1 {
          color: white;
          // text-align: center;
          font-family: Impact;
          font-size: 40px;
          padding: 5px;
        }
        h2 {
          padding: 5px;
          text-align: start;
          color: white;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }
        ul {
          list-style-type: none;
          li {
            padding: 5px;
            color: white;
          }
        }
      }
    }
    .ads {
      background: rgba(0, 0, 0, 0.15);
    }
  }
}
// .close {
//   // position: absolute;
//   // top: 50%;
//   // transform: translateY(-50%);
//   // right: 10px;
//   // color: white;
//   // z-index: +1;
//   // cursor: pointer;
//   // font-size: 60px;
// }
@media screen and (max-width: 780px) {
  .home {
    height: calc(100vh - 60px);
    .container {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
      height: 100%;
      .info {
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
        position: relative;
        .center {
          h1 {
            font-size: 40px;
            text-align: start;
          }
          h2 {
            font-size: 20px;
            // text-align: center;
          }
        }
      }
    }
  }
  // .close {
  //   // position: fixed;
  //   // font-size: 70;
  //   // top: -20px;
  //   // right: 14px;
  //   // z-index: +10;
  //   // padding: 0;
  // }
}
</style>
