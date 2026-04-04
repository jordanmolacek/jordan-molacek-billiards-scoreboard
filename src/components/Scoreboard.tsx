import React, { useEffect, useState } from 'react';
import { fetchGoogleSheetData, GameData } from '../utils/googleSheets';

interface ScoreboardProps {
  csvUrl: string;
  opponentName: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ csvUrl, opponentName }) => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchGoogleSheetData(csvUrl);
        setGames(data);
        setError(null);
      } catch (err) {
        setError('Failed to load scoreboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [csvUrl]);

  const calculateStats = () => {
    let totalJordanWins = 0;
    let totalOpponentWins = 0;

    games.forEach(game => {
      totalJordanWins += game.jordanWins;
      totalOpponentWins += game.opponentWins;
    });

    return { totalJordanWins, totalOpponentWins };
  };

  const { totalJordanWins, totalOpponentWins } = calculateStats();

  if (loading) return <div className="loading">Loading scoreboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="scoreboard-container">
      <h2>Jordan vs {opponentName}</h2>
      
      <div className="summary-stats">
        <div className="stat-card">
          <h3>Jordan</h3>
          <p className="win-count">{totalJordanWins}</p>
          <span>Total Wins</span>
        </div>
        <div className="stat-card">
          <h3>{opponentName}</h3>
          <p className="win-count">{totalOpponentWins}</p>
          <span>Total Wins</span>
        </div>
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Jordan Wins</th>
            <th>{opponentName} Wins</th>
            <th>Location</th>
            <th>Winner of the Day</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => {
            const dayWinner = game.jordanWins > game.opponentWins 
              ? 'Jordan' 
              : game.opponentWins > game.jordanWins 
                ? opponentName 
                : 'Tie';

            return (
              <tr key={index} className={dayWinner === 'Jordan' ? 'row-win' : dayWinner === 'Tie' ? '' : 'row-loss'}>
                <td>{game.date}</td>
                <td>{game.jordanWins}</td>
                <td>{game.opponentWins}</td>
                <td>{game.location}</td>
                <td className="winner-cell">{dayWinner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
