import config from '../configData.json'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BasicGame } from '../types/game'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import Pagination from './Pagination'

function DataList() {
  const [gameData, setGameData] = useState<BasicGame[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [gamesPerPage] = useState<number>(5)
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [search, setSearch] = useState<string>('')

  const history = useHistory()
  const handleOnClick = useCallback(
    (id: number) => (e: any) => history.push('/details/' + id),
    [history],
  )
  const handleOnClickCreate = useCallback(() => history.push('/create/'), [
    history,
  ])
  const paginate = (pageNumber: number) => (e: any) =>
    setCurrentPage(pageNumber)

  const filter = (game: BasicGame) => {
    return search.toLowerCase() === ''
      ? game
      : game.gameName.toLowerCase().includes(search) ||
          game.price.toString().toLowerCase().includes(search) ||
          game.companyName.toString().toLowerCase().includes(search) ||
          game.releaseDate.toString().toLowerCase().includes(search)
  }

  const refreshGames = async () => {
    await axios
      .get(config.SERVER_API_URL + '/api/games/')
      .then(function (response) {
        const games: BasicGame[] = response.data
        setGameData(games)
        return
      })
      .catch(function (err) {
        setErrorShow(true)
        setErrorMessage('Back-End server not responding')
        return
      })
  }
  useEffect(() => {
    refreshGames()
  }, [])

  const indexOfTheLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfTheLastGame - gamesPerPage
  const currentGames = gameData.slice(indexOfFirstGame, indexOfTheLastGame)

  return (
    <div>
      <div className=" py-16 px-4 justify-center">
        <div className="max-w-[1240px] mx-auto">
          {errorShow && (
            <div className=" bg-red-400 p-3 rounded-lg m-5">
              <p className=" font-bold">{errorMessage}</p>
            </div>
          )}
          <div className="justify-items-end items-center align-middle">
            <div className="grid  md:grid-cols-3 gap-10 grid-cols-1">
              <div className="flex flex-col justify-between items-center">
                <form>
                  <input
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    className="h-10 text-center justify-start rounded-lg w-[500px] md:w-[250px]"
                    placeholder="Search game"
                  ></input>
                </form>
              </div>
              <div className="text-center justify-start mb-3 text-green-500 font-bold  text-[27px]">
                <h1 className="">GAMES LIST</h1>
              </div>
              <div className="flex flex-col justify-start items-center">
                <button
                  onClick={handleOnClickCreate}
                  className="bg-green-500 w-[150px] rounded-md font-medium h-10 text-black mb-3"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Game Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Company Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Release Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentGames
                  .filter((game) => filter(game))
                  .map((game) => (
                    <tr
                      onClick={handleOnClick(game.id)}
                      key={game.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {game.id}
                      </th>
                      <td className="py-4 px-6">{game.gameName}</td>
                      <td className="py-4 px-6">{game.companyName}</td>
                      <td className="py-4 px-6">{game.price}</td>
                      <td className="py-4 px-6">
                        {moment(game.releaseDate).format('YYYY-MM-DD')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            gamesPerPage={gamesPerPage}
            totalGames={gameData.length}
            pagination={paginate}
          />
        </div>
      </div>
    </div>
  )
}

export default DataList
