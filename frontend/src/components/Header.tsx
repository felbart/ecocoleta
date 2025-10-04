import logo from "../assets/images/logo.svg"

export default function Header() {
  return (
    <header className="fixed top bg-white/60  border-b border-secondary py-4 mx-auto px-32 w-full ">
      <img src={logo} alt="Eco Coleta" width={150}/>
    </header>
  );
}
