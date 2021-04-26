<template>
  <div class="blurBg">
    <div class="coverPic">
      <div class="cover" :style="{backgroundImage: 'url(' + cover + ')'}"></div>
      <canvas id="canvas"></canvas>
      <div v-if="loading" class="loading"></div>
    </div>

    <div class="playSection">
      <div class="info">
        <div class="slideAndPlay">
          <div
            @click.prevent="playPause"
            class="playIcone"
            :class="{play: isPlaying}"
          ></div>
          <div class="slider">
            <p class="currentTime">00:00</p>
            <div
              @touchstart.stop.passive="start"
              @mousedown.stop.prevent="start"
              @mousemove.stop="move"
              @touchmove.passive.stop="move"
              @click="sliderClick"
              class="progressBar"
            >
              <div class="progress"></div>
              <div
                class="thumb"
                @touchstart.stop.passive="start"
                @mousedown.stop.prevent="start"
                @mousemove.stop="move"
                @touchmove.passive.stop="move"
                @click="sliderClick"
              >
                <div></div>
              </div>
              <div class="loadedData"></div>
            </div>
            <p class="duration">{{ calcDuration }}</p>
          </div>
          <div class="name">
            <h1>{{ MusicData.name }}</h1>
            <h3>
              {{ MusicData.singer }} <span>{{ FromNow }}</span>
            </h3>
            <div class="icons">
              <svg
                version="1.1"
                id="loop"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 489.935 489.935"
                style="enable-background:new 0 0 489.935 489.935;"
                xml:space="preserve"
                @click="musicLoop = !musicLoop"
                :class="{active: musicLoop}"
              >
                <g>
                  <path
                    d="M278.235,33.267c-116.7,0-211.6,95-211.6,211.7v0.7l-41.9-63.1c-4.1-6.2-12.5-7.9-18.7-3.8c-6.2,4.1-7.9,12.5-3.8,18.7
		            l60.8,91.5c2.2,3.3,5.7,5.4,9.6,5.9c0.6,0.1,1.1,0.1,1.7,0.1c3.3,0,6.5-1.2,9-3.5l84.5-76.1c5.5-5,6-13.5,1-19.1
		            c-5-5.5-13.5-6-19.1-1l-56.1,50.7v-1c0-101.9,82.8-184.7,184.6-184.7s184.7,82.8,184.7,184.7s-82.8,184.7-184.6,184.7
		            c-49.3,0-95.7-19.2-130.5-54.1c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1c40,40,93.1,62,149.6,62
		            c116.6,0,211.6-94.9,211.6-211.7S394.935,33.267,278.235,33.267z"
                  />
                </g>
              </svg>

              <svg
                @click="musicMute = !musicMute"
                version="1.1"
                id="volume"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 500 500"
                style="enable-background:new 0 0 500 500;"
                xml:space="preserve"
              >
                <g :class="{muted: musicMute}">
                  <path
                    class="st0"
                    d="M108.22,154.85v190.3H37.43c-6.18,0-11.19-5.01-11.19-11.19V166.04c0-6.18,5.01-11.19,11.19-11.19
		            L108.22,154.85L108.22,154.85z"
                  />
                  <path
                    class="st0"
                    d="M293.99,72.3v355.4c0,10.77-11.66,17.5-20.99,12.12l-164.79-95.15V155.32L273,60.19
		            C282.34,54.8,293.99,61.53,293.99,72.3z"
                  />
                </g>
                <g v-if="musicMute === false">
                  <path
                    class="st0"
                    d="M311.03,332.29c45.45,0,82.29-36.84,82.29-82.29s-36.84-82.29-82.29-82.29"
                  />
                  <path
                    class="st0"
                    d="M311.03,363.52c62.69,0,113.52-50.82,113.52-113.52s-50.82-113.52-113.52-113.52"
                  />
                  <path
                    class="st0"
                    d="M311.03,394.17c79.62,0,144.17-64.55,144.17-144.17s-64.55-144.17-144.17-144.17"
                  />
                </g>
                <g v-if="musicMute === true" class="muted">
                  <line
                    class="st1"
                    x1="473"
                    y1="156.14"
                    x2="311.03"
                    y2="318.11"
                  />
                  <line
                    class="st1"
                    x1="312.5"
                    y1="156.14"
                    x2="473"
                    y2="316.64"
                  />
                </g>
              </svg>

              <svg
                @click="showText = !showText"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="rgb(255,255,255)">
                  <path
                    d="m2.5 4c0-.27614.22386-.5.5-.5h10c.2761 0 .5.22386.5.5s-.2239.5-.5.5h-10c-.27614 0-.5-.22386-.5-.5z"
                  />
                  <path
                    clip-rule="evenodd"
                    d="m15.5 4c0-.27614.2239-.5.5-.5 3.0376 0 5.5 2.46243 5.5 5.5 0 .27614-.2239.5-.5.5s-.5-.22386-.5-.5c0-2.31628-1.75-4.22381-4-4.47254v12.97254c0 .0471-.0065.0927-.0187.136.0124.1196.0187.2411.0187.364 0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5c.9793 0 1.8647.4022 2.5 1.0505zm-5 14c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5-1.1193 2.5-2.5 2.5-2.5-1.1193-2.5-2.5z"
                    fill-rule="evenodd"
                  />
                  <path
                    d="m3 6.5c-.27614 0-.5.22386-.5.5s.22386.5.5.5h10c.2761 0 .5-.22386.5-.5s-.2239-.5-.5-.5z"
                  />
                  <path
                    d="m2.5 10c0-.27614.22386-.5.5-.5h5c.27614 0 .5.22386.5.5 0 .2761-.22386.5-.5.5h-5c-.27614 0-.5-.2239-.5-.5z"
                  />
                </g>
              </svg>

              <svg
                @click="changeCurrentTime"
                version="1.1"
                id="stop"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 500 500"
                style="enable-background:new 0 0 500 500;"
                xml:space="preserve"
              >
                <path
                  d="M430.48,447.14H69.52c-9.2,0-16.66-7.46-16.66-16.66V69.52c0-9.2,7.46-16.66,16.66-16.66h360.96
	            c9.2,0,16.66,7.46,16.66,16.66v360.96C447.14,439.68,439.68,447.14,430.48,447.14z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lyric" :class="{Tshow: showText}">
      <span aria-hidden="true" @click="showText = !showText">
        <b>{{ MusicData.singer }} - {{ MusicData.name }}</b> &#9826;
        <em>{{ Uploaded }}</em>
        <span>&times;</span>
      </span>
      <p lang="fa" v-html="MusicData.text"></p>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed, onBeforeUnmount, reactive} from 'vue';
import dayJs from 'dayjs';
import relatveTime from 'dayjs/plugin/relativeTime';
export default {
  props: {
    musicData: Array,
  },
  setup(props) {
    let showText = ref(false);
    const cover = ref(null);
    let loading = ref(false);
    const MusicData = ref(props.musicData[0]);
    let musicLoop = ref(false);
    let musicMute = ref(false);
    const serverURL = 'http://localhost:3000';
    const URL = `${serverURL}/uploads/media/`;

    let audioContext, audio, analyser, animationId, dataArray, context, canvas;
    let bars = 150;
    let bar_width = 0;

    audio = new Audio();
    audio.autoplay = false;
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';
    // audio.controls = true;

    if (!audio.src) {
      // audio.src = URL + MusicData.value.music.Key;
      fetch(URL + MusicData.value.music.Key, {
        method: 'GET',
        headers: {
          'Access-Control-Allow_Origin': '*',
        },
      })
        .then((res) => {
          const reader = res.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({done, value}) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => window.URL.createObjectURL(blob))
        .then((url) => (audio.src = url))
        .catch((error) => console.error(error));
    }
    let progressBar, thumb, progress;
    onMounted(() => {
      canvas = document.getElementById('canvas');
      cover.value = URL + props.musicData[0].cover.Key;
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      context = canvas.getContext('2d');
      audioContext = new AudioContext();
      analyser = new AnalyserNode(audioContext, {
        fftSize: 512,
        smoothingTimeConstant: 0.8,
      });

      const mediaSource = audioContext.createMediaElementSource(audio);
      const gainNode = audioContext.createGain();

      gainNode.gain.value = 1;
      mediaSource
        .connect(analyser)
        .connect(gainNode)
        .connect(audioContext.destination);
      let bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      document.title = `${MusicData.value.singer} - ${MusicData.value.name}`;
      document.addEventListener('mousemove', move);
      document.addEventListener('touchmove', move, {passive: true});
      document.addEventListener('mouseup', end);
      document.addEventListener('touchend', end);
      progressBar = document.querySelector('.progressBar');
      thumb = progressBar.querySelector('.thumb');
      progress = progressBar.querySelector('.progress');
      if (window.innerWidth > 780) {
        showText.value = true;
      }
      // const link = document.getElementById('favicon');
      // link.href = URL + MusicData.value.cover.Key;
      document.addEventListener('keyup', (e) => {
        let key = e.keyCode;
        if (key === 32) {
          playPause();
        }
      });
    });
    let isPlaying = ref(false);

    const updatePositionState = () => {
      if ('setPositionState' in navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: audio.currentTime,
        });
      }
    };

    const uploadMetadata = () => {
      if ('mediaSession' in navigator) {
        console.log(navigator.mediaSession);
        navigator.mediaSession.metadata = new MediaMetadata({
          title: MusicData.value.name,
          artist: MusicData.value.singer,
          album: MusicData.value.album,
          artwork: [
            {
              src: URL + MusicData.value.cover.Key,
            },
          ],
        });

        // try {
        navigator.mediaSession.setActionHandler('seekto', function(event) {
          // log('> User clicked "Seek To" icon.');
          if (event.fastSeek && 'fastSeek' in audio) {
            audio.fastSeek(event.seekTime);
            return;
          }
          // alert(event.seekTime);
          audio.currentTime = event.seekTime;
          updatePositionState();
        });
        // } catch (error) {
        //   console.log(
        //     'Warning! The "seekto" media session action is not supported.'
        //   );
        // }
        navigator.mediaSession.setActionHandler('play', playPause);
        navigator.mediaSession.setActionHandler('pause', playPause);
        let skipTime = 10; // Time to skip in seconds

        navigator.mediaSession.setActionHandler('seekforward', function(e) {
          // User clicked "Seek Forward" media notification icon.
          skipTime = e.seekOffset || 5;
          audio.currentTime = Math.min(
            audio.currentTime + skipTime,
            audio.duration
          );
          updatePositionState();
        });
        navigator.mediaSession.setActionHandler('seekbackward', function(e) {
          // User clicked "Seek Backward" media notification icon.
          skipTime = e.seekOffset || 5;
          audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
          updatePositionState();
        });
      }
    };
    const playPause = () => {
      if (!isPlaying.value) {
        audio
          .play()
          .then(() => {
            navigator.mediaSession.playbackState = 'playing';
            uploadMetadata();
          })
          .catch((error) => console.error(error));
        draw();
        isPlaying.value = true;
      } else {
        audio.pause();
        cancelAnimationFrame(animationId);
        isPlaying.value = false;
        navigator.mediaSession.playbackState = 'paused';
      }
      audio.onended = () => {
        isPlaying.value = false;
        audio.currentTime = 0;
      };

      audio.onpause = () => {
        isPlaying.value = false;
      };
      audio.onplay = () => {
        isPlaying.value = true;
      };
      audio.ontimeupdate = function(e) {
        e.stopPropagation();
        TimeUpdate();
        audio.loop = musicLoop.value;
        audio.muted = musicMute.value;
      };
      audio.onwaiting = () => {
        console.log('wainting!!');
        loading.value = true;
      };
      audio.onseeking = () => {
        console.log(audio.currentTime);
      };
    };
    // let currentTime = reactive(audio.currentTime);
    const TimeUpdate = () => {
      const musicDuration = parseFloat(MusicData.value.duration);
      calcProgressBar(audio.currentTime, musicDuration);
      loading.value = false;
    };

    let procentage = 0;
    let audioProgress = reactive({
      start: null,
      end: null,
      dragging: false,
    });

    const calcProgressBar = (currentTime, duration) => {
      let value = (100 / duration) * currentTime;
      procentage = value.toFixed(1);
      if (progress && thumb) {
        if (audioProgress.dragging) {
          progress.style.width = procentage + '%';
          calculateCurrentTime(currentTime);
        } else {
          progress.style.width = procentage + '%';
          thumb.style.left = procentage + '%';
          calculateCurrentTime(currentTime);
        }
      }
    };
    const calculateCurrentTime = (currentTime) => {
      const showCurTime = document.querySelector('.currentTime');
      let mins = parseInt(currentTime / 60) % 60,
        seconds_long = currentTime % 60,
        seconds = seconds_long.toFixed(),
        current_time =
          (mins < 10 ? '0' + mins : mins) +
          ':' +
          (seconds < 10 ? '0' + seconds : seconds);
      if (showCurTime) {
        showCurTime.innerHTML = current_time;
      }
    };
    let radius = 0;
    let rot = 0,
      intensity = 0,
      shockwave;
    const draw = () => {
      const CoverImg = document.querySelector('.coverPic');
      canvas.width = CoverImg.clientWidth;
      canvas.height = CoverImg.clientHeight;
      let center_x = canvas.width / 2;
      let center_y = canvas.height / 2;
      rot = rot + intensity * 0.00001;

      intensity = 0;

      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < bars; i++) {
        // divide a circle into equal parts
        let rads = (Math.PI * 2) / bars;
        // let bar_height = dataArray[i] * 0.7;
        let bar_height = Math.min(
          999,
          Math.max(dataArray[i] * 2.5 - 150, 0) / 3
        );
        bar_width = bar_height * 0.02;

        let x = center_x + Math.cos(rads * i) * radius;
        let y = center_y + Math.sin(rads * i) * radius;
        let x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
        let y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
        // draw a bar
        drawBar(x, y, x_end, y_end, bar_width, dataArray[i]);
        intensity += bar_height;
      }
      let old_radius = radius;
      radius = 15 + intensity * 0.004;
      let delarad = radius - old_radius;

      context.lineWidth = 1;
      context.fillStyle = 'rgba(135, 206, 235, 0.5)';
      context.beginPath();
      context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
      context.fill();

      shockwave += 50;
      context.lineWidth = 50;
      context.strokeStyle = 'rgba(135, 206, 235, 0.2)';
      context.beginPath();
      context.arc(
        center_x,
        center_y,
        shockwave + radius,
        0,
        Math.PI * 2,
        false
      );
      context.stroke();
      if (delarad > 8) {
        shockwave = 0;
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        rot = rot + 0.4;
      }
      animationId = requestAnimationFrame(draw);
    };
    const drawBar = (x1, y1, x2, y2, width, frequency) => {
      let lineColor = `rgb(${frequency}, ${frequency * 2}, 255)`;
      context.strokeStyle = lineColor;
      context.lineWidth = width;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };
    const changeCurrentTime = (e) => {
      e.stopPropagation();
      audio.pause();
      audio.currentTime = 0;
    };
    const calcDuration = computed(() => {
      let duration = parseFloat(MusicData.value.duration);

      let mins = Math.floor(duration / 60);
      if (mins < 10) {
        mins = '0' + String(mins);
      }
      let secs = Math.floor(duration % 60);
      if (secs < 10) {
        secs = '0' + String(secs);
      }
      return mins + ':' + secs;
    });

    const date = dayJs(MusicData.value.created);
    dayJs.extend(relatveTime);

    const FromNow = computed(() => {
      const fromNow = dayJs().to(date);
      return fromNow;
    });

    const Uploaded = computed(() => {
      const created = date.format('DD MMMM YYYY');
      return created;
    });

    onBeforeUnmount(() => {
      cancelAnimationFrame(animationId);
      audio.pause();
      audio.currentTime = 0;
      audio.src = null;
      document.title = 'Welcome To RapGap';
    });

    const start = (e) => {
      audioProgress.dragging = true;
      thumb.querySelector('div').classList.add('drag');
    };
    let procent = 0;
    const move = (e) => {
      e.stopPropagation();
      let offsetLeft = progressBar.getBoundingClientRect().left;
      if (audioProgress.dragging) {
        let clientX = e.clientX || e.touches[0].clientX;
        if (clientX < offsetLeft) {
          procent = 0;
        } else if (clientX > progressBar.offsetWidth + offsetLeft) {
          procent = progressBar.offsetWidth;
        } else {
          audioProgress.start = clientX - offsetLeft;
          procent = (audioProgress.start / progressBar.offsetWidth) * 100;
          let procentValue = procent.toFixed(1);
          thumb.style.left = procentValue + '%';
        }
      }
    };
    const end = (e) => {
      e.stopPropagation();
      if (audioProgress.dragging) {
        audioProgress.dragging = false;
        thumb.querySelector('div').classList.remove('drag');
        const currentT = (MusicData.value.duration / 100) * procent.toFixed(1);
        audio.currentTime = currentT;
      }
    };
    const sliderClick = (e) => {
      const clientX = e.clientX || e.touches[0].clientX;
      let offsetLeft = progressBar.getBoundingClientRect().left;
      let start = clientX - offsetLeft;
      let procent = (start / progressBar.offsetWidth) * 100;
      let curTime = (MusicData.value.duration / 100) * procent.toFixed(1);
      audio.currentTime = curTime;
      thumb.style.left = procent + '%';
      progress.style.width = procent + '%';
    };
    return {
      playPause,
      cover,
      props,
      URL,
      canvas,
      MusicData,
      isPlaying,
      showText,
      loading,
      changeCurrentTime,
      calcDuration,
      FromNow,
      Uploaded,
      musicLoop,
      musicMute,
      start,
      end,
      move,
      sliderClick,
    };
  },
};
</script>

<style lang="scss">
.blurBg {
  position: absolute;
  padding: 10px;
  top: 50px;
  left: 0px;
  width: 100%;
  min-height: calc(100vh - 110px);
  overflow: hidden;
  background: rgb(35, 35, 35);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-template-areas:
    'a b'
    'c c';
  grid-template-rows: 400px;
  .coverPic {
    background: rgba(0, 0, 0, 0.1);
    grid-area: a;
    position: relative;
    width: 90%;
    justify-self: end;
    .cover {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .playSection {
    grid-area: c;
    overflow: hidden;
    .info {
      border-top: 1px solid rgb(255, 255, 255);
      border-bottom: 1px solid rgb(255, 255, 255);
      color: rgba(255, 255, 255, 0.8);
      width: 90%;
      margin: 0 auto;
      position: relative;
      .slideAndPlay {
        position: relative;
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 150px 1fr 0.5fr;
        grid-template-areas:
          'icon slider .'
          'icon info info';

        .slider {
          grid-area: slider;
          position: relative;
          display: flex;
          .progressBar {
            width: 100%;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            align-self: center;
            cursor: pointer;
            position: relative;
            .thumb {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              transform-origin: 0;
              cursor: pointer;
              user-select: none;
              position: absolute;
              left: 0;
              div {
                width: 14px;
                height: 14px;
                border-radius: 7px;
                transition: all 0.1s ease-in-out;
                background: rgb(135, 206, 235);
              }
              > div.drag {
                &:hover,
                &:focus {
                  transform: scale(1.4);
                  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.4);
                  background: skyblue;
                }
              }
            }
            .progress {
              width: 0%;
              height: 100%;
              background: rgb(135, 206, 235);
            }
            .loadedData {
              height: 100%;
              width: 100%;
              position: absolute;
              left: 0;
            }
          }
          .currentTime {
            justify-content: start;
          }
          p {
            width: 70px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .duration {
            justify-content: flex-end;
          }
        }
        .name {
          grid-area: info;
          display: grid;
          grid-template-columns: 0.5fr 0.5fr 1fr;
          grid-gap: 10px;
          align-items: center;
          width: 100%;
          h1 {
            color: white;
            font-size: 25px;
            margin-right: 10px;
          }
          h3 {
            color: white;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 10px;
            > span {
              display: none;
              color: rgb(0, 162, 255);
            }
          }
          .icons {
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            width: 100%;
            padding: 10px 0;
            svg {
              width: 25%;

              cursor: pointer;
              color: red;
            }
            svg:nth-child(3),
            svg:nth-child(4) {
              justify-self: end;
            }
            #loop {
              fill: white;
            }
            #loop.active {
              fill: skyblue;
            }
            #volume {
              fill: none;
              stroke: #ffffff;
              stroke-width: 20;
              .muted {
                stroke: skyblue;
              }
            }
            #stop {
              stroke: white;
              stroke-width: 20;
              fill: none;
            }
          }
        }
        .playIcone {
          grid-area: icon;
          margin: 10px 0px;
        }
      }
    }
  }
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .lyric {
    background: rgba(0, 0, 0, 0.1);
    grid-area: b;
    position: relative;
    width: 90%;
    height: 100%;
    overflow-y: scroll;
    p {
      color: white;
      // text-align: center;
      font-size: 18px;
    }
    > span {
      display: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > h1 {
    position: absolute;
    right: 1%;
    top: 10px;
    width: 40rem;
    color: whitesmoke;
    span {
      float: right;
      transform: rotate(90deg);
      margin-right: 5px;
    }
  }
}
.close {
  position: absolute;
  background: rgb(35, 35, 35);
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 50px;
  > div {
    width: 89%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    p {
      display: inline;
      color: white;
    }
    span {
      display: inline;
      float: right;
      width: 30px;
      height: 30px;
      position: relative;
      cursor: pointer;
      margin: 5px;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 2px;
        background: rgb(255, 255, 255);
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .blurBg {
    display: block;
    padding: 0px;
    .coverPic {
      width: 100%;
      height: 400px;
      left: 0;
      .cover {
        width: 100%;
        left: 0;
      }
    }
    .playSection {
      width: 100%;
      display: block;
      .info {
        width: 100%;
        // // margin-top: 10px;
        // display: grid;
        // grid-template-columns: 1fr 2fr;
        // position: relative;
        .slideAndPlay {
          grid-template-columns: 1fr;
          grid-template-areas:
            'icon info'
            'slider slider';
          grid-template-rows: 1fr 0.5fr;
          grid-gap: 10px;
          grid-row-gap: 0px;
          .slider {
            width: 100%;
            display: grid;
            // background: red;
            padding: 0px 10px;
            grid-template-areas:
              'progressBar progressBar'
              'curTime duration';
            // > div {
            //   width: 100%;
            //   background: blue;
            // }
            p {
              // margin: 0 10px;
              text-align: center;
              margin: 10px 0px;
              font-size: 14px;
              color: rgb(158, 158, 158);
              width: auto;
            }
            .currentTime {
              // background: blue;
              grid-area: curTime;
              text-align: start;
            }
            .duration {
              grid-area: duration;
              // background: royalblue;
              text-align: end;
            }
            .progressBar {
              margin-top: 15px;
              grid-area: progressBar;
              cursor: default;
              width: 100%;
            }
          }
          .name {
            position: relative;
            width: 100%;
            display: block;
            margin: 10px 0 0 0;
            .icons {
              width: 100%;
              padding-right: 10px;
              svg {
                width: 40%;
              }
            }
            h1 {
              text-align: start;
            }
            h3 {
              display: block;
              color: rgb(202, 202, 202);
              span {
                float: right;
                margin-top: 5px;
                font-size: 14px;
              }
            }
          }
          .playIcone {
            margin: 10px 0 0 10px;
          }
        }
      }
    }
    .lyric {
      display: block;
      position: absolute;
      background: black;
      width: 100%;
      overflow: scroll;
      top: 100%;
      bottom: 0px;
      right: 0;
      height: 46vh;
      transition: all 0.4s ease-in-out;
      > span {
        display: inline-block;
        position: sticky;
        top: 0px;
        width: 100%;
        color: white;
        // font-size: 16px;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        background: black;
        padding-left: 10px;
        line-height: 50px;
        b {
          font-size: 14px;
        }
        em {
          font-size: 12px;
          color: rgb(134, 197, 255);
        }
        span {
          font-size: 40px;
          float: right;
          margin-right: 10px;
        }
      }
      p {
        color: white;
        // text-align: end;
        margin-bottom: 5rem;
        padding: 10px;
        font-size: 14px;
      }
    }
    > h1 {
      position: relative;
      left: 0px;
      top: 0px;
      padding: 15px;
      color: white;
      // border-top: 1px solid white;
      border-bottom: 1px solid white;
      font-size: 18px;
      background: rgba(255, 255, 255, 0.1);
      width: 98%;
      margin: 0 1%;
    }
  }
  .lyric.Tshow {
    top: 56%;
  }
  .close {
    > div {
      width: 100%;
      p {
        margin-left: 10px;
      }
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
