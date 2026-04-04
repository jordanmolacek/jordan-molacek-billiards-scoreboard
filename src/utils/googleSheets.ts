export interface GameData {
  date: string;
  jordanWins: number;
  opponentWins: number;
  location: string;
}

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

export const fetchGoogleSheetData = async (csvUrl: string): Promise<GameData[]> => {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    // Normalize line endings and split
    const rows = csvText.replace(/\r/g, '').split('\n').filter(row => row.trim() !== '');
    if (rows.length < 2) return [];

    const headers = parseCSVLine(rows[0]).map(h => h.toLowerCase());
    
    return rows.slice(1).map(row => {
      const values = parseCSVLine(row);
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
