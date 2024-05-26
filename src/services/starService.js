import axios from 'axios';

const API_URL = 'https://api.astronomyapi.com/api/v2/bodies/positions';
const authString = btoa('your_application_id:your_application_secret');

export const getStarData = async () => {
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

    const stars = response.data.data.table.rows.flatMap(row =>
      row.cells.map(cell => ({
        id: cell.id,
        name: cell.name,
        azimuth: parseFloat(cell.position.horizontal.azimuth.degrees),
        altitude: parseFloat(cell.position.horizontal.altitude.degrees),
        magnitude: parseFloat(cell.extraInfo.magnitude)
      }))
    );

    return stars;
  } catch (error) {
    console.error('Error fetching star data:', error);
    throw error;
  }
};
