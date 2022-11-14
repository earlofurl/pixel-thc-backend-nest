import {
  CacheInterceptor,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  CacheTTL,
  UseGuards,
} from '@nestjs/common';
import type { Package } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { AssignTagDto } from './dto/assign-tag.dto';

@UseGuards(LoggedInGuard)
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    console.log('POST create package', createPackageDto);
    return this.packagesService.create(createPackageDto);
  }

  @Post('/assign-tag')
  assignTag(@Body() assignTagDto: AssignTagDto) {
    return this.packagesService.assignTag(assignTagDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Get()
  findAll(): Promise<Package[]> {
    console.log('GET findAll packages');
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findAll packages');
    }
    return this.packagesService.findAll({ availableOnly: null });
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5)
  @Get('/available')
  findAllAvailable(): Promise<Package[]> {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findAll available packages');
    }
    return this.packagesService.findAll({ availableOnly: false });
  }

  @Get(':tagNumber')
  findOne(@Param('tagNumber') tagNumber: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findOne tagNumber package');
    }
    return this.packagesService.findOne(tagNumber);
  }

  @Get('/order/:orderId')
  findByOrderId(@Param('orderId') orderId: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findByOrderId orderId package');
    }
    return this.packagesService.findByOrderId(orderId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackagesDto) {
    return this.packagesService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
