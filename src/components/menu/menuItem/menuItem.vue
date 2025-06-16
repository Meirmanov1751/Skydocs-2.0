<template>
  <div v-if="!isMenuHide" class="sidebar-childe_menu" style="display: flex; flex-direction: column; justify-content: space-between;">
    <p class="profile-title" style="text-align: center; padding: 5px !important;">
      <i @click="back" class="fa fa-chevron-left" aria-hidden="true" style="float: left; padding: 4px 0;"></i>{{ items.label_format }}
    </p>
    <ul class="sidebar-top">
      <li v-for="item in children" :key="item.action">
        <span v-if="item.elementType === 'SEPARATOR'">
          <hr v-if="item.separatorType !== 'EMPTY'" style="margin: 3px 0;" />
          <div v-else style="margin-top: 20px"></div>
        </span>
        <router-link v-else-if="item.children" :to="`#${item.action}`" class="mark sidebar-link" @click="toggleBlockVisibility(item)">
          <div :class="['menu-item', { 'activeHide': item.isHidden }]" style="display: flex; justify-content: space-between; padding: 4px;">
            <div style="display: flex;">
              <i v-if="item.icon" :class="item.icon" class="fa menu-item-icon" style="margin-left: 5px; display: block"></i>
              <span class="inner-text" style="margin-left: 5px; display: block">{{ item.label_format }}</span>
            </div>
            <i v-if="item.isHidden" class="fa fa-chevron-up" aria-hidden="true"></i>
            <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
        </router-link>
        <router-link v-else :to="`#${item.action}`" @click="changeColor(item.action, item.plusnewdoc, item.plusnewdoc_resVal)" class="mark sidebar-link" :class="{ 'activeLi': click === item.action || isActive(item.action, item.plusnewdoc, item.plusnewdoc_resVal) }">
          <div :class="['menu-item', { 'activeHide': item.isHidden }]" style="display: flex; padding: 4px;">
            <i v-if="item.icon" :class="item.icon" class="fa fa-home menu-item-icon" style="margin: 6px 8px 5px 5px; display: block"></i>
            <div class="inner-text" style="margin-left: 5px; display: block">{{ item.label_format }}</div>
            <div style="flex: 1;">
              <span v-for="(counter, index) in counterItems" :key="index" v-if="item.counter_view && counter.menuDocUNID === item.menuDocUNID">
                <div class="number">{{ counter.count_value }}</div>
              </span>
            </div>
          </div>
        </router-link>
        <ul v-if="item.children" class="mark sidebar-childe">
          <li v-if="item.isHidden" v-for="child in item.children" :key="child.action" @click="changeColor(child.action, child.plusnewdoc, child.plusnewdoc_resVal)">
            <router-link :to="`#${child.action}`" class="mark sidebar-link" :class="{ 'activeLi': click === child.action || isActive(child.action, child.plusnewdoc, child.plusnewdoc_resVal) }">
              <span class="inner-text">{{ child.label_format }}</span>
              <div style="flex: 1;">
                <span v-for="(counter, index) in counterItems" :key="index" v-if="child.counter_view && counter.menuDocUNID === child.menuDocUNID">
                  <div style="width: 100%; display: flex; justify-content: end;">
                    <div class="number">{{ counter.count_value }}</div>
                  </div>
                </span>
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <footer class="sidebar-footer" style="color: #000; text-align: center; padding-top: 5px; border-top: 1px solid #777; font-size: 1.2rem; line-height: 1.8rem; font-weight: 400;">
      © 2023 RealSoft.
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const props = defineProps({
  children: Array,
  items: Object,
  counterItems: Array,
  isMenuHide: Boolean,
});
const emit = defineEmits(['update-child', 'update-child-r', 'update-parent', 'update-parent-profile']);

const click = ref('');
const currentRoute = ref(window.location.hash);

const toggleBlockVisibility = (item) => {
  item.isHidden = !item.isHidden;
};

const isActive = (route, plus, full) => {
  if (currentRoute.value === `#/${route}` && plus) {
    setTimeout(() => {
      $('[aria-controls="plus"]').css({ display: 'block !important', position: 'absolute', right: '0', pointerEvents: 'none' });
      if (full) window.add_btn_text = full;
      window.filterAction = plus;
    }, 1000);
  } else {
    $('[aria-controls="plus"]').css({ display: 'none !important', position: 'absolute', right: '0', pointerEvents: 'none' });
  }
  return currentRoute.value === `#/${route}`;
};

const changeColor = (route, plus, full) => {
  window.add_btn_text = '';
  if (window.smartDockingLayout) {
    setTimeout(() => {
      window.smartDockingLayout.items[0].setAttribute('selected-index', 0);
    }, 100);
  }
  if (plus) {
    window.add_btn_text = full;
    $('[aria-controls="plus"]').css({ display: 'block !important', position: 'absolute', right: '0', pointerEvents: 'none' });
    window.filterAction = plus;
  } else {
    $('[aria-controls="plus"]').css({ display: 'none !important', position: 'absolute', right: '0', pointerEvents: 'none' });
    window.filterAction = '';
  }
  document.getElementById('addDocplus').style = 'opacity: 0.7; pointer-events: none !important;';
  $('[smart-id="tabsHeaderSection"]').css({ opacity: '0.7', pointerEvents: 'none' });
  document.getElementById('filterLoader').style = 'display: block; position: absolute; right: 28vw; z-index: 100000000000000000000; bottom: 60vh;';
  document.getElementById('content').style = 'opacity: 0.0;';
  document.getElementsByClassName('sidebar-main')[0].style = 'opacity: 0.7; pointer-events: none;';
  click.value = route;

  const elements = document.getElementsByClassName('main-child');
  for (let i = 0; i < elements.length; i++) {
    try {
      elements[i].classList.remove('activeLi');
    } catch (e) {
      console.error(e);
    }
  }
};

const contentHide = (value = true) => {
  const newValueProfile = !value;
  emit('update-child-r', newValueProfile);
};

const back = () => {
  emit('update-child', props.items);
};

watch(() => route.hash, (newHash) => {
  currentRoute.value = newHash;
});
</script>

<style scoped>
.sidebar-childe_menu {
  flex: 1;
  background: #f4f4f4;
  padding: 10px;
  transition: width 0.3s;
}

.profile-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.sidebar-top {
  list-style: none;
  padding: 0;
}

.sidebar-link {
  color: #333;
  text-decoration: none;
  display: block;
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
  margin-left: 5px;
}

.sidebar-footer {
  padding: 10px;
  background: #fff;
}

@media (max-width: 768px) {
  .sidebar-childe_menu {
    width: 100px;
  }
  .inner-text {
    display: none;
  }
}
</style>