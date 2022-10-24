export class CreatePackageDto {
  tagId: string;
  sourcePackageId: string;
  inheritedLabTestIds: string;
  itemId: string;
  quantity: number;
  uomId: string;
  newParentQuantity: number;
  notes: string;
}
