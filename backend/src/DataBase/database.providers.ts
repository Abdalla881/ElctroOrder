import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        return await mongoose.connect("mongodb+srv://abdalla:Y1rH6kNi9Slk9Cbv@cluster0.xsqb8ru.mongodb.net/?appName=Cluster0");
      } catch (error) {
        console.error('Database connection error:', error);
        throw error;
      }
    },
  },
];
