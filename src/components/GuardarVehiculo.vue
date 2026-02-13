<template>
  <div class="container">
    <h2 class="title">Guardar Vehículo</h2>

    <form @submit.prevent="guardarVehiculo">
      <div class="form-group">
        <label for="token">Token</label>
        <input v-model="token" type="text" class="form-control" id="token" placeholder="Token desde localStorage" readonly>

        <label for="marca">Marca</label>
        <input v-model="marca" type="text" class="form-control" id="marca" placeholder="Ingrese la marca">

        <label for="modelo">Modelo</label>
        <input v-model="modelo" type="text" class="form-control" id="modelo" placeholder="Ingrese el modelo">

        <label for="chasis">Chasis</label>
        <input v-model="chasis" type="text" class="form-control" id="chasis" placeholder="Ingrese el chasis">

        <label for="fechaMatricula">Fecha Matricula</label>
        <input v-model="fechaMatricula" type="date" class="form-control" id="fechaMatricula" placeholder="Ingrese la fecha de matricula">

        <label for="fechaFabricacion">Fecha Fabricacion</label>
        <input v-model="fechaFabricacion" type="date" class="form-control" id="fechaFabricacion" placeholder="Ingrese la fecha de fabricacion">

        <div class="mt-3">
          <button type="submit" class="btn btn-primary">Guardar Vehiculo</button>
        </div>
      </div>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import ClienteApi from '../Client/ClienteApi'

export default {
  data() {
    return {
      token: '',
      marca: '',
      modelo: '',
      chasis: '',
      fechaMatricula: '',
      fechaFabricacion: '',
      mensaje: ''
    }
  },
  mounted() {
    this.token = localStorage.getItem('token') || ''
  },
  methods: {
    async guardarVehiculo() {
      if (!this.token) {
        this.mensaje = 'Primero debes generar/recibir un token'
        return
      }

      const vehiculo = {
        token: this.token,
        marca: this.marca,
        modelo: this.modelo,
        chasis: this.chasis,
        fechaMatricula: this.fechaMatricula,
        fechaFabricacion: this.fechaFabricacion
      }

      try {
        await ClienteApi.guardarVehiculo(vehiculo)
        this.mensaje = 'Vehículo guardado en localStorage'
      } catch (error) {
        this.mensaje = 'No se pudo guardar en localStorage'
      }

      this.marca = ''
      this.modelo = ''
      this.chasis = ''
      this.fechaMatricula = ''
      this.fechaFabricacion = ''
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 680px;
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

.form-group {
  display: grid;
  gap: 8px;
}

label {
  margin-top: 8px;
  font-weight: 600;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #42b983;
}

.mt-3 {
  margin-top: 14px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #42b983;
  color: #fff;
}

.btn-primary:hover {
  background: #36a172;
}

.mensaje {
  margin-top: 10px;
  font-weight: 600;
  text-align: left;
}
</style>
