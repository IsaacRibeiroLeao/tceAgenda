const mongoose = require('mongoose');

// Configuração para banco de dados persistente em produção
const connectDB = async () => {
  try {
    // Verificar se já existe uma conexão
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB já está conectado');
      return;
    }
    
    // String de conexão - usar MongoDB local para desenvolvimento
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agenda-tce-pi';
    
    // Conectar ao MongoDB
    const conn = await mongoose.connect(uri);
    
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Conexão com MongoDB fechada');
  } catch (err) {
    console.error(`Erro ao fechar conexão: ${err.message}`);
  }
};

module.exports = { connectDB, closeDB };
