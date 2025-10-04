import { PiPlant } from "react-icons/pi";
import heroImg from "./assets/images/hero-img.svg";

export default function Home() {
  return (
    <>
      <header id="home" className="bg-white">
        <div className="mx-6 md:mx-12 lg:mx-24 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Texto */}
            <div className="flex flex-col gap-5">
              <span
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs gap-2 text-secondary-dark"
                aria-label="Sustentabilidade em ação"
              >
                <PiPlant size={16} /> Sustentabilidade em ação
              </span>

              <h1 className="font-bold text-primary-dark text-left leading-tight [text-wrap:balance] text-4xl sm:text-5xl lg:text-6xl">
                Transforme sua reciclagem em impacto positivo
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-primary-dark/90">
                Encontre pontos de coleta próximos, cadastre novos locais e faça
                parte de uma comunidade comprometida com o meio ambiente. Juntos, podemos fazer a diferença.
              </p>

              <a
                href="#pontos-coleta"
                className="inline-flex w-fit px-8 py-4 bg-primary-dark text-white text-base sm:text-lg font-medium rounded-2xl hover:bg-gradient-to-br from-secondary to-secondary-dark transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-dark"
              >
                Encontrar ponto de coleta
              </a>
            </div>

            {/* Ilustração */}
            <div className="flex justify-center">
              <img
                src={heroImg}
                alt="EcoColeta — ilustração de reciclagem"
                width={520}
                height={520}
                loading="eager"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </header>

      <main id="pontos-coleta" className="bg-white">
        <section className="mx-6 md:mx-12 lg:mx-24 py-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark mb-6">
            Pontos de coleta próximos
          </h2>

          {/* Lista vinda do servidor */}
          <PointsList />
        </section>
      </main>
    </>
  );
}

/* --- componente que busca no backend REST --- */
import { useEffect, useState } from "react";

type Ponto = {
  nome: string;
  endereco: string;
  horario: string;
  materiais: string[];
};

function PointsList() {
  const [data, setData] = useState<Ponto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/pontos"); // ajuste a URL conforme o backend
        if (!res.ok) throw new Error("Falha ao carregar pontos");
        const json = await res.json();
        setData(json);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setErro(e.message ?? "Erro inesperado");
        } else {
          setErro("Erro inesperado");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-primary-dark/80">Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;
  if (!data || data.length === 0) return <p>Nenhum ponto encontrado.</p>;

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((p, i) => (
        <li
          key={`${p.nome}-${i}`}
          className="rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-primary-dark">{p.nome}</h3>
          <p className="text-sm text-gray-700">{p.endereco}</p>
          <p className="text-sm text-gray-600 mt-1">
            Horário: <span className="font-medium">{p.horario}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.materiais.map((m, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 border"
              >
                {m}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
