<template>
  <div class="login-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Логин:</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = () => {
  if (!username.value || !password.value) {
    error.value = 'Пожалуйста, заполните все поля.';
    return;
  }

  const credentials = btoa(`${username.value}:${password.value}`);
  window.authCredentials = `Basic ${credentials}`; // Сохраняем в глобальную переменную
  localStorage.setItem('authCredentials', window.authCredentials); // Опционально сохраняем в localStorage

  // Перенаправляем на главную страницу после авторизации
  router.push('/main');
};

onMounted(() => {
  // Проверяем, есть ли сохранённые учетные данные
  const savedCredentials = localStorage.getItem('authCredentials');
  if (savedCredentials) {
    window.authCredentials = savedCredentials;
    router.push('/main');
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>