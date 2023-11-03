import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';
import { Block, Laboratory, Software } from './block';

export const router = express.Router();
router.use(express.json());

router.get('/', async (_req, res) => {
  try {
    const blocks = await collections.blocks.find({}).toArray();
    res.status(200).send(blocks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const getBlock = (id: string) => {
  const query = { _id: new mongodb.ObjectId(id) };
  return collections.blocks.findOne(query);
};

const getLab = (block: Block, id: string) => {
  return block?.laboratories[parseInt(id)];
};

const getSoftware = (lab: Laboratory, id: string) => {
  return lab?.softwares[parseInt(id)];
};

// blocks

router.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const block = await getBlock(id);

    if (block) {
      res.status(200).send(block);
    } else {
      res.status(404).send(`Failed to find a block: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a block: ID ${req?.params?.id}`);
  }
});

router.post('/', async (req, res) => {
  try {
    const block = req.body;
    const result = await collections.blocks.insertOne(block);

    if (result.acknowledged) {
      res.status(201).send(`Created a new block: ID ${result.insertedId}.`);
    } else {
      res.status(500).send('Failed to create a new block.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const block = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.blocks.updateOne(query, {
      $set: block,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated a block: ID ${id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find a block to update: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update a block to update: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.blocks.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a block: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a block: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a block: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// laboratories
router.get('/:id_block/labs', async (req, res) => {
  try {
    const id = req?.params?.id_block;
    const block = await getBlock(id);
    const labs = block.laboratories || [];

    if (labs) {
      res.status(200).send(labs);
    } else {
      res.status(404).send(`Failed to find a lab: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a lab: ID ${req?.params?.id_block}`);
  }
});

router.get('/:id_block/labs/:id_lab', async (req, res) => {
  try {
    const idBlock = req?.params?.id_block;
    const idLab = req?.params?.id_lab;
    const block = await getBlock(idBlock);
    const lab: Laboratory = getLab(block, idLab);

    if (lab) {
      res.status(200).send(lab);
    } else {
      res.status(404).send(`Failed to find a lab: ID ${idBlock}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a lab: ID ${req?.params?.id_block}`);
  }
});

// softwares
router.get('/:id_block/labs/:id_lab/softwares', async (req, res) => {
  try {
    const idBlock = req?.params?.id_block;
    const idLab = req?.params?.id_lab;

    const block = await getBlock(idBlock);
    const lab: Laboratory = getLab(block, idLab);
    const softwares = lab.softwares || [];

    if (softwares) {
      res.status(200).send(softwares);
    } else {
      res
        .status(404)
        .send(`Failed to find a group of softwares from: ${idLab}`);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Failed to a group of softwares from: ID ${req?.params?.id_block}`);
  }
});

router.get(
  '/:id_block/labs/:id_lab/softwares/:id_software',
  async (req, res) => {
    try {
      const idBlock = req?.params?.id_block;
      const idLab = req?.params?.id_lab;
      const idSoftware = req?.params?.id_software;

      const block = await getBlock(idBlock);
      const lab: Laboratory = getLab(block, idLab);
      const software: Software = getSoftware(lab, idSoftware);

      if (software) {
        res.status(200).send(software);
      } else {
        res.status(404).send(`Failed to find a software: ID ${idBlock}`);
      }
    } catch (error) {
      res
        .status(404)
        .send(`Failed to find a software: ID ${req?.params?.id_block}`);
    }
  }
);

router.put(
  '/:id_block/labs/:id_lab/softwares/add-request',
  async (req, res) => {
    try {
      const idBlock = req?.params?.id_block;
      const idLab = req?.params?.id_lab;

      const block = await getBlock(idBlock);
      const lab: Laboratory = getLab(block, idLab);
      const newRequisition = req.body;

      console.log(
        `Attenpting to register the following object to ${lab.name}: ` +
          newRequisition
      );

      const query = {
        _id: new mongodb.ObjectId(block._id),
        'laboratories.name': lab.name,
      };
      const result = await collections.blocks.updateOne(query, {
        $push: {
          'laboratories.$.softwares': newRequisition,
        },
      });

      if (result && result.matchedCount) {
        res.status(200).send(`Updated a software list in ${lab.name}.`);
      } else if (!result.matchedCount) {
        res.status(404).send(`Failed to find a software list in Lab ${lab}`);
      } else {
        res.status(304).send(`Failed to update a software list in Lab ${lab}`);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
