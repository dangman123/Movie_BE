import { PartialType } from '@nestjs/mapped-types';
import { CreateStudioDto } from './create-studio.dto';

export class UpdateStudioDto extends PartialType(CreateStudioDto) {}
