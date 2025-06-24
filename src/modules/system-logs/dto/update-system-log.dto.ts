import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemLogDto } from './create-system-log.dto';

export class UpdateSystemLogDto extends PartialType(CreateSystemLogDto) {}
