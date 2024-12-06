import incidentes from "../data/incidentes";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Resolucao = {
  data: string;
  custo_total?: number;
};

type Incidente = {
  titulo: string;
  situacao: string;
  resolucao?: Resolucao;
};

const Relatórios = () => {
  const [incidentesComResolucao, setIncidentesComResolucao] = useState<Incidente[]>([]);
  const [custosPorMes, setCustosPorMes] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const incidentesFiltrados = incidentes.filter(
      (incidente) => incidente.resolucao && incidente.situacao === "Fechado"
    );

    const custos = Array(12).fill(0);
    incidentesFiltrados.forEach((incidente) => {
      const dataResolucao = incidente.resolucao?.data;
      const custoTotal = incidente.resolucao?.custo_total;

      if (dataResolucao && custoTotal != null) {
        const mes = new Date(dataResolucao).getMonth();
        custos[mes] += custoTotal;
      }
    });

    setIncidentesComResolucao(incidentesFiltrados);
    setCustosPorMes(custos);
  }, []);

  const colunas = [
    {
      name: "Título do Incidente",
      selector: (row: Incidente) => row.titulo,
    },
    {
      name: "Data da Resolução",
      selector: (row: Incidente) =>
        row.resolucao ? new Date(row.resolucao.data).toLocaleDateString() : "N/A",
    },
    {
      name: "Custo Total (R$)",
      selector: (row: Incidente) =>
        row.resolucao?.custo_total != null
          ? row.resolucao.custo_total.toFixed(2)
          : "N/A",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <FlatList
          data={incidentesComResolucao}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {colunas.map((coluna, index) => (
                <Text key={index} style={styles.cell}>
                  {coluna.selector(item)}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#94A3B8",
    padding: 16,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
});

export default Relatórios;
