import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as dns from 'dns';
import { UserSchema } from './users/schema/user.schema';

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

async function checkUsers() {
  const uri = process.env.DATABASE_URI;
  if (!uri) throw new Error('DATABASE_URI not found');
  await mongoose.connect(uri);
  const User = mongoose.model('user', UserSchema);
  const users = await User.find({}, 'name email role').exec();
  console.log('--- USERS IN DB ---');
  users.forEach(u => console.log(`${u.name} (${u.email}) - Role: ${u.role}`));
  console.log('-------------------');
  await mongoose.disconnect();
}

checkUsers().catch(console.error);
