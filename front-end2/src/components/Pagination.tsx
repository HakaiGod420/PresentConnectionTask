import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface Props {
  gamesPerPage: number
  totalGames: number
  pagination: (pageNumber: number) => (e: any) => void
  currentPage: number
}

function Pagination({
  gamesPerPage,
  totalGames,
  pagination,
  currentPage,
}: Props) {
  const pageNumbers = []

  for (let i = 1; i < Math.ceil(totalGames / gamesPerPage) + 1; i++) {
    pageNumbers.push(i)
  }

  if (pageNumbers.length === 0) {
    pageNumbers.push(1)
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <li
          onClick={currentPage !== 1 ? pagination(currentPage - 1) : undefined}
          className=" cursor-pointer relative inline-flex items-center rounded-md border
          border-gray-300 bg-white px-4 py-2 text-sm font-medium
          text-gray-700 hover:bg-gray-50"
        >
          Previous
        </li>
        <li
          onClick={
            currentPage !== pageNumbers.length
              ? pagination(currentPage + 1)
              : undefined
          }
          className=" cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </li>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {gamesPerPage * (currentPage - 1) + 1}
            </span>{' '}
            to <span className="font-medium">{gamesPerPage * currentPage}</span>{' '}
            of <span className="font-medium">{totalGames}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <li
              key={'previous'}
              onClick={
                currentPage !== 1 ? pagination(currentPage - 1) : undefined
              }
              className="relative inline-flex items-center rounded-l-md border
               border-gray-300 bg-white px-2 py-2 text-sm font-medium
              text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                onClick={pagination(number)}
                aria-current="page"
                className={
                  number !== currentPage
                    ? 'cursor-pointer relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex'
                    : ' z-10 cursor-pointer relative hidden items-center border border-indigo-500 bg-indigo px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50 focus:z-20 md:inline-flex'
                }
              >
                {number}
              </li>
            ))}
            <li
              key={'next'}
              onClick={
                currentPage !== pageNumbers.length
                  ? pagination(currentPage + 1)
                  : undefined
              }
              className="relative inline-flex items-center rounded-r-md border
              border-gray-300 bg-white px-2 py-2 text-sm font-medium
              text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </li>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
