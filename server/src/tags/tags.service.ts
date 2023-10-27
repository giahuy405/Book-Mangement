import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const { name, color } = createTagDto;

    const existingTag = await this.prisma.tag.findFirst({
      where: { name },
    });

    if (existingTag) {
      throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.tag.create({
      data: { name, color },
    });
  }

  async findAll() {
    return this.prisma.tag.findMany({
      select: { id: true, name: true, color: true },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const { name, color } = updateTagDto;

    const existingTag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!existingTag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.tag.update({
      where: { id },
      data: { name, color },
    });
  }

  async remove(id: string) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!existingTag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.tag.delete({
      where: { id },
    });
  }

  async getBooks(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return tag.books;
  }
}
