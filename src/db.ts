import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://${Bun.env.MONGOUSR}:${Bun.env.MONGOPSW}@${Bun.env.MONGOHOST}/bot`;
console.log("Conectando a DB Mongo")

const connectOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout después de 5 segundos
  socketTimeoutMS: 45000,         // Timeout de socket después de 45 segundos
  retryWrites: true
};

// Evitar conexiones múltiples
if (mongoose.connection.readyState === 0) {  // 0 = desconectado
  mongoose.connect(MONGODB_URI, connectOptions)
    .then(() => console.log('MongoDB conectado exitosamente'))
    .catch((err) => {
      console.error('Error conectando a MongoDB:', err);
      process.exit(1);  // Termina el proceso si hay error de conexión
    });
}