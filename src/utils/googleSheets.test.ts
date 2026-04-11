import { fetchGoogleSheetData } from './googleSheets';

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('fetchGoogleSheetData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('correctly parses CSV with runs columns', async () => {
    const csvContent = `Date,Jordan,Opponent,Location,Jordan Runs,Opponent Runs
4/11/2026,5,3,Local Bar,15,
4/12/2026,2,6,Club, ,12
4/13/2026,4,4,Somewhere, , `;
    
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve(csvContent)
    });

    const data = await fetchGoogleSheetData('mock-url');

    expect(data).toHaveLength(3);
    expect(data[0]).toEqual({
      date: '4/11/2026',
      jordanWins: 5,
      opponentWins: 3,
      location: 'Local Bar',
      jordanRuns: '15',
      opponentRuns: ''
    });
    expect(data[1]).toEqual({
      date: '4/12/2026',
      jordanWins: 2,
      opponentWins: 6,
      location: 'Club',
      jordanRuns: '',
      opponentRuns: '12'
    });
    expect(data[2]).toEqual({
      date: '4/13/2026',
      jordanWins: 4,
      opponentWins: 4,
      location: 'Somewhere',
      jordanRuns: '',
      opponentRuns: ''
    });
  });

  it('correctly parses CSV with quoted values containing commas', async () => {
    // Standard CSV export will quote values that contain commas
    const csvContent = `Date,Jordan,Opponent,Location,Jordan Runs,Opponent Runs
4/14/2026,5,3,Local Bar,"15, 20", `;
    
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve(csvContent)
    });

    const data = await fetchGoogleSheetData('mock-url');

    expect(data).toHaveLength(1);
    expect(data[0].jordanRuns).toBe('15, 20');
  });

  it('handles empty csv', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve('')
    });

    const data = await fetchGoogleSheetData('mock-url');
    expect(data).toEqual([]);
  });
});
