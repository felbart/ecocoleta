package servidor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PontoColeta implements Serializable {
    private String nome;
    private String endereco;
    private String horario;
    private List<String> tiposMateriais;

    public PontoColeta(String nome, String endereco, String horario, List<String> tiposMateriais) {
        this.nome = nome;
        this.endereco = endereco;
        this.horario = horario;
        this.tiposMateriais = new ArrayList<>(tiposMateriais);
    }

    // Getters
    public String getNome() { return nome; }
    public String getEndereco() { return endereco; }
    public String getHorario() { return horario; }
    public List<String> getTiposMateriais() { return tiposMateriais; }

    @Override
    public String toString() {
        return "Nome: " + nome + "\n" +
               "Endereço: " + endereco + "\n" +
               "Horário: " + horario + "\n" +
               "Materiais: " + String.join(", ", tiposMateriais);
    }
}