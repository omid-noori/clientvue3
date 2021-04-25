<template>
  <div class="editContainer">
    <h1>Edit => {{ data.name }}</h1>
    <div class="grid">
      <div class="Edit">
        <div class="input-group">
          <input
            v-model="data.name"
            type="text"
            name="name"
            id="name"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="name">name</label>
        </div>

        <div class="input-group">
          <input
            v-model="data.singer"
            type="text"
            name="singer"
            id="singer"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="singer">Singer</label>
        </div>

        <div class="input-group">
          <input
            v-model="data.album"
            type="text"
            name="album"
            id="album"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="album">Ablum</label>
        </div>

        <div class="input-group">
          <input
            v-model="data.coverDesigner"
            type="text"
            name="coverDesigner"
            id="coverDesigner"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="coverDesigner">Cover Designer</label>
        </div>

        <div class="input-group">
          <input
            v-model="data.composer"
            type="text"
            name="composer"
            id="composer"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="composer">Composer</label>
        </div>
        <button @click.prevent="cancel">Cancel</button>
        <button @click.prevent="save">Save</button>
      </div>
      <textarea
        id="text"
        v-model="text"
        placeholder="Songs text ..."
      ></textarea>
    </div>
    <p v-if="p" ref="p" v-html="p"></p>
  </div>
</template>
<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
export default {
  props: {
    data: {
      type: Object,
    },
  },
  emits: ['cancel'],
  setup(props, {emit}) {
    let p = ref(null);
    const data = ref(props.data);
    let text = ref(data.value.text.replace(/<br ?\/?>/gi, '\n'));
    const Store = useStore();
    const cancel = () => {
      emit('cancel');
    };
    const save = () => {
      data.value.text = text.value;
      data.value.text = data.value.text.replace(/(\r\n|\n|\r)/gm, '<br>');
      let bodyData = JSON.stringify(data.value);
      const URL = 'http://192.168.52.101:3000/uploads/update/' + data.value._id;
      sendData(URL, bodyData);
    };
    const sendData = (URL, body) => {
      fetch(URL, {
        method: 'put',
        headers: new Headers({
          Authorization: `Bearer ${Store.state.User.token}`,
          'Content-Type': 'application/json',
        }),
        body,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          emit('cancel');
        })
        .catch((error) => console.log(error));
    };
    return {
      data,
      cancel,
      save,
      text,
      p,
    };
  },
};
</script>
<style lang="scss">
.editContainer {
  padding-bottom: 1rem;
  > h1 {
    width: 90%;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    width: 90%;
    margin: 0 auto;
    .Edit {
      .input-group {
        width: 100%;
        margin: 0 0 10px 0;
      }
      button {
        min-width: 30%;
        padding: 1rem;
        box-shadow: inset 0px 0px 15px 5px rgba(135, 207, 235, 0.479);
        background: none;
        border: none;
        margin: 0 10px 0 0;
      }
    }
    textarea {
      width: 100%;
      height: 70vh;
      padding: 10px;
      font-size: 16px;
      resize: none;
      border: none;
      text-align: center;
      box-shadow: inset 0px 0px 100px 5px rgba(135, 207, 235, 0.479);

      &:focus,
      &:active {
        outline: none;
      }
      &::-webkit-scrollbar {
        width: 3px;
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(135, 206, 235, 0.3);
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        background: skyblue;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .editContainer {
    > h1 {
      width: 98%;
      padding: 10px;
    }
    .grid {
      grid-template-columns: 1fr;
      width: 98%;
      textarea {
        grid-row: 1/2;
        text-align: start;
        height: 400px;
      }
      .Edit {
        button {
          margin: 0;
          min-width: 48%;
          margin: 1%;
        }
      }
    }
  }
}
</style>
