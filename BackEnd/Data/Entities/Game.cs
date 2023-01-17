namespace BackEnd.Data.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public string GameName { get; set; }
        public string CompanyName { get; set; }
        public double Price { get; set; }
        public string Summary { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
