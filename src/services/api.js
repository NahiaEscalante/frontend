import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import  {decryptData, encryptData} from './security.js'

const BACKEND_URL = 'http://127.0.0.1:8080'; 



export const getRoleBasedOnToken = async() => {
  const token = localStorage.getItem('token');
  const decryptData1 = await decryptData(token);
  const decodedToken = await jwtDecode(decryptData1);
  return decodedToken.role;
}

 export const getToken= async ()=>{
  try{
    const token = localStorage.getItem("token");
    const decryptData1 = await decryptData(token);
    return decryptData1;
  }catch(error){
    return null;
  }
}

 export const setToken = async (token)=>{
  try{
    const encryptData1 = await encryptData(token); 
    localStorage.setItem("token",encryptData1);
    return true;
  }catch{
    return false;
  }
}


export const fetchLogin = async (body) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, body);
    const token = response.data.token;
    await setToken(token);
    console.log("logeadooo");
  } catch (error) {
    throw error;
  }
};

export const fetchRegister = async (body) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register/pasajero`, body);
    const token = response.data.token;
    await setToken(token);
    console.log("registrado");
  } catch (error) {
    throw error;
  }
};

export const fetchRegisterEmpresa = async (body) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register/empresa`, body);
    const token = response.data.token;
    await setToken(token);
  } catch (error) {
    throw error;
  }
};



export const getPassenger = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/passenger/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDriver = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/driver/me`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRidesByUser = async (page, size) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/ride/user?page=${page}&size=${size}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassenger = async (passengerSelfResponseDTO) => {
  try {
     await axios.patch(`${BACKEND_URL}/passenger/me`, passengerSelfResponseDTO,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateDriverInfo = async (id, newDriverInfo) => {
  try {
    await axios.patch(`${BACKEND_URL}/driver/${id}`, newDriverInfo,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
    return "Driver update"
  } catch (error) {
    throw error;
  }
};

export const updateDriverCar = async (id, vehicleBasicData) => {
  try {
    await axios.patch(`${BACKEND_URL}/driver/${id}/car`, vehicleBasicData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
    return "Vehicle update";
  } catch (error) {
    throw error;
  }
};

export const deletePassenger = async (id) => {
  try {
    await axios.delete(`${BACKEND_URL}/passenger/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteDriver = async (id) => {
  try {
    await axios.delete(`${BACKEND_URL}/driver/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token como un Bearer token
      },
    });
  } catch (error) {
    throw error;
  }
};
