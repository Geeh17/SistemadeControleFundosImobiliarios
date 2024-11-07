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
        const ultimoHorario = Object.keys(serieTemporal)[0];
        const precoAtual = serieTemporal[ultimoHorario]['1. open'];

        return parseFloat(precoAtual);
    } catch (error) {
        console.error("Erro ao obter preço do ativo:", error.message);
        throw new Error("Não foi possível obter o preço do ativo.");
    }
}

module.exports = { obterPrecoAtivo };
