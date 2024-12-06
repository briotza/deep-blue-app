import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';


type Acidente = {
  id: number;
  titulo: string;
  tipo: string;
  situacao: string;
  data: string;
  descricao: string;
  horario: string;
  resolucao?: {
    responsavel: string;
    data: string;
    descricao: string;
    custo_total: number;
  };
};

const initialAcidentes: Acidente[] = [
  {
    id: 1,
    titulo: "Acidente 1",
    tipo: "Colisão",
    situacao: "Aberto",
    data: "2024-12-05",
    descricao: "Descrição do acidente",
    horario: "14:00",
  },
  {
    id: 2,
    titulo: "Acidente 2",
    tipo: "Atropelamento",
    situacao: "Fechado",
    data: "2024-12-06",
    descricao: "Descrição do acidente",
    horario: "15:30",
    resolucao: {
      responsavel: "João",
      data: "2024-12-06",
      descricao: "Resolução do acidente",
      custo_total: 1000,
    },
  },
  // Adicione mais acidentes conforme necessário
];

export default function ListaAcidentes() {
  const [acidentes, setAcidentes] = useState<Acidente[]>(initialAcidentes);
  const [filtroTexto, setFiltroTexto] = useState<string>("");
  const [filtroSituacao, setFiltroSituacao] = useState<string>("Todos");
  const [acidenteSelecionado, setAcidenteSelecionado] = useState<Acidente | null>(null);
  const [mostrarResolucao, setMostrarResolucao] = useState(false);
  const [formData, setFormData] = useState({
    responsavel: "",
    data: "",
    descricao: "",
    custo_total: 0,
  });

  // Atualiza os dados filtrados com base nos filtros
  const filtrarDados = () => {
    return acidentes.filter((item) => {
      const textoMatch = item.titulo.toLowerCase().includes(filtroTexto.toLowerCase());
      const situacaoMatch = filtroSituacao === "Todos" || item.situacao === filtroSituacao;
      return textoMatch && situacaoMatch;
    });
  };

  const dadosFiltrados = filtrarDados();

  const handleSearch = (text: string) => {
    setFiltroTexto(text);
  };

  const handleSituacaoFilter = (situacao: string) => {
    setFiltroSituacao(situacao);
  };

  const handleEnviarResolucao = () => {
    if (acidenteSelecionado) {
      const updatedAcidente = {
        ...acidenteSelecionado,
        situacao: "Fechado",
        resolucao: {
          responsavel: formData.responsavel,
          data: formData.data,
          descricao: formData.descricao,
          custo_total: formData.custo_total,
        },
      };

      setAcidentes((prevAcidentes) =>
        prevAcidentes.map((acidente) =>
          acidente.id === acidenteSelecionado.id ? updatedAcidente : acidente
        )
      );

      setMostrarResolucao(false);
      setAcidenteSelecionado(null);
    }
  };

  const renderItem = ({ item }: { item: Acidente }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>{item.tipo}</Text>
      <Text>{item.situacao}</Text>
      <Text>{new Date(item.data).toLocaleDateString()}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => setAcidenteSelecionado(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Procurar incidente..."
        value={filtroTexto}
        onChangeText={handleSearch}
      />

      <Picker
        selectedValue={filtroSituacao}
        onValueChange={handleSituacaoFilter}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Aberto" value="Aberto" />
        <Picker.Item label="Fechado" value="Fechado" />
      </Picker>

      <FlatList
        data={dadosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {acidenteSelecionado && (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{acidenteSelecionado.titulo}</Text>
          <Text>Tipo: {acidenteSelecionado.tipo}</Text>
          <Text>Situação: {acidenteSelecionado.situacao}</Text>
          <Text>Data: {new Date(acidenteSelecionado.data).toLocaleDateString()}</Text>
          <Text>Horário: {acidenteSelecionado.horario}</Text>
          <Text>Descrição: {acidenteSelecionado.descricao}</Text>

          {acidenteSelecionado.situacao === "Fechado" && acidenteSelecionado.resolucao && (
            <View style={styles.resolucaoContainer}>
              <Text style={styles.title}>Detalhes da Resolução:</Text>
              <Text>Responsável: {acidenteSelecionado.resolucao.responsavel}</Text>
              <Text>Data: {new Date(acidenteSelecionado.resolucao.data).toLocaleDateString()}</Text>
              <Text>Descrição: {acidenteSelecionado.resolucao.descricao}</Text>
              <Text>Custo Total: R$ {acidenteSelecionado.resolucao.custo_total.toFixed(2)}</Text>
            </View>
          )}

          {acidenteSelecionado.situacao === "Aberto" && (
            <Button
              title={mostrarResolucao ? "Fechar Resolução" : "Adicionar Resolução"}
              onPress={() => setMostrarResolucao(!mostrarResolucao)}
            />
          )}

          <Button
            title="Fechar Detalhes"
            onPress={() => setAcidenteSelecionado(null)}
          />
        </View>
      )}

      {mostrarResolucao && acidenteSelecionado && acidenteSelecionado.situacao === "Aberto" && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Adicionar Resolução</Text>

          <TextInput
            style={styles.input}
            placeholder="Responsável"
            value={formData.responsavel}
            onChangeText={(text) => setFormData({ ...formData, responsavel: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Data"
            value={formData.data}
            onChangeText={(text) => setFormData({ ...formData, data: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Custo Total"
            value={formData.custo_total.toString()}
            onChangeText={(text) => setFormData({ ...formData, custo_total: parseFloat(text) })}
          />

          <Button title="Enviar" onPress={handleEnviarResolucao} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#94A3B8",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  picker: {
    height: 40,
    marginBottom: 12,
  },
  itemContainer: {
    backgroundColor: "#CBD5E1",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  resolucaoContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
});
