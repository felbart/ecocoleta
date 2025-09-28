package servidor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class EcoColetaServer {
    private static final int PORT = 5000;
    private static List<PontoColeta> pontosColeta = new ArrayList<>();

    public static void main(String[] args) {
        // Exemplo de dados iniciais para testar as consultas
        pontosColeta.add(new PontoColeta("Ponto A", "Rua X, 123", "08:00-18:00", Arrays.asList("papel", "plastico")));
        pontosColeta.add(new PontoColeta("Ponto B", "Avenida Y, 456", "09:00-17:00", Arrays.asList("vidro", "metal")));
        pontosColeta.add(new PontoColeta("Ponto C", "Praça Z, 789", "10:00-16:00", Arrays.asList("eletrônicos")));
        
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Servidor EcoColeta iniciado na porta " + PORT);
            
            while (true) {
                try (Socket clientSocket = serverSocket.accept();
                     BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                     PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {

                    System.out.println("Cliente conectado: " + clientSocket.getInetAddress());

                    String comandoCliente = in.readLine();
                    if (comandoCliente != null) {
                        System.out.println("Comando recebido: " + comandoCliente);
                        String resposta = processarComando(comandoCliente);
                        out.println(resposta);
                    }
                } catch (IOException e) {
                    System.err.println("Erro na comunicação com o cliente: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            System.err.println("Erro no servidor: " + e.getMessage());
        }
    }

    private static String processarComando(String comando) {
        String[] partes = comando.split(";");
        String acao = partes[0].toUpperCase();

        switch (acao) {
            case "CADASTRAR":
                return cadastrarPonto(partes);
            case "CONSULTAR_TODOS":
                return consultarTodosPontos();
            case "FILTRAR":
                return filtrarPontos(partes);
            case "ESTATISTICAS":
                return gerarEstatisticas();
            default:
                return "ERRO: Comando inválido.";
        }
    }

    private static String cadastrarPonto(String[] partes) {
        if (partes.length < 5) {
            return "ERRO: Dados insuficientes para cadastro.";
        }
        String nome = partes[1];
        String endereco = partes[2];
        String horario = partes[3];
        List<String> materiais = Arrays.stream(partes[4].split(","))
                                .map(String::trim)
                                .map(EcoColetaServer::normalizarStringMaterial)
                                .collect(Collectors.toList());
        
        PontoColeta novoPonto = new PontoColeta(nome, endereco, horario, materiais);
        pontosColeta.add(novoPonto);
        
        return "SUCESSO: Ponto de coleta '" + nome + "' cadastrado.";
    }

    private static String consultarTodosPontos() {
        if (pontosColeta.isEmpty()) {
            return "Nenhum ponto de coleta cadastrado.";
        }
        
        StringBuilder sb = new StringBuilder("Lista de Pontos de Coleta:\n");
        for (PontoColeta ponto : pontosColeta) {
            sb.append("--------------------\n");
            sb.append(ponto.toString()).append("\n");
        }
        return sb.toString();
    }

     private static String filtrarPontos(String[] partes) {
        if (partes.length < 2) {
            return "ERRO: Especifique o(s) tipo(s) de material para filtrar.";
        }
        
        List<String> materiaisParaFiltrar = Arrays.stream(partes[1].split(","))
                                                    .map(String::trim)
                                                    .map(EcoColetaServer::normalizarStringMaterial) // Sem ponto aqui
                                                    .collect(Collectors.toList());
    
        List<PontoColeta> filtrados = new ArrayList<>();
        
        for (PontoColeta ponto : pontosColeta) {
            for (String materialPesquisa : materiaisParaFiltrar) {
                if (ponto.getTiposMateriais().stream().anyMatch(m -> m.equalsIgnoreCase(materialPesquisa))) {
                    filtrados.add(ponto);
                    break; 
                }
            }
        }
        
        if (filtrados.isEmpty()) {
            return "Nenhum ponto de coleta encontrado para o(s) tipo(s) '" + partes[1] + "'.";
        }
        
        StringBuilder sb = new StringBuilder("Pontos de Coleta que aceitam '" + partes[1] + "':\n");
        for (PontoColeta ponto : filtrados) {
            sb.append("--------------------\n");
            sb.append(ponto.toString()).append("\n");
        }
        return sb.toString();
    }
    
    private static String gerarEstatisticas() {
        if (pontosColeta.isEmpty()) {
            return "Nenhum ponto de coleta cadastrado para gerar estatísticas.";
        }
        
        StringBuilder sb = new StringBuilder("Estatísticas por Tipo de Material:\n");
        for (String material : Arrays.asList("Papel", "Plástico", "Vidro", "Metal", "Eletrônicos", "Embalagens de Remédios")) {
            long count = pontosColeta.stream()
                .filter(ponto -> ponto.getTiposMateriais().stream().anyMatch(m -> m.equalsIgnoreCase(material)))
                .count();
            sb.append(String.format("- %s: %d pontos\n", material, count));
        }
        return sb.toString();
    }

    private static String normalizarStringMaterial(String material) {
        String normalizado = material.toLowerCase();
        // Remove acentos
        normalizado = normalizado.replaceAll("[áàãâä]", "a");
        normalizado = normalizado.replaceAll("[éèêë]", "e");
        normalizado = normalizado.replaceAll("[íìîï]", "i");
        normalizado = normalizado.replaceAll("[óòõôö]", "o");
        normalizado = normalizado.replaceAll("[úùûü]", "u");
        normalizado = normalizado.replaceAll("ç", "c");

        // Remove o 's' final se a palavra tiver mais de 3 letras
        if (normalizado.length() > 3 && normalizado.endsWith("s")) {
            normalizado = normalizado.substring(0, normalizado.length() - 1);
        }
        return normalizado;
    }
}