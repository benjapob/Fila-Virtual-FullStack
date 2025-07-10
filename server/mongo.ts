import { connect, connection } from "mongoose";

const connectToDB = async (): Promise<void> => {
    try {
        let mongodbURI: string;
        if (process.env['NODE_ENV'] === 'test') {
            mongodbURI = process.env['MONGODB_TEST_URI'] as string;
        } else {
            mongodbURI = process.env['MONGODB_URI'] as string;
        }
        await connect(mongodbURI, {serverSelectionTimeoutMS:5000});
        console.log(`Connected to MongoDB (db: ${mongodbURI.split('/').pop()})`);
    } catch (error) {
        console.error('MongoDB connection error',error)
    }
};

const disconnectDB = async (): Promise<void> => {
    await connection.close();
}

export { connectToDB, disconnectDB };