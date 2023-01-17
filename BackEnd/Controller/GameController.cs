using BackEnd.Data.Dtos.Game;
using BackEnd.Data.Entities;
using BackEnd.Data.Repositorys;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controller
{


    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }
        [HttpGet]
        public async Task<IEnumerable<GameDto>> GetAll()
        {
            
            return (await _gameRepository.GetAll()).Select(x=> new GameDto(x.Id,x.GameName,x.CompanyName,x.Price,x.ReleaseDate));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> Get(int id)
        {
            Game game = await _gameRepository.Get(id);

            if(game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post(CreateGameDtos gameDto)
        {
            Game game = new Game
            {
                Id = 0,
                GameName = gameDto.GameName,
                CompanyName = gameDto.CompanyName,
                Price = (double)gameDto.Price,
                ReleaseDate = (DateTime)gameDto.ReleaseDate,
                Summary = gameDto.Summary,
            };

            Game createdGame = await _gameRepository.Post(game);

            return Created("", createdGame);
        }
    }
}
