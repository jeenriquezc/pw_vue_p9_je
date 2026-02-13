<template>
  <div class="container">
    <h2 class="title">Lista de Vehículos</h2>
    <table class="tabla-vehiculos">
      <thead>
        <tr>
          <th>Marca</th>
          <th>Chasis</th>
          <th>Fecha Matricula</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehiculo, index) in vehiculos" :key="index">
          <td>{{ vehiculo.marca }}</td>
          <td>{{ vehiculo.chasis }}</td>
          <td>{{ vehiculo.fechaMatricula }}</td>
          <td><button class="btn btn-danger" @click="borrarVehiculo(index)">Borrar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ClienteApi from '../Client/ClienteApi'

export default {
  data() {
    return {
      vehiculos: []
    }
  },
  mounted() {
    this.cargarVehiculos()
  },
  methods: {
    async cargarVehiculos() {
      try {
        const respuesta = await ClienteApi.getVehiculos()
        this.vehiculos = Array.isArray(respuesta) ? respuesta : []
      } catch (error) {
        this.vehiculos = []
      }
    },
    async borrarVehiculo(index) {
      const vehiculo = this.vehiculos[index]
      const idVehiculo = vehiculo.id || vehiculo.chasis

      try {
        await ClienteApi.borrarVehiculo(idVehiculo)
        this.vehiculos.splice(index, 1)
      } catch (error) {
        await this.cargarVehiculos()
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 24px auto;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #ffffff;
}

.title {
  margin: 0 0 16px;
  font-size: 1.4rem;
  text-align: left;
}

.tabla-vehiculos {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabla-vehiculos th,
.tabla-vehiculos td {
  border: 1px solid #e2e8f0;
  padding: 10px;
  text-align: left;
}

.tabla-vehiculos th {
  background: #f8fafc;
  font-weight: 700;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
}

.btn-danger {
  background: #ef4444;
  color: #fff;
}

.btn-danger:hover {
  background: #dc2626;
}
</style>