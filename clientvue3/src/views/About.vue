<template>
  <div class="bg">
    <div class="about">
      <div v-if="AdminData" class="picture">
        <h1>{{ AdminData.firstName }} {{ AdminData.lastName }}</h1>
        <img
          v-if="adminPictureURL"
          :src="adminPictureURL"
          alt="Admin Picture"
        />
      </div>
      <div class="description" v-html="markdown"></div>
      <div class="contact">
        <h1>Contact Me Via</h1>
        <div class="icons">
          <img
            @click="openURL('instagram')"
            src="../assets/instagram.svg"
            alt="Instagram Profile URL"
          />
          <img
            @click="openURL('facebook')"
            src="../assets/facebook.svg"
            alt="FaceBook Profile URL"
          />
          <img
            @click="openURL('twitter')"
            src="../assets/twitter.svg"
            alt="Twitter Profile URL"
          />
          <img
            @click="openURL('email')"
            src="../assets/gmail.svg"
            alt="Email Adrress"
          />
        </div>
        <h4>Or send me a message</h4>
        <div class="input-group">
          <input
            @click="message.name.error = true"
            :class="{error: message.name.error}"
            v-model="message.name.value"
            type="text"
            id="name"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="name">Name</label>
        </div>
        <div class="input-group">
          <input
            @click="message.email.error = true"
            :class="{error: message.email.error}"
            v-model="message.email.value"
            type="email"
            id="email"
            autocomplete="off"
            required
          />
          <label class="placeholder" for="email">Email</label>
        </div>
        <div class="input-group">
          <textarea
            @click="message.textarea.error = true"
            :class="{error: message.textarea.error}"
            v-model="message.textarea.value"
            id="name"
            autocomplete="off"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button @click.prevent="sendMessage">Send</button>
      </div>
    </div>
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
        <button v-if="uploadMessage" @click="finishUpload">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {computed, ref} from 'vue';
import marked from 'marked';
export default {
  setup() {
    let message = ref({
      name: {
        value: null,
        error: false,
      },
      email: {
        value: null,
        error: false,
      },
      textarea: {
        value: null,
        error: false,
      },
    });
    const AdminData = ref(null);
    const serverURL = 'http://192.168.52.101:3000';
    const adminPictureURL = ref(null);
    const uploadMessage = ref(false);
    const messageError = ref(false);
    const renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
      const link = marked.Renderer.prototype.link.apply(this, arguments);
      return link.replace('<a', "<a target='_blank'");
    };
    marked.setOptions({renderer});
    fetch(serverURL + '/about')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        AdminData.value = data;
        adminPictureURL.value = `${serverURL}/uploads/media/${AdminData.value.profilePic}`;
      })
      .catch((error) => console.error(error));
    const markdown = computed(() => {
      if (AdminData.value) {
        return marked(AdminData.value.description);
      }
      return marked('# Hello');
    });
    const sendMessage = () => {
      const body = {
        name: message.value.name.value,
        email: message.value.email.value,
        message: message.value.textarea.value,
      };
      console.log(body);
      fetch(serverURL + '/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          messageError.value = false;
          uploadMessage.value =
            'Successfuly reseved message. thanks for your message';
        })
        .catch((error) => {
          messageError.value = true;
          uploadMessage.value = 'Something went wrong';
        });
    };
    const openURL = (src) => {
      if (src == 'instagram') {
        window.open(AdminData.value.contacts.instagram, '_blank');
      } else if (src == 'facebook') {
        window.open(AdminData.value.contacts.facebook, '_blank');
      } else if (src == 'twitter') {
        window.open(AdminData.value.contacts.twitter, '_blank');
      } else {
        const mail = document.createElement('a');
        mail.target = '_blank';
        mail.href = `mailto:${AdminData.value.email}`;
        mail.click();
      }
    };
    const finishUpload = () => {
      uploadMessage.value = false;
      messageError.value = false;
      message.value.name.value = null;
      message.value.email.value = null;
      message.value.textarea.value = null;
      message.value.name.error = false;
      message.value.email.error = false;
      message.value.textarea.error = false;
    };
    return {
      markdown,
      adminPictureURL,
      AdminData,
      message,
      sendMessage,
      openURL,
      uploadMessage,
      messageError,
      finishUpload,
    };
  },
};
</script>
<style lang="scss">
.bg {
  background: rgba(0, 0, 0, 0.9);
  a {
    text-decoration: none;
    color: #0366d6;
    &:hover {
      color: tomato;
    }
    &:visited {
      color: gray;
    }
  }
  .about {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 20px;
    width: 90%;
    margin: 0 auto;

    .contact {
      display: block;
      background-color: rgba(0, 81, 255, 0.1);

      padding: 10px;
      h1 {
        margin: 10px 0;
        color: white;
        // text-align: center;
      }
      h4 {
        color: white;
      }
      .icons {
        padding-bottom: 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        img {
          width: 30%;
          margin: 0 auto;
          cursor: pointer;
        }
      }
      .input-group {
        width: 100%;
        margin: 10px 0px;
        input {
          color: white;
        }
        input.error,
        textarea.error {
          &:required:invalid {
            box-shadow: 0 0 0px 1000px rgba(255, 50, 50, 0.2) inset;
            color: complement($color: #3f0000);
            border: 1px solid rgb(255, 0, 0);
            + .placeholder {
              top: 0;
            }
          }
        }
        .placeholder {
          color: white;
          font-size: 14px;
        }
        textarea {
          width: 100%;
          height: 150px;
          font-size: 16px;
          padding: 10px;
          outline: none;
          background: none;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background: rgba(135, 206, 235, 0.2);
          resize: none;
          &::placeholder {
            color: white;
          }
          &:valid {
            box-shadow: 0 0 0px 1000px rgba(54, 255, 50, 0.2) inset;
          }
          &:required {
            box-shadow: none;
          }
        }
      }
      button {
        padding: 0.5rem 2rem;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid black;
        border-radius: 5px;
        font-size: 16px;
        color: rgb(255, 255, 255);
        cursor: pointer;
        margin-bottom: 2rem;
        &:hover {
          border-color: white;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
    .picture {
      background-color: rgba(0, 81, 255, 0.1);
      padding: 10px;
      img {
        object-fit: contain;
        object-position: center;
        width: 100%;
      }
      h1 {
        margin: 10px 0px;
        color: white;
      }
    }
    .description {
      height: calc(100vh - 60px);
      color: rgb(255, 255, 255);
      overflow: scroll;
      overflow-x: hidden;
      background-color: rgba(0, 81, 255, 0.05);

      padding: 10px;
      &::-webkit-scrollbar {
        width: 0.2em;
        cursor: pointer;
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
        cursor: pointer;
        outline: 1px solid white;
      }
      &::-webkit-scrollbar-thumb {
        background-color: skyblue;
        outline: 1px solid black;
        cursor: pointer;
      }
      h1,
      h2,
      h3 {
        margin: 10px 0px;
      }
      ol {
        margin: 5px;
        padding-inline-start: 1em;
      }
      ul {
        margin: 5px;
        padding-inline-start: 2em;
      }
      img {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 780px) {
  .message {
    h1 {
      font-size: 20px;
    }
  }
  .bg {
    .about {
      width: 95%;
      grid-template-columns: 1fr;
      grid-gap: 0px;
      grid-row: auto;
      .picture {
        padding: 0px;
        h1 {
          padding: 10px 0px;
        }
      }
      .description {
        padding: 0px;
        height: auto;
      }
      .contact {
        padding: 0px;
      }
    }
  }
}
</style>
