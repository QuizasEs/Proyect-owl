<template>
    <nav>
      <ul v-if="isAdmin">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/areas">Áreas</router-link></li>
        <li><router-link to="/sub-areas">Sub Áreas</router-link></li>
        <li><router-link to="/mensajes">Mensajes</router-link></li>
        <li><router-link to="/usuarios">Usuarios</router-link></li>
        <li><router-link to="/register">Registrar Usuario</router-link></li>
      </ul>
      <ul v-else>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/areas">Áreas</router-link></li>
        <li><router-link to="/sub-areas">Sub Áreas</router-link></li>
        <li><router-link to="/mensajes">Mensajes</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        isAdmin: localStorage.getItem('role') === 'admin',
      };
    },
  });
  </script>
  