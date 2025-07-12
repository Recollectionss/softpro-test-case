import PostgresProvider from './postgres.provider';

export const postgresTestConnection = async () => {
  try {
    const sequelize = await PostgresProvider();

    // Testing the connection
    await sequelize.authenticate();
    console.log('✓ Connection to PostgreSQL successful');

    // Check the availability of all registered models
    const models = sequelize.models;
    console.log('Registered models:', Object.keys(models));
  } catch (error) {
    if (error instanceof Error) {
      console.error('✗ Error connecting to PostgreSQL:');
      console.error('Error type:', error.name);
      console.error('Message:', error.message);

      const original = (error as any).original;

      if (original && typeof original === 'object') {
        console.error('Original error:', {
          code: original.code,
          detail: original.detail,
        });
      }
    } else {
      console.error('Unknown error:', error);
    }
  }
};
