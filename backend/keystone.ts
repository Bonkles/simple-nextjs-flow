import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import 'dotenv/config';

import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay logged in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: Add session values here.
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
