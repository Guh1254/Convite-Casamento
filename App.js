import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <CartaoConvite />
    </View>
  );
}

const CartaoConvite = () => {
  const [adultos, setAdultos] = useState(0);
  const [idosos, setIdosos] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [confirmado, setConfirmado] = useState(false);
  const [valoresConfirmados, setValoresConfirmados] = useState({ adultos: 0, idosos: 0, criancas: 0 });

  // Data do casamento: 15 de novembro de 2025
  const dataCasamento = new Date(2025, 10, 15, 18, 0, 0);
  const [tempoRestante, setTempoRestante] = useState(calcularTempoRestante());

  function calcularTempoRestante() {
    const agora = new Date();
    const diferenca = dataCasamento - agora;
    
    if (diferenca <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    return {
      dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferenca / 1000 / 60) % 60),
      segundos: Math.floor((diferenca / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempoRestante(calcularTempoRestante());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const totalConvidados = adultos + idosos + criancas;

  const handleConfirmar = () => {
    if (totalConvidados === 0) {
      Alert.alert('Atenção', 'Por favor, informe pelo menos um convidado antes de confirmar.');
      return;
    }
    setConfirmado(true);
    setValoresConfirmados({
      adultos: adultos,
      idosos: idosos,
      criancas: criancas
    });
    Alert.alert('Confirmação', `Presença confirmada para ${totalConvidados} convidado(s)!`);
  };

  // Verifica se os valores foram alterados após a confirmação
  const verificarAlteracao = () => {
    if (confirmado && (
      adultos !== valoresConfirmados.adultos ||
      idosos !== valoresConfirmados.idosos ||
      criancas !== valoresConfirmados.criancas
    )) {
      setConfirmado(false);
    }
  };

  // Atualiza a verificação sempre que os valores mudam
  useEffect(() => {
    verificarAlteracao();
  }, [adultos, idosos, criancas]);

  const alterarAdultos = (valor) => {
    setAdultos(valor);
  };

  const alterarIdosos = (valor) => {
    setIdosos(valor);
  };

  const alterarCriancas = (valor) => {
    setCriancas(valor);
  };

  return (
    <ImageBackground 
      source={{uri: 'https://i.pinimg.com/736x/9a/24/63/9a2463f75aace130b58c39653a0c7078.jpg'}} 
      style={styles.background}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Convite de Casamento</Text>
        
        <View style={styles.containerCasais}>
          <Text style={styles.nomes}>Gustavo & Natália</Text>
          <Text style={styles.textoConvite}>Temos a honra de convidar você para celebrar nossa união</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textoData}>15 de Novembro de 2025</Text>
          <Text style={styles.textoHorario}>18:00 horas</Text>
          <Text style={styles.textoLocal}>Jardim da Felicidade, São Paulo</Text>
        </View>

        <View style={styles.contadorRegressivo}>
          <Text style={styles.tituloContador}>Faltam:</Text>
          <View style={styles.tempoContainer}>
            <View style={styles.tempoItem}>
              <Text style={styles.tempoNumero}>{tempoRestante.dias}</Text>
              <Text style={styles.tempoTexto}>dias</Text>
            </View>
            <View style={styles.tempoItem}>
              <Text style={styles.tempoNumero}>{tempoRestante.horas}</Text>
              <Text style={styles.tempoTexto}>horas</Text>
            </View>
            <View style={styles.tempoItem}>
              <Text style={styles.tempoNumero}>{tempoRestante.minutos}</Text>
              <Text style={styles.tempoTexto}>min</Text>
            </View>
            <View style={styles.tempoItem}>
              <Text style={styles.tempoNumero}>{tempoRestante.segundos}</Text>
              <Text style={styles.tempoTexto}>seg</Text>
            </View>
          </View>
        </View>

        <View style={styles.contadorConvidados}>
          <Text style={styles.tituloContador}>Confirmar Presença:</Text>
          
          <View style={styles.grupoContador}>
            <Text style={styles.rotuloContador}>Adultos:</Text>
            <View style={styles.botoesContador}>
              <TouchableOpacity onPress={() => alterarAdultos(Math.max(0, adultos - 1))}>
                <Text style={styles.botaoContador}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valorContador}>{adultos}</Text>
              <TouchableOpacity onPress={() => alterarAdultos(adultos + 1)}>
                <Text style={styles.botaoContador}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.grupoContador}>
            <Text style={styles.rotuloContador}>Idosos:</Text>
            <View style={styles.botoesContador}>
              <TouchableOpacity onPress={() => alterarIdosos(Math.max(0, idosos - 1))}>
                <Text style={styles.botaoContador}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valorContador}>{idosos}</Text>
              <TouchableOpacity onPress={() => alterarIdosos(idosos + 1)}>
                <Text style={styles.botaoContador}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.grupoContador}>
            <Text style={styles.rotuloContador}>Crianças:</Text>
            <View style={styles.botoesContador}>
              <TouchableOpacity onPress={() => alterarCriancas(Math.max(0, criancas - 1))}>
                <Text style={styles.botaoContador}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valorContador}>{criancas}</Text>
              <TouchableOpacity onPress={() => alterarCriancas(criancas + 1)}>
                <Text style={styles.botaoContador}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalTexto}>Total de convidados:</Text>
            <Text style={styles.totalNumero}>{totalConvidados}</Text>
          </View>

          {confirmado ? (
            <View style={styles.confirmacaoContainer}>
              <Text style={styles.textoConfirmacao}>✔ Presença confirmada!</Text>
              <Text style={styles.detalhesConfirmacao}>
                {valoresConfirmados.adultos} adulto(s), {valoresConfirmados.idosos} idoso(s) e {valoresConfirmados.criancas} criança(s)
              </Text>
              <Text style={styles.avisoAlteracao}>* Se alterar os números acima, precisará confirmar novamente</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.botaoConfirmar}
              onPress={handleConfirmar}
            >
              <Text style={styles.textoBotaoConfirmar}>Confirmar Presença</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.rodape}>Por favor, confirme sua presença até 01/11/2025</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  cartao: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
    textAlign: 'center',
  },
  containerCasais: {
    marginBottom: 20,
    alignItems: 'center',
  },
  nomes: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  textoConvite: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  containerData: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textoData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  textoHorario: {
    fontSize: 16,
    color: '#555',
  },
  textoLocal: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 5,
  },
  contadorRegressivo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  tituloContador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  tempoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  tempoItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tempoNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  tempoTexto: {
    fontSize: 14,
    color: '#555',
  },
  contadorConvidados: {
    width: '100%',
    marginBottom: 15,
  },
  grupoContador: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  rotuloContador: {
    fontSize: 16,
    color: '#555',
    width: 100,
  },
  botoesContador: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoContador: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#F5F5DC',
    borderRadius: 5,
  },
  valorContador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  totalNumero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  botaoConfirmar: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  textoBotaoConfirmar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmacaoContainer: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0FFF0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E8B57',
  },
  textoConfirmacao: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detalhesConfirmacao: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
  },
  avisoAlteracao: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  rodape: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});