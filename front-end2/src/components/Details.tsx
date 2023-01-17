import config from '../configData.json'
import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { Game } from '../types/game'
import moment from 'moment'

function Details() {
  const index: any = useParams()
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [gameData, setGameData] = useState<Game>()

  const history = useHistory()
  const handleOnClick = useCallback(() => history.push('/'), [history])

  const getGame = async () => {
    await axios
      .get(config.SERVER_API_URL + '/api/games/' + index.id)
      .then(function (response) {
        const game: Game = response.data
        setGameData(game)

        return
      })
      .catch(function (err) {
        
        if(err.code === 'ERR_NETWORK'){
          setErrorShow(true)
          setErrorMessage('Can not connect to back-end server')
          return;
        }

        if (err.response.status === 404) {
          setErrorShow(true)
          setErrorMessage('Game was not found')
        }
        return
      })
  }
  useEffect(() => {
    getGame()
  },[])
  return (
    <div>
      <div className=" py-16 px-4 justify-center">
        <div className="max-w-[720px] mx-auto text-center ">
          {errorShow !== true ? (
            <div className="p-3 divide-y divide-[#7d7b7b4a] bg-white  grid-flow-col gap-1 rounded-lg shadow-lg shadow-cyan-500/50">
              <div className="text-[14px] font-bold">Game Name</div>
              <div className=" text-[35px]">
                {gameData?.gameName}
              </div>
              <div className="text-[14px] font-bold">Made By</div>
              <div className="text-[20px]">
                {gameData?.companyName}
              </div>
              <div className="text-[14px] font-bold">Price</div>
              <div className="">{gameData?.price} €</div>
              <div className="text-[14px] font-bold">Release Date</div>
              <div className="">
                {moment(gameData?.releaseDate).format('YYYY-MM-DD')}
              </div>
              <div className="text-[14px] font-bold">Summary</div>
              <div className="">{gameData?.summary}</div>
            </div>
          ) : (
            <div className=" bg-red-400 p-3 rounded-lg">
              <p className=" font-bold">{errorMessage}</p>
            </div>
          )}
          <button
            onClick={handleOnClick}
            className="bg-[#a9a6a6] w-[150px] rounded-md font-medium h-10 text-black mb-3 mt-5"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details
