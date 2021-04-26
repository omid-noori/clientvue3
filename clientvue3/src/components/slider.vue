<template>
  <div id="container">
    <div v-if="fetchedData" class="carousel">
      <div v-if="loading" class="loading"></div>
      <div
        ref="slider"
        class="slider"
        :style="{width: `${fetchedData.length}00%`}"
      >
        <div
          v-show="!loading"
          v-for="file in fetchedData"
          :key="file._id"
          @click="$emit('play', file)"
        >
          <img :src="destinationFileURL + file.Key" alt="Cover" />
        </div>
      </div>
      <div class="controls">
        <span class="arrow left" @click="previous()"></span>
        <span class="arrow right" @click="next()"></span>
        <ul class="Dots" ref="Dots">
          <li
            v-for="(file, index) in fetchedData"
            @click="chooseByDots($event, index, file)"
            :key="file._id"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onUpdated, onMounted, nextTick} from 'vue';
export default {
  props: {
    imageKeys: Array,
  },
  setup(props, {emit}) {
    let touch = {
      startX: 0,
      endX: 0,
    };
    let fetchedData = ref(props.imageKeys);
    console.log(fetchedData.value);
    const slider = ref(null);
    let loading = ref(true);
    const serverURL = 'https://rapgap.herokuapp.com';
    const destinationFileURL = `${serverURL}/uploads/media/`;
    let sectionIndex = 0;
    let procentage = 0;

    onMounted(() => {
      nextTick(() => {
        const lis = document.querySelectorAll('.Dots li');
        const images = slider.value.querySelectorAll('div');
        images.forEach((element, index) => {
          let img = element.querySelector('img');
          img.onload = function() {
            if (index === images.length - 1) {
              loading.value = false;
            }
          };
        });
        lis[0].classList.add('selected');
      });
    });

    onUpdated(() => {
      const slider = document.querySelector('.slider');

      slider.addEventListener('touchstart', (event) => touchStart(event), {
        passive: true,
      });
      slider.addEventListener('touchmove', (event) => touchMove(event), {
        passive: true,
      });
      slider.addEventListener('touchend', (event) => touchEnd(event), {
        passive: true,
      });
    });

    const next = () => {
      const selectedClass = document.querySelector('.controls .selected');
      sectionIndex =
        sectionIndex < fetchedData.value.length - 1
          ? sectionIndex + 1
          : (sectionIndex = 0);
      const Dots = document.querySelector('.Dots');
      Dots.children[sectionIndex].classList.add('selected');
      if (selectedClass !== null) {
        selectedClass.classList.remove('selected');
      }
      procentage = 100 / fetchedData.value.length;
      slider.value.style.transform = `translate(${sectionIndex *
        -procentage}%)`;
      const file = fetchedData.value[sectionIndex];
      emit('next', file._id);
    };

    const previous = () => {
      const selectedClass = document.querySelector('.controls .selected');
      sectionIndex =
        sectionIndex <= 0
          ? (sectionIndex = fetchedData.value.length - 1)
          : sectionIndex - 1;
      document
        .querySelector('.Dots')
        .children[sectionIndex].classList.add('selected');
      if (selectedClass !== null) {
        selectedClass.classList.remove('selected');
      }
      procentage = 100 / fetchedData.value.length;
      slider.value.style.transform = `translate(${sectionIndex *
        -procentage}%)`;
      const file = fetchedData.value[sectionIndex];
      emit('previous', file._id);
    };

    const touchStart = (event) => {
      touch.startX = event.changedTouches[0].clientX;
      touch.endX = 0;
    };

    const touchMove = (event) => {
      touch.endX = event.changedTouches[0].clientX;
    };

    const touchEnd = (event) => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 20) return;
      if (touch.endX < touch.startX) {
        next();
      } else if (touch.endX > touch.startX) {
        previous();
      }
    };

    const chooseByDots = (event, index, file) => {
      const selectedClass = document.querySelector('.controls .selected');
      sectionIndex = index;
      if (selectedClass !== null) {
        selectedClass.classList.remove('selected');
      }
      event.target.classList.add('selected');
      procentage = 100 / fetchedData.value.length;
      slider.value.style.transform = `translateX(${sectionIndex *
        -procentage}%)`;
      emit('next', file._id);
    };

    return {
      next,
      slider,
      previous,
      chooseByDots,
      fetchedData,
      destinationFileURL,
      loading,
    };
  },
};
</script>

<style scoped lang="scss">
#container {
  position: relative;
  width: 100%;
  .carousel {
    height: 60vh;
    overflow: hidden;
    .slider {
      height: 100%;
      display: flex;
      transition: all 0.5s;
      div {
        flex-basis: 100%;
        position: relative;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          cursor: grab;
        }
      }
    }
    .controls {
      .arrow {
        position: absolute;
        top: 0;
        width: 20%;
        height: 100%;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.4);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .left {
        left: 0px;
        background-image: url('../assets/rewind.svg');
      }
      .right {
        right: 0px;
        background-image: url('../assets/fast-forward.svg');
      }
      ul {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        list-style: none;
        background: rgba(0, 0, 0, 0.384);
        border-radius: 8px;
        li {
          width: 20px;
          height: 20px;
          text-align: center;
          margin: 5px;
          border-radius: 50%;
          border: 1px solid rgb(255, 255, 255);
          cursor: pointer;
          overflow: hidden;
        }
      }
    }
  }
}
.selected {
  background: rgba(0, 238, 255, 0.8);
}

@media screen and (max-width: 780px) {
  #container {
    width: 100%;
    margin-left: 0px;
    .carousel {
      height: 50vh;
      .slider {
        margin-top: 0px;
        div {
          img {
            background-size: cover;
            cursor: default;
          }
        }
      }
      .controls {
        .arrow {
          cursor: default;
        }
        ul {
          li {
            cursor: default;
          }
        }
      }
    }
  }
  .arrow {
    cursor: none;
  }
}
</style>
