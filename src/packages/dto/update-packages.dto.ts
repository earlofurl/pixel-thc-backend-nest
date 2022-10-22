import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';

export class UpdatePackagesDto extends PartialType(CreatePackageDto) {}
