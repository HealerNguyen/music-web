<template>
  <div class="home-welcome flex justify-center items-center tn-banner">
		<Head>
			<Title>Healer 's music</Title>
		</Head>
    <div class="w-full">
      <div class="h-2 bg-red-light"></div>
      <div class="flex items-center justify-center h-screen bg-red-lightest">
        <div
          class="bg-card shadow-lg rounded-lg"
          style="width: 45rem !important"
        >
          <div class="flex">
            <div>
              <img
                class="w-full rounded hidden md:block"
                :src="currentItem.image"
                alt="Album Pic"
              />
            </div>
            <div class="w-full p-8">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-2xl text-grey-darkest font-medium">
                    {{ currentItem.name }}
                  </h3>
                  <p class="text-sm text-grey mt-1">{{ currentItem.singer }}</p>
                </div>
                <div class="text-red-lighter">
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex justify-between items-center mt-8">
                <div class="text-grey-darker" @click="randomPlayItem()">
                  <svg
                    class="w-8 h-8"
                    :fill="isRandom ? '#00dc82' : 'currentColor'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z"
                    />
                  </svg>
                </div>
                <div class="text-grey-darker" @click="changeIndex(0)">
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                  </svg>
                </div>
                <div class="text-white p-8 rounded-full bg-play shadow-lg" @click="playItemData()">
                  <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19V5l11 7Z"></path></svg>
									<svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14Zm-8 0V5h4v14Z"></path></svg>
								</div>
                <div class="text-grey-darker" @click="changeIndex(1)">
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                  </svg>
                </div>
                <div class="text-grey-darker">
                  <svg
                    class="w-8 h-8"
                    fill="#00dc82"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="mx-8 py-4">
            <div class="flex justify-between text-sm text-grey-darker">
              <p>{{ currentPlayedTime }}</p>
              <p>{{ durationFormat }}</p>
            </div>
            <div class="mt-1">
              <div class="h-1 bg-grey rounded-full">
                <div class="progress-time h-1 bg-red rounded-full relative" :style="`width: ${progressPercentageValue}`">
								  <audio @timeupdate="updateTimer" @ended="checkEnded" @loadeddata="loaded" ref="audioPlayer" :src="currentItem.file" preload style="display: none" autoplay controls></audio>
                  <!-- <span
                    class="
                      w-4
                      h-4
                      bg-red
                      absolute
                      pin-r pin-b
                      -mb-1
                      rounded-full
                      shadow
                    "
                    :style="`left: ${progressPercentageValue}`"
                  ></span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  layout: "default",
  setup() {
		const audioPlayer = ref(null);
    const playlists = ref([
        {
          name: "Người Âm Phủ",
          id: "VFswe9bRjNw",
          file: 'Người Âm Phủ.mp3',
          index: 1,
          image: "https://img.youtube.com/vi/VFswe9bRjNw/0.jpg",
          singer: "Osad",
        },
				{
          name: "Củ Lạc",
          id: "VZjcicb4yaA",
          file: 'Củ Lạc.mp3',
          index: 2,
          image: "https://img.youtube.com/vi/VZjcicb4yaA/0.jpg",
          singer: "Osad",
        },
				{
					id: "fIrB-gb0PCs",
					name: "Yêu Đương",
          file: 'Yêu Đương.mp3',
          index: 3,
          image: "https://img.youtube.com/vi/fIrB-gb0PCs/0.jpg",
          singer: "Osad",
				},
        {
					id: "s2xF24SrWC8",
					name: "Gánh Cả Thế Giới",
          file: 'Gánh Cả Thế Giới.mp3',
          index: 4,
          image: "https://img.youtube.com/vi/s2xF24SrWC8/0.jpg",
          singer: "Osad",
				},
        {
					id: "PWSj5UegrdI",
					name: "EM CÓ THỂ",
          file: 'EM CÓ THỂ.mp3',
          index: 5,
          image: "https://img.youtube.com/vi/PWSj5UegrdI/0.jpg",
          singer: "Osad",
				},
        {
					id: "xdOaASWfw-M",
					name: "Phong Tức",
          file: 'Phong Tức.mp3',
          index: 6,
          image: "https://img.youtube.com/vi/xdOaASWfw-M/0.jpg",
          singer: "Yang Yang",
				},
        {
					id: "omfSvgX5Px0",
					name: "Cô Chú",
          file: 'Cô Chú.mp3',
          index: 7,
          image: "https://img.youtube.com/vi/omfSvgX5Px0/0.jpg",
          singer: "Yang Yang",
				},
        {
					id: "44wwiloXY2U",
					name: "Thẩm viên ngoại",
          file: 'Thẩm viên ngoại.mp3',
          index: 8,
          image: "https://img.youtube.com/vi/44wwiloXY2U/0.jpg",
          singer: "Yang Yang",
				},
        {
					id: "YkKif77JQWI",
					name: "KHÔNG TRỌN VẸN NỮA",
          file: 'KHÔNG TRỌN VẸN NỮA.mp3',
          index: 9,
          image: "https://img.youtube.com/vi/YkKif77JQWI/0.jpg",
          singer: "Yang Yang",
				},
        {
					id: "ZuSHTuOvSGc",
					name: "NGƯỜI LẠ THOÁNG QUA",
          file: 'NGƯỜI LẠ THOÁNG QUA.mp3',
          index: 10,
          image: "https://img.youtube.com/vi/ZuSHTuOvSGc/0.jpg",
          singer: "Yang Yang",
				}
      ])
		const currentIndex = ref(0);
		const isPlaying = ref(false);
    const isRandom = ref(false);
    const durationSeconds = ref(0);
    const currentSeconds = ref(0);

		const currentItem = computed(() => {
			return playlists.value[currentIndex.value];
		})

		const randomPlayItem = () => {
      isRandom.value = true
			const ranItem = Math.floor(Math.random() * playlists.value.length);
			currentIndex.value = ranItem;
			return currentIndex
		}

    const playCurrentItem = () => {
			return currentIndex
		}

    const changeIndex = (type: number) => {
			if (currentIndex.value === 0) {
				currentIndex.value = type == 1 ? currentIndex.value + 1 : playlists.value.length - 1
				return currentIndex;
			}
			if (currentIndex.value > 0) {
				if (currentIndex.value != playlists.value.length - 1) {
					currentIndex.value = type == 1 ? currentIndex.value + 1 : currentIndex.value - 1
					return currentIndex;
				} else {
					currentIndex.value = 0
					return currentIndex;
				}
			}
      isPlaying.value = true
			playAudio();
    };

		const playAudio = () => {
			audioPlayer.value.play()
      durationSeconds.value = parseInt(audioPlayer.value.duration);
		}

    const formatTime = (secs: number) => {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }


		const pauseAudio = () => {
			audioPlayer.value.pause()
		}

		const playItemData = () => {
			if (isPlaying.value) {
				isPlaying.value = false
				pauseAudio()
			} else {
				playCurrentItem();
        playAudio()
				isPlaying.value = true
			}
		}

    const updateTimer = () => {
      currentSeconds.value = parseInt(audioPlayer.value.currentTime);
    }
    
    const durationFormat = computed(() => {
      return formatTime(durationSeconds.value)
    })

    const currentPlayedTime = computed(() => {
      return formatTime(currentSeconds.value);
    })

    const progressPercentageValue = computed(() => {
      let data = (currentSeconds.value / durationSeconds.value) * 100;
      data = parseInt(data.toString())
      return `${data}%`
    })

    const checkEnded = () => {
      isPlaying.value = false
      changeIndex(1);
    }

    const loaded = () => {
      durationSeconds.value = parseInt(audioPlayer.value.duration);
    }

    const seekToTime = (e) => {
      if (isPlaying.value) {
        let el = e.target.getBoundingClientRect();
        let seekPos = (e.clientX - el.left) / el.width;
        let seekPosPercentage = seekPos * 100 + "%";

        /**
         *  calculating the portion of the song based on where the user clicked
         *
         */

        let songPlayTimeAfterSeek = parseInt(
          (audioPlayer.value.duration * seekPos).toString()
        );

        audioPlayer.value.currentTime = songPlayTimeAfterSeek;
      } else {
        throw new Error("Song Not Loaded");
      }
    }



    return {
			playlists,
      isRandom,
      currentItem,
			audioPlayer,
      changeIndex,
			randomPlayItem,
			playAudio,
			playItemData,
			isPlaying,
			pauseAudio,
      playCurrentItem,
      currentSeconds,
      durationSeconds,
      updateTimer,
      durationFormat,
      formatTime,
      currentPlayedTime,
      progressPercentageValue,
      checkEnded,
      loaded,
      seekToTime
    };
  },
};
</script>