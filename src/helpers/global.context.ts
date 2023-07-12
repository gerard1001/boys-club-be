import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalContext {
  constructor(private readonly context: Map<string, any>) {
    this.context = new Map<string, any>();
  }

  set(key: string, value: any): void {
    this.context.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.context.get(key);
  }
}
