<template>
  <div class="bg-dark">
    <div v-show="!loading" class="login">
      <div class="switch" :class="{move: isChanging}">
        <h1 @click="move">Login</h1>
        <h1 @click="move">Signup</h1>
      </div>

      <form autocomplete="off" v-if="isLogging">
        <div class="input-group">
          <input
            @keydown="changing"
            type="text"
            id="userName"
            v-model="loginProperties.userName"
            required
            autocomplete="off"
          />
          <label class="placeholder" for="userName"
            >Enter your username ...</label
          >
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="password"
            id="password"
            v-model="loginProperties.password"
            required
            autocomplete="current-password"
          />
          <label class="placeholder" for="password"
            >Enter your password ...</label
          >
        </div>
        <!-- <div v-if="authenticationMsg" class="signUpMsg">
          <img src="../assets/About.svg" alt="" />
          <p>
            {{ authenticationMsg }}
          </p>
        </div> -->
        <button @click.prevent="login">login</button>
        <a class="forgotPassword" href="#">Forgot Password?</a>
      </form>

      <form v-else autocomplete="off">
        <div class="input-group">
          <input
            @keydown="changing"
            type="text"
            id="firstName"
            v-model="signupProperties.firstName"
            required
            autocomplete="off"
          />
          <label class="placeholder" for="firstName">First name ...</label>
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="text"
            id="lastName"
            v-model="signupProperties.lastName"
            required
            autocomplete="off"
          />
          <label class="placeholder" for="lastName">Last name ...</label>
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="text"
            id="userName"
            v-model="signupProperties.userName"
            required
            autocomplete="off"
          />
          <label class="placeholder" for="userName"
            >Choose your username ...</label
          >
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="email"
            id="email"
            v-model="signupProperties.email"
            required
            autocomplete="off"
          />
          <label class="placeholder" for="email">Your email ...</label>
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="password"
            id="password"
            v-model="signupProperties.password"
            required
            autocomplete="new-password"
          />
          <label class="placeholder" for="password">Password ...</label>
        </div>
        <div class="input-group">
          <input
            @keydown="changing"
            type="password"
            id="repeatPassword"
            v-model="signupProperties.repeatPassword"
            required
            autocomplete="current-password"
          />
          <label class="placeholder" for="repeatPassword"
            >Repeat your password ...</label
          >
        </div>
        <!-- <div v-if="authenticationMsg" class="signUpMsg">
          <img src="../assets/About.svg" alt="" />
          <p>
            {{ authenticationMsg }}
          </p>
        </div> -->
        <button @click.prevent="signUp">Signup</button>
      </form>
      <div
        v-if="authenticationMsg"
        class="message"
        :class="{error: messageError}"
      >
        <div class="content">
          <svg
            v-if="messageError == false"
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
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
            <h1>{{ authenticationMsg }}</h1>
            <button @click="finishUpload">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" class="loading"></div>
</template>
<script>
import {ref, reactive} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
  setup() {
    const isChanging = ref(false);
    const isLogging = ref(true);
    const isSignngUp = ref(false);
    let loading = ref(false);
    let messageError = ref(false);
    let authenticationMsg = ref(false);

    const Store = useStore();
    const Router = useRouter();

    const signupProperties = reactive({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
    const loginProperties = reactive({
      userName: '',
      password: '',
    });

    const move = (e) => {
      if (e.target.textContent === 'Login') {
        isChanging.value = false;
        isLogging.value = true;
        isSignngUp.value = false;
      } else {
        isChanging.value = true;
        isLogging.value = false;
        isSignngUp.value = true;
      }
      authenticationMsg.value = null;
      signupProperties.firstName = '';
      signupProperties.lastName = '';
      signupProperties.userName = '';
      signupProperties.email = '';
      signupProperties.password = '';
      signupProperties.repeatPassword = '';
      loginProperties.userName = '';
      loginProperties.password = '';
    };
    const validate = (data) => {
      const values = Object.values(data);
      const keys = Object.keys(data);
      let state;
      values.forEach((element, index) => {
        if (element === null || element === '' || element === undefined) {
          let currentIndex = keys[index];
          let el = document.getElementById(currentIndex);
          let parentNode = el.parentElement;
          parentNode.classList.add('error');
          state = false;
        } else {
          state = true;
        }
      });
      return state;
    };
    const sendData = async (data, url, cb) => {
      try {
        const res = await axios.post(url, data);
        cb(res, null);
      } catch (error) {
        // const errMeg = error.response.data.message;
        cb(null, error);
      }
    };
    const login = () => {
      const validateState = validate(loginProperties);
      if (validateState) {
        loading.value = true;
        sendData(
          loginProperties,
          'http://192.168.52.101:3000/login',
          (res, error) => {
            if (error) {
              const keys = Object.keys(loginProperties);
              setTimeout(() => {
                keys.forEach((key) => {
                  document
                    .getElementById(key)
                    .parentElement.classList.add('error');
                  authenticationMsg.value = error.response.data.message;
                  messageError.value = true;
                });
                loading.value = false;
              }, 3000);
            } else {
              console.log(res.data);
              if (res) {
                const {User, token} = res.data;
                User.token = token;
                setTimeout(() => {
                  Store.commit('setUser', User);
                  Store.commit('setAuthentication', true);
                  Router.push('/profile');
                  loading.value = false;
                }, 2000);
              }
            }
          }
        );
      } else {
        authenticationMsg.value = 'Red fields are required!';
      }
    };
    const signUp = () => {
      const password = document.querySelector('input#password');
      const repeatPassword = document.querySelector('input#repeatPassword');
      console.log(validate(signupProperties));
      if (validate(signupProperties)) {
        if (signupProperties.password != signupProperties.repeatPassword) {
          console.log('Password does not match');
          password.parentElement.classList.add('error');
          repeatPassword.parentElement.classList.add('error');
          authenticationMsg.value = 'Password does not match!';
          return;
        } else {
          authenticationMsg.value = null;
          if (
            password.parentElement.classList.contains('error') ||
            repeatPassword.parentElement.classList.contains('error')
          ) {
            password.parentElement.classList.remove('error');
            repeatPassword.parentElement.classList.remove('error');
          } else {
            loading.value = true;
            sendData(
              signupProperties,
              'http://192.168.52.101:3000/signup',
              (res, error) => {
                if (error) {
                  console.log(error.response.data.message);
                  setTimeout(() => {
                    loading.value = false;
                    messageError.value = true;
                    authenticationMsg.value = error.response.data.message;
                  }, 3000);
                } else {
                  console.log(res);
                  setTimeout(() => {
                    loading.value = false;
                    authenticationMsg.value =
                      'Acoount successfully created! please login to your account.';
                  }, 3000);
                }
              }
            );
          }
        }
      } else {
        authenticationMsg.value = 'please fill the fields!';
      }
    };
    const changing = (event) => {
      authenticationMsg.value = null;
      let input = event.target.parentNode;
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    };
    const finishUpload = () => {
      console.log('Finished');
      authenticationMsg.value = false;
      messageError.value = false;
    };
    return {
      isChanging,
      move,
      isLogging,
      isSignngUp,
      signupProperties,
      loginProperties,
      login,
      signUp,
      changing,
      authenticationMsg,
      messageError,
      finishUpload,
      loading,
    };
  },
};
</script>

<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid rgba(0, 255, 0, 0.4);
  -webkit-text-fill-color: white;
  box-shadow: 0 0 0px 1000px rgba(54, 255, 50, 0.2) inset;
  transition: background-color 5000s ease-in-out 0s;
}
.message .content > div {
  justify-content: stretch;
}
.bg-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  background: rgba($color: #000000, $alpha: 0.8);
  .login {
    // border: 1px solid black;
    position: relative;
    top: 0px;
    width: 50%;
    > h1 {
      color: white;
      text-transform: uppercase;
      font-weight: 900;
    }
    .switch {
      width: 100%;
      height: 45px;
      border: 1px solid skyblue;
      border-radius: 5px;
      display: grid;
      background: transparent;
      margin: 10px 0px;
      grid-template-columns: 1fr 1fr;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.8);
        transition: left 0.2s;
        transition: all 0.2s ease-in-out;
        transform: translateX(0%);
        z-index: -1;
      }
      h1 {
        padding: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: 150;
        color: black;
        cursor: pointer;
        height: 100%;
        color: rgb(255, 255, 255);
      }
    }
    .switch.move::before {
      transition: all 0.2s ease-in-out;
      transform: translateX(100%);
    }
    button {
      width: 25%;
      height: 45px;
      border: 1px solid skyblue;
      border-radius: 5px;
      background: none;
      cursor: pointer;
      font-size: 18px;
      overflow: hidden;
      transition: 0.2s;
      color: rgb(255, 255, 255);
      &:focus {
        outline: none;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.8);
        color: white;
      }
    }
    .input-group {
      width: 100%;
      input {
        height: 45px;
        color: white;
      }
      .placeholder {
        color: rgb(255, 255, 255);
      }
      &::before {
        content: '*';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: rgb(255, 0, 0);
        font-size: 20px;
        cursor: default;
      }
    }
    .input-group.error {
      box-shadow: inset 0px 0px 100px 5px rgba(255, 99, 71, 0.9);
      color: tomato;
      position: relative;
      & .placeholder {
        color: rgb(255, 0, 0);
      }
      &::before {
        color: white;
      }
    }
    .signUpMsg {
      padding: 0.8rem;
      border: 1px solid red;
      position: relative;
      border-radius: 5px;
      margin-bottom: 10px;
      img {
        width: 45px;
      }
      p {
        color: tomato;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 100px;
      }
    }
    .forgotPassword {
      text-decoration: none;
      float: right;
      color: skyblue;
      margin-top: 10px;
    }
  }
}

.input-group.error input:valid {
  border: none;
  box-shadow: none;
}
.input-group input:valid {
  border: 1px solid green;
  box-shadow: 0 0 0px 1000px rgba(54, 255, 50, 0.2) inset;
}
@media screen and (max-width: 900px) {
  .bg-dark {
    display: block;
    .login {
      width: 100%;
      height: 100%;
      padding: 10px;
      > h1 {
        padding: 0 0 1.5rem 10px;
      }
      .input-group {
        width: 95%;
        margin: 10px auto;
      }
      .switch {
        width: 95%;
        margin: 0px auto;
        h1 {
          cursor: default;
        }
      }
      button {
        width: 50%;
        margin-left: 10px;
        font-size: 16px;
      }
      .forgotPassword {
        margin-right: 10px;
      }
      .signUpMsg {
        margin: 10px;
      }
    }
  }
}
</style>
