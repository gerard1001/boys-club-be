import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const imageString: string = `${parse(file.originalname).name.replace(
            /\s/g,
            '',
          )}_${Date.now()}${parse(file.originalname).ext}`;

          cb(null, imageString);
        },
      }),
    }),
  )
  async createPerson(
    @UploadedFile() image: Express.Multer.File,
    @Body() userDto: UserDto,
  ): Promise<any> {
    return await this.userService.createUser(userDto, image.filename);
  }
}
