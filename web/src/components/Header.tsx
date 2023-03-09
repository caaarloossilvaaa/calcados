import { faBell, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Header() {
  return (
    <div className="flex h-20 w-full bg-gray-100 flex-row justify-between items-center px-8">
      <h1 className="font-semibold text-2xl">Sistema Calçados</h1>
      <div className="flex flex-row justify-between items-center gap-4">
        <span className="text-gray-700 text-xl font-medium hover:text-gray-500 hover:scale-125 cursor-pointer duration-200">
          Carlos Silva
        </span>
        <FontAwesomeIcon
          icon={faBell}
          fontSize={24}
          className="text-gray-700 hover:text-gray-500 hover:scale-125 cursor-pointer duration-200"
        />
        <FontAwesomeIcon
          icon={faGears}
          fontSize={24}
          className="text-gray-700 hover:text-gray-500 hover:scale-125 cursor-pointer duration-200"
        />
      </div>
    </div>
  )
}
