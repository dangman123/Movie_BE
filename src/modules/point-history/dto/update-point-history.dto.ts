import { PartialType } from '@nestjs/mapped-types';
import { CreatePointHistoryDto } from './create-point-history.dto';

export class UpdatePointHistoryDto extends PartialType(CreatePointHistoryDto) {}
