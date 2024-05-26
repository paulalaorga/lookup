import axios from 'axios';

const API_URL = 'https://api.astronomyapi.com/api/v2/studio/star-chart';
const authString = btoa('3b38c5eb-3e8c-41d6-9691-f81658ff99d0:94509b9adacdfe8409c0b2be05ad1352a0b4a2cb8662624cb1fd7d0373d56cec4a9b2a79e242d11801ee01222431f8e5677a5e1d84d5679d81c9675690b18a563ae701732471e8433a617a7a44b219548f9d87aa2b7827a4b279801d868a93f4d6e0533e9d1cd2166bc1f668109c7271');

export const getStarChart = async (constellation) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        style: 'default',
        observer: {
          latitude: 33.775867,
          longitude: -84.39733,
          date: new Date().toISOString().split('T')[0]
        },
        view: {
          type: 'constellation',
          parameters: {
            constellation: constellation
          }
        }
      },
      {
        headers: {
          Authorization: `Basic ${authString}`
        }
      }
    );
    return response.data.data.imageUrl;
  } catch (error) {
    console.error('Error fetching star chart:', error);
    throw error;
  }
};
