export class File {

  name: string;
  file: string; // B64
  sites: string[];

  constructor(name: string) {
    this.name = name;
  }

  toString(): string {
    return 'File[name = ' + this.name + ', file = ' + this.file + ', sites = ' + this.sites + ']';
  }

}
