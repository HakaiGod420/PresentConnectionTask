using BackEnd.Data.Entities;
using Microsoft.Data.Sqlite;

namespace BackEnd.Data.Repositorys
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> GetAll();
        Task<Game> Get(int id);
        Task<Game> Post(Game game);
    }

    public class GameRepository : IGameRepository
    {
        public async Task<IEnumerable<Game>> GetAll()
        {
            List<Game> games = new List<Game>();

            await using (var connection = new SqliteConnection("Data Source=../mysql.db"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM Game";

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        games.Add(new Game
                        {
                            Id = Convert.ToInt16(reader[0]),
                            GameName = (string)reader[1],
                            CompanyName = (string)reader[2],
                            Price = (double)reader[3],
                            Summary = (string)reader[4],
                            ReleaseDate = Convert.ToDateTime(reader[5])
                        });
                    }
                }

            }
            return games;
        }

        public async Task<Game> Get(int id)
        {
            Game? game = null;

            await using (var connection = new SqliteConnection("Data Source=../mysql.db"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM Game WHERE Id=$id";

                command.Parameters.AddWithValue("$id", id);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        game = new Game();
                        game.Id = Convert.ToInt16(reader[0]);
                        game.GameName = (string)reader[1];
                        game.CompanyName = (string)reader[2];
                        game.Price = (double)reader[3];
                        game.Summary = (string)reader[4];
                        game.ReleaseDate = Convert.ToDateTime(reader[5]);
                    }
                }

            }
            return game;
        }

        public async Task<Game> Post(Game game)
        {
            await using (var connection = new SqliteConnection("Data Source=../mysql.db"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"INSERT INTO GAME (GameName,CompanyName,Price,Summary,ReleaseDate) VALUES($gameName,$companyName,$price,$summary,$releaseDate)";

                command.Parameters.AddWithValue("$gameName", game.GameName);
                command.Parameters.AddWithValue("$companyName", game.CompanyName);
                command.Parameters.AddWithValue("$price", game.Price);
                command.Parameters.AddWithValue("$summary", game.Summary);
                command.Parameters.AddWithValue("$releaseDate", game.ReleaseDate.ToString());

                try
                {
                    command.ExecuteNonQuery();
                    command.CommandText = "select last_insert_rowid()";
                    Int64 LastRowID64 = (Int64)command.ExecuteScalar();
                    game.Id = (int)LastRowID64;
                }
                catch(Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }
            return game;
        }
    }
}
