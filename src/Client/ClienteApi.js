const VEHICULOS_STORAGE_KEY = 'vehiculos';

const getVehiculos = async () => {
    return JSON.parse(localStorage.getItem(VEHICULOS_STORAGE_KEY) || '[]');
}

const guardarVehiculo = async (vehiculo) => {
    const vehiculos = JSON.parse(localStorage.getItem(VEHICULOS_STORAGE_KEY) || '[]');
    const nuevoVehiculo = {
        ...vehiculo,
        id: vehiculo.id || Date.now()
    };

    vehiculos.push(nuevoVehiculo);
    localStorage.setItem(VEHICULOS_STORAGE_KEY, JSON.stringify(vehiculos));

    return nuevoVehiculo;
}

const borrarVehiculo = async (idVehiculo) => {
    const vehiculos = JSON.parse(localStorage.getItem(VEHICULOS_STORAGE_KEY) || '[]');
    const actualizados = vehiculos.filter((vehiculo) => String(vehiculo.id) !== String(idVehiculo) && String(vehiculo.chasis) !== String(idVehiculo));

    localStorage.setItem(VEHICULOS_STORAGE_KEY, JSON.stringify(actualizados));
    return { eliminado: true };
}


//fachada para exportar las funciones
const ClienteApi = {
    getVehiculos,
    guardarVehiculo,
    borrarVehiculo
};
export default ClienteApi;  