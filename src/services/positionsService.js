import axios from 'axios';

const API_URL = 'https://api.astronomyapi.com/api/v2/bodies/positions';
const authString = btoa('3b38c5eb-3e8c-41d6-9691-f81658ff99d0:94509b9adacdfe8409c0b2be05ad1352a0b4a2cb8662624cb1fd7d0373d56cec4a9b2a79e242d11801ee01222431f8e5677a5e1d84d5679d81c9675690b18a563ae701732471e8433a617a7a44b219548f9d87aa2b7827a4b279801d868a93f4d6e0533e9d1cd2166bc1f668109c7271');

export const getBodyPositions = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/json'
        },
        params: {
          latitude: 33.775867,
          longitude: -84.39733,
          elevation: 0,
          from_date: new Date().toISOString().split('T')[0],
          to_date: new Date().toISOString().split('T')[0],
          time: '00:00:00'
        }
      });
  
      // Flatten the response data
      const bodies = response.data.data.table.rows.flatMap(row => row.cells.map(cell => ({
        id: cell.id,
        name: cell.name,
        azimuth: parseFloat(cell.position.horizontal.azimuth.degrees),
        altitude: parseFloat(cell.position.horizontal.altitude.degrees),
        magnitude: parseFloat(cell.extraInfo.magnitude)
      })));
  
      console.log('Flattened bodies data:', bodies);
      return bodies;
    } catch (error) {
      console.error('Error fetching body positions:', error);
      throw error;
    }
  };
  