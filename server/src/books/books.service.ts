import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const { tags, ...data } = createBookDto;

    let existingTags = [];

    if (tags?.length > 0) {
      existingTags = await this.prisma.tag.findMany({
        where: {
          id: {
            in: tags,
          },
        },
      });
    }

    const newBook = await this.prisma.book.create({
      data: {
        ...data,
        ...(tags && {
          tags: {
            connect: existingTags.map((tag) => ({
              id: tag.id,
            })),
          },
        }),
      },
    });

    return newBook;
  }

  async findAll() {
    const books = await this.prisma.book.findMany({
      include: {
        tags: true,
      },
    });

    return books.map((book) => ({
      ...book,
      tags: book.tags.map(({ name, color, id }) => ({ name, color, id })),
    }));
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const { tags, ...data } = updateBookDto;

    let existingTags = [];

    if (tags && tags.length > 0) {
      existingTags = await this.prisma.tag.findMany({
        where: {
          id: {
            in: tags,
          },
        },
      });
    }

    return this.prisma.book.update({
      where: { id },
      data: {
        ...data,
        ...(tags && {
          tags: {
            set: existingTags.map((tag) => ({
              id: tag.id,
            })),
          },
        }),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
