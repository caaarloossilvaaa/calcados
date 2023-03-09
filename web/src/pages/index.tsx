import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import {
  IconDefinition,
  faBoxesStacked,
  faBug,
  faChartSimple,
  faDollar,
} from '@fortawesome/free-solid-svg-icons'
import { Footer } from '../components/Footer'

interface IButtonProps {
  action: string
  icon: IconDefinition
}

function Button({ action, icon }: IButtonProps) {
  return (
    <div className="flex p-4 text-white bg-sky-700 h-32 justify-center items-center rounded-2xl gap-4 cursor-pointer hover:bg-sky-800 duration-200 hover:scale-[1.025]">
      <FontAwesomeIcon fontSize={36} icon={icon} />
      <span className="text-2xl ">{action}</span>
    </div>
  )
}

export function App() {
  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="grid grid-cols-2 gap-x-4 gap-y-16 mt-4 mx-4">
          <Button action="Entrada de produtos" icon={faDollar} />
          <Button action="Saida de produtos" icon={faBoxesStacked} />
          <Button action="Relatório de Clientes" icon={faBug} />
          <Button action="Relatório de Estoque" icon={faChartSimple} />
        </div>
        <Footer />
      </div>
    </div>
  )
}
