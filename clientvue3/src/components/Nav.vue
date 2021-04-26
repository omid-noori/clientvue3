<template>
  <div id="nav">
    <figure class="logo">
      <div
        @click="HamburgerTransition"
        class="hamburger"
        :class="{TActive: isActive}"
      ></div>
      <img src="../assets/uranous.png" alt="Logo" />
    </figure>
    <nav :class="{active: isActive}">
      <ul>
        <div
          class="profile"
          v-if="$store.state.isAuthenticated"
          @click.prevent="toProfile"
        >
          <div
            v-if="$store.state.User.profilePic.Key"
            :style="{
              backgroundImage:
                'url(' + URL + $store.state.User.profilePic.Key + ')',
            }"
            class="profilePic"
          ></div>
          <div
            v-else
            :style="{
              'background-image': 'url(' + require('../assets/User.svg') + ')',
            }"
            class="profilePic"
          ></div>
          <div class="fullName">
            <router-link to="/profile">
              Hi
              {{ $store.state.User.firstName }}
            </router-link>
          </div>
        </div>
        <!-- <li
          class="profile"
          v-if="$store.state.isAuthenticated"
          @click.prevent="HamburgerTransition"
        >
          <img src="../assets/received_2.jpeg" alt="" />
          <router-link to="/profile">
            Profile
          </router-link>
        </li> -->

        <li @click.prevent="HamburgerTransition" v-for="route in props.Routes">
          <img :src="route.icone" alt="" />
          <router-link :to="route.path">{{ route.name }} </router-link>
        </li>

        <li
          v-if="
            $store.state.User &&
              ($store.state.User.role === 'Arthist' ||
                $store.state.User.role === 'Admin')
          "
          @click.prevent="HamburgerTransition"
        >
          <img src="../assets/dashboard.svg" alt="" />
          <router-link to="/dashboard">
            Dashboard
          </router-link>
        </li>

        <li
          v-if="
            $store.state.isAuthenticated === false ||
              ($store.state.User && $store.state.User.role === 'Arthist')
          "
          @click.prevent="HamburgerTransition"
        >
          <img src="../assets/fingerprint.svg" alt="" />
          <router-link to="/auth">
            Authentication
          </router-link>
        </li>

        <li
          v-if="$store.state.isAuthenticated"
          @click.prevent="HamburgerTransition"
        >
          <img src="../assets/logout.svg" alt="" />
          <router-link @click.prevent="logOut" to="/auth">
            Logout
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <div v-if="isActive" @click="HamburgerTransition" class="bgActive"></div>
  <router-view />
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
export default {
  props: {
    Routes: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const Store = useStore();
    const Router = useRouter();
    const serverURL = 'http://localhost:3000';
    const URL = `${serverURL}/uploads/media/`;

    const HamburgerTransition = () => {
      if (window.innerWidth < 900) {
        isActive.value = !isActive.value;
      }
    };
    const toProfile = () => {
      if (window.innerWidth < 900) {
        isActive.value = !isActive.value;
      }
      Router.push('/profile');
    };
    const logOut = () => {
      Store.commit('setUser', null);
      Store.commit('setAuthentication', false);

      Router.push('/auth');
    };
    return {
      HamburgerTransition,
      props,
      isActive,
      logOut,
      toProfile,
      URL,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#nav {
  background: rgb(0, 0, 0);
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 100;
  nav {
    margin-right: 2rem;
    z-index: 100;
    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      list-style-type: none;
      li {
        display: flex;
        img {
          width: 25px;
          margin-left: 5px;
          position: relative;
        }
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          font-size: 18px;
          margin: 1rem;
          // padding: 5px 2px 5px 2px;
          color: rgb(255, 255, 255);
          &.router-link-exact-active {
            background: transparent;
            color: #7ebaff;
          }
        }
      }
    }
  }
}
.profile {
  display: grid;
  // margin-right: 10px;
  grid-template-columns: 1fr 2fr;
  // grid-gap: 10px;
  position: relative;
  // margin-left: 1.5rem;
  align-items: center;
  cursor: pointer;
  .profilePic {
    height: 55px;
    width: 55px;
    position: relative;
    overflow: hidden;
    border: 1px solid white;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    // img {
    //   width: 100%;
    //   object-fit: cover;
    //   object-position: center;
    //   // box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.85);
    // }
  }
  .fullName {
    a {
      color: white;
      text-decoration: none;
      font-size: 18px;
      padding: 0.5rem;
      text-align: center;
      &.router-link-exact-active {
        background: none;
      }
    }
  }
}
.hamburger {
  width: 35px;
  height: 30px;
  border-top: 2px solid rgb(46, 46, 46);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
  outline: 0;
  outline: none;
  display: none;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    border-top: 2px solid rgb(108, 221, 255);
    cursor: pointer;
  }
  &::before {
    border-top: 2px solid rgb(211, 32, 17);
    top: 13px;
  }
  &::after {
    border-top: 2px solid rgb(0, 122, 54);
    top: 26px;
  }
}
.hamburger.TActive {
  border: none;
}
.hamburger.TActive::before {
  animation: CrossLine1 0.1s ease-in-out 0ms forwards;
}
.hamburger.TActive::after {
  top: 13px;
  animation: CrossLine2 0.1s ease-in-out 0ms forwards;
}
.hamburger.TActive::before,
.hamburger.TActive::after,
.hamburger::before,
.hamburger::after {
  transition: all 0.2s;
}
@keyframes CrossLine1 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(45deg);
  }
}
@keyframes CrossLine2 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-45deg);
  }
}
.logo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 1.5rem;
  grid-gap: 20px;
  img {
    width: 45px;
    user-select: none;
  }
}
@media screen and (max-width: 900px) {
  .hamburger {
    display: block;
    cursor: default;
  }
  #nav {
    z-index: 2;
    nav {
      position: fixed;
      top: 60px;
      left: -300px;
      background: rgb(0, 0, 0);
      height: calc(100vh - 60px);
      width: 300px;
      transition: all 0.2s ease-in-out;
      ul {
        display: block;
        li {
          img {
            margin-right: 5px;
            margin-left: 1.5rem;
            width: 30px;
          }
          a {
            width: 100%;
            padding: 0.5rem;
            margin: 0.2rem;
            border-bottom: 1px solid white;
            justify-content: start;
            color: white;
            transition: all 0.2s ease-in-out;
            cursor: default;
            &:hover {
              background: rgb(0, 0, 0);
              color: white;
            }
          }
        }
      }
      &.active {
        transition: all 0.2s ease-in-out;
        left: 0px;
      }
    }
  }
  .bgActive {
    display: inline-block;
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    transition: 1ms ease all;
  }
  .profile {
    // background: rgba(135, 207, 235, 0.2);
    margin-left: 1.5rem;
    cursor: default;
    .profilePic {
      width: 100px;
      height: 100px;
    }
    .fullName {
      margin: 0.2rem;
    }
  }
}
</style>
