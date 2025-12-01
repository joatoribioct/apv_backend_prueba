import mongoose from "mongoose";

const conectarDB = async () => {
    try {
            // Use MONGO_URI environment variable if provided (safer for credentials).
            // Fall back to the hardcoded URI if not set (replace <db_password> with your password).
            const mongoURI = process.env.MONGO_URI

            // Mongoose v6+ and the Node driver no longer require useNewUrlParser or useUnifiedTopology.
            // Call connect with the URI only to avoid the deprecation warnings from the driver.
            const db = await mongoose.connect(mongoURI);
        const url = `${db.connection.host}:${db.connection.port}`

        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1);
    }
}

export default conectarDB;