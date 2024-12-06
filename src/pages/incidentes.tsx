import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import incidentesData from '../data/incidentes';

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

export default function Incidentes() {
  const [acidentes, setAcidentes] = useState<Acidente[]>([]);
  const [filtroTexto, setFiltroTexto] = useState<string>("");
  const [filtroSituacao, setFiltroSituacao] = useState<string>("Todos");
  const [acidenteSelecionado, setAcidenteSelecionado] = useState<Acidente | null>(null);

  useEffect(() => {
    setAcidentes(incidentesData);
  }, []);


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

          <Button
            title="Fechar Detalhes"
            onPress={() => setAcidenteSelecionado(null)}
          />
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
});
