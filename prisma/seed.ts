// TODO: Spend a little time on this to do everything from a reset.

import type { PackageTag, Strain, ItemType, Item } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// async function seed() {
//   const flowerMini = await prisma.itemType.create({
//     data: {
//       productForm: 'Flower',
//       productModifier: 'Mini',
//       uomDefault: {
//         connect: {
//           id: 'a7fc6309-c82e-4b3e-862f-eb6c137760f3',
//         },
//       },
//       productCategory: {
//         connect: {
//           id: '8105dd98-18af-4255-b771-3ebfeee180d1',
//         },
//       },
//     },
//   });
//   const flowerWaste = await prisma.itemType.create({
//     data: {
//       productForm: 'Flower',
//       productModifier: 'Waste',
//       uomDefault: {
//         connect: {
//           id: '0bdf2e5d-b328-4ac7-87ee-85dd10e5e17d',
//         },
//       },
//       productCategory: {
//         connect: {
//           id: 'd59dd4a9-d47f-48c4-a8da-f5029e69b4af',
//         },
//       },
//     },
//   });
//   const hashBulk = await prisma.itemType.create({
//     data: {
//       productForm: 'Hash',
//       productModifier: 'Bulk',
//       uomDefault: {
//         connect: {
//           id: 'a7fc6309-c82e-4b3e-862f-eb6c137760f3',
//         },
//       },
//       productCategory: {
//         connect: {
//           id: 'fe596cfd-4ded-4093-a38f-25a477e4b923',
//         },
//       },
//     },
//   });
//   const hashPckgd = await prisma.itemType.create({
//     data: {
//       productForm: 'Hash',
//       productModifier: 'Packaged',
//       uomDefault: {
//         connect: {
//           id: 'e3d24fc6-c377-40ba-a392-eb6e99c88bde',
//         },
//       },
//       productCategory: {
//         connect: {
//           id: 'b032bee9-2ac7-4199-a654-84f18c102c1f',
//         },
//       },
//     },
//   });
// }

// async function seed() {
//   // itemType seeding
//   const strainList: Strain[] = [];
//   const itemTypeList: ItemType[] = [];
//   const itemList: Item[] = [];
//
//   const allStrains = await prisma.strain.findMany().then((strains) => {
//     strains.forEach((strain) => {
//       strainList.push(strain);
//     });
//   });
//
//   const allItemTypes = await prisma.itemType.findMany().then((itemTypes) => {
//     itemTypes.forEach((itemType) => {
//       itemTypeList.push(itemType);
//     });
//   });
//
//   // for each strain, create a new item for each itemType
//   strainList.forEach((strain) => {
//     itemTypeList.forEach((itemType) => {
//       itemList.push({
//         id: uuidv4(),
//         description: strain.name,
//         strainId: strain.id,
//         itemTypeId: itemType.id,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         isUsed: false,
//       });
//     });
//   });
//
//   // use prisma to insert the items in the itemList into the database
//   const createAllItems = await prisma.item.createMany({
//     data: itemList,
//   });
//
//   // Create Item entries
//   // const phkFlower = await prisma.item.create({
//   //   data: {
//   //     itemType: {
//   //       connect: {
//   //         id: flowerUnsorted.id,
//   //       },
//   //     },
//   //     strain: {
//   //       connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//   //     },
//   //   },
//   // });
// }

// end itemType seeding

// Package Tag Seeding

// async function seed() {
//   console.log("Seeding package tags...");
//   const generatedTags: Array<PackageTag> = [];
//   for (let i = 1; i < 14000; i++) {
//     const tagPrefix = "1A4010300016BAD0000";
//     const tagSuffix = i.toString().padStart(5, "0");
//     generatedTags.push({
//       id: uuidv4(),
//       tagNumber: `${tagPrefix}${tagSuffix}`,
//       isAssigned: false,
//       isActive: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isProvisional: false,
//     });
//   }

//   // Insert tags
//   await prisma.packageTag.createMany({
//     data: generatedTags,
//   });

//   console.log("DB has been seeded with package tags.");
// }

// End Package Tag Seeding

// async function seed() {
//   // Create tags
//   console.log('Seeding package tags...');
//   const generatedTags: Array<PackageTag> = [];
//   for (let i = 1; i < 20000; i++) {
//     const tagPrefix = '1A4010300016BAD0000';
//     const tagSuffix = i.toString().padStart(5, '0');
//     generatedTags.push({
//       id: uuidv4(),
//       tagNumber: `${tagPrefix}${tagSuffix}`,
//       isAssigned: false,
//       isActive: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isProvisional: false,
//     });
//   }
//
//   // Insert tags
//   await prisma.packageTag.createMany({
//     data: generatedTags,
//   });
//
//   console.log('DB has been seeded with package tags.');
//
//   // Create uom entries
//   const uomPounds = await prisma.uom.create({
//     data: {
//       quantityType: 'WeightBased',
//       name: 'Pounds',
//       abbreviation: 'lb',
//     },
//   });
//   const uomGrams = await prisma.uom.create({
//     data: {
//       quantityType: 'WeightBased',
//       name: 'Grams',
//       abbreviation: 'g',
//     },
//   });
//   const uomEach = await prisma.uom.create({
//     data: {
//       quantityType: 'CountBased',
//       name: 'Each',
//       abbreviation: 'ea',
//     },
//   });
//   const uomOunces = await prisma.uom.create({
//     data: {
//       quantityType: 'WeightBased',
//       name: 'Ounces',
//       abbreviation: 'oz',
//     },
//   });
//
//   // Create product category entries
//   const productCategory1 = await prisma.productCategory.create({
//     data: {
//       name: 'Buds',
//     },
//   });
//   const productCategory2 = await prisma.productCategory.create({
//     data: {
//       name: 'Buds (by strain)',
//     },
//   });
//   const productCategory3 = await prisma.productCategory.create({
//     data: {
//       name: 'Concentrate',
//     },
//   });
//   const productCategory4 = await prisma.productCategory.create({
//     data: {
//       name: 'Concentrate(each)',
//     },
//   });
//   const productCategory5 = await prisma.productCategory.create({
//     data: {
//       name: 'Non-Infused (Plain) Pre-Roll',
//     },
//   });
//   const productCategory6 = await prisma.productCategory.create({
//     data: {
//       name: 'Shake/Trim',
//     },
//   });
//   const productCategory7 = await prisma.productCategory.create({
//     data: {
//       name: 'Shake/Trim (by strain)',
//     },
//   });
//   const productCategory8 = await prisma.productCategory.create({
//     data: {
//       name: 'Waste',
//     },
//   });
//
//   // Create ItemType entries
//   const flowerUnsorted = await prisma.itemType.create({
//     data: {
//       productForm: 'Flower',
//       productModifier: 'Unsorted',
//       uomDefault: {
//         connect: {
//           id: uomPounds.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory1.id,
//         },
//       },
//     },
//   });
//   const flowerA = await prisma.itemType.create({
//     data: {
//       productForm: 'Flower',
//       productModifier: 'A bud',
//       uomDefault: {
//         connect: {
//           id: uomPounds.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory1.id,
//         },
//       },
//     },
//   });
//   const flowerB = await prisma.itemType.create({
//     data: {
//       productForm: 'Flower',
//       productModifier: 'B bud',
//       uomDefault: {
//         connect: {
//           id: uomPounds.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory1.id,
//         },
//       },
//     },
//   });
//   const prerollSingle = await prisma.itemType.create({
//     data: {
//       productForm: 'Preroll',
//       productModifier: 'Single',
//       uomDefault: {
//         connect: {
//           id: uomEach.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory5.id,
//         },
//       },
//     },
//   });
//   const prerollTwoPack = await prisma.itemType.create({
//     data: {
//       productForm: 'Preroll',
//       productModifier: 'TwoPack',
//       uomDefault: {
//         connect: {
//           id: uomEach.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory5.id,
//         },
//       },
//     },
//   });
//   const prerollTenPack = await prisma.itemType.create({
//     data: {
//       productForm: 'Preroll',
//       productModifier: '10-Pack',
//       uomDefault: {
//         connect: {
//           id: uomEach.id,
//         },
//       },
//       productCategory: {
//         connect: {
//           id: productCategory5.id,
//         },
//       },
//     },
//   });
//
//   // Create Item entries
//   const phkFlower = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: flowerUnsorted.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//       },
//     },
//   });
//
//   const phkAbud = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: flowerA.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//       },
//     },
//   });
//
//   const phkBbud = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: flowerB.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//       },
//     },
//   });
//
//   const phkPRsingle = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: prerollSingle.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//       },
//     },
//   });
//
//   const phkPRtwoPack = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: prerollTwoPack.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sol5b00252a66vw8ybk3m' },
//       },
//     },
//   });
//
//   const wappaFlower = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: flowerUnsorted.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sp7ji002p2a66m5za210o' },
//       },
//     },
//   });
//
//   const wappaPRsingle = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: prerollSingle.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sp7ji002p2a66m5za210o' },
//       },
//     },
//   });
//
//   const wappaPRtwoPack = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: prerollTwoPack.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44sp7ji002p2a66m5za210o' },
//       },
//     },
//   });
//
//   const gmoFlower = await prisma.item.create({
//     data: {
//       itemType: {
//         connect: {
//           id: flowerUnsorted.id,
//         },
//       },
//       strain: {
//         connect: { id: 'cl44snbza000z2a66khnv5m3c' },
//       },
//     },
//   });
//
//   // Create LabTest entries
//   const phkLabTest = await prisma.labTest.create({
//     data: {
//       labFacilityName: 'Juniper Analytics LLC',
//       testIdCode: '20JA0666.01',
//       testPerformedDate: '2020-01-01T00:00:00-05:00',
//       batchCode: '22-M-A',
//       overallPassed: true,
//       testTypeName: 'Flower Full Compliance',
//       testPassed: true,
//       testComment: 'This is a comment about Flower Full Compliance',
//       thcTotalPercent: 31,
//       cbdPercent: 0.012,
//       terpenePercent: 3.42,
//       delta9ThcPercent: 0,
//       delta8ThcPercent: 0,
//       cbnPercent: 0,
//       cbcPercent: 0,
//       cbgPercent: 0,
//       cbgAPercent: 0,
//       thcVPercent: 0,
//       totalCannabinoidsPercent: 34.54,
//     },
//   });
//
//   const wappaLabTest = await prisma.labTest.create({
//     data: {
//       labFacilityName: 'Juniper Analytics LLC',
//       testIdCode: '20JA0420.01',
//       testPerformedDate: '2020-01-01T00:00:00-05:00',
//       batchCode: '21-B',
//       overallPassed: true,
//       testTypeName: 'Flower Full Compliance',
//       testPassed: true,
//       testComment: 'Wappa Flappa Flame',
//       thcTotalPercent: 21.0243,
//       cbdPercent: 0.0,
//       terpenePercent: 3.42,
//       delta9ThcPercent: 0,
//       delta8ThcPercent: 0,
//       cbnPercent: 0,
//       cbcPercent: 0,
//       cbgPercent: 0,
//       cbgAPercent: 0,
//       thcVPercent: 0,
//       totalCannabinoidsPercent: 25.02,
//     },
//   });
//
//   const gmoLabTest = await prisma.labTest.create({
//     data: {
//       labFacilityName: 'Juniper Analytics LLC',
//       testIdCode: '20JA0777.02',
//       testPerformedDate: '2020-01-01T00:00:00-05:00',
//       batchCode: '22-M-C',
//       overallPassed: true,
//       testTypeName: 'Flower Full Compliance',
//       testPassed: true,
//       testComment:
//         'This is a comment about GMOs and their impact on the environment',
//       thcTotalPercent: 29.45,
//       cbdPercent: 0.022,
//       terpenePercent: 1.89,
//       delta9ThcPercent: 0,
//       delta8ThcPercent: 0,
//       cbnPercent: 0,
//       cbcPercent: 0,
//       cbgPercent: 0,
//       cbgAPercent: 0,
//       thcVPercent: 0,
//       totalCannabinoidsPercent: 33.12,
//     },
//   });
//
//   // Create Packages entries
//   const phkFlowerPackage = await prisma.package.create({
//     data: {
//       // tag: {
//       //   connect: { id: "0fb460bf-974c-4e44-a7b3-efd41ca8bd27-10" },
//       // },
//       quantity: 15,
//       notes: 'This is a note about Flower',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: phkFlower.id },
//       },
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: phkLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomPounds.id },
//       },
//     },
//   });
//
//   const phkPRtwoPackPackage = await prisma.package.create({
//     data: {
//       quantity: 50,
//       notes: 'This is a note about preroll on order',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: phkPRtwoPack.id },
//       },
//       isLineItem: true,
//       ppuDefault: 2,
//       ppuOnOrder: 2.15,
//       totalPackagePriceOnOrder: 107.5,
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: phkLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomEach.id },
//       },
//     },
//   });
//
//   const phkPRsinglePackage = await prisma.package.create({
//     data: {
//       quantity: 100,
//       notes: 'This is a note about preroll singles on order',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: phkPRsingle.id },
//       },
//       isLineItem: true,
//       ppuDefault: 1,
//       ppuOnOrder: 1.25,
//       totalPackagePriceOnOrder: 125,
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: phkLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomEach.id },
//       },
//     },
//   });
//
//   const wappaFlowerPackage = await prisma.package.create({
//     data: {
//       // tag: {
//       //   connect: { id: "0fb460bf-974c-4e44-a7b3-efd41ca8bd27-11" },
//       // },
//       quantity: 15,
//       notes: 'This is a note about Wappa Flower',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: wappaFlower.id },
//       },
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: wappaLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomPounds.id },
//       },
//     },
//   });
//
//   const gmoFlowerPackage = await prisma.package.create({
//     data: {
//       // tag: {
//       //   connect: { id: "0fb460bf-974c-4e44-a7b3-efd41ca8bd27-12" },
//       // },
//       quantity: 15,
//       notes: 'This is a note about GMO Flower',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: gmoFlower.id },
//       },
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: gmoLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomPounds.id },
//       },
//     },
//   });
//
//   const phkPRsinglePackage2 = await prisma.package.create({
//     data: {
//       quantity: 100,
//       notes: 'This is a note about preroll singles on another order',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: phkPRsingle.id },
//       },
//       isLineItem: true,
//       ppuDefault: 1,
//       ppuOnOrder: 1.25,
//       totalPackagePriceOnOrder: 125,
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: phkLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomEach.id },
//       },
//     },
//   });
//
//   const phkPRsinglePackage3 = await prisma.package.create({
//     data: {
//       quantity: 100,
//       notes: 'This is a note about preroll singles on order',
//       labTestingState: 'TestPassed',
//       item: {
//         connect: { id: phkPRsingle.id },
//       },
//       isLineItem: true,
//       ppuDefault: 1.0,
//       ppuOnOrder: 1.25,
//       totalPackagePriceOnOrder: 125,
//       labTests: {
//         create: [
//           {
//             labTest: {
//               connect: {
//                 id: phkLabTest.id,
//               },
//             },
//           },
//         ],
//       },
//       uom: {
//         connect: { id: uomEach.id },
//       },
//     },
//   });
//
//   console.log(`Database has been seeded. 🌱\n`);
// }

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
