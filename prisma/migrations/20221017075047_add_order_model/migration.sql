-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Open', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Paid', 'Finished');

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "orderId" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "scheduledPackDateTime" TIMESTAMP(3),
    "scheduledShipDateTime" TIMESTAMP(3),
    "scheduledDeliveryDateTime" TIMESTAMP(3),
    "actualPackDateTime" TIMESTAMP(3),
    "actualShipDateTime" TIMESTAMP(3),
    "actualDeliveryDateTime" TIMESTAMP(3),
    "orderTotal" MONEY,
    "notes" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'Open',
    "customerName" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
