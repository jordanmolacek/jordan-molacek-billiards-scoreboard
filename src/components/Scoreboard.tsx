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
    let jordanWins = 0;
    let opponentWins = 0;

    games.forEach(game => {
      if (game.winner.toLowerCase() === 'jordan') {
        jordanWins++;
      } else if (game.winner.toLowerCase().includes(opponentName.toLowerCase())) {
        opponentWins++;
      }
    });

    return { jordanWins, opponentWins };
  };

  const { jordanWins, opponentWins } = calculateStats();

  if (loading) return <div className="loading">Loading scoreboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="scoreboard-container">
      <h2>Jordan vs {opponentName}</h2>
      
      <div className="summary-stats">
        <div className="stat-card">
          <h3>Jordan</h3>
          <p className="win-count">{jordanWins}</p>
          <span>Wins</span>
        </div>
        <div className="stat-card">
          <h3>{opponentName}</h3>
          <p className="win-count">{opponentWins}</p>
          <span>Wins</span>
        </div>
      </div>

      <table className="games-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Score</th>
            <th>Winner</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index} className={game.winner.toLowerCase() === 'jordan' ? 'row-win' : 'row-loss'}>
              <td>{game.date}</td>
              <td>{game.player1}</td>
              <td>{game.player2}</td>
              <td>{game.score1} - {game.score2}</td>
              <td className="winner-cell">{game.winner}</td>
              <td>{game.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
