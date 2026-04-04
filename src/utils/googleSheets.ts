export interface GameData {
  date: string;
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  winner: string;
  notes?: string;
}

export const fetchGoogleSheetData = async (csvUrl: string): Promise<GameData[]> => {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    // Simple CSV parser
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
    
    return rows.slice(1).map(row => {
      const values = row.split(',').map(v => v.trim());
      const data: any = {};
      headers.forEach((header, index) => {
        data[header] = values[index];
      });
      
      return {
        date: data.date || '',
        player1: data.player1 || '',
        player2: data.player2 || '',
        score1: parseInt(data.score1) || 0,
        score2: parseInt(data.score2) || 0,
        winner: data.winner || '',
        notes: data.notes || ''
      } as GameData;
    });
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    return [];
  }
};
