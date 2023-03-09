import {
  IconDefinition,
  faBoxesPacking,
  faCartFlatbed,
  faDashboard,
  faMoneyBill1Wave,
  faPeopleCarry,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

interface IItem {
  item: string
  icon: IconDefinition
  route: string
}

function ItemSidebar({ item, icon, route }: IItem) {
  return (
    <Link
      to={route}
      className="flex mt-5 gap-4 text-slate-200 hover:text-slate-100 font-semibold text-lg items-center bg-sky-700 p-3 hover:bg-sky-900 duration-200 cursor-pointer rounded-xl w-full"
    >
      <FontAwesomeIcon fontSize={24} icon={icon} />
      <span>{item}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <div className="flex h-screen w-80 bg-sky-800 py-8 px-4 flex-col">
      <img
        src="/logo.png"
        alt="Sistema calçados"
        className="w-24 h-24 object-contain p-3 bg-sky-700 rounded-full border-none mb-3"
      />
      <ItemSidebar route="/" item="Dashboard" icon={faDashboard} />
      <ItemSidebar route="/clients" item="Clientes" icon={faPeopleGroup} />
      <ItemSidebar route="/products" item="Produtos" icon={faCartFlatbed} />
      <ItemSidebar route="/suppliers" item="Fornecedores" icon={faPeopleCarry} />
      <ItemSidebar route="/sale" item="Venda" icon={faMoneyBill1Wave} />
      <ItemSidebar route="/" item="Entrada" icon={faBoxesPacking} />
    </div>
  )
}
