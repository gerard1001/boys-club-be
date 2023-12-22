// import {
//   Controller,
//   Get,
//   Post,
//   Param,
//   Res,
//   UseInterceptors,
//   UploadedFile,
//   Body,
// } from '@nestjs/common';
// import { PersonService } from './person.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { join, parse } from 'path';
// import { Response } from 'express';
// import { PersonDto } from './dto/person.dto';

// @Controller('user')
// export class PersonController {
//   constructor(private personService: PersonService) {}

//   @Get('api/:id')
//   async getString(@Param() params: any): Promise<any> {
//     const user = await this.personService.getPlayersInTeam(params.id);

//     return user;
//   }

//   @Post('register')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './uploads/images',
//         filename: (req, file, cb) => {
//           const imageString: string = `${parse(file.originalname).name.replace(
//             /\s/g,
//             '',
//           )}_${Date.now()}${parse(file.originalname).ext}`;

//           cb(null, imageString);
//         },
//       }),
//     }),
//   )
//   async createPerson(
//     @UploadedFile() image: Express.Multer.File,
//     @Body() personDto: PersonDto,
//   ): Promise<any> {
//     return this.personService.createPostmanPlayer(personDto, image.filename);
//   }

//   @Get('profile/:img')
//   findImage(@Param('img') img: string, @Res() res: Response) {
//     return res.sendFile(join(process.cwd(), 'uploads/images/' + img));
//   }
// }
