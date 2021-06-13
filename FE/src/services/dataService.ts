import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const findReservations = ():any => http.get('/appointments');
export const get = (id: string) => http.get(`/appointments/${id}`);
export const create = (data: { name: string; lastName: string; timeStamp: any; }) => http.post('/appointments', data);
export const update = (id: string, data: { name: string; lastName: string; timeStamp: any; }) => http.put(`/appointments/${id}`, data);
export const deleteAppointment = (id: string) => http.delete(`/appointments/${id}`);
export const deleteAllAppointments = () => http.delete('/appointments');
export const findByTimeStamp = (timeStamp: string) => http.get(`/appointments?timeStamp=${timeStamp}`);
