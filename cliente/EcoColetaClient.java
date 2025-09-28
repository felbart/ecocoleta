package cliente;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class EcoColetaClient {
    private static final String SERVER_ADDRESS = "localhost"; // Use "localhost" para testar na sua própria máquina
    private static final int PORT = 5000;

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                exibirMenu();
                System.out.print("Escolha uma opção: ");
                String opcao = scanner.nextLine();
                String comando = "";

                switch (opcao) {
                    case "1":
                        comando = construirComandoCadastro(scanner);
                        break;
                    case "2":
                        comando = "CONSULTAR_TODOS";
                        break;
                    case "3":
                        comando = construirComandoFiltragem(scanner);
                        break;
                    case "4":
                        comando = "ESTATISTICAS";
                        break;
                    case "5":
                        System.out.println("Saindo do sistema. Até a próxima!");
                        return; // Encerra o programa
                    default:
                        System.out.println("Opção inválida. Tente novamente.");
                        continue; // Volta para o início do loop
                }

                if (!comando.isEmpty()) {
                    enviarComandoAoServidor(comando);
                }
            }
        } catch (Exception e) {
            System.err.println("Erro no cliente: " + e.getMessage());
        }
    }

    private static void exibirMenu() {
        System.out.println("\n--- Sistema EcoColeta ---");
        System.out.println("1. Cadastrar novo ponto de coleta");
        System.out.println("2. Consultar todos os pontos");
        System.out.println("3. Filtrar pontos por material");
        System.out.println("4. Gerar estatísticas");
        System.out.println("5. Sair");
        System.out.println("--------------------------");
    }

    private static String construirComandoCadastro(Scanner scanner) {
        System.out.println("--- Cadastro de Ponto de Coleta ---");
        System.out.print("Nome do ponto: ");
        String nome = scanner.nextLine();
        System.out.print("Endereço: ");
        String endereco = scanner.nextLine();
        System.out.print("Horário de funcionamento: ");
        String horario = scanner.nextLine();
        System.out.print("Materiais aceitos (separados por vírgula, ex: Papel,Plástico): ");
        String materiais = scanner.nextLine();
        
        return "CADASTRAR;" + nome + ";" + endereco + ";" + horario + ";" + materiais;
    }

   private static String construirComandoFiltragem(Scanner scanner) {
        System.out.println("--- Filtrar Pontos por Material ---");
        System.out.print("Digite o(s) tipo(s) de material (separados por vírgula, ex: Papel,Vidro): ");
        String material = scanner.nextLine();
        return "FILTRAR;" + material;
    }

    private static void enviarComandoAoServidor(String comando) {
        try (Socket socket = new Socket(SERVER_ADDRESS, PORT);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

            // Envia o comando para o servidor
            out.println(comando);

            // Recebe e exibe a resposta do servidor
            System.out.println("\nResposta do Servidor:");
            String linha;
            while ((linha = in.readLine()) != null) {
                System.out.println(linha);
            }

        } catch (IOException e) {
            System.err.println("Não foi possível conectar ao servidor. Verifique se ele está rodando.");
            System.err.println("Erro: " + e.getMessage());
        }
    }
}