import { Link, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.svg'
import logoIcon from '../assets/images/icon.png' 
import { BiArrowBack, BiData, BiHome } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdPlace } from "react-icons/md";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();

  const nav = [
    { to: "/", label: "Dashboard", icon: <BiHome size={20} /> },
    { to: "/cadastrar", label: "Cadastrar", icon: <GrAdd size={20} /> },
    { to: "/consultar", label: "Consultar", icon: <MdPlace size={20} /> },
    { to: "/estatisticas", label: "Estatísticas", icon: <BiData size={20} /> },
  ];

  return (
    <aside
      className={`fixed h-screen border-r border-slate-200 bg-white p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-center mb-8 relative">
        <img
          src={collapsed ? logoIcon : logo}
          alt="EcoColeta"
          className={`h-12 object-contain transition-all duration-300 ${
            collapsed ? "w-12" : "w-full"
          }`}
        />
        <button
          className="size-8 bg-primary flex items-center justify-center text-white rounded-md absolute top-12 -right-4"
          onClick={onToggle}
        >
          {collapsed ? <BsArrowRight size={16} /> : <BiArrowBack size={16} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-4 py-2 rounded-md text-base font-medium flex items-center gap-4 transition-all duration-300 ${
              pathname === item.to
                ? "bg-primary text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            <div
              className={`flex-shrink-0 transition-colors duration-300 ${
                pathname === item.to ? "text-white" : "text-neutral-600"
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;