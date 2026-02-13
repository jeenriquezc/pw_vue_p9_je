const TOKEN_STORAGE_KEY = 'token';

const recibirToken = async (credenciales) => {
    const { usuario, password, rol } = credenciales || {};

    if (!usuario || !password || !rol) {
        throw new Error('Debes ingresar usuario, password y rol');
    }

    const token = btoa(`${usuario}:${rol}:${Date.now()}`);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return { token };
}

const enviarToken = async (token) => {
    if (!token) {
        throw new Error('Token inválido');
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return { token };
}


const ClientToken = {
    recibirToken,
    enviarToken
};
export default ClientToken;

