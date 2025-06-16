<template>
  <div style="margin: 0 5px; height: 100%;">
    <div id="isWhite" style="padding: 5px; flex-flow: column; height: 100%; margin: 0 auto;">
      <div style="display: flex; flex-flow: column; width: 100%; height: 100%; align-items: center; justify-content: center; border: 1px #5bc0de dashed;">
        <div style="justify-content: center; display: flex; margin: 0 auto; font-size: 100px;">
          <i :class="icon"></i>
        </div>
        <div style="justify-content: center; display: flex; margin: 30px auto; font-size: 20px;">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const title = ref(window.MenuSettingsName || 'Главная страница');
const icon = ref(window.MenuSettingsIcon || 'fa fa-home');

const onIframeLoad = () => {
  setTimeout(() => {
    try {
      const filterLoader = document.getElementById('filterLoader');
      if (filterLoader) filterLoader.style.display = 'none';

      const sidebarMain = document.getElementsByClassName('sidebar-main')[0];
      if (sidebarMain) sidebarMain.style = 'opacity: 1; pointer-events: all !important';
    } catch (e) {
      console.error('Ошибка при загрузке:', e);
    }
  }, 1000);
};

onMounted(() => {
  onIframeLoad();
});
</script>

<style scoped>
#isWhite {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  #isWhite {
    padding: 3px;
  }
  div[style*="font-size: 100px"] {
    font-size: 60px;
  }
  div[style*="font-size: 20px"] {
    font-size: 16px;
  }
}
</style>