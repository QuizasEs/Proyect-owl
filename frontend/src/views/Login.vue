<template>
    <div class="login-container">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="loginUser">
        <input v-model="username" placeholder="Nombre de usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: this.username,
            password: this.password,
          });
          
          // Guardar token y rol en el localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
  
          // Redireccionar según el rol
          if (response.data.role === 'admin') {
            this.$router.push('/admin-dashboard'); // Cambia a la vista del administrador
          } else {
            this.$router.push('/user-dashboard'); // Cambia a la vista del usuario común
          }
        } catch (error) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    width: 300px;
  }
  
  button {
    padding: 10px;
    width: 300px;
  }
  
  .error {
    color: red;
    margin-top: 20px;
  }
  </style>
  