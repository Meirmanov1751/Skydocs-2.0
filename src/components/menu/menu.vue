<template>
  <div class="sidebar-main">
    <div class="additional-menu">
      <div>
        <div class="additional-menu-items">
          <a href="StartPage.xsp" class="additional-a">
            <img :src="skydocsLogoUrl" style="width: 100%;" alt="logo" />
          </a>
        </div>
        <div class="additional-menu-items">
          <a @click="toggleMenu" v-if="!isMenuHide" class="additional-a" :class="{ 'icon_active': !isMenuHide }">
            <span class="fa fa-angle-double-left grow"></span>
          </a>
          <a @click="toggleMenu" v-else class="additional-a" :class="{ 'icon_active': !isMenuHide }">
            <span class="fa fa-bars grow"></span>
          </a>
        </div>
        <div class="additional-menu-items" @click="toggleProfile" style="border-bottom: 1px solid #e7e7e7 !important;">
          <a class="additional-a" :class="{ 'icon_active': !isProfileHide }">
            <span class="fa fa-user grow"></span>
          </a>
        </div>
        <div v-for="icon in additionalMenuSubItems" :key="icon.action" class="additional-menu-items">
          <a @click="toggleSubMenu(icon)" class="additional-a addsub" :class="{ 'icon_active': icon.isHidden }">
            <span :class="icon.icon" class="fa grow"></span>
          </a>
        </div>
      </div>
      <div>
        <div class="additional-menu-items">
          <a class="additional-a_bottom"><i class="fa fa-envelope-square"></i></a>
        </div>
        <div class="additional-menu-items">
          <a class="additional-a_bottom"><i class="fa fa-users"></i></a>
        </div>
        <div class="additional-menu-items">
          <a class="additional-a_bottom"><i class="fa fas fa5-question-circle"></i></a>
        </div>
      </div>
    </div>
    <my-profile v-if="!isProfileHide" />
    <div v-if="!isMenuHide" class="sidebar" style="display: flex; flex-direction: column; justify-content: space-between;">
      <p class="profile-title" style="display: flex; justify-content: space-between;">
        <router-link to="/main" @click="toMain">{{ title }}</router-link>
        <div @click="reloadData" style="display: flex; align-items: center; cursor: pointer; position: relative; right: -10px;" class="fa fa-refresh refresh_btn" aria-hidden="true"></div>
      </p>
      <ul class="sidebar-top">
        <li v-for="item in menuItems" :key="item.action">
          <span v-if="item.elementType === 'SEPARATOR'">
            <hr v-if="item.separatorType !== 'EMPTY'" style="margin: 3px 0;" />
            <div v-else style="margin-top: 20px"></div>
          </span>
          <a v-else-if="item.menuOpenType === 'RIGHT'" class="mark sidebar-link">
            <div :class="['menu-item', { 'activeHide': item.isHidden }]" @click="toggleSubMenu(item)" style="display: flex; align-items: baseline; justify-content: space-between; padding: 4px;">
              <div style="display: flex;">
                <i :class="item.icon" class="fa fa-home menu-item-icon" style="margin-left: 5px; display: block"></i>
                <span class="inner-text" style="margin-left: 5px; display: block">{{ item.label_format }}</span>
              </div>
              <i class="fa fa-indent" aria-hidden="true"></i>
            </div>
            <menu-item v-if="item.isHidden" :counter-items="counterItems" @update-child="toggleSubMenu(false)" @update-child-r="toggleSubMenu(false)" :children="item.children" :items="item" />
          </a>
          <a v-else-if="item.children && item.menuOpenType === 'DOWN'" class="mark sidebar-link" @click="toggleBlockVisibility(item)">
            <div :class="['menu-item', { 'activeHide': item.isHidden }]" style="display: flex; align-items: baseline; justify-content: space-between; padding: 4px;">
              <div style="display: flex;">
                <i :class="item.icon" class="fa fa-home menu-item-icon" style="margin-left: 5px; display: block;"></i>
                <span class="inner-text" style="margin-left: 5px; display: block;">{{ item.label_format }}</span>
              </div>
              <i v-if="item.isHidden" class="fa fa-chevron-up" aria-hidden="true"></i>
              <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
          </a>
          <router-link v-else :to="`#${item.action}`" @click="changeColor(item.action, item.plusnewdoc, item.plusnewdoc_resVal)" class="mark sidebar-link main-child" :class="{ 'activeLi': click === item.action || isActive(item.action, item.plusnewdoc, item.plusnewdoc_resVal) }">
            <div :class="['menu-item', { 'activeHide': item.isHidden }]" style="padding: 4px; display: flex;">
              <i :class="item.icon" class="fa fa-home menu-item-icon" style="margin: 6px 8px 5px 5px"></i>
              <span class="inner-text">{{ item.label_format }}</span>
              <div style="flex: 1;">
                <span v-for="(counter, index) in counterItems" v-if="item.counter_view" :key="index">
                  <div v-if="counter.menuDocUNID === item.menuDocUNID" style="width: 100%; display: flex; justify-content: end;">
                    <div class="number">{{ counter.count_value }}</div>
                  </div>
                </span>
              </div>
            </div>
          </router-link>
          <ul v-if="item.children && item.menuOpenType === 'DOWN'" class="mark sidebar-childe">
            <li v-if="item.isHidden" v-for="child in item.children" :key="child.action" @click="changeColor(child.action, child.plusnewdoc, child.plusnewdoc_resVal)">
              <span v-if="child.elementType === 'SEPARATOR'">
                <hr v-if="child.separatorType !== 'EMPTY'" style="margin: 3px 0;" />
                <div v-else style="margin-top: 20px"></div>
              </span>
              <router-link v-else :to="`#${child.action}`" class="mark sidebar-link main-child" :class="{ 'activeLi': click === child.action || isActive(child.action, child.plusnewdoc, child.plusnewdoc_resVal) }">
                <i :class="child.icon" class="fa fa-home menu-item-icon" style="margin: 6px 8px 5px 5px"></i>
                <div class="inner-text">{{ child.label_format }}</div>
                <div style="flex: 1;">
                  <span v-for="(counter, index) in counterItems" v-if="child.counter_view" :key="index">
                    <div v-if="counter.menuDocUNID === child.menuDocUNID" style="width: 100%; display: flex; justify-content: end;">
                      <div class="number">{{ counter.count_value }}</div>
                    </div>
                  </span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <footer class="sidebar-footer" style="text-align: center; padding-top: 5px; border-top: 1px solid #777; font-size: 1.2rem; line-height: 1.8rem; font-weight: 400;">
        © 2023 RealSoft.
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MyProfile from './profile.vue';
import MenuItem from './menuItem/menuItem.vue';

const router = useRouter();
const route = useRoute();
const props = defineProps({
  isMenuHide: Boolean,
  isProfileHide: Boolean,
  isHome: Boolean,
});
const emit = defineEmits(['update-menu', 'update-home', 'update-profile']);

const title = ref(window.MenuSettingsName || 'Меню');
const skydocsLogoUrl = ref(window.location.href.split('.nsf')[0] + '.nsf/menu_32.png');
const click = ref('');
const currentRoute = ref(window.location.hash);
const menuItems = ref([]);
const counterItems = ref([]);
const additionalMenuSubItems = ref([]);
const systemParam = ref(window.location.search);

// Функция для получения заголовка авторизации
const getAuthHeader = () => {
  return window.authCredentials || localStorage.getItem('authCredentials') || '';
};

const fetchMenuData = () => {
  if (!getAuthHeader()) {
    router.push('/login');
    return;
  }
  fetch(`https://design.realsoft.kz/WA/SKYDOCS/skydocs.nsf/restServices.xsp/getModernFilterMenu${systemParam.value}`, {
    headers: {
      'Authorization': getAuthHeader(),
    },
  })
      .then((response) => response.json())
      .then((data) => {
        menuItems.value = data;
        additionalMenuSubItems.value = data.filter((a) => a.menuOpenType === 'RIGHT');
        expandParentIfNeeded();
        expandChildParentIfNeeded();
      })
      .catch((error) => {
        console.error('Ошибка при получении меню:', error);
        if (error.message.includes('401')) router.push('/login'); // Перенаправление при ошибке авторизации
      });
};

const fetchCounterData = () => {
  if (!getAuthHeader()) {
    router.push('/login');
    return;
  }
  fetch('https://design.realsoft.kz/WA/SKYDOCS/skydocs.nsf/restViewCounter.xsp/getViewCounterStateFilter', {
    headers: {
      'Authorization': getAuthHeader(),
    },
  })
      .then((response) => response.json())
      .then((data) => {
        counterItems.value = data;
      })
      .catch((error) => {
        console.error('Ошибка при получении счётчиков:', error);
        if (error.message.includes('401')) router.push('/login'); // Перенаправление при ошибке авторизации
      });
};

const reloadData = () => {
  fetchCounterData();
  if (window.fakebig_flat && window.fakebig_flat.reload) {
    window.fakebig_flat.reload();
  }
};

const toggleBlockVisibility = (item) => {
  item.isHidden = !item.isHidden;
};

const toMain = () => {
  const elements = document.getElementsByClassName('activeLi');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('activeLi');
  }
};

const isActive = (route, plus, full) => {
  if (window.location.hash === `#/${route}` && plus) {
    setTimeout(() => {
      if (window.filterAction) {
        $('[aria-controls="plus"]').css({
          display: 'block !important',
          position: 'absolute',
          right: '0',
          pointerEvents: 'none'
        });
      } else {
        $('[aria-controls="plus"]').css({
          display: 'none !important',
          position: 'absolute',
          right: '0',
          pointerEvents: 'none'
        });
      }
    }, 1000);
    window.filterAction = plus;
    if (full) window.add_btn_text = full;
  }
  return currentRoute.value === `#/${route}`;
};

const changeColor = (route, plus, full) => {
  fetchCounterData();
  window.add_btn_text = '';
  fetchCounterData();
  if (window.smartDockingLayout) {
    setTimeout(() => {
      window.smartDockingLayout.items[0].setAttribute('selected-index', 0);
    }, 100);
  }
  if (plus) {
    window.add_btn_text = full;
    $('[aria-controls="plus"]').css({
      display: 'block !important',
      position: 'absolute',
      right: '0',
      pointerEvents: 'none'
    });
    window.filterAction = plus;
  } else {
    $('[aria-controls="plus"]').css({
      display: 'none !important',
      position: 'absolute',
      right: '0',
      pointerEvents: 'none'
    });
    window.filterAction = '';
  }
  if (window.filterAction) {
    document.getElementById('addDocplus').style = 'opacity: 0.7; pointer-events: none !important;';
  }
  $('[smart-id="tabsHeaderSection"]').css({opacity: '0.7', pointerEvents: 'none'});
  document.getElementsByClassName('sidebar-main')[0].style = 'opacity: 0.7; pointer-events: none;';
  document.getElementById('filterLoader').style = 'display: block; position: absolute; right: 28vw; z-index: 100000000000000000000; bottom: 60vh;';
  document.getElementById('content').style = 'opacity: 0.0;';
  click.value = route;
};

const toggleMenu = () => {
  const newValue = !props.isMenuHide;
  const newValueProfile = true;
  emit('update-menu', newValue);
  emit('update-profile', newValueProfile);
};

const toggleProfile = () => {
  const newValue = props.isMenuHide;
  const newValueProfile = !props.isProfileHide;
  emit('update-menu', newValue);
  emit('update-profile', newValueProfile);
};

const toggleSubMenu = (item) => {
  if (props.isMenuHide && props.isProfileHide) {
    toggleMenu();
  }
  if (item) {
    expandAddChildParentIfNeeded();
    item.isHidden = !item.isHidden;
  } else {
    expandAddParentIfNeeded();
    expandAddChildParentIfNeeded();
  }
};

const expandParentIfNeeded = () => {
  const childAction = currentRoute.value.slice(2);
  menuItems.value.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (child.action === childAction) {
          item.isHidden = true;
          window.filterAction = item.plusnewdoc;
          window.add_btn_text = item.plusnewdoc_resVal;
        }
      });
    }
    if (item.menuExpanded === 'YES') {
      item.isHidden = true;
    }
  });
};

const expandChildParentIfNeeded = () => {
  const childAction = currentRoute.value.slice(2);
  additionalMenuSubItems.value.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (child.action === childAction) {
          item.isHidden = true;
        }
      });
    }
    if (item.menuExpanded === 'YES') {
      item.isHidden = true;
    }
  });
};

const expandAddParentIfNeeded = () => {
  menuItems.value.forEach((item) => {
    if (item.menuExpanded === 'YES') {
      item.isHidden = true;
    } else {
      item.isHidden = false;
    }
  });
};

const expandAddChildParentIfNeeded = () => {
  additionalMenuSubItems.value.forEach((item) => {
    if (item.menuExpanded === 'YES') {
      item.isHidden = true;
    } else {
      item.isHidden = false;
    }
  });
};

const reloadColor = () => {
  const element = document.querySelector('.refresh_btn');
  if (element) {
    element.classList.add('changed-color');
    setTimeout(() => {
      element.classList.remove('changed-color');
    }, 1000);
  }
};

onMounted(() => {
  if (!getAuthHeader()) {
    router.push('/login');
    return;
  }
  fetchMenuData();
  fetchCounterData();
  if (window.SDDisableCounters !== 'YES') {
    setInterval(() => {
      fetchCounterData();
    }, 10000);
  }
  watch(() => route.hash, (newHash) => {
    currentRoute.value = newHash;
    expandParentIfNeeded();
    expandChildParentIfNeeded();
  });
});
</script>

<style scoped>
.sidebar-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.additional-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.additional-menu-items {
  padding: 10px;
  text-align: center;
}

.additional-a,
.additional-a_bottom {
  color: #333;
  text-decoration: none;
  display: block;
  padding: 5px;
  transition: color 0.3s;
}

.additional-a:hover,
.additional-a_bottom:hover {
  color: #007bff;
}

.icon_active {
  color: #007bff;
}

.grow {
  transition: transform 0.3s ease;
}

.grow:hover {
  transform: scale(1.2);
}

.sidebar {
  flex: 1;
  background: #f4f4f4;
  padding: 10px;
  transition: width 0.3s;
}

.sidebar-top {
  list-style: none;
  padding: 0;
}

.sidebar-link {
  color: #333;
  text-decoration: none;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-item-icon {
  font-size: 16px;
}

.inner-text {
  font-size: 14px;
}

.activeLi {
  background: #007bff;
  color: white;
}

.number {
  background: #ff4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.sidebar-footer {
  padding: 10px;
  background: #fff;
}

.refresh_btn.changed-color {
  color: #007bff;
  transform: rotate(360deg);
  transition: transform 1s, color 0.3s;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100px;
  }

  .inner-text {
    display: none;
  }
}
</style>