import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Seguranca from "../components/graficos/segurança";
import Ambiental from "../components/graficos/ambiental";
import incidentesData from "../data/incidentes";
import notificacoesData from "../data/notificacoes";

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

interface Notificacao {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
}


const Dashboard = ({ navigation }: any) => {
    const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString());
    const [incidentes, setIncidentes] = useState<Acidente[]>([]);
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);


    useEffect(() => {
        setIncidentes(incidentesData);
    }, []);


    useEffect(() => {
        setNotificacoes(notificacoesData);
    }, []);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setLastUpdate(new Date().toLocaleString());
        }, 30 * 60 * 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} contentContainerStyle={styles.row}>
                    <TouchableOpacity onPress={() => navigation.navigate('Incidentes')} style={styles.button}>
                        <Text>Incidentes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Relatorios')} style={styles.button}>
                        <Text>Relatórios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Externo')} style={styles.button}>
                        <Text>Externo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.button}>
                        <Text>Perfil</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={styles.column}>
                <View style={styles.card}>
                    <Ambiental incidentes={incidentes} />
                </View>
                <View style={styles.card}>
                    <Seguranca incidentes={incidentes} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Incidentes Recentes</Text>
                    <View style={styles.grid}>
                        {incidentes.slice(0, 3).map((incidente) => (
                            <View key={incidente.id} style={styles.incidenteItem}>
                                <Text style={styles.incidenteTitulo}>{incidente.titulo}</Text>
                                <Text style={styles.incidenteInfo}>
                                    Tipo: {incidente.tipo} | Situação: {incidente.situacao}
                                </Text>
                                <Text style={styles.incidenteData}>
                                    Data: {incidente.data} | Horário: {incidente.horario}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Custos Recentes</Text>
                    <View>
                        {incidentes
                            .filter(incidente => incidente.situacao === "Fechado" && incidente.resolucao)
                            .map(incidente => (
                                <View key={incidente.id} style={styles.incidenteItem}>
                                    <Text style={styles.incidenteTitulo}>{incidente.titulo}</Text>

                                    <Text style={styles.incidenteData}>
                                        Custo Total: R$ {incidente.resolucao?.custo_total}
                                    </Text>
                                </View>
                            ))}

                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Indicadores de Risco</Text>
                    <Text style={styles.text}>Última atualização {lastUpdate}</Text>
                    <View style={styles.indicatorRow}>
                        <View style={styles.indicatorCard}>
                            <Text style={styles.indicatorTitle}>Ambiental</Text>
                            <View style={[styles.indicator, { backgroundColor: '#28aa24' }]} />
                        </View>
                        <View style={styles.indicatorCard}>
                            <Text style={styles.indicatorTitle}>Segurança</Text>
                            <View style={[styles.indicator, { backgroundColor: '#d3c726' }]} />
                        </View>
                        <View style={styles.indicatorCard}>
                            <Text style={styles.indicatorTitle}>Climático</Text>
                            <View style={[styles.indicator, { backgroundColor: '#28aa24' }]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Notificações</Text>
                <View style={styles.grid}>
                    {notificacoes.slice(0, 3).map((notificacao) => (
                        <View key={notificacao.id} style={styles.incidenteItem}>
                            <Text style={styles.incidenteTitulo}>{notificacao.titulo}</Text>
                            <Text style={styles.incidenteData}>
                                Data: {notificacao.data}
                            </Text>
                            <Text style={styles.incidenteDescricao}>{notificacao.descricao}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#94A3B8',
    },
    column: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    incidenteItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        width: '48%',
    },
    incidenteTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    incidenteInfo: {
        fontSize: 14,
        color: '#555',
    },
    incidenteData: {
        fontSize: 12,
        color: '#888',
    },
    indicatorRow: {
        padding: 4,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    indicatorCard: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    indicatorTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    indicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        color: '#555',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 2
    },
    incidenteDescricao: {
        fontSize: 14,
        color: '#555',
    },
});

export default Dashboard;
