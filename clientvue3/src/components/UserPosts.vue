<template>
  <div v-if="!close" class="posts">
    <div v-if="data.length === 0">
      <h1>You have no uploaded post yet.</h1>
    </div>
    <div v-for="post in data" :key="post._id">
      <div @click.prevent="edit(post, $event)" :style="background(post)"></div>
    </div>
  </div>

  <editMusic
    @finshed="onFinish"
    @cancel="onCancel"
    v-if="EditSelectedPost && close"
    :data="EditSelectedPost"
  />
  <div v-if="controller" class="window" @click="edit(null, $event)"></div>
  <div
    v-if="currentSelectedPost && controller"
    class="controller"
    :style="{
      top: position.top + 'px',
      left: position.left + 'px',
      bottom: position.bottom + 'px',
    }"
  >
    <div class="name">
      <p>{{ currentSelectedPost.name }}</p>
      <p>{{ fromNow(currentSelectedPost.created) }}</p>
    </div>
    <ul @click="editInit">
      <label>Edit</label>
      <img src="../assets/edit.svg" alt="" />
    </ul>
    <ul @click.prevent="deleteMsg">
      <label>Delete</label>
      <img src="../assets/delete.svg" alt="" />
    </ul>
    <ul>
      <label for="checkbox">Access</label>
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        v-model="currentSelectedPost.public"
        @change="publicChange"
      />
    </ul>
  </div>
  <div v-if="uploadMessage" class="message" :class="{error: messageError}">
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
        <h1>{{ uploadMessage }}</h1>
        <div>
          <button @click="finishUpload">
            Close section
          </button>
          <button v-if="deleteBtn" @click.prevent="deleteInit">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" class="loading"></div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import editMusic from './EditMusic';
import dayJs from 'dayjs';
import relatveTime from 'dayjs/plugin/relativeTime';
export default {
  components: {
    editMusic,
  },
  props: {
    data: {
      type: Array,
    },
  },
  emits: ['cancel', 'edit'],
  setup(props, {emit}) {
    const Store = useStore();
    const serverURL = 'http://localhost:3000';
    const URL = `${serverURL}/uploads/media/`;
    const data = ref(props.data);
    let close = ref(false);
    let uploadMessage = ref(false);
    let messageError = ref(false);
    let loading = ref(false);
    let deleteBtn = ref(false);

    const EditSelectedPost = ref(null);
    dayJs.extend(relatveTime);

    let controller = ref(false);
    let currentSelectedPost = ref(null);
    let position = ref({
      top: 0,
      left: 0,
      bottom: 0,
    });
    const edit = (post, e) => {
      if (loading.value) {
        return;
      } else {
        currentSelectedPost.value = post;
        controller.value = !controller.value;
        if (window.innerWidth < 780) {
          position.value.bottom = 0;
          position.value.top = 'auto';
          position.value.left = 'auto';
        } else {
          position.value.top = e.pageY - 60;
          position.value.left = e.pageX;
          position.value.bottom = 'auto';
          console.log(position.value);
        }
      }
    };
    const editInit = () => {
      console.log(currentSelectedPost.value);
      if (currentSelectedPost.value != null) {
        EditSelectedPost.value = currentSelectedPost.value;
        close.value = true;
        emit('edit');
        controller.value = false;
      }
    };
    const onCancel = () => {
      close.value = false;
      EditSelectedPost.value = null;
      emit('cancel');
      console.log(data.value);
    };

    const fromNow = (date) => {
      const currentDate = dayJs(date);
      const fromNo = dayJs().to(currentDate);
      return fromNo;
    };
    let deleteMsg = () => {
      messageError.value = true;
      deleteBtn.value = true;
      uploadMessage.value = `Are you Sure You want to delete "${currentSelectedPost.value.name}"`;
    };
    const deleteInit = () => {
      messageError.value = false;
      uploadMessage.value = false;
      loading.value = true;
      const id = currentSelectedPost.value._id;
      const deleteURL = `${serverURL}/uploads/delete/${id}`;
      currentSelectedPost.value = null;

      fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Store.state.User.token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setTimeout(() => {
            data.value.filter((item, index) => {
              if (item._id === id) {
                data.value.splice(index, 1);
              }
              uploadMessage.value = 'Successfully deleted post!';
              loading.value = false;
              controller.value = false;
              deleteBtn.value = false;
            });
          }, 3000);
        })
        .catch((error) => {
          uploadMessage.value = 'Something went wrong!';
          messageError.value = true;
          loading.value = false;
          controller.value = false;
          deleteBtn.value = false;
        });
    };
    const onFinish = () => {
      close.value = false;
      EditSelectedPost.value = null;
      emit('finish');
    };
    const background = (post) => {
      return {backgroundImage: 'url(' + URL + post.cover.Key + ')'};
    };
    const finishUpload = () => {
      uploadMessage.value = false;
      messageError.value = false;
      return true;
    };
    const publicChange = () => {
      const updateURL = `${serverURL}/uploads/update/${currentSelectedPost.value._id}`;
      console.log(currentSelectedPost.value.public);
      fetch(updateURL, {
        method: 'put',
        headers: new Headers({
          Authorization: `Bearer ${Store.state.User.token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({public: currentSelectedPost.value.public}),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error));
    };
    return {
      data,
      URL,
      edit,
      EditSelectedPost,
      fromNow,
      onCancel,
      controller,
      currentSelectedPost,
      editInit,
      deleteMsg,
      position,
      close,
      onFinish,
      background,
      uploadMessage,
      messageError,
      finishUpload,
      loading,
      deleteBtn,
      deleteInit,
      publicChange,
    };
  },
};
</script>
<style scoped lang="scss">
div.message > div > div > div {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
  }
}
.posts {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  max-width: 90%;
  margin: 0px auto;
  overflow: hidden;
  > div {
    position: relative;
    // border: 1px solid black;
    > div {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      // background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      height: 25vh;
      &:hover {
        border: 1px dashed black;
      }
    }
    h1 {
      font-size: 18px;
      // text-align: center;
      // padding: 10px;
    }
  }
}
.window {
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  // z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
}
.controller {
  position: absolute;
  background: rgb(0, 0, 0);
  grid-row: auto;
  transition: all 0.3s ease-in-out;
  z-index: +1;
  width: 300px;
  .name {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    p {
      color: white;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-top: 1px solid white;
    list-style-type: none;
    cursor: pointer;
    label {
      color: white;
      width: 100%;
      cursor: pointer;
    }
    img {
      width: 20px;
    }
    input[type='checkbox'] {
      margin: 0px;
      position: absolute;
      right: 10px;
      width: 40px;
      height: 20px;
      cursor: default;
      &::before {
        width: 20px;
        height: 20px;
      }
      &:checked::before {
        left: 20px;
        background: green;
      }
    }
  }
}
// .controller.open {
//   bottom: 0;
// }
@media screen and (max-width: 780px) {
  div.message > div > div {
    > div {
      button {
        padding: 0px 10px;
      }
    }
    h1 {
      font-size: 18px;
    }
  }
  .controller {
    bottom: -160px;
    width: 100vw;
    height: 200px;
  }
  .posts {
    max-width: calc(100% - 20px);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    > div {
      > div {
        height: 140px;
        background-size: contain;
        background-position: center;
        border: none;
      }
    }
  }
}
</style>
