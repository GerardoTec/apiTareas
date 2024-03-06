import { BadRequestException } from "@nestjs/common";

export class ValidationUtil {
    static assertNotNull(value: any, message: string): void {
      if (value == null || value === '') {
        throw new BadRequestException(message);
      }
    }
  }