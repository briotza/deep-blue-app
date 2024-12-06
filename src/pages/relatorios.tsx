import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

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
    // Dados locais para testes (substitua por dados reais, se necessário)
    const dadosLocais: Incidente[] = [
      {
        titulo: "Incidente 1",
        situacao: "Fechado",
        resolucao: {
          data: "2024-02-15",
          custo_total: 150.5,
        },
      },
      {
        titulo: "Incidente 2",
        situacao: "Fechado",
        resolucao: {
          data: "2024-03-10",
          custo_total: 200.75,
        },
      },
      {
        titulo: "Incidente 3",
        situacao: "Aberto",
      },
    ];

    // Filtro e cálculo de custos por mês
    const incidentesComResolucao = dadosLocais.filter(
      (incidente) => incidente.resolucao && incidente.situacao === "Fechado"
    );

    const custos = Array(12).fill(0);
    incidentesComResolucao.forEach((incidente) => {
      const dataResolucao = incidente.resolucao?.data;
      const custoTotal = incidente.resolucao?.custo_total;

      if (dataResolucao && custoTotal != null) {
        const mes = new Date(dataResolucao).getMonth();
        custos[mes] += custoTotal;
      }
    });

    setIncidentesComResolucao(incidentesComResolucao);
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
    <ScrollView style={styles.container}>
      {/* Tabela de incidentes */}
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

    </ScrollView>
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
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  chartText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartArea: {
    width: "100%",
    height: 200,
    backgroundColor: "#ddd",
  },
});

export default Relatórios;
