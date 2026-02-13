<template>
  <div class="container">
  <h2 class="title">Recibir Token</h2>
  <form @submit.prevent="obtenerToken">
        <div class="form-group">
            <label for="token">Usuario</label>
      <input v-model="usuario" type="text" class="form-control" id="token" placeholder="Ingrese el usuario">
    
            <label for="marca">Password</label>
      <input v-model="password" type="password" class="form-control" id="marca" placeholder="Ingrese el password">
        
            <label for="modelo">Rol</label>
      <input v-model="rol" type="text" class="form-control" id="modelo" placeholder="Ingrese el rol">

            <label for="chasis">Token</label>
      <input v-model="token" type="text" class="form-control" id="chasis" placeholder="Token recibido" readonly>

            <button type="submit" class="btn btn-primary mt-3">Recibir Token</button>
            <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
        </div>
    </form>
  </div>
</template>

<script>
import ClientToken from '../Client/ClientToken'

export default {
  data() {
    return {
      usuario: '',
      password: '',
      rol: '',
      token: '',
      mensaje: ''
    }
  },
  mounted() {
    this.token = localStorage.getItem('token') || ''
  },
  methods: {
    async obtenerToken() {
      try {
        const respuesta = await ClientToken.recibirToken({
          usuario: this.usuario,
          password: this.password,
          rol: this.rol
        })

        const tokenRecibido = typeof respuesta === 'string'
          ? respuesta
          : (respuesta?.token || '')

        this.token = tokenRecibido
        localStorage.setItem('token', this.token)
        this.mensaje = 'Token generado y guardado en localStorage'
      } catch (error) {
        this.token = ''
        this.mensaje = error?.message || 'No se pudo generar el token'
      }
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