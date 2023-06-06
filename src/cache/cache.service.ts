import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

    async getCache<T>(key: string , functionRequest: () => Promise<T>): Promise<T>{
        const allData: T = await this.cacheManager.get(key)

        if(allData){
            return allData;
        }

        const cities: T =  await functionRequest()

        await this.cacheManager.set(key, cities)

        return cities;
    }
}
