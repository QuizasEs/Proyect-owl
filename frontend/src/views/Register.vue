<template>
    <div>
      <h1>Registrar Nuevo Usuario</h1>
      <form @submit.prevent="registerUser">
        <input v-model="username" placeholder="Nombre de usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <select v-model="role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
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
        role: 'user',
      };
    },
    methods: {
      async registerUser() {
        await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password,
          role: this.role,
        });
        this.$router.push('/usuarios');
      },
    },
  });
  </script>
  