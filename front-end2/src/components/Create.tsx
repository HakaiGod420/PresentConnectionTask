import config from '../configData.json'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { CreateGame } from '../types/game'
import toast from 'react-hot-toast'

function Create() {
  const history = useHistory()
  const handleOnClick = useCallback(() => history.push('/'), [history])

  const [gameName, setGameName] = useState<string>()
  const [gameSummary, setGameSummary] = useState<string>()
  const [gameReleaseDate, setGameReleaseDate] = useState<Date>()
  const [gameStartingPrice, setGameStartingPrice] = useState<number>()
  const [gameCompanyName, setGameCompanyName] = useState<string>()
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const postGame = async () => {
    const newGame: CreateGame = {
      gameName: gameName,
      companyName: gameCompanyName,
      price: gameStartingPrice,
      summary: gameSummary,
      releaseDate: gameReleaseDate,
    }
    await axios
      .post(config.SERVER_API_URL + '/api/games/', newGame)
      .catch(function (error) {
        setErrorShow(true)
        setErrorMessage('Internal Error')
      })
  }

  const handelSubmit = async (e: any) => {
    e.preventDefault()
    if (gameName === undefined || gameName === '' || gameName.length >= 100) {
      setErrorShow(true)
      setErrorMessage(
        'The Game Name field must be filled in and be shorter than 100 characters.',
      )
      return
    }
    if (
      gameSummary === undefined ||
      gameSummary === '' ||
      gameSummary.length >= 1000
    ) {
      setErrorShow(true)
      setErrorMessage(
        'The Game Summary field must be filled in and be shorter than 1000 symbols.',
      )
      return
    }
    if (gameReleaseDate === undefined || isNaN(gameReleaseDate.getTime())) {
      setErrorShow(true)
      setErrorMessage('The Game Release Date field must be filled in.')
      return
    }
    if (gameStartingPrice === undefined || gameStartingPrice < 0) {
      setErrorShow(true)
      setErrorMessage(
        'The Price field must be filled in and must be greater than or equal to 0.',
      )
      return
    }
    if (
      gameCompanyName === undefined ||
      gameCompanyName === '' ||
      gameCompanyName.length >= 100
    ) {
      setErrorShow(true)
      setErrorMessage(
        'The Name of the game company field must be filled in and must be shorter than 100 characters.',
      )
      return
    }

    setErrorShow(false)
    const loading = toast.loading('Creating new game...')
    await postGame()
    toast.success('Game was created!', {
      id: loading,
    })
    handleOnClick()
  }

  return (
    <div className=" py-16 px-4 flex justify-center">
      <div className=" min-w-[720px] mx-auto">
        <div className="bg-[#3231319d] p-3 rounded-lg shadow-lg shadow-cyan-500/50 ">
          {errorShow && (
            <div className=" bg-red-400 p-3 rounded-lg">
              <p className=" font-bold">{errorMessage}</p>
            </div>
          )}
          <p className="dark:text-gray-200 text-[25px]">Game Information</p>
          <section>
            <form onSubmit={handelSubmit}>
              <div className="grid col-span-2 gap-6 mt-4">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="gameName"
                  >
                    Game Name
                  </label>
                  <input
                    onChange={(e) => setGameName(e.target.value)}
                    id="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200
                     rounded-md dark:bg-gray-800 dark:text-gray-300
                     dark:border-gray-600 focus:border-blue-400
                      focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="grid col-span-2 gap-6 mt-4">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="summary"
                  >
                    Game Summary
                  </label>
                  <textarea
                    onChange={(e) => setGameSummary(e.target.value)}
                    id="summary"
                    className="block w-full px-4 py-2 mt-2 text-gray-700
                    bg-white border border-gray-200 rounded-md dark:bg-gray-800
                    dark:text-gray-300 dark:border-gray-600 focus:border-blue-400
                     focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="grid col-span-2 gap-6 mt-4">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="reviewText"
                  >
                    Release Date
                  </label>
                  <input
                    onChange={(e) =>
                      setGameReleaseDate(new Date(e.target.value))
                    }
                    type="date"
                    id="date"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border
                     border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300
                       focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="grid col-span-2 gap-6 mt-4">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="reviewText"
                  >
                    Starting Price
                  </label>
                  <input
                    onChange={(e) =>
                      setGameStartingPrice(Number(e.target.value))
                    }
                    step="0.01"
                    type="number"
                    id="statingPrice"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border
                     border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300
                       focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="grid col-span-2 gap-6 mt-4">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="reviewText"
                  >
                    Company Name
                  </label>
                  <input
                    onChange={(e) => setGameCompanyName(e.target.value)}
                    id="companyName"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border
                     border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300
                       focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="flex justify-start mt-6">
                <button
                  className=" disabled:bg-slate-400 px-8 py-2.5 leading-5
                 text-white transition-colors duration-300 transform bg-gray-700 rounded-md
                  hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
        <button
          onClick={handleOnClick}
          className="bg-[#a9a6a6] w-[150px] rounded-md font-medium h-10 text-black mb-3 mt-5"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Create
