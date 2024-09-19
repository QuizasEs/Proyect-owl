<template>
    <div>
      <h1>Áreas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="area in areas" :key="area.area_id">
            <td>{{ area.area_id }}</td>
            <td>{{ area.area_nombre }}</td>
            <td>
              <button @click="editarArea(area)">Editar</button>
              <button @click="eliminarArea(area.area_id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form @submit.prevent="agregarArea">
        <input v-model="nuevoArea" placeholder="Nuevo área" />
        <button type="submit">Agregar Área</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        areas: [],
        nuevoArea: '',
      };
    },
    async mounted() {
      const { data } = await axios.get('http://localhost:3000/areas');
      this.areas = data;
    },
    methods: {
      async agregarArea() {
        await axios.post('http://localhost:3000/areas', { area_nombre: this.nuevoArea });
        this.nuevoArea = '';
        this.$router.go(0); // refrescar la página
      },
      async eliminarArea(id: number) {
        await axios.delete(`http://localhost:3000/areas/${id}`);
        this.$router.go(0); // refrescar la página
      },
      editarArea(area: any) {
        // Lógica para editar área
      },
    },
  });
  </script>
  