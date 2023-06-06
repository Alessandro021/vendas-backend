import { Module, CacheModule as CacheModuleNest } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [CacheModuleNest.register({ttl: 90000000,})],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
