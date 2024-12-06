import React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

interface Acidente {
  id: number;
  titulo: string;
  tipo: string;
  situacao: string;
  data: string;
  horario: string;
  descricao: string;
  resolucao?: {
      responsavel: string;
      data: string;
      descricao: string;
      custo_total: number;
  };
}


// Função para calcular os incidentes por mês
const calcularIncidentesPorMes = (dados: Acidente[]) => {
  const meses = Array(12).fill(0);
  dados.forEach((incidente) => {
    const mes = new Date(incidente.data).getMonth();
    meses[mes] += 1;
  });
  return meses;
};

const Seguranca: React.FC<{ incidentes: Acidente[] }> = ({ incidentes }) => {
  // Filtra os incidentes de segurança
  const incidentesSeguranca = incidentes.filter(
    (incidente) => incidente.tipo === "Segurança"
  );

  // Calcula os incidentes por mês
  const dadosPorMes = calcularIncidentesPorMes(incidentesSeguranca);

  // Dados do gráfico
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        data: dadosPorMes,
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Cor do gráfico
        strokeWidth: 2, // Largura da borda
      },
    ],
  };

  // Configurações do gráfico
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // Não mostrar decimais
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor do texto
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor do rótulo
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <View style={{ padding: 16, backgroundColor: "#fff", borderRadius: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
        Incidentes de Segurança por Mês
      </Text>
      <ScrollView horizontal={true}>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 32} // Largura do gráfico
          height={220} // Altura do gráfico
          chartConfig={chartConfig}
          verticalLabelRotation={30} // Rotação das etiquetas do eixo X
          yAxisLabel="" // Adicionando a propriedade yAxisLabel com valor vazio
          yAxisSuffix="" // Adicionando a propriedade yAxisSuffix com valor vazio
        />
      </ScrollView>
    </View>
  );
};

export default Seguranca;
