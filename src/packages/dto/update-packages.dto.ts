import { PartialType } from '@nestjs/mapped-types';
import { CreatePackagesDto } from './create-packages.dto';

export class UpdatePackagesDto extends PartialType(CreatePackagesDto) {}
