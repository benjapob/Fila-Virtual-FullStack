import { connect, connection } from "mongoose";

const connectToDB = async (): Promise<void> => {
    let mongodbURI: string;
    if (process.env['NODE_ENV'] === 'test') {
        mongodbURI = process.env['MONGODB_TEST_URI'] as string;
    } else {
        mongodbURI = process.env['MONGODB_URI'] as string;
    }
    await connect(mongodbURI);
    console.log(`Conectado a MongoDB (db: ${mongodbURI.split('/').pop()})`);
};

const disconnectDB = async (): Promise<void> => {
    await connection.close();
}

export { connectToDB, disconnectDB };