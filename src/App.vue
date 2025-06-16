<template>
  <div style="height: 100%">
    <img id="filterLoader" style="display: none" :src="loader" alt="Loader" />
    <my-header :is-menu-hide="isMenuHide" :is-profile-hide="isProfileHide" @update-menu="updateMenu" @update-profile="updateProfile" />
    <div style="display: flex">
      <my-menu :is-menu-hide="isMenuHide" :is-home="isHome" :is-profile-hide="isProfileHide" @update-menu="updateMenu" @update-home="updateHome" @update-profile="updateProfile" />
      <div style="width: 100%; margin-top: 15px">
        <router-view :class="[{ 'active-menu-hide': isMenuHide || isProfileHide }, { 'active-no-menu-hide': !isMenuHide && !isProfileHide }]" style="margin-bottom: 45px;" />
        <div>
          <div v-if="!isHome" style="margin: 0 15px" :class="[{ 'active-menu-hide-dl': isMenuHide || isProfileHide }, { 'active-no-menu-hide-dl': !isMenuHide && !isProfileHide }]">
            <smart-window label="ПРОСМОТР ДОКУМЕНТОВ" resize-mode="both" id="layoutWindow" style="transition: none !important;">
              <smart-docking-layout id="layout" style="height: calc(100vh - 135px) !important; transition: none !important;">
                <div id="content"></div>
              </smart-docking-layout>
            </smart-window>
          </div>
          <div v-if="isHome" style="margin: 0 15px" :class="[{ 'active-menu-hide': isMenuHide || isProfileHide }, { 'active-no-menu-hide': !isMenuHide && !isProfileHide }]">
            <div id="isWhite" class="is-white" style="padding: 5px; flex-flow: column; height: 100%; margin: 0 auto;">
              <div style="display: flex; flex-flow: column; width: 100%; height: 100%; align-items: center; justify-content: center; border: 1px #5bc0de dashed;">
                <div style="justify-content: center; display: flex; margin: 0 auto; font-size: 100px;">
                  <i class="fa fa-archive"></i>
                </div>
                <div style="justify-content: center; display: flex; margin: 30px auto; font-size: 20px;">Электронный архив</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MyHeader from './components/header/header.vue';
import MyMenu from './components/menu/menu.vue';

const router = useRouter();
const loader = ref(window.location.href.split('.nsf')[0] + '.nsf/copyloader.gif');
const isHome = ref(window.location.hash === '#/main' || window.location.hash === '#/');
const isMenuHide = ref(false);
const isProfileHide = ref(true);

const updateMenu = (newValue) => {
  isMenuHide.value = newValue;
};

const updateProfile = (newValue) => {
  isProfileHide.value = newValue;
};

const updateHome = (newValue) => {
  isHome.value = newValue;
};

const getMainContent = () => {
  setTimeout(() => {
    try {
      document.getElementById('filterLoader').style.display = 'none';
      document.getElementById('isWhite').className = '';
    } catch (e) {
      console.error(e);
    }
  }, 1000);
};

onMounted(() => {
  getMainContent();
});
</script>

<style scoped>
.is-white {
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: 0 auto;
}

.active-menu-hide,
.active-menu-hide-dl {
  width: calc(100% - 60px);
}

.active-no-menu-hide,
.active-no-menu-hide-dl {
  width: calc(100% - 260px);
}

.display-none {
  display: none;
}
</style>