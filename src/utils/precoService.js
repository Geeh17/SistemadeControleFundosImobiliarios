const axios = require('axios');

async function obterPrecoAtivo(simbolo) {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: simbolo,
                interval: '5min',
                apikey: 'V2LXU9X0NQ4N3K9P'
            }
        });
        
        const serieTemporal = response.data['Time Series (5min)'];
        
        // Verifica se `serieTemporal` existe
        if (!serieTemporal) {
            throw new Error(`Dados de série temporal não encontrados para o símbolo: ${simbolo}`);
        }

        const ultimoHorario = Object.keys(serieTemporal)[0];
        
        // Verifica se `ultimoHorario` é válido
        if (!ultimoHorario) {
            throw new Error(`Horário mais recente não encontrado nos dados de série temporal para o símbolo: ${simbolo}`);
        }

        const precoAtual = serieTemporal[ultimoHorario]['1. open'];
        
        // Verifica se `precoAtual` está definido
        if (!precoAtual) {
            throw new Error(`Preço de abertura não encontrado para o horário mais recente do símbolo: ${simbolo}`);
        }

        return parseFloat(precoAtual);
    } catch (error) {
        console.error("Erro ao obter preço do ativo:", error.message);
        throw new Error("Não foi possível obter o preço do ativo.");
    }
}

module.exports = { obterPrecoAtivo };
