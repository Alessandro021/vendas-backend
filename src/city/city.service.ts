import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,

        private readonly cacheService: CacheService
    ){}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]>{

        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, 
        () => this.cityRepository.find({
            where: {
                stateId: stateId,
            }
        }) 
        )
    }

    async findCityById(cityId: number): Promise<CityEntity>{
        const city = await this.cityRepository.findOne({
            where: { id: cityId }
        })

        if(!city){
            throw new NotAcceptableException(`Codigo: ${cityId} Não Existe`)
        }

        return city;
    }
}
