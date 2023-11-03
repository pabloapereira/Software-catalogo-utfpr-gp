import * as mongodb from 'mongodb';
import { Block } from './block';

export const collections: {
  blocks?: mongodb.Collection<Block>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('utfpr-softwares');
  await applySchemaValidation(db);

  const blocksCollection = db.collection<Block>('blocks');
  collections.blocks = blocksCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Block model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      additionalProperties: true,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: "'name' is required and is a string",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: 'blocks',
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('blocks', { validator: jsonSchema });
      }
    });
}
