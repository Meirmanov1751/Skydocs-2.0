<template>
  <div v-if="!isMenuHide" class="sidebar" :class="{ 'sidebar-mobile': isMobile }">
    <ul class="sidebar-list">
      <p class="profile-title">Личный кабинет</p>
      <li>
        <router-link to="/settings" class="mark sidebar-link">
          <div class="sidebar-item">
            <i class="fa fa-wrench" style="margin-left: 5px"></i>
            <span class="inner-text">Настройки</span>
          </div>
        </router-link>
      </li>
      <li>
        <a href="SKYDOCS_Logout.xsp" class="mark sidebar-link">
          <div class="sidebar-item">
            <i class="fa fa-sign-out" style="margin-left: 5px"></i>
            <span class="inner-text">Выйти</span>
          </div>
        </a>
      </li>
    </ul>
    <footer class="sidebar-footer">
      © 2023 RealSoft.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  isMenuHide: Boolean,
});
const emit = defineEmits(['update-parent', 'update-parent-profile']);

const isMobile = computed(() => window.innerWidth <= 768);

onMounted(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped>
.sidebar {
  flex: 1;
  background: #f4f4f4;
  padding: 10px;
  transition: width 0.3s;
  overflow-y: auto;
  height: 100%;
}

.sidebar-mobile {
  width: 100px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.sidebar-link {
  color: #333;
  text-decoration: none;
  display: block;
  padding: 8px 10px;
  transition: background 0.3s;
}

.sidebar-link:hover {
  background: #e0e0e0;
}

.sidebar-item {
  display: flex;
  align-items: center;
}

.inner-text {
  font-size: 14px;
  margin-left: 10px;
}

.sidebar-footer {
  text-align: center;
  padding-top: 5px;
  border-top: 1px solid #777;
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
  color: #666;
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .sidebar {
    width: 100px;
  }

  .profile-title {
    font-size: 14px;
  }

  .inner-text {
    display: none;
  }

  .sidebar-item {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .sidebar {
    padding: 5px;
  }

  .sidebar-footer {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>