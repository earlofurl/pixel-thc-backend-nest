import { Item, PackageTag, Uom } from '@prisma/client';

export class CreatePackageDto {
  uom?: Uom;
  tag?: PackageTag;
  item?: Item;
  sourcePackages?: CreatePackageDto[];
  tagId: string;
  sourcePackageId: string;
  inheritedLabTestIds: string;
  itemId: string;
  quantity: number;
  uomId: string;
  newParentQuantity: number;
}
