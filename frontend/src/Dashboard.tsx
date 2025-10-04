import { useState, useEffect } from 'react';

type PontoColeta = {
  nome: string;
  endereco: string;
  horario: string;
  materiais: string[];
};

type Estatisticas = {
  [key: string]: number;
};

const Dashboard = () => {
  const [pontos, setPontos] = useState<PontoColeta[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDados = async () => {
    try {
      
      const pontosResponse = await fetch('http://localhost:3001/api/pontos');
      const pontosData = await pontosResponse.json();
      const parsedPontos = pontosData.response
        .split('--------------------')
        .filter((item: string) => item.trim() !== '')
        .map((item: string) => {
          const lines = item.trim().split('\n');
          
          const nome = lines[0] ? lines[0].replace('Nome: ', '') : 'Nome não disponível';
          const endereco = lines[1] ? lines[1].replace('Endereço: ', '') : 'Endereço não disponível';
          const horario = lines[2] ? lines[2].replace('Horário: ', '') : 'Horário não disponível';
          const materiais = lines[3] ? lines[3].replace('Materiais: ', '').split(', ') : [];
          
          return { nome, endereco, horario, materiais };
        });
      setPontos(parsedPontos);

      // Busca estatísticas
      const statsResponse = await fetch('http://localhost:3001/api/estatisticas');
      const statsData = await statsResponse.json();
      const parsedStats = statsData.response
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .reduce((acc: Estatisticas, line: string) => {
          const [material, countStr] = line.replace('- ', '').split(': ');
          acc[material] = parseInt(countStr);
          return acc;
        }, {});
      setEstatisticas(parsedStats);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Carregando dados do servidor...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="bg-tertiary-light min-h-screen p-8 font-sans">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800">EcoColeta Dashboard</h1>

        {/* Seção de Estatísticas */}
        <section className="mb-10 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 pb-2">Estatísticas de Coleta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(estatisticas).map((material) => (
              <div key={material} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-lg text-gray-600">Material:</p>
                <p className="text-2xl font-bold text-primary">{material}</p>
                <p className="text-lg text-gray-600">Pontos:</p>
                <p className="text-2xl font-bold text-primary">{estatisticas[material]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Pontos de Coleta */}
        <section className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 pb-2">Pontos de Coleta Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pontos.map((ponto, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{ponto.nome}</h3>
                <p className="text-gray-700"><span className="font-semibold">Endereço:</span> {ponto.endereco}</p>
                <p className="text-gray-700"><span className="font-semibold">Horário:</span> {ponto.horario}</p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Materiais:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ponto.materiais.map((material, matIndex) => (
                      <span key={matIndex} className="bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {material}
                      </span>
                    ))}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;