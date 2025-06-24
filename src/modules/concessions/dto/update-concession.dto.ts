import { PartialType } from '@nestjs/mapped-types';
import { CreateConcessionDto } from './create-concession.dto';

export class UpdateConcessionDto extends PartialType(CreateConcessionDto) {}
