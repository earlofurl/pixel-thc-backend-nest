import { Type } from 'class-transformer';

export class CreatePackageDto {
  tagId: string;

  sourcePackageId: string;

  inheritedLabTestIds: string;

  itemId: string;

  @Type(() => Number)
  quantity: number;

  uomId: string;

  @Type(() => Number)
  newParentQuantity: number;

  notes: string;

  orderId?: string;
}
