import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("Connecting to hello world")
    return this.appService.getHello();
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response) {
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
