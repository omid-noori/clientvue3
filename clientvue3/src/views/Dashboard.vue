<template>
  <div v-if="isLoading" class="loading"></div>
  <div
    v-if="uploadMusic === false"
    class="upload"
    @click="toggleSection('Uploads')"
  >
    <img src="../assets/music-upload.svg" alt="Upload" />
  </div>
  <h1 class="postCon" v-if="uploadMusic === false">
    {{ $store.state.User.userName }}/dashboard/Posts
  </h1>
  <div v-if="!isLoading && uploadMusic" class="container">
    <h1 v-if="uploadMusicForm">
      {{ $store.state.User.userName }} : {{ Data.name }}
      <span @click.prevent="cancel">Cancel</span>
    </h1>
    <form v-if="uploadMusicForm && !isLoading">
      <div class="input-group">
        <input
          @keydown="removeError"
          v-model="Data.name"
          type="text"
          id="name"
          autocomplete="off"
          required
        />
        <label class="placeholder" for="name">Enter song name</label>
      </div>

      <div class="input-group">
        <input
          @keydown="removeError"
          v-model="Data.singer"
          type="text"
          name="singer"
          id="singer"
          autocomplete="off"
          required
        />
        <label class="placeholder" for="singer">Singer name</label>
      </div>

      <div class="input-group">
        <input
          @keydown="removeError"
          v-model="Data.album"
          type="text"
          name="album"
          id="album"
          autocomplete="off"
          required
        />
        <label class="placeholder" for="album">Albume name</label>
      </div>

      <div class="input-group">
        <input
          @keydown="removeError"
          v-model="Data.composer"
          type="text"
          name="composer"
          id="composer"
          autocomplete="off"
          required
        />
        <label class="placeholder" for="composer">Composer name</label>
      </div>

      <div class="input-group">
        <input
          @keydown="removeError"
          v-model="Data.coverDesigner"
          type="text"
          name="coverDesigner"
          id="coverDesigner"
          autocomplete="off"
          required
        />
        <label class="placeholder" for="coverDesigner"
          >Cover designer name</label
        >
      </div>

      <textarea
        @keydown="removeError"
        v-model="textArea"
        placeholder="Songs text ..."
        id="text"
        cols="30"
        rows="10"
        wrap="off"
      ></textarea>

      <input
        class="cover"
        type="file"
        accept="Image/jpeg, Image/png"
        @change="selectFile"
      />
      <input
        class="music"
        type="file"
        accept="audio/mp3"
        @change="selectFile"
      />

      <div
        v-if="selectedCover"
        class="img"
        :style="{backgroundImage: 'url(' + selectedCover + ')'}"
        @click="toggleCss"
      ></div>

      <div
        @click.prevent="selectInput('.cover')"
        class="img else"
        v-else="!selectedCover"
      >
        Click here to choose the cover
      </div>

      <div class="music" @click.prevent="selectInput('.music')">
        <h3 class="musicName">Choose Music</h3>
        <p v-if="music" class="time"></p>
        <div
          class="playIcone"
          :class="{play: isPlaying}"
          v-if="music"
          @click="play"
        ></div>
      </div>

      <div class="security">
        <p class="response">
          By accepting this session you allow website to use your music in the
          main page.
        </p>
        <div class="public">
          <p>Access Public</p>
          <input @change="checked" type="checkbox" />
        </div>

        <button @click.prevent="Upload">Upload</button>
      </div>
    </form>
  </div>
  <div v-if="UploadMessage" class="message" :class="{error: messageError}">
    <div class="content">
      <svg
        v-if="messageError == false"
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <svg
        class="checkmark"
        v-if="messageError"
        viewBox="0 0 496 496"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m248 8c-132.546875 0-240 107.453125-240 240s107.453125 240 240 240 240-107.453125 240-240-107.453125-240-240-240zm107.480469 347.480469-107.480469-107.480469-107.480469 107.480469 107.480469-107.480469-107.480469-107.480469 107.480469 107.480469 107.480469-107.480469-107.480469 107.480469zm0 0"
          fill="#ff6243"
        />
        <g fill="#231f20">
          <path
            d="m248 0c-136.964844 0-248 111.035156-248 248s111.035156 248 248 248 248-111.035156 248-248c-.160156-136.902344-111.097656-247.839844-248-248zm0 480c-128.128906 0-232-103.871094-232-232s103.871094-232 232-232 232 103.871094 232 232c-.140625 128.070312-103.929688 231.859375-232 232zm0 0"
          />
          <path
            d="m361.136719 134.863281c-3.125-3.121093-8.1875-3.121093-11.3125 0l-101.824219 101.824219-101.824219-101.824219c-2.007812-2.078125-4.984375-2.914062-7.78125-2.179687-2.796875.730468-4.980469 2.914062-5.710937 5.710937-.734375 2.796875.101562 5.773438 2.179687 7.78125l101.824219 101.824219-101.824219 101.824219c-2.078125 2.007812-2.914062 4.984375-2.179687 7.78125.730468 2.796875 2.914062 4.980469 5.710937 5.710937 2.796875.734375 5.773438-.101562 7.78125-2.179687l101.824219-101.824219 101.824219 101.824219c3.140625 3.03125 8.128906 2.988281 11.214843-.097657 3.085938-3.085937 3.128907-8.074218.097657-11.214843l-101.824219-101.824219 101.824219-101.824219c3.121093-3.125 3.121093-8.1875 0-11.3125zm0 0"
          />
        </g>
      </svg>

      <div>
        <h1>{{ UploadMessage }}</h1>
        <button @click="closeMsg">
          Close
        </button>
      </div>
    </div>
  </div>

  <UserPosts
    v-if="userPosts && uploadMusicForm === false"
    :data="userPosts"
    @edit="onEdit"
    @cancel="cancel"
  />
</template>

<script>
import {ref, reactive, watchEffect} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import axios from 'axios';
import UserPosts from '../components/UserPosts';
export default {
  components: {
    UserPosts,
  },
  setup() {
    let Data = reactive({
      name: null,
      album: null,
      singer: null,
      composer: null,
      coverDesigner: null,
      text: null,
      public: false,
      duration: null,
      size: null,
    });
    const textArea = ref(null);

    const userPosts = ref(null);
    const route = useRoute();
    const Router = useRouter();
    const Store = useStore();

    let UploadMessage = ref(null);
    let messageError = ref(false);
    let uploadMusic = ref(false);
    let isLoading = ref(false);
    let uploadMusicForm = ref(false);
    const cover = ref(null);
    const music = ref(null);
    const selectedCover = ref(null);
    const serverURL = 'https://rapgap.herokuapp.com';

    let isPlaying = ref(false);
    const audio = new Audio();
    const blob = window.URL || window.webkitURL;

    const convertTime = (file) => {
      const reader = new FileReader();
      const audioElement = document.createElement('audio');
      document.title = file.name.split('.mp3')[0];
      let time;
      reader.onload = (event) => {
        audioElement.src = event.target.result;
        let timer = setInterval(() => {
          if (audioElement.readyState === 4) {
            time = audioElement.duration;

            let mins = Math.floor(time / 60);
            if (mins < 10) {
              mins = '0' + String(mins);
            }
            let secs = Math.floor(time % 60);
            if (secs < 10) {
              secs = '0' + String(secs);
            }
            const size = file.size / 1024 / 1024;
            const el = document.querySelector('.time');
            el.textContent =
              mins + ':' + secs + ' , ' + size.toFixed(2) + ' MB';
            Data.duration = time;
            Data.size = size.toFixed(2) + ' MB';
            clearInterval(timer);
          }
        }, 1000);
      };
      reader.readAsDataURL(file);
    };
    const play = (event) => {
      event.stopPropagation();
      if (!blob) {
        console.log('Not Supported blob');
      } else {
        if (music.value) {
          const musicSrc = blob.createObjectURL(music.value);
          if (audio.src) {
            if (isPlaying.value) {
              isPlaying.value = false;
              audio.pause();
            } else {
              isPlaying.value = true;
              audio.play();
            }
          } else {
            audio.src = musicSrc;
            isPlaying.value = true;
            audio.load();
          }
        } else {
          console.log('select a music');
        }
      }
      audio.onended = () => {
        isPlaying.value = false;
      };

      audio.onpause = () => {
        isPlaying.value = false;
      };
      audio.onplay = () => {
        isPlaying.value = true;
      };
    };

    const createBase64Image = (data) => {
      const render = new FileReader();
      render.onload = (event) => {
        console.log(event, data);
        selectedCover.value = event.target.result;
      };
      render.readAsDataURL(data);
    };

    const changeAudioSrc = (file) => {
      isPlaying.value = false;
      audio.src = blob.createObjectURL(file);
      audio.load();
    };

    const selectFile = (event) => {
      // Data.cover = event.target.files[0];
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          cover.value = file;
          console.log(cover.value);
          createBase64Image(cover.value);
        } else if (file.type === 'audio/mpeg') {
          const musicName = document.querySelector('.musicName');
          music.value = file;
          musicName.textContent = music.value.name.split('.mp3')[0];
          changeAudioSrc(file);
          convertTime(file);

          const musicErrorClass = document.querySelector('div.music.error');
          if (musicErrorClass) {
            musicErrorClass.classList.remove('error');
          }
        } else {
          console.log('Do not support file type, choose another one!');
        }
      } else {
        console.log('Choose a file');
      }
    };
    const selectInput = (cls) => {
      document.querySelector(cls).click();
    };
    const toggleCss = (event) => {
      const style = getComputedStyle(event.target);
      console.log(style.backgroundSize);
      if (style.backgroundSize === 'contain') {
        event.target.style.backgroundSize = 'cover';
      } else {
        event.target.style.backgroundSize = 'contain';
      }
    };
    const toggleSection = (show, e) => {
      if (show === 'Uploads') {
        uploadMusic.value = true;
        uploadMusicForm.value = true;
      } else {
        uploadMusicForm.value = false;
      }
      finishUpload();
    };
    const Upload = (event) => {
      event.preventDefault();
      Data.text = textArea.value.replace(/(\r\n|\n|\r)/gm, '<br>');

      const body = [cover.value, music.value, JSON.stringify(Data)];
      const URL = serverURL + '/uploads';
      const formData = new FormData();
      const errorMsg = document.querySelector('.response');

      const DataArray = Object.values(Data);
      const keyValues = Object.keys(Data);
      keyValues.splice(5);
      DataArray.splice(5);

      DataArray.forEach((element, index) => {
        if (element === null || element === '') {
          let currentElement = keyValues[index];
          let el = document.getElementById(currentElement);
          el.parentElement.classList.add('error');
          errorMsg.innerHTML = `pelase fill the red fields!`;
        }
      });
      if (textArea.value === null || textArea.value === '') {
        const elem = document.getElementById('text');
        elem.classList.add('error');
      }
      if (Data.text === null || Data.text === '') {
        const elem = document.getElementById('text');
        elem.classList.add('error');
      }

      if (selectedCover.value === null || selectedCover.value === '') {
        const image = document.querySelector('div.else');
        image.classList.add('error');
        console.log(image);
      }

      if (music.value === null || music.value === '') {
        const musicEl = document.querySelector('div.music');
        console.log(musicEl);
        musicEl.classList.add('error');
      } else {
        console.log(Data.text);
        uploadMusic.value = false;
        isLoading.value = true;

        body.forEach((file) => {
          return formData.append('data', file);
        });

        const headers = {
          'Content-Type':
            'multipart/form-data; charset=utf-8; boundary=' +
            Math.random()
              .toString()
              .substr(2),
          Authorization: `Bearer ${Store.state.User.token}`,
        };
        const loadingAndMessage = (message, duration, status) => {
          setTimeout(() => {
            if (status === 200) {
              uploadMusic.value = true;
              isLoading.value = false;
              UploadMessage.value = message;
            } else {
              uploadMusic.value = true;
              isLoading.value = false;
              UploadMessage.value = message;
              messageError.value = true;
            }
          }, duration);
        };

        axios
          .post(URL, formData, {headers: headers})
          .then((res) => {
            console.log(res);
            loadingAndMessage(res.data.message, 3000, 200);
          })
          .catch((error) => {
            if (error.response.data.err.name === 'TokenExpiredError') {
              console.log(error.response.data.err.name);
              Store.commit('setUser', null);
              Store.commit('setAuthentication', false);
              Router.push('/login');
            }
            console.log(error.response.data.message);
            loadingAndMessage(error.response.data.message, 3000, 400);
            document.querySelector('.message').classList.add('error');
          });
      }
    };
    const checked = (event) => {
      event.stopPropagation();
      Data.public = event.target.checked;
    };
    const removeError = (e) => {
      const input = e.target.parentElement;
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
      if (e.target.classList.contains('error')) {
        e.target.classList.remove('error');
      }
    };
    const finishUpload = () => {
      UploadMessage.value = null;
      uploadMusic.value = true;
      isLoading.value = false;
      Data.name = null;
      Data.album = null;
      Data.singer = null;
      Data.composer = null;
      Data.coverDesigner = null;
      Data.text = null;
      textArea.value = null;
      Data.duration = null;
      Data.size = null;
      Data.public = false;
      selectedCover.value = null;
      music.value = null;
      console.log(Data);
    };
    watchEffect(() => {
      if (route.path != '/dashboard') {
        if (isPlaying.value === true) {
          toggleSection();
        }
      }
    });
    // onMounted(() => {

    // });
    const getUserData = (url, cb) => {
      const headers = {
        Authorization: `Bearer ${Store.state.User.token}`,
      };
      axios
        .get(url, {headers: headers})
        .then((res) => {
          console.log(res.data);
          cb(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (userPosts.value === null) {
      const url = serverURL + '/uploads/userPosts';
      getUserData(url, (data) => {
        userPosts.value = data;
      });
    }
    const onEdit = () => {
      console.log('Edit');
      uploadMusic.value = !uploadMusic.value;
      uploadMusicForm.value = false;
    };
    const cancel = () => {
      console.log(userPosts.value);
      uploadMusic.value = false;
      uploadMusicForm.value = false;
    };
    const closeMsg = () => {
      UploadMessage.value = false;
      messageError.value = false;
    };
    return {
      Data,
      selectFile,
      uploadMusic,
      selectInput,
      selectedCover,
      toggleCss,
      Upload,
      play,
      toggleSection,
      finishUpload,
      music,
      isPlaying,
      isLoading,
      checked,
      removeError,
      UploadMessage,
      textArea,
      userPosts,
      onEdit,
      cancel,
      uploadMusicForm,
      messageError,
      closeMsg,
    };
  },
};
</script>

<style lang="scss">
.upload {
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  // background: darkgrey;
  img {
    width: 60px;
    cursor: pointer;
  }
}
.postCon {
  width: 90%;
  margin: 10px auto;
  font-family: fantasy;
}
.container {
  width: 90%;
  margin: 0 auto;
  > h1 {
    span {
      float: right;
      cursor: pointer;
      // background: rgba($color: #000000, $alpha: 0.2);
      color: tomato;
      &:hover {
        color: red;
      }
    }
  }

  .header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 10px;
    grid-gap: 10px;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      cursor: pointer;
      h1 {
        color: blue;
        font-size: 20px;
        margin-left: 10px;
      }
      width: 100%;
      img {
        height: 40px;
        margin: 5px;
      }
      &.active {
        border: 1px solid black;
        border-radius: 10px;
        // box-shadow: inset 0px 0px 20px 5px rgba(0, 0, 255, 0.3);
        // padding: 0.5rem;
        > h1 {
          color: black;
          font-size: 20px;
        }
        &:hover {
          background: rgba(135, 207, 235, 0.4);
          box-shadow: 0px 0px 5px 5px rgba(135, 206, 235, 0.5);
        }
      }
      &:hover {
        background: rgba(135, 207, 235, 0.4);
        box-shadow: 0px 0px 5px 5px rgba(135, 206, 235, 0.5);
        border-radius: 10px;
      }
    }
  }
  input[type='file'] {
    display: none;
  }
  form {
    // background: skyblue;
    position: relative;
    height: auto;
    margin-top: 10px;
    textarea {
      display: block;
      width: 40%;
      height: auto;
      min-height: 200px;
      margin-top: 10px;
      resize: none;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid skyblue;
      background: rgba(135, 206, 235, 0.2);
      color: black;
      &::placeholder {
        color: black;
      }
    }
  }
  .img {
    width: 59%;
    height: 50vh;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(135, 206, 235, 0.2);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .img.else {
    border: 0.1px solid skyblue;
    font-size: 26px;
    font-weight: bold;
    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-image: url('../assets/picIcone.svg');
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(15px);
    }
  }
  .music {
    border: 1px solid skyblue;
    border-radius: 5px;
    padding: 1rem;
    margin: 10px 0px;
    max-width: 40%;
    height: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: inset 0px 0px 100px 5px rgba(135, 206, 235, 0.3);
    h1 {
      margin: 0px;
    }

    p {
      color: blue;
    }
  }

  .security {
    width: 59%;
    height: 37.2%;
    // background: rgba(81, 229, 235, 0.3);
    float: right;
    position: absolute;
    top: calc(100vh - (50vh - 10px));
    right: 0px;
    border-radius: 5px;
    > p {
      padding: 1rem;
      background: rgba(240, 128, 128, 0.3);
      color: red;
    }
    .public {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(135, 207, 235, 0.3);
      p {
        margin-left: 1rem;
        font-size: 16px;
      }
    }
    button {
      padding: 1rem 1.5rem;
      width: 25%;
      font-size: 18px;
      background: rgba(135, 206, 235, 0.4);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 10px 0px;
    }
  }
  .error {
    border: 1px solid red;
    box-shadow: inset 0px 0px 100px 5px rgba(255, 99, 71, 0.6);
    color: red;
  }
}
input[type='checkbox'] {
  display: block;
  position: relative;
  width: 80px;
  height: 40px;
  -webkit-appearance: none;
  background: rgba(135, 206, 235, 0.3);
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgb(62, 200, 255);
  transition: 0.5s;
  margin: 1rem;
  float: right;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    top: 0px;
    left: 0px;
    transition: 0.5s;
    background: skyblue;
    transform: scale(1.1);
    box-shadow: 0 0px 5px skyblue;
  }
  &:checked {
    background: rgba(0, 128, 0, 0.3);
  }
  &:checked::before {
    left: 40px;
    background: green;
  }
}
.playIcone {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 1);
  position: relative;
  &:hover {
    border: 1px solid white;
    background: rgba(0, 0, 0, 0.6);
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: white;
    clip-path: polygon(0 0, 0 100%, 100% 50%);
  }
}
.playIcone.play {
  border: 1px solid rgba(0, 225, 255, 0.6);
  animation: playing;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 2s;
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 50px;
    top: 50%;
    left: 65%;
    transform: translate(-50%, -50%);
    background: white;
  }
  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 50px;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
    background: white;
    clip-path: none;
  }
}
@keyframes playing {
  from {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  to {
    background: rgba(135, 206, 235, 0.4);
    border: 1px solid rgba(0, 225, 255, 0.6);
  }
}
.message {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 0;
  background: rgba(0, 128, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  z-index: 100;
  .content {
    width: 50%;
    height: 50vh;
    background: rgba(255, 255, 255, 1);
    // backdrop-filter: blur(30px);
    display: grid;
    grid-template-columns: 1fr 2fr;
    overflow: hidden;
    position: relative;
    // grid-gap: 10px;
    // grid-template-columns: 1fr 2fr;
    .checkmark {
      $curve: cubic-bezier(0.65, 0, 0.45, 1);
      $color--green: #2e6b0091;
      width: 150px;
      height: 150px;
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.8));
      border-radius: 50%;
      display: block;
      stroke-width: 2;
      stroke: $color--green;
      stroke-miterlimit: 10;
      margin: 45% auto 5% auto;
      box-shadow: inset 0px 0px 0px $color--green;
      animation: fill 0.4s ease-in-out 0.4s forwards,
        scale 0.3s ease-in-out 0.9s both;
      .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s $curve 0.8s forwards;
        stroke: rgba(255, 255, 255, 0.6);
      }
      .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: $color--green;
        fill: none;
        animation: stroke 0.6s $curve forwards;
      }
      @keyframes stroke {
        100% {
          stroke-dashoffset: 0;
        }
      }
      @keyframes scale {
        0%,
        100% {
          transform: none;
        }
        50% {
          transform: scale3d(1.1, 1.1, 1);
        }
      }
      @keyframes fill {
        100% {
          box-shadow: inset 0px 0px 0px 75px $color--green;
        }
      }
    }
    > div {
      display: grid;
      border-left: 5px solid green;
      width: 100%;
      height: 100%;
      background: rgba(0, 116, 0, 0.1);
      justify-content: center;
      align-items: center;

      h1 {
        color: black;
        text-align: center;
        user-select: none;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button {
        padding: 1rem 2rem;
        // width: 200px;
        height: 4rem;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid black;
        outline: none;
        margin: 0 auto;
        border-radius: 5px;
        font-size: 16px;
        &:hover {
          background: green;
          color: white;
          border: none;
        }
      }
    }
  }
}
.message.error {
  background: rgba(255, 0, 0, 0.486);
  z-index: 100;
  > div {
    h1 {
      color: red;
    }
  }
}
.input-group {
  position: relative;
  width: 40%;
  color: black;
  margin-bottom: 10px;
  border-radius: 5px;
  .placeholder {
    position: absolute;
    color: black;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: text;
    user-select: none;
    transition: all 0.2s ease-in-out;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  input {
    appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    outline: none;
    width: 100%;
    height: 40px;
    font-size: 18px;
    padding-left: 10px;
    color: black;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    background: rgba(135, 206, 235, 0.2);
    box-shadow: none;

    &:focus + .placeholder,
    &:valid + .placeholder {
      top: 0px;
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      background: rgba(0, 0, 0, 0);
      z-index: 1;
      padding: 0 3px;
    }
    &:focus {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    &:valid {
      box-shadow: 0 0 0px 1000px rgba(54, 255, 50, 0.2) inset;
      color: complement($color: #001f3f);
      border: 1px solid rgba(0, 255, 0, 0.4);
    }
  }
}
.input-group.password {
  &::before {
    content: '👁️';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
    font-size: 18px;
  }
}
.input-group.userName {
  &::before {
    content: url('../assets/User.svg');
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
    font-size: 18px;
  }
}
@media screen and (max-width: 900px) {
  .postCon {
    width: 100%;
    font-size: 18px;
    margin: 10px;
  }
  .upload {
    right: 1rem;
    bottom: 1rem;
  }
  .container {
    width: calc(100% - 20px);
    // margin: 10px;
    form {
      textarea {
        width: 100%;
        margin-bottom: 10px;
      }
    }
    > h1 {
      padding-top: 0.5rem;
      font-size: 18px;
      span {
        display: block;
      }
    }
    .img {
      position: relative;
      cursor: default;

      img {
        position: absolute;
        bottom: 0px;
        height: 100;
      }
      h1 {
        position: absolute;
        top: 2.5rem;
        z-index: 1;
        text-align: center;
      }
    }
    .music {
      display: block;
      max-width: 100%;
      height: auto;
      min-height: 80px;
      margin-bottom: 10px;
      cursor: default;
      position: relative;
      padding: 0.5rem 10px;
      h3 {
        padding: 1.2rem 0px;
        text-align: center;
      }
      p {
        position: absolute;
        right: 1.5rem;
        bottom: 25%;
      }
      div {
        width: 100px;
        height: 100px;
        margin: 0.5rem 0px;
      }
    }
    .input-group {
      width: 100%;
      position: relative;
    }
    button {
      width: calc(50% - 5px);
    }
    .first {
      margin-right: 10px;
    }
    .img {
      height: 60vh;
      width: 100%;
    }
    .img.else {
      color: rgb(0, 0, 0);
      height: 60vh;
      &::before {
        background-size: cover;
        background-position: center;
      }
    }
    .security {
      position: relative;
      width: 100%;
      height: 30vh;
      top: 0px;
      margin-bottom: 70px;
      button {
        width: 50%;
      }
      input[type='checkbox'] {
        cursor: default;
      }
    }
  }
  .message {
    height: 100%;
    .content {
      width: 99%;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      .checkmark {
        margin: 8% auto;
      }
      > div {
        button {
          margin-bottom: 10px;
          height: 4rem;
        }
        h1 {
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
