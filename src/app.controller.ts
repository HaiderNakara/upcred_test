import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';
import { RolesGuard } from './auth/guards/auth.middleware';
import { UpdateContactDto } from './dto/update-cat.dto';
import { Contact } from './entities/app.entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('contacts')
  @ApiSecurity('bearer')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @UseGuards(RolesGuard)
  getContacts(@Query('page') page: number, @Query('search') search: string) {
    return this.appService.getContacts(page, search);
  }

  @Get('contacts/:id')
  @ApiSecurity('bearer')
  @UseGuards(RolesGuard)
  getContact(@Param('id') id: string) {
    return this.appService.getContact(id);
  }
  @Post('contacts')
  @ApiSecurity('bearer')
  @UseGuards(RolesGuard)
  addContact(@Body() contact: Contact) {
    return this.appService.addContact(contact);
  }
  @Patch('contacts/:id')
  @ApiSecurity('bearer')
  @UseGuards(RolesGuard)
  updateContact(@Param('id') id: string, @Body() contact: UpdateContactDto) {
    return this.appService.updateContact(id, contact);
  }
  @Delete('contacts/:id')
  @ApiSecurity('bearer')
  @UseGuards(RolesGuard)
  deleteContact(@Param('id') id: string) {
    return this.appService.deleteContact(id);
  }
}

