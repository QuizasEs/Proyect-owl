<template>
    <div>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
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
      };
    },
    methods: {
      async login() {
        try {
          const { data } = await axios.post('http://localhost:3001/login', {
            us_username: this.username,
            us_password: this.password,
          });
          localStorage.setItem('token', data.token);
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed');
        }
      },
    },
  });
  </script>
  