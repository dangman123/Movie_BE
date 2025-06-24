import { Module } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { SystemSettingsController } from './system-settings.controller';

@Module({
  controllers: [SystemSettingsController],
  providers: [SystemSettingsService],
})
export class SystemSettingsModule {}
