<template>
  <Nav :Routes="Routes" />
</template>

<script>
import Nav from './components/Nav';
import HomeIcone from './assets/New_Home5.svg';
import AboutIcone from './assets/About.svg';
import {ref, onMounted} from 'vue';
export default {
  components: {
    Nav,
  },
  setup() {
    const Routes = ref([
      {
        path: '/',
        name: 'Home',
        icone: HomeIcone,
      },
      {
        path: '/about',
        name: 'About',
        icone: AboutIcone,
      },
    ]);
    document.title = 'Welcome To RapGap';
    // onMounted(() => {
    //   console.log(process.env);
    // });
    return {
      Routes,
    };
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&display=swap');
@import url('./views/main.css');
html {
  scroll-behavior: smooth;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Lora', serif;
  -webkit-font-smoothing: 'Lora', serif;
  -moz-osx-font-smoothing: 'Lora', serif;
}
#app {
  position: relative;
  top: 60px;
  min-height: calc(100vh - 60px);
  // background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
#nav {
  a {
    &.router-link-exact-active {
      // background: rgb(123, 165, 255);
      color: skyblue;
      text-decoration: none;
    }
  }
}
// @media screen and (orientation: landscape) {
//   #app {
//     display: none !important;
//   }
// }
</style>
