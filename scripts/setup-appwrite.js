const { Client, Databases, Permission, Role } = require('node-appwrite');

// Replace this with your actual API key from Appwrite Console
const API_KEY = process.env.APPWRITE_API_KEY || 'YOUR_API_KEY_HERE';
const ENDPOINT = 'https://sfo.cloud.appwrite.io/v1';
const PROJECT_ID = 'finance-ai';

if (API_KEY === 'YOUR_API_KEY_HERE') {
  console.error('❌ Error: You need to set your Appwrite API key.');
  console.error('   Get it from Appwrite Console → API Keys → Create API Key');
  console.error('   Then run: APPWRITE_API_KEY=your_key node scripts/setup-appwrite.js');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

const DATABASE_ID = 'finance-db';
const DATABASE_NAME = 'Finance DB';

const collections = [
  {
    id: 'incomes',
    name: 'Incomes',
    attributes: [
      { key: 'amount', type: 'double', required: true },
      { key: 'description', type: 'string', required: false, size: 255 },
      { key: 'category', type: 'string', required: false, size: 100 },
      { key: 'date', type: 'datetime', required: true },
      { key: 'userId', type: 'string', required: true, size: 100 },
    ],
  },
  {
    id: 'expenses',
    name: 'Expenses',
    attributes: [
      { key: 'amount', type: 'double', required: true },
      { key: 'description', type: 'string', required: false, size: 255 },
      { key: 'category', type: 'string', required: false, size: 100 },
      { key: 'date', type: 'datetime', required: true },
      { key: 'userId', type: 'string', required: true, size: 100 },
    ],
  },
  {
    id: 'budgets',
    name: 'Budgets',
    attributes: [
      { key: 'amount', type: 'double', required: true },
      { key: 'period', type: 'string', required: true, size: 50 },
      { key: 'month', type: 'string', required: true, size: 10 },
      { key: 'userId', type: 'string', required: true, size: 100 },
    ],
  },
];

async function setup() {
  try {
    console.log('🔧 Setting up Appwrite database...\n');

    // Create database
    let db;
    try {
      db = await databases.create(DATABASE_ID, DATABASE_NAME);
      console.log(`✅ Database created: ${db.$id}`);
    } catch (err) {
      if (err.code === 409) {
        console.log(`ℹ️ Database '${DATABASE_ID}' already exists`);
      } else {
        throw err;
      }
    }

    // Create collections
    for (const col of collections) {
      try {
        const created = await databases.createCollection(
          DATABASE_ID,
          col.id,
          col.name,
          [],
          true // documentSecurity = true (Document Level Security)
        );
        console.log(`✅ Collection created: ${created.$id}`);
      } catch (err) {
        if (err.code === 409) {
          console.log(`ℹ️ Collection '${col.id}' already exists`);
        } else {
          throw err;
        }
      }

      // Create attributes
      for (const attr of col.attributes) {
        try {
          if (attr.type === 'string') {
            await databases.createStringAttribute(
              DATABASE_ID,
              col.id,
              attr.key,
              attr.size || 255,
              attr.required,
              attr.default || undefined
            );
          } else if (attr.type === 'double') {
            await databases.createFloatAttribute(
              DATABASE_ID,
              col.id,
              attr.key,
              attr.required,
              undefined, // min
              undefined, // max
              attr.default || undefined
            );
          } else if (attr.type === 'datetime') {
            await databases.createDatetimeAttribute(
              DATABASE_ID,
              col.id,
              attr.key,
              attr.required,
              attr.default || undefined
            );
          }
          console.log(`   ✅ Attribute '${attr.key}' (${attr.type})`);
        } catch (err) {
          if (err.code === 409) {
            console.log(`   ℹ️ Attribute '${attr.key}' already exists`);
          } else {
            console.log(`   ❌ Attribute '${attr.key}' failed: ${err.message}`);
          }
        }
      }

      // Update collection permissions so authenticated users can create documents
      // Documents will be filtered by userId in the application layer
      try {
        await databases.updateCollection(
          DATABASE_ID,
          col.id,
          col.name,
          [
            Permission.create(Role.users()),
            Permission.read(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
          ],
          true,
          undefined,
          undefined
        );
        console.log(`   ✅ Permissions set for '${col.id}'`);
      } catch (err) {
        console.log(`   ❌ Permissions failed for '${col.id}': ${err.message}`);
      }
    }

    console.log('\n🎉 Setup complete!');
    console.log(`   Database ID: ${DATABASE_ID}`);
    collections.forEach(c => console.log(`   Collection ID: ${c.id}`));
  } catch (err) {
    console.error('\n❌ Setup failed:', err.message);
    if (err.response) {
      console.error('Response:', err.response);
    }
    process.exit(1);
  }
}

setup();
