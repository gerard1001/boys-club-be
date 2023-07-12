import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalClass } from './helpers/global.class';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import multer from 'multer';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.get(GlobalClass);
  // app.useStaticAssets(path.join(__dirname, '../uploads/images'));

  // const storage = multer.diskStorage({
  //   destination: './upload/images',
  //   filename: (req, file, cb) => {
  //     return cb(
  //       null,
  //       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
  //     );
  //   },
  // });

  // const upload = multer({
  //   storage: storage,
  //   limits: {
  //     fileSize: 10,
  //   },
  // });

  // app.use('/profile', express.static('upload/images'));
  // app.post('/upload', upload.single('profile'), (req, res) => {
  //   res.json({
  //     success: 1,
  //     profile_url: `http://localhost:4000/profile/${req.file.filename}`,
  //   });
  // });

  await app.listen(4000);
}
bootstrap();
