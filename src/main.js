import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/main.css';
import App from './App.vue';
import MyHome from './components/home/home.vue';
import MyArchive from './components/archive/archive.vue';
import MyFilter from './components/filter.vue';
import MyProfile from './components/menu/profile.vue';
import Login from './components/auth/login.vue'; // Убедитесь, что путь корректен
import Menu from './components/menu/menu.vue'; // Добавляем компонент меню

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/login' }, // Перенаправление на страницу логина по умолчанию
        { path: '/login', component: Login }, // Явное указание компонента Login
        { path: '/main', component: MyHome }, // Главная страница
        { path: '/archive', component: MyArchive }, // Архив
        { path: '/menu', component: Menu }, // Добавляем маршрут для меню, если нужно
    ],
});

// Защита маршрутов (проверка авторизации)
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authCredentials'); // Проверяем наличие авторизационных данных
    if (to.path !== '/login' && !isAuthenticated) {
        next('/login'); // Перенаправляем на логин, если не авторизован
    } else {
        next(); // Продолжаем навигацию
    }
});

const app = createApp(App);
app.component('my-filter', MyFilter);
app.component('my-profile', MyProfile);
app.use(router);
app.mount('#app');