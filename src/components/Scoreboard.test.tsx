import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import * as googleSheets from '../utils/googleSheets';

// Mock the fetchGoogleSheetData function
jest.mock('../utils/googleSheets');

const mockGames: googleSheets.GameData[] = [
  {
    date: '4/4/26',
    jordanWins: 7,
    opponentWins: 4,
    location: 'Knoxville, TN',
    jordanRuns: '2',
    opponentRuns: ''
  },
  {
    date: '4/11/2026',
    jordanWins: 5,
    opponentWins: 3,
    location: 'Local Bar',
    jordanRuns: '15, 20',
    opponentRuns: ''
  },
  {
    date: '4/12/2026',
    jordanWins: 2,
    opponentWins: 6,
    location: 'Club',
    jordanRuns: '',
    opponentRuns: '1'
  }
];

describe('Scoreboard', () => {
  beforeEach(() => {
    (googleSheets.fetchGoogleSheetData as jest.Mock).mockResolvedValue(mockGames);
  });

  it('renders the scoreboard with correct number of stars for count and lists', async () => {
    render(<Scoreboard csvUrl="mock-url" opponentName="Ryan" />);

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    // 4/4/26 has Jordan Runs '2' -> 2 stars
    const jordanWins4 = screen.getByText('7');
    const stars = screen.getAllByText('⭐');
    
    // We expect 2 stars in the first row, 2 in the second, 1 in the third. Total 5.
    expect(stars).toHaveLength(5);
    
    // Check first row (4/4/26)
    expect(jordanWins4).toContainElement(stars[0]);
    expect(jordanWins4).toContainElement(stars[1]);

    // Check second row (4/11/2026)
    const jordanWins11 = screen.getByText('5');
    expect(jordanWins11).toContainElement(stars[2]);
    expect(jordanWins11).toContainElement(stars[3]);

    // Check third row (4/12/2026)
    const ryanWins12 = screen.getByText('6');
    expect(ryanWins12).toContainElement(stars[4]);
  });

  it('does not render a runs column', async () => {
    render(<Scoreboard csvUrl="mock-url" opponentName="Ryan" />);

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.queryByText('Runs')).not.toBeInTheDocument();
    expect(screen.queryByText(/Jordan: 15/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ryan: 12/)).not.toBeInTheDocument();
  });
});
