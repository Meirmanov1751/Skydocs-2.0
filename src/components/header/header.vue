<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__inner--col header__left">
        <div id="header__burger" class="header__burger" @click="toggleMenu">
          <span class="header__burger-icon"></span>
        </div>
        <div class="header__logo">
          <router-link to="/main" @click="toMain">
            <img :src="logoUrl" alt="logo" class="logo" />
          </router-link>
        </div>
      </div>

      <div class="header__inner--col header__right">
        <div class="header__message"></div>
        <div class="header__logout">
          <div class="header__logout--info">
            <a href="SKYDOCS_Logout.xsp" class="logout-link">
              <i class="fa fa-sign-out header__icon" aria-hidden="true"></i>
              <p class="header__logout--fullname">{{ name }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  isMenuHide: Boolean,
  isProfileHide: Boolean,
});
const emit = defineEmits(['update-parent', 'update-parent-profile']);

const logoUrl = ref(
    window.location.host.includes('sed.gres1.kz')
        ? window.location.href.split('.nsf')[0] + '.nsf/LogoGres1.png'
        : window.location.href.split('.nsf')[0] + '.nsf/Kcell_wordmark.svg.png'
);
const isHide = ref(props.isMenuHide);
const name = ref(window.current_user_name || 'Пользователь');
const jobTitle = ref(window.current_user_stuff || '');

const toggleMenu = () => {
  const newValue = !props.isMenuHide;
  const newValueProfile = true;
  emit('update-parent', newValue);
  emit('update-parent-profile', newValueProfile);
};

const toMain = () => {
  const elements = document.getElementsByClassName('activeLi');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('activeLi');
  }
};

watch(
    () => props.isMenuHide,
    (newValue) => {
      isHide.value = newValue;
    }
);
</script>

<style scoped>
.header {
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__inner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header__inner--col {
  display: flex;
  align-items: center;
}

.header__left {
  gap: 15px;
}

.header__burger {
  display: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
}

.header__burger-icon {
  display: block;
  width: 25px;
  height: 2px;
  background: #333;
  position: relative;
}

.header__burger-icon::before,
.header__burger-icon::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 2px;
  background: #333;
  transition: transform 0.3s;
}

.header__burger-icon::before {
  top: -8px;
}

.header__burger-icon::after {
  top: 8px;
}

.header__burger.active .header__burger-icon {
  background: transparent;
}

.header__burger.active .header__burger-icon::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__burger.active .header__burger-icon::after {
  transform: rotate(-45deg) translate(7px, -7px);
}

.header__logo img.logo {
  height: 40px;
  width: auto;
}

.header__right {
  gap: 20px;
}

.header__logout--info {
  display: flex;
  align-items: center;
}

.logout-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.logout-link:hover {
  color: #007bff;
}

.header__icon {
  margin-right: 10px;
  font-size: 18px;
}

.header__logout--fullname {
  font-size: 16px;
  margin: 0;
  font-weight: 500;
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .header__burger {
    display: block;
  }

  .header__logo {
    display: none;
  }

  .header__right {
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .header__logout--info {
    justify-content: flex-end;
  }

  .header__logout--fullname {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header__logout--fullname {
    display: none;
  }

  .logout-link {
    justify-content: center;
  }

  .header__icon {
    margin-right: 0;
  }
}
</style>