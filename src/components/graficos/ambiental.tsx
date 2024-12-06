import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

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

const Ambiental: React.FC<{ incidentes: Acidente[] }> = ({ incidentes }) => {
  const incidentesAmbientais = incidentes.filter((incidente) => incidente.tipo === 'Ambiental');

  const calcularIncidentesPorMes = (dados: Acidente[]) => {
    const meses = Array(12).fill(0);
    dados.forEach((incidente) => {
      const mes = new Date(incidente.data).getMonth();
      meses[mes] += 1;
    });
    return meses;
  };

  const dadosPorMes = calcularIncidentesPorMes(incidentesAmbientais);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: dadosPorMes,
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Cor do gráfico
        strokeWidth: 2,
      },
    ],
  };

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

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Incidentes Ambientais por Mês</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          data={data}
          width={screenWidth * 1.2} // Largura maior para permitir rolagem horizontal
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

export default Ambiental;
