import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import incidentesJson from "../data/dados.json";

type Incidente = {
  Numero: string;
  Empresa: string;
  Data_de_criacao: string;
  Autoridades_comunicadas?: string;
  Instalacao: string;
  Data_da_primeira_observacao: string;
  Hora_da_primeira_observacao: string;
  Data_estimada_do_incidente: string;
  Hora_do_incidente: string;
  Numero_de_feridos_graves: number;
  Numero_de_fatalidades: number;
};

const formatarData = (data: string) => {
  const dataIso = new Date(data);
  if (!isNaN(dataIso.getTime())) {
    return dataIso.toLocaleDateString("pt-BR");
  }

  const [dia, mes, ano] = data.split("-");
  if (dia && mes && ano) {
    const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
    if (!isNaN(dataFormatada.getTime())) {
      return dataFormatada.toLocaleDateString("pt-BR");
    }
  }

  return "Data inválida";
};

const Externo = () => {
    const incidentes = incidentesJson as Incidente[];
  const [incidenteSelecionado, setIncidenteSelecionado] = useState<Incidente | null>(null);

  const renderItem = ({ item }: { item: Incidente }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => setIncidenteSelecionado(item)}
    >
      <Text style={styles.text}>{item.Numero} - {item.Empresa}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={incidentes}
        keyExtractor={(item) => item.Numero}
        renderItem={renderItem}
      />

      {incidenteSelecionado && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>Detalhes do Incidente</Text>
          <Text><Text style={styles.bold}>Número:</Text> {incidenteSelecionado.Numero}</Text>
          <Text><Text style={styles.bold}>Empresa:</Text> {incidenteSelecionado.Empresa}</Text>
          <Text><Text style={styles.bold}>Data de Criação:</Text> {formatarData(incidenteSelecionado.Data_de_criacao)}</Text>
          <Text><Text style={styles.bold}>Instalação:</Text> {incidenteSelecionado.Instalacao}</Text>
          <Text><Text style={styles.bold}>Data da Primeira Observação:</Text> {formatarData(incidenteSelecionado.Data_da_primeira_observacao)}</Text>
          <Text><Text style={styles.bold}>Hora da Primeira Observação:</Text> {incidenteSelecionado.Hora_da_primeira_observacao}</Text>
          <Text><Text style={styles.bold}>Data Estimada do Incidente:</Text> {formatarData(incidenteSelecionado.Data_estimada_do_incidente)}</Text>
          <Text><Text style={styles.bold}>Hora do Incidente:</Text> {incidenteSelecionado.Hora_do_incidente}</Text>
          <Text><Text style={styles.bold}>Número de Feridos Graves:</Text> {incidenteSelecionado.Numero_de_feridos_graves}</Text>
          <Text><Text style={styles.bold}>Número de Fatalidades:</Text> {incidenteSelecionado.Numero_de_fatalidades}</Text>
          <Button title="Fechar Detalhes" onPress={() => setIncidenteSelecionado(null)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94A3B8",
    padding: 16,
  },
  row: {
    backgroundColor: "#CBD5E1",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Externo;
