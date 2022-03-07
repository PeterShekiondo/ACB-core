import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config'

const ormConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: () => ({
        // driver: 'postgres',
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
    })
}


export default ormConfig;