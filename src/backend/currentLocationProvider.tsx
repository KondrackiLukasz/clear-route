interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
 export async function fetchCoordinates(locationName: string): Promise<Coordinates | null> {
    const apiKey = 'bc1db8bd3a044491b86914d4dadf254b';
    const encodedLocation = encodeURIComponent(locationName);
  
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const coordinates: Coordinates = {
          latitude: lat,
          longitude: lng,
        };
        return coordinates;
      } else {
        console.error('Unable to fetch coordinates');
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }