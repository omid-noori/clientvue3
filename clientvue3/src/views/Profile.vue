<template>
  <div class="background">
    <div class="container">
      <div class="grid">
        <div class="picture">
          <h1>Change profile picture</h1>
          <img
            class="profilePicture"
            @click="changePicture"
            src="../assets/received_24.jpeg"
            alt=""
          />
        </div>
        <div class="content">
          <h1>Information</h1>
          <div class="input-group" v-for="(info, index) in INFO" :key="index">
            <input
              v-model="info.value"
              :id="info.id"
              :type="info.type"
              autocomplete="off"
              required
            />
            <label class="placeholder" :for="info.id">{{
              info.placeholder
            }}</label>
          </div>
          <textarea
            v-model="descriptionText"
            placeholder="Tell us about yourself"
          ></textarea>
          <button @click="update">Save Changes</button>
        </div>
        <div class="contact">
          <h1>Contacts</h1>
          <div v-for="(contact, index) in CONTACTS" :key="index">
            <img :src="contact.icon" :alt="contact.placeholder" />
            <div class="input-group">
              <input
                v-model="contact.URL"
                :id="contact.id"
                type="text"
                required
              />
              <label class="placeholder" :for="contact.id">
                {{ contact.placeholder }}
              </label>
            </div>
          </div>
        </div>
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
import {reactive, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import axios from 'axios';
export default {
  setup() {
    const CONTACTS = reactive({
      instagram: {
        URL: null,
        icon: require('../assets/instagram.svg'),
        id: 'instagram',
        placeholder: 'Instagram URL',
      },
      facebook: {
        URL: null,
        icon: require('../assets/facebook.svg'),
        id: 'facebook',
        placeholder: 'Facebook URL',
      },
      twitter: {
        URL: null,
        icon: require('../assets/twitter.svg'),
        id: 'twitter',
        placeholder: 'Twitter URL',
      },
      website: {
        URL: null,
        icon: require('../assets/internet.svg'),
        id: 'website',
        placeholder: 'Website URL',
      },
    });
    const INFO = reactive({
      firstName: {
        id: 'firstName',
        value: null,
        type: 'text',
        placeholder: 'First Name',
      },
      lastName: {
        id: 'lastName',
        value: null,
        type: 'text',
        placeholder: 'Last Name',
      },
      email: {
        id: 'email',
        value: null,
        type: 'email',
        placeholder: 'Email',
      },
      // userName: {
      //   id: 'userName',
      //   value: null,
      //   type: 'text',
      //   placeholder: 'Username',
      // },
    });
    let descriptionText = ref(null);
    const Store = useStore();
    const uploadMessage = ref(false);
    const messageError = ref(false);
    const serverURL = 'http://localhost:3000';

    const update = () => {
      const {instagram, facebook, website, twitter} = CONTACTS;
      const {firstName, lastName, email} = INFO;
      const body = {
        contacts: {
          instagram: instagram.URL,
          facebook: facebook.URL,
          website: website.URL,
          twitter: twitter.URL,
        },
        description: descriptionText.value,
        fistName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      };
      const profileURL = serverURL + '/profile';
      Store.commit('setContacts', body);
      fetch(profileURL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Store.state.User.token}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          uploadMessage.value = 'Profile Updated!';
        })
        .catch((error) => {
          console.error(error);
          uploadMessage.value = 'Something went wrong';
          messageError.value = true;
        });
    };
    const FileURLDestination = serverURL + '/uploads/media/';
    onMounted(() => {
      const profilePicImg = document.querySelector('.profilePicture');
      const {
        profilePicKey,
        firstName,
        lastName,
        // userName,
        email,
        description,
        contacts,
      } = Store.state.User;
      const condition = profilePicKey != undefined || profilePicKey != null;
      if (condition) {
        profilePicImg.src = FileURLDestination + profilePicKey;
      }
      INFO.firstName.value = firstName;
      INFO.lastName.value = lastName;
      // INFO.userName.value = userName;
      INFO.email.value = email;
      descriptionText.value = description;
      if (contacts) {
        console.log(contacts);
        CONTACTS.instagram.URL = contacts.instagram;
        CONTACTS.facebook.URL = contacts.facebook;
        CONTACTS.twitter.URL = contacts.twitter;
        CONTACTS.website.URL = contacts.website;
      }
    });
    const changePicture = () => {
      const file = document.createElement('input');
      file.type = 'file';
      file.accept = 'image/*';
      file.click();
      file.addEventListener('change', selectedPicture);
    };
    const selectedPicture = (e) => {
      const file = e.path[0].files[0];
      const formData = new FormData();
      formData.append('profilePicture', file);
      const URL = serverURL + '/profilePicture';
      const headers = {
        'Content-Type':
          'multipart/form-data; charset=utf-8; boundary=' +
          Math.random()
            .toString()
            .substr(2),
        Authorization: `Bearer ${Store.state.User.token}`,
      };
      axios.post(URL, formData, {headers: headers}).then((result) => {
        const profilePic = document.querySelector('.profilePicture');
        profilePic.src = FileURLDestination + result.data.updatedData.Key;
        Store.commit('setProfilePic', result.data.updatedData.Key);
      });
    };
    const finishUpload = () => {
      console.log('Finished');
      uploadMessage.value = false;
      messageError.value = false;
    };
    return {
      CONTACTS,
      update,
      changePicture,
      INFO,
      descriptionText,
      uploadMessage,
      finishUpload,
      messageError,
    };
  },
};
</script>
<style scoped lang="scss">
.background {
  background: rgba(0, 0, 0, 0.8);
  .container {
    width: 90%;
    margin: 0 auto;
    min-height: calc(100vh - 60px);
    > h1 {
      padding: 10px 0;
      color: white;
      text-align: start;
      cursor: default;
    }
    .grid {
      display: grid;
      grid-template-columns: 25% 50% 25%;
      grid-gap: 10px;
      h1 {
        text-align: start;
        cursor: default;
        color: rgba(255, 255, 255, 0.8);
        padding-bottom: 10px;
      }
      .picture {
        img {
          display: inline-block;
          width: 100%;
          margin-bottom: 10px;
        }
      }
      .content {
        display: inline-block;
        .input-group {
          width: 100%;
          label,
          input {
            color: white;
          }
        }
        textarea {
          width: 100%;
          // min-height: 100px;
          outline: none;
          height: 40vh;
          padding: 10px;
          resize: none;
          border-radius: 5px;
          border: 1px solid skyblue;
          background: rgba(135, 206, 235, 0.2);
          color: white;
          &::placeholder {
            color: white;
          }
        }
        button {
          padding: 1rem 1.5rem;
          margin: 30px 0px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.5);
            color: blue;
          }
        }
      }
    }
    .contact {
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        img {
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          width: 30px;
        }
        .input-group {
          margin-left: 10px;
          margin-bottom: 0px;
          input {
            font-size: 14px;
            color: white;
          }
          label {
            color: white;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .background {
    .container {
      width: 96%;
      padding: 0px;
      .grid {
        grid-template-columns: 1fr;
        grid-gap: 0px;
        .content {
          display: block;
          button {
            width: 50%;
          }
          textarea {
            height: 50vh;
            padding: 10px;
          }
        }
        .contact {
          grid-row-start: 2;
          grid-row-end: 3;
          div {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
