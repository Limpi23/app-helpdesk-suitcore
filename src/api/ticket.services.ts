import axios from 'axios';

const apiUrl = 'https://ticket-sys-api-production.up.railway.app';
const endpoint = `${apiUrl}/tickets`;

export const getTickets = async () => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets', error);
    throw error;
  }
};

export const getTicketById = async (id: string) => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket by ID', error);
    throw error;
  }
};

export const createTicket = async (ticketData: any) => {
  try {
    const response = await axios.post(endpoint, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket', error);
    throw error;
  }
};
