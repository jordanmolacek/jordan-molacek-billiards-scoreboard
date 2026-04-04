export interface GameData {
  date: string;
  jordanWins: number;
  opponentWins: number;
  location: string;
}

export const fetchGoogleSheetData = async (csvUrl: string): Promise<GameData[]> => {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    // Simple CSV parser
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    if (rows.length < 2) return [];

    const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
    
    return rows.slice(1).map(row => {
      const values = row.split(',').map(v => v.trim());
      const data: any = {};
      headers.forEach((header, index) => {
        data[header] = values[index];
      });
      
      return {
        date: data.date || '',
        jordanWins: parseInt(data.jordan) || 0,
        opponentWins: parseInt(data.opponent) || 0,
        location: data.location || ''
      } as GameData;
    });
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    return [];
  }
};
